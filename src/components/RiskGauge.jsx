import { useEffect, useRef, useState } from 'react'
import './RiskGauge.css'

export default function RiskGauge({ score = 0, riskLevel = 'low' }) {
    const [animatedScore, setAnimatedScore] = useState(0)
    const gaugeRef = useRef(null)

    useEffect(() => {
        let start = 0
        const end = score
        const duration = 1500
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = Math.round(start + (end - start) * eased)
            setAnimatedScore(current)
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [score])

    // SVG arc calculations
    const radius = 80
    const strokeWidth = 12
    const center = 100
    const circumference = Math.PI * radius // half circle
    const progress = (animatedScore / 100) * circumference

    const getColor = () => {
        if (animatedScore <= 25) return 'var(--risk-low)'
        if (animatedScore <= 60) return 'var(--risk-moderate)'
        return 'var(--risk-high)'
    }

    const getLabel = () => {
        if (riskLevel === 'low') return 'LOW RISK'
        if (riskLevel === 'moderate') return 'MODERATE RISK'
        return 'HIGH RISK'
    }

    return (
        <div className={`risk-gauge risk-gauge-${riskLevel}`} ref={gaugeRef}>
            <svg viewBox="0 0 200 120" className="gauge-svg">
                {/* Background arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
                {/* Progress arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={`${progress} ${circumference}`}
                    className="gauge-progress"
                    style={{ filter: `drop-shadow(0 0 8px ${getColor()})` }}
                />
                {/* Score text */}
                <text x={center} y="85" textAnchor="middle" className="gauge-score" fill={getColor()}>
                    {animatedScore}
                </text>
                <text x={center} y="105" textAnchor="middle" className="gauge-label" fill="var(--text-muted)">
                    / 100
                </text>
            </svg>
            <div className="gauge-risk-label" style={{ color: getColor() }}>
                {getLabel()}
            </div>
        </div>
    )
}
