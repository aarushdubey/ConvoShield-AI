const API_KEY = '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';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "ANALYZE_CHAT_BG") {
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
${request.text}`;

        fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'meta/llama-3.1-70b-instruct',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.3,
                max_tokens: 1500
            })
        })
            .then(resp => {
                if (!resp.ok) throw new Error("API HTTP Error: " + resp.status);
                return resp.json();
            })
            .then(data => {
                let rawJson = data.choices[0].message.content.trim();
                if (rawJson.startsWith('```')) {
                    rawJson = rawJson.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
                }
                sendResponse({ success: true, data: JSON.parse(rawJson) });
            })
            .catch(err => {
                console.error("BG Fetch Error:", err);
                sendResponse({ success: false, error: err.message });
            });

        // Tell Chrome we are returning asynchronously
        return true;
    }
});
