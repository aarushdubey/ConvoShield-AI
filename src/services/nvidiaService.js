// NVIDIA AI Service – uses OpenAI-compatible API at integrate.api.nvidia.com
// Model: meta/llama-3.1-70b-instruct

const NVIDIA_API_URL = '/api/nvidia/v1/chat/completions';
const MODEL = 'meta/llama-3.1-70b-instruct';

const SYSTEM_PROMPT = `You are an expert AI cyber-safety analyst specializing in detecting online scams, grooming, manipulation, harassment, and phishing in conversations. 

Analyze the provided conversation text and return a STRICT JSON response (no markdown, no code fences, ONLY valid JSON) with this exact structure:

{
  "riskLevel": "low" | "moderate" | "high",
  "riskScore": <number 0-100>,
  "summary": "<2-3 sentence overview of your analysis findings>",
  "conversationType": "scam" | "grooming" | "harassment" | "phishing" | "manipulation" | "safe",
  "flaggedPhrases": [
    {
      "phrase": "<exact suspicious text from the conversation>",
      "reason": "<why this is suspicious>",
      "tactic": "<manipulation tactic name, e.g. Urgency, Love Bombing, Isolation, Fear, Authority, Guilt Tripping, Gaslighting, Financial Bait>"
    }
  ],
  "tactics": ["<list of all manipulation tactics detected>"],
  "safetyAdvice": ["<actionable safety recommendation 1>", "<actionable safety recommendation 2>", "..."],
  "detailedAnalysis": "<paragraph explaining the conversation pattern, escalation signs, and red flags in detail>"
}

IMPORTANT RULES:
- riskScore: 0-25 = low, 26-60 = moderate, 61-100 = high
- Always provide at least 3 safety advice items
- If the conversation is safe, set riskLevel to "low", riskScore to a low number, and conversationType to "safe"
- Flag specific phrases from the text, not generic descriptions
- Be thorough but avoid false positives on clearly safe conversations
- Return ONLY the JSON object, nothing else`;

export async function analyzeConversation(apiKey, conversationText) {
    if (!apiKey || !apiKey.trim()) {
        throw new Error('NVIDIA API key is required');
    }
    if (!conversationText || !conversationText.trim()) {
        throw new Error('Conversation text is required');
    }

    try {
        const response = await fetch(NVIDIA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey.trim()}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: 'system', content: SYSTEM_PROMPT },
                    { role: 'user', content: `Analyze this conversation for suspicious patterns:\n\n${conversationText}` }
                ],
                temperature: 0.3,
                max_tokens: 2048,
                top_p: 0.9
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            if (response.status === 401) {
                throw new Error('Invalid API key. Please check your NVIDIA API key and try again.');
            }
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment and try again.');
            }
            throw new Error(errorData.error?.message || `API request failed (${response.status})`);
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;

        if (!content) {
            throw new Error('No response received from the AI model');
        }

        // Parse the JSON response - handle potential markdown code fences
        let jsonStr = content.trim();
        if (jsonStr.startsWith('```')) {
            jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
        }

        const analysis = JSON.parse(jsonStr);

        // Validate the response structure
        if (!analysis.riskLevel || !analysis.riskScore === undefined) {
            throw new Error('Invalid analysis response structure');
        }

        return {
            riskLevel: analysis.riskLevel || 'low',
            riskScore: Math.min(100, Math.max(0, analysis.riskScore || 0)),
            summary: analysis.summary || 'Analysis complete.',
            conversationType: analysis.conversationType || 'unknown',
            flaggedPhrases: analysis.flaggedPhrases || [],
            tactics: analysis.tactics || [],
            safetyAdvice: analysis.safetyAdvice || [],
            detailedAnalysis: analysis.detailedAnalysis || ''
        };

    } catch (error) {
        if (error instanceof SyntaxError) {
            throw new Error('Failed to parse AI response. Please try again.');
        }
        throw error;
    }
}
