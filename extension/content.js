(function () {
    const extractChat = () => {
        // Find all message bubbles by looking for the standard message-in and message-out classes
        // WhatsApp Web frequently obfuscates classes, but usually keeps 'message-in' and 'message-out'
        const messages = document.querySelectorAll('div[class*="message-in"], div[class*="message-out"]');

        if (!messages || messages.length === 0) {
            // Fallback: grab all text from the main chat container if specific bubbles aren't found
            const mainChat = document.querySelector('#main');
            if (mainChat && mainChat.innerText) {
                return mainChat.innerText;
            }
            return '';
        }

        let chatLog = [];

        messages.forEach(msg => {
            const isIncoming = msg.className.includes('message-in');
            const prefix = isIncoming ? 'Stranger: ' : 'You: ';

            // Grab the raw text of the bubble. It will include timestamps, 
            // but the LLM is smart enough to ignore them.
            let text = msg.innerText;
            if (text) {
                text = text.trim().replace(/\n/g, ' ');
                chatLog.push(prefix + text);
            }
        });

        return chatLog.join('\n');
    };

    return extractChat();
})();
