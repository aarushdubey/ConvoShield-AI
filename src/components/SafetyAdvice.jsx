import './SafetyAdvice.css'

const adviceIcons = ['🛡️', '📞', '🚫', '📸', '👥', '🔒', '📝', '⚖️', '💡', '🆘']

const emergencyResources = [
    { name: 'Cyber Crime Helpline (India)', number: '1930', type: 'phone' },
    { name: 'Women Helpline', number: '181', type: 'phone' },
    { name: 'National Commission for Women', number: '7827-170-170', type: 'phone' },
    { name: 'cybercrime.gov.in', number: 'https://cybercrime.gov.in', type: 'link' },
]

export default function SafetyAdvice({ advice = [], riskLevel = 'low' }) {
    return (
        <div className="safety-advice">
            {advice.length > 0 && (
                <div className="advice-list">
                    {advice.map((item, idx) => (
                        <div key={idx} className="advice-item" id={`safety-advice-${idx}`}>
                            <span className="advice-icon">{adviceIcons[idx % adviceIcons.length]}</span>
                            <p className="advice-text">{item}</p>
                        </div>
                    ))}
                </div>
            )}

            {riskLevel !== 'low' && (
                <div className="emergency-section">
                    <h4 className="emergency-title">
                        🆘 Emergency Resources
                    </h4>
                    <div className="emergency-grid">
                        {emergencyResources.map((res, idx) => (
                            <div key={idx} className="emergency-card">
                                <span className="emergency-name">{res.name}</span>
                                {res.type === 'phone' ? (
                                    <a href={`tel:${res.number}`} className="emergency-number">{res.number}</a>
                                ) : (
                                    <a href={res.number} target="_blank" rel="noopener noreferrer" className="emergency-link">
                                        Visit →
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
