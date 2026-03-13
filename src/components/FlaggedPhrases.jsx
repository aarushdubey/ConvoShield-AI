import { useState } from 'react'
import './FlaggedPhrases.css'

const tacticIcons = {
    'Urgency': '⏰',
    'Love Bombing': '💕',
    'Isolation': '🔒',
    'Fear': '😨',
    'Authority': '👔',
    'Guilt Tripping': '😢',
    'Gaslighting': '🌫️',
    'Financial Bait': '💰',
    'Flattery': '🌟',
    'Secrecy': '🤫',
    'Gift Giving': '🎁',
    'Data Harvesting': '📊',
    'Impersonation': '🎭',
    'Pressure': '⚡',
}

export default function FlaggedPhrases({ phrases = [] }) {
    const [expandedIdx, setExpandedIdx] = useState(null)

    if (!phrases.length) {
        return (
            <div className="flagged-empty">
                <span className="flagged-empty-icon">✅</span>
                <p>No suspicious phrases detected in this conversation.</p>
            </div>
        )
    }

    return (
        <div className="flagged-list">
            {phrases.map((item, idx) => (
                <div
                    key={idx}
                    className={`flagged-item ${expandedIdx === idx ? 'expanded' : ''}`}
                    onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                    id={`flagged-phrase-${idx}`}
                >
                    <div className="flagged-header">
                        <span className="flagged-icon">⚠️</span>
                        <span className="flagged-phrase">"{item.phrase}"</span>
                        <span className="flagged-tactic-badge">
                            {tacticIcons[item.tactic] || '🔴'} {item.tactic}
                        </span>
                        <svg className="flagged-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    </div>
                    {expandedIdx === idx && (
                        <div className="flagged-detail animate-in">
                            <p className="flagged-reason">{item.reason}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
