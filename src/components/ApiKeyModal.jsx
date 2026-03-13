import { useState } from 'react'
import './ApiKeyModal.css'

export default function ApiKeyModal({ onSave }) {
    const [key, setKey] = useState('')
    const [show, setShow] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (key.trim()) {
            onSave(key.trim())
        }
    }

    return (
        <div className="modal-overlay" id="api-key-modal">
            <div className="modal glass-card">
                <div className="modal-icon">🔑</div>
                <h2 className="modal-title">Connect to <span className="gradient-text">NVIDIA AI</span></h2>
                <p className="modal-desc">
                    Enter your NVIDIA API key to power the conversation analysis engine.
                    Get your free key at <a href="https://build.nvidia.com" target="_blank" rel="noopener noreferrer">build.nvidia.com</a>
                </p>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="input-wrapper">
                        <input
                            id="nvidia-api-key-input"
                            type={show ? 'text' : 'password'}
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            placeholder="nvapi-..."
                            className="modal-input"
                            autoFocus
                        />
                        <button
                            type="button"
                            className="toggle-visibility"
                            onClick={() => setShow(!show)}
                            aria-label="Toggle key visibility"
                        >
                            {show ? '🙈' : '👁️'}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="btn-primary modal-submit"
                        disabled={!key.trim()}
                        id="save-api-key-btn"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Connect &amp; Continue
                    </button>
                </form>

                <div className="modal-info">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    <span>Your key is stored locally in your browser and never sent to any server except NVIDIA's API.</span>
                </div>
            </div>
        </div>
    )
}
