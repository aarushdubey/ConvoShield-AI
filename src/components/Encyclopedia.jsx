import React, { useState } from 'react';
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

const trendingScams = [
    {
        id: 'digital-arrest',
        title: 'The "Digital Arrest" Scam',
        severity: 'Critical',
        date: 'Updated Mar 2026',
        description: 'Scammers pose as CBI/ED/Police officers. They claim you are under "digital arrest" via a video call for alleged money laundering or drug parcels.',
        impact: 'Victims are coerced into staying in front of their cameras for hours while scammers drain their accounts.',
        prevention: 'Real authorities never arrest people via Skype or WhatsApp video. Hang up immediately.'
    },
    {
        id: 'fedex-parcel',
        title: 'FedEx/Courier Parcel Scam',
        severity: 'High',
        date: 'Updated Feb 2026',
        description: 'You receive a call stating a parcel in your name was seized containing illegal items (drugs/passports).',
        impact: 'You are "transferred" to fake narcotics officers who demand money to "clear" the case.',
        prevention: 'Never provide Aadhaar or bank details over a call. Check tracking on official websites only.'
    },
    {
        id: 'ai-voice-clone',
        title: 'AI Voice Clone Kidnapping',
        severity: 'Extreme',
        date: 'Updated Jan 2026',
        description: 'Using short clips from social media, AI clones a family member\'s voice to fake a distress call about an accident or kidnapping.',
        impact: 'Parents/Grandparents are tricked into sending ransom money under extreme emotional pressure.',
        prevention: 'Set a "Family Safety Word" that only you know. Call the family member directly on their known number.'
    },
    {
        id: 'investment-app',
        title: 'Fake Stock Investment Groups',
        severity: 'High',
        date: 'Updated Mar 2026',
        description: 'Fraudulent WhatsApp/Telegram groups promising 200% returns using "insider info" from fake institutional accounts.',
        impact: 'Users see fake profits on a rigged app, but are blocked when they try to withdraw money.',
        prevention: 'If a stranger offers you a stock tip on WhatsApp, it is 100% a scam. Only use SEBI registered brokers.'
    }
];

export default function Encyclopedia() {
    const [tab, setTab] = useState('tactics'); // 'tactics' or 'trending'

    return (
        <div className="encyclopedia-container">
            <div className="encyclopedia-hero">
                <h1 className="encyclopedia-title">Security <span className="highlight-cyan">Library</span></h1>
                <p className="encyclopedia-subtitle">
                    Knowledge is your first line of defense. Learn to spot scams before they happen.
                </p>

                <div className="encyclopedia-tabs">
                    <button
                        className={`tab-toggle ${tab === 'tactics' ? 'active' : ''}`}
                        onClick={() => setTab('tactics')}
                    >
                        Manipulation Tactics
                    </button>
                    <button
                        className={`tab-toggle ${tab === 'trending' ? 'active' : ''}`}
                        onClick={() => setTab('trending')}
                    >
                        Trending Real-Life Scams
                    </button>
                </div>
            </div>

            {tab === 'tactics' ? (
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
            ) : (
                <div className="trending-grid">
                    {trendingScams.map((scam) => (
                        <div key={scam.id} className="scam-card glass-dark">
                            <div className="scam-badge">
                                <span className={`severity-tag ${scam.severity.toLowerCase()}`}>{scam.severity}</span>
                                <span className="scam-date">{scam.date}</span>
                            </div>
                            <h2 className="scam-title">{scam.title}</h2>
                            <p className="scam-desc">{scam.description}</p>

                            <div className="scam-meta">
                                <div className="meta-item">
                                    <strong>Impact:</strong> {scam.impact}
                                </div>
                                <div className="meta-item prevention">
                                    <strong>How to avoid:</strong> {scam.prevention}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
