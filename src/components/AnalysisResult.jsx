import { useState, useRef } from 'react'
import RiskGauge from './RiskGauge'
import FlaggedPhrases from './FlaggedPhrases'
import SafetyAdvice from './SafetyAdvice'
import './AnalysisResult.css'

const TABS = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'flagged', label: 'Flagged Phrases', icon: '⚠️' },
    { id: 'safety', label: 'Safety Advice', icon: '🛡️' },
]

const typeLabels = {
    scam: { label: 'Scam', emoji: '🎣' },
    grooming: { label: 'Grooming', emoji: '⚠️' },
    harassment: { label: 'Harassment', emoji: '🚫' },
    phishing: { label: 'Phishing', emoji: '🏦' },
    manipulation: { label: 'Manipulation', emoji: '🎭' },
    safe: { label: 'Safe', emoji: '✅' },
}

export default function AnalysisResult({ result, onExportPdf }) {
    const [activeTab, setActiveTab] = useState('overview')
    const reportRef = useRef(null)

    if (!result) return null

    const { riskLevel, riskScore, summary, conversationType, flaggedPhrases, tactics, safetyAdvice, detailedAnalysis } = result
    const typeInfo = typeLabels[conversationType] || { label: conversationType, emoji: '❓' }

    const riskColorClass = `risk-${riskLevel}`

    return (
        <section className="analysis-section animate-in" id="analysis-results">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        <span className="gradient-text">Analysis Results</span>
                    </h2>
                </div>

                <div className="analysis-card glass-card" ref={reportRef} id="analysis-report">
                    {/* Header bar */}
                    <div className={`analysis-header ${riskColorClass}`}>
                        <div className="analysis-type">
                            <span className="type-emoji">{typeInfo.emoji}</span>
                            <span className="type-label">{typeInfo.label} Detected</span>
                        </div>
                        <div className="analysis-actions">
                            <button className="btn-secondary" onClick={onExportPdf} id="export-pdf-btn">
                                📄 Export PDF
                            </button>
                        </div>
                    </div>

                    {/* Risk Gauge + Summary */}
                    <div className="analysis-top">
                        <RiskGauge score={riskScore} riskLevel={riskLevel} />
                        <div className="analysis-summary">
                            <h3 className="summary-title">AI Analysis Summary</h3>
                            <p className="summary-text">{summary}</p>
                            {tactics?.length > 0 && (
                                <div className="tactics-row">
                                    <span className="tactics-label">Detected Tactics:</span>
                                    <div className="tactics-tags">
                                        {tactics.map((t, i) => (
                                            <span key={i} className="tactic-tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="analysis-tabs">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                                id={`tab-${tab.id}`}
                            >
                                <span>{tab.icon}</span>
                                <span>{tab.label}</span>
                                {tab.id === 'flagged' && flaggedPhrases.length > 0 && (
                                    <span className="tab-count">{flaggedPhrases.length}</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="tab-content">
                        {activeTab === 'overview' && (
                            <div className="overview-content animate-in">
                                <div className="detail-section">
                                    <h4 className="detail-title">Detailed Analysis</h4>
                                    <p className="detail-text">{detailedAnalysis}</p>
                                </div>
                                {flaggedPhrases.length > 0 && (
                                    <div className="detail-section">
                                        <h4 className="detail-title">Key Findings ({flaggedPhrases.length} suspicious phrases)</h4>
                                        <ul className="key-findings">
                                            {flaggedPhrases.slice(0, 3).map((f, i) => (
                                                <li key={i}>
                                                    <strong>{f.tactic}:</strong> "{f.phrase.slice(0, 80)}{f.phrase.length > 80 ? '...' : ''}"
                                                </li>
                                            ))}
                                            {flaggedPhrases.length > 3 && (
                                                <li className="more-findings" onClick={() => setActiveTab('flagged')}>
                                                    + {flaggedPhrases.length - 3} more → View all in Flagged Phrases tab
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'flagged' && (
                            <div className="animate-in">
                                <FlaggedPhrases phrases={flaggedPhrases} />
                            </div>
                        )}

                        {activeTab === 'safety' && (
                            <div className="animate-in">
                                <SafetyAdvice advice={safetyAdvice} riskLevel={riskLevel} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
