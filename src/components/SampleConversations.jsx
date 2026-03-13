import './SampleConversations.css'
import { sampleConversations } from '../data/sampleConversations'

export default function SampleConversations({ onSelect, isLoading }) {
    return (
        <section className="samples-section" id="samples">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Try Sample Conversations</span>
                    </h2>
                    <p className="section-subtitle">
                        Click any card below to load a pre-built conversation and see ConvoShield AI in action.
                    </p>
                </div>

                <div className="samples-grid">
                    {sampleConversations.map((sample) => (
                        <button
                            key={sample.id}
                            className="sample-card glass-card"
                            onClick={() => onSelect(sample.text)}
                            disabled={isLoading}
                            id={`sample-${sample.id}`}
                        >
                            <div className="sample-header">
                                <span className="sample-icon">{sample.icon}</span>
                                <span className="sample-category" style={{ color: sample.color, borderColor: sample.color + '40', background: sample.color + '10' }}>
                                    {sample.category}
                                </span>
                            </div>
                            <h3 className="sample-title">{sample.title}</h3>
                            <p className="sample-preview">{sample.preview}</p>
                            <div className="sample-action">
                                <span>Load &amp; Analyze</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
