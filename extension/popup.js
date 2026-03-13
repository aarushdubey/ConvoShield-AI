document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const mainView = document.getElementById('main-view');
    const loadingView = document.getElementById('loading-view');
    const resultView = document.getElementById('result-view');

    const backBtn = document.getElementById('back-btn');
    const whatsappStatus = document.getElementById('whatsapp-status');
    const scanBtn = document.getElementById('scan-btn');

    // Hardcoded API Key
    const apiKey = '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';

    // Start in main view
    showView(mainView);
    checkWhatsApp();

    // Back from Results
    backBtn.addEventListener('click', () => {
        showView(mainView);
        checkWhatsApp();
    });

    // Check if active tab is WhatsApp Web
    async function checkWhatsApp() {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.url && tab.url.includes('web.whatsapp.com')) {
                whatsappStatus.textContent = 'WhatsApp Web Detected - Ready to Scan';
                whatsappStatus.classList.add('ready');
                scanBtn.disabled = false;
                scanBtn.classList.remove('disabled');
            } else {
                whatsappStatus.textContent = 'Please open a chat on WhatsApp Web to scan.';
                whatsappStatus.classList.remove('ready');
                scanBtn.disabled = true;
                scanBtn.classList.add('disabled');
            }
        } catch {
            whatsappStatus.textContent = 'Cannot access tab info.';
            scanBtn.disabled = true;
        }
    }

    // Scan Button Click
    scanBtn.addEventListener('click', async () => {
        showView(loadingView);

        // Inject Script to extract chat
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
        }, (results) => {
            if (chrome.runtime.lastError || !results || !results[0]) {
                alert("Failed to read chat. Are you in an active chat screen?");
                showView(mainView);
                return;
            }

            const chatText = results[0].result;
            if (!chatText || chatText.length < 10) {
                alert("Not enough text found in the current chat view.");
                showView(mainView);
                return;
            }

            analyzeChat(chatText);
        });
    });

    // Analyze via NVIDIA API
    async function analyzeChat(text) {
        const prompt = `You are an expert AI cyber-safety analyst. Analyze this WhatsApp conversation and detect any online scams, grooming, manipulation, harassment, or phishing. 
Return ONLY strict parsable JSON with exactly this structure:
{
  "riskLevel": "high",
  "riskScore": 95,
  "summary": "overview string here",
  "flaggedPhrases": [{"phrase": "exact text here", "tactic": "tactic name here"}],
  "safetyAdvice": ["advice1", "advice2"]
}

Conversation text:
${text.substring(0, 3000)}`; // limit size

        try {
            const resp = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'meta/llama-3.1-70b-instruct',
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.3,
                    max_tokens: 1500
                })
            });

            if (resp.status === 401) {
                throw new Error("Invalid API key.");
            }
            if (!resp.ok) {
                throw new Error("API request failed.");
            }

            const data = await resp.json();
            let rawJson = data.choices[0].message.content.trim();
            if (rawJson.startsWith('```')) {
                rawJson = rawJson.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
            }

            const result = JSON.parse(rawJson);
            displayResults(result);

        } catch (e) {
            alert("Error during analysis: " + e.message);
            showView(mainView);
        }
    }

    function displayResults(data) {
        const scoreEl = document.getElementById('risk-score');
        const levelEl = document.getElementById('risk-level');
        const scoreVal = data.riskScore || 0;

        scoreEl.textContent = scoreVal;
        levelEl.textContent = data.riskLevel.toUpperCase() + ' RISK';

        // Colors
        levelEl.className = 'level';
        if (scoreVal < 30) { levelEl.classList.add('risk-low'); scoreEl.className = 'score risk-low'; }
        else if (scoreVal < 60) { levelEl.classList.add('risk-mod'); scoreEl.className = 'score risk-mod'; }
        else { levelEl.classList.add('risk-high'); scoreEl.className = 'score risk-high'; }

        document.getElementById('analysis-summary').textContent = data.summary;

        const list1 = document.getElementById('flagged-list');
        list1.innerHTML = '';
        (data.flaggedPhrases || []).forEach(f => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="phrase">"${f.phrase}"</span><span class="tactic">⚠️ ${f.tactic}</span>`;
            list1.appendChild(li);
        });

        const list2 = document.getElementById('advice-list');
        list2.innerHTML = '';
        (data.safetyAdvice || []).forEach(a => {
            const li = document.createElement('li');
            li.textContent = a;
            list2.appendChild(li);
        });

        showView(resultView);
    }

    function showView(viewEl) {
        [mainView, loadingView, resultView].forEach(v => v.classList.add('hidden'));
        viewEl.classList.remove('hidden');
    }
});
