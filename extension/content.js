(function () {
    // WhatsApp Web DOM is complex and constantly changing. 
    // We grab the text content of the message bubbles currently visible.

    const extractChat = () => {
        // Attempt to locate the main message container
        const messageContainers = document.querySelectorAll('div[role="row"]');

        if (!messageContainers || messageContainers.length === 0) {
            return '';
        }

        let chatLog = [];

        messageContainers.forEach(row => {
            // WhatsApp distinguishes incoming vs outgoing usually by a generic marker like `.message-in` vs `.message-out`
            // Or by verifying if it contains an element with a specific class.
            // Since classes are obfuscated, we just grab spans that look like text.

            const textSpans = row.querySelectorAll('.selectable-text');
            if (textSpans && textSpans.length > 0) {
                let msgText = Array.from(textSpans).map(span => span.textContent.trim()).join(' ');
                if (msgText) {
                    // crude heuristic to figure out direction if message-in exists
                    const isIncoming = row.querySelector('.message-in') !== null;
                    const isOutgoing = row.querySelector('.message-out') !== null;

                    let prefix = 'Person A: '; // Unknown
                    if (isIncoming) prefix = 'Stranger: ';
                    if (isOutgoing) prefix = 'You: ';

                    chatLog.push(prefix + msgText);
                }
            }
        });

        return chatLog.join('\n');
    };

    return extractChat();
})();
