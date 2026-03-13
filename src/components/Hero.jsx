import './Hero.css'

export default function Hero() {
    return (
        <section className="hero" id="hero">
            {/* Animated background */}
            <div className="hero-bg">
                <div className="hero-grid"></div>
                <div className="hero-glow hero-glow-1"></div>
                <div className="hero-glow hero-glow-2"></div>
                <div className="hero-orb hero-orb-1"></div>
                <div className="hero-orb hero-orb-2"></div>
                <div className="hero-orb hero-orb-3"></div>
            </div>

            <div className="container hero-content">
                <div className="hero-badge animate-in">
                    <span className="hero-badge-icon">🛡️</span>
                    Track 2: Cybersecurity &amp; Privacy for Women
                </div>

                <h1 className="hero-title animate-in" style={{ animationDelay: '0.1s' }}>
                    Shield Your Conversations
                    <br />
                    <span className="gradient-text">with AI Intelligence</span>
                </h1>

                <p className="hero-subtitle animate-in" style={{ animationDelay: '0.2s' }}>
                    Detect online scams, manipulation, grooming, and phishing attempts in real-time.
                    Our AI analyzes conversation patterns to keep you safe in the digital world.
                </p>

                <div className="hero-features animate-in" style={{ animationDelay: '0.3s' }}>
                    <div className="hero-feature">
                        <span className="hero-feature-icon">🔍</span>
                        <span>NLP Analysis</span>
                    </div>
                    <div className="hero-feature">
                        <span className="hero-feature-icon">⚡</span>
                        <span>Real-time Detection</span>
                    </div>
                    <div className="hero-feature">
                        <span className="hero-feature-icon">🎯</span>
                        <span>Risk Classification</span>
                    </div>
                    <div className="hero-feature">
                        <span className="hero-feature-icon">🔐</span>
                        <span>Privacy-First</span>
                    </div>
                </div>

                <div className="hero-cta animate-in" style={{ animationDelay: '0.4s' }}>
                    <a href="#analyzer" className="btn-primary hero-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        Start Analyzing
                    </a>
                    <a href="#how-it-works" className="btn-secondary">
                        Learn How It Works
                    </a>
                </div>

                {/* Stats */}
                <div className="hero-stats animate-in" style={{ animationDelay: '0.5s' }}>
                    <div className="hero-stat">
                        <span className="hero-stat-number gradient-text">5+</span>
                        <span className="hero-stat-label">Threat Categories</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="hero-stat-number gradient-text">20+</span>
                        <span className="hero-stat-label">Manipulation Tactics</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="hero-stat-number gradient-text">AI</span>
                        <span className="hero-stat-label">Powered by NVIDIA</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
