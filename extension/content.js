(function () {
    const API_KEY = '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';
    let lastChatText = '';
    let isAnalyzing = false;
    let autoScanTimer = null;

    // Helper to extract chat from the page
    const extractChat = () => {
        const messages = document.querySelectorAll('div[class*="message-in"], div[class*="message-out"]');
        if (!messages || messages.length === 0) {
            const mainChat = document.querySelector('#main');
            if (mainChat && mainChat.innerText) {
                return mainChat.innerText.substring(0, 3000);
            }
            return '';
        }

        let chatLog = [];
        messages.forEach(msg => {
            const isIncoming = msg.className.includes('message-in');
            const prefix = isIncoming ? 'Stranger: ' : 'You: ';
            let text = msg.innerText;
            if (text) {
                text = text.trim().replace(/\n/g, ' ');
                chatLog.push(prefix + text);
            }
        });
        return chatLog.join('\n').substring(0, 3000);
    };

    // Listen for manual requests from the popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === "GET_CHAT") {
            sendResponse({ chatText: extractChat() });
        }
        return true;
    });

    // Setup an aggressive DOM observer to do automatic monitoring
    const setupObserver = () => {
        const observer = new MutationObserver(() => {
            // Debounce so we don't blast the CPU
            if (autoScanTimer) clearTimeout(autoScanTimer);

            autoScanTimer = setTimeout(() => {
                triggerAutoScan();
            }, 3000); // Wait 3 seconds of calm before analyzing
        });

        observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    };

    const triggerAutoScan = async () => {
        if (isAnalyzing) return;

        const currentText = extractChat();
        if (currentText.length < 20) return; // Too short to matter

        // Only run scan if content has actually changed substantially
        if (currentText === lastChatText) return;

        // Roughly check if it grew or changed
        lastChatText = currentText;

        isAnalyzing = true;
        try {
            await performSilentAnalysis(currentText);
        } catch (e) {
            console.error("ConvoShield background analysis failed:", e);
        } finally {
            isAnalyzing = false;
        }
    };

    const performSilentAnalysis = async (text) => {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage({ action: "ANALYZE_CHAT_BG", text }, (response) => {
                if (chrome.runtime.lastError) {
                    return reject(chrome.runtime.lastError);
                }
                if (!response || !response.success) {
                    return reject(new Error(response?.error || 'Unknown error analyzing chat'));
                }

                const result = response.data;
                // If high or moderate risk detected, alert the user actively
                if (result && result.riskScore > 40) {
                    showOnScreenAlert(result);
                }
                resolve();
            });
        });
    };

    const showOnScreenAlert = (data) => {
        // Only show if one isn't already active
        if (document.getElementById('convoshield-alert-overlay')) return;

        const isHigh = data.riskScore >= 70;
        const alertColor = isHigh ? '#ff3b5c' : '#ffb300';

        const overlay = document.createElement('div');
        overlay.id = 'convoshield-alert-overlay';

        overlay.innerHTML = `
            <div class="cs-header">
                <div class="cs-title" style="color:${alertColor}">
                    ⚠️ ConvoShield AI Alert
                </div>
                <button class="cs-close" id="cs-close-btn">×</button>
            </div>
            <div class="cs-body">
                <strong>Risk Level: ${data.riskLevel.toUpperCase()}</strong><br/>
                ${data.summary}
                
                ${data.flaggedPhrases && data.flaggedPhrases.length > 0 ? `
                   <div class="cs-tactics">
                       Top Tactic: ${data.flaggedPhrases[0].tactic}<br/>
                       <em>"${data.flaggedPhrases[0].phrase}"</em>
                   </div>
                ` : ''}
            </div>
            <button class="cs-btn" id="cs-dismiss-btn">Take Action / Read More</button>
        `;

        document.body.appendChild(overlay);

        document.getElementById('cs-close-btn').addEventListener('click', () => {
            overlay.remove();
        });

        document.getElementById('cs-dismiss-btn').addEventListener('click', () => {
            alert("Always verify sender identities and never share sensitive data or money.\n\nAdvice:\n" + data.safetyAdvice.join("\n"));
            overlay.remove();
        });

        // Auto remove after 30 seconds
        setTimeout(() => { if (document.getElementById('convoshield-alert-overlay')) overlay.remove(); }, 30000);
    };

    // Wait a brief moment for page load then spin up the observer
    setTimeout(setupObserver, 2000);

})();
