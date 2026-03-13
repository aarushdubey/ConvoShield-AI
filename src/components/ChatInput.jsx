import './ChatInput.css'

export default function ChatInput({ onAnalyze, isLoading, text = '', setText }) {

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim() && !isLoading) {
            onAnalyze(text.trim())
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type === 'text/plain') {
            const reader = new FileReader()
            reader.onload = (ev) => setText(ev.target.result)
            reader.readAsText(file)
        }
    }

    return (
        <section className="chat-input-section" id="analyzer">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Analyze a Conversation</span>
                    </h2>
                    <p className="section-subtitle">
                        Paste any chat conversation below to scan for suspicious patterns, manipulation tactics, and potential threats.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="chat-form glass-card">
                    <div
                        className="textarea-wrapper"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <textarea
                            id="conversation-input"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={`Paste conversation text here...\n\nExample format:\nPerson A: Hello, how are you?\nPerson B: I'm great! I have an amazing opportunity for you...`}
                            rows={12}
                            className="chat-textarea"
                            disabled={isLoading}
                        />
                        <div className="textarea-footer">
                            <span className="char-count" data-warn={text.length > 10000}>
                                {text.length.toLocaleString()} characters
                            </span>
                            <span className="drop-hint">📎 Drag & drop a .txt file</span>
                        </div>
                    </div>

                    <div className="chat-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => setText('')}
                            disabled={!text || isLoading}
                        >
                            Clear
                        </button>
                        <button
                            type="submit"
                            className="btn-primary analyze-btn"
                            disabled={!text.trim() || isLoading}
                            id="analyze-btn"
                        >
                            {isLoading ? (
                                <>
                                    <div className="loading-spinner" style={{ width: 18, height: 18, borderWidth: 2 }}></div>
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                    Analyze Conversation
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}
