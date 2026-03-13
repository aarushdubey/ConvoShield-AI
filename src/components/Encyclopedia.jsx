import React from 'react';
import './Encyclopedia.css';

const tactics = [
    {
        id: 'emotional-manipulation',
        icon: '🎭',
        name: 'Love Bombing',
        type: 'Emotional Manipulation',
        description: 'An attempt to influence someone by demonstrating extreme affection and attention, often early in a relationship, with the intent of gaining control or trust quickly.',
        warningSigns: [
            'Excessive flattery and overwhelming praise',
            'Pushing for commitment very early',
            'Isolating you from friends and family'
        ],
        example: '"I\'ve never felt this way about anyone before. You are my soulmate, we should move in together right now."'
    },
    {
        id: 'urgency',
        icon: '⏳',
        name: 'False Urgency',
        type: 'Coercion & Pressure',
        description: 'Creating a fake time constraint or emergency to force the victim into making a hasty, emotional decision without time to think critically or consult others.',
        warningSigns: [
            'Phrases like "act now" or "limited time only"',
            'Threats of negative consequences if you delay',
            'Refusal to let you speak to someone else for advice'
        ],
        example: '"If you don\'t secure the processing fee by 5 PM, the police will issue an arrest warrant under your name."'
    },
    {
        id: 'phishing',
        icon: '🎣',
        name: 'Phishing / Spoofing',
        type: 'Social Engineering',
        description: 'Deceptively impersonating a trusted entity (like a bank, service provider, or employer) to trick victims into revealing sensitive personal or financial information.',
        warningSigns: [
            'Unsolicited requests for passwords or OTPs',
            'Suspicious or slightly misspelled sender addresses',
            'Generic greetings rather than your actual name'
        ],
        example: '"Dear Customer, your account has been temporarily locked. Click here to verify your identity and restore access immediately."'
    },
    {
        id: 'gaslighting',
        icon: '🕯️',
        name: 'Gaslighting',
        type: 'Psychological Abuse',
        description: 'A form of psychological manipulation where the abuser attempts to sow self-doubt and confusion in their victim\'s mind, making them question their own memory or sanity.',
        warningSigns: [
            'Denying that previous events or conversations occurred',
            'Blaming you for their manipulative behavior',
            'Trivializing your feelings or telling you you\'re crazy'
        ],
        example: '"I never said that. You\'re just being overly sensitive and imagining things again."'
    },
    {
        id: 'financial-scam',
        icon: '💸',
        name: 'Advance-Fee Scam',
        type: 'Financial Fraud',
        description: 'Targeting victims with the promise of a significant share of a large sum of money, or a high-paying job, in return for a small up-front payment.',
        warningSigns: [
            'Guarantees of high returns with little to no risk',
            'Requests for payment via untraceable methods (crypto, gift cards)',
            'Job offers that require you to buy your own equipment from their "vendor"'
        ],
        example: '"Congratulations on the job offer! Just send over the $300 registration fee for the portal, which will be fully refunded on your first paycheck."'
    },
    {
        id: 'blackmail',
        icon: '📸',
        name: 'Sextortion / Blackmail',
        type: 'Coercion & Extortion',
        description: 'Threatening to release compromising or intimate material (which may be real or AI-generated fakes) unless the victim complies with demands, usually for money or more material.',
        warningSigns: [
            'Rapid escalation to sexual conversation or photo sharing',
            'Switching to a different platform with less moderation',
            'Demands for payment accompanied by screenshots of your social media contacts'
        ],
        example: '"I have recorded you. Send $500 to this wallet or I am sending this video to everyone on your followers list right now."'
    }
];

export default function Encyclopedia() {
    return (
        <div className="encyclopedia-container">
            <div className="encyclopedia-hero">
                <h1 className="encyclopedia-title">Threat <span className="highlight-cyan">Encyclopedia</span></h1>
                <p className="encyclopedia-subtitle">
                    Explore the tactics used by scammers and manipulators. Information is your best defense.
                </p>
            </div>

            <div className="tactics-grid">
                {tactics.map((tactic) => (
                    <div key={tactic.id} className="tactic-card glass-dark">
                        <div className="tactic-header">
                            <span className="tactic-icon">{tactic.icon}</span>
                            <div className="tactic-title-wrapper">
                                <h2 className="tactic-name">{tactic.name}</h2>
                                <span className="tactic-type">{tactic.type}</span>
                            </div>
                        </div>

                        <p className="tactic-desc">{tactic.description}</p>

                        <div className="tactic-signs">
                            <h3 className="signs-title">⚠️ Warning Signs</h3>
                            <ul className="signs-list">
                                {tactic.warningSigns.map((sign, idx) => (
                                    <li key={idx}>{sign}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="tactic-example">
                            <span className="example-label">Example Quote:</span>
                            <p className="example-text">{tactic.example}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
