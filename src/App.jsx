import { useState, useCallback, useRef } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import ChatInput from './components/ChatInput'
import SampleConversations from './components/SampleConversations'
import AnalysisResult from './components/AnalysisResult'
import { analyzeConversation } from './services/nvidiaService'
import './App.css'

function App() {
    const hardcodedKey = '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';
    const [apiKey, setApiKey] = useState(hardcodedKey)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState('')
    const [inputText, setInputText] = useState('')
    const resultsRef = useRef(null)

    const handleAnalyze = useCallback(async (text) => {
        setError('')
        setResult(null)
        setIsLoading(true)
        setInputText(text)

        try {
            const analysis = await analyzeConversation(apiKey, text)
            setResult(analysis)
            // Scroll to results
            setTimeout(() => {
                resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }, 200)
        } catch (err) {
            setError(err.message || 'An error occurred during analysis')
            // If it's an auth error, clear the key
            if (err.message?.includes('Invalid API key')) {
                localStorage.removeItem('nvidia_api_key')
                setApiKey('')
            }
        } finally {
            setIsLoading(false)
        }
    }, [apiKey])

    const handleSampleSelect = (text) => {
        // Set the text in the textarea first, then analyze
        setInputText(text)
        handleAnalyze(text)
    }

    const handleExportPdf = async () => {
        const element = document.getElementById('analysis-report')
        if (!element) return

        try {
            const html2pdf = (await import('html2pdf.js')).default
            const opt = {
                margin: [10, 10],
                filename: `ConvoShield_Report_${new Date().toISOString().slice(0, 10)}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, backgroundColor: '#0c1024' },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            }
            html2pdf().set(opt).from(element).save()
        } catch {
            alert('PDF export failed. Please try again.')
        }
    }

    const handleReset = () => {
        setResult(null)
        setError('')
        setInputText('')
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="app">

            <Header onReset={handleReset} />

            <main>
                <Hero />

                {/* How it works section */}
                <section className="how-it-works" id="how-it-works">
                    <div className="container">
                        <div className="section-header" style={{ textAlign: 'center' }}>
                            <h2 className="section-title">
                                <span className="gradient-text">How It Works</span>
                            </h2>
                            <p className="section-subtitle" style={{ margin: '0 auto' }}>
                                Three simple steps to analyze any conversation for potential threats.
                            </p>
                        </div>
                        <div className="steps-grid">
                            <div className="step-card glass-card">
                                <div className="step-number">01</div>
                                <div className="step-icon">📋</div>
                                <h3 className="step-title">Paste Conversation</h3>
                                <p className="step-desc">Copy and paste any chat conversation or use our pre-loaded samples.</p>
                            </div>
                            <div className="step-arrow">→</div>
                            <div className="step-card glass-card">
                                <div className="step-number">02</div>
                                <div className="step-icon">🤖</div>
                                <h3 className="step-title">AI Analysis</h3>
                                <p className="step-desc">NVIDIA's LLM scans for manipulation tactics, scams, and red flags.</p>
                            </div>
                            <div className="step-arrow">→</div>
                            <div className="step-card glass-card">
                                <div className="step-number">03</div>
                                <div className="step-icon">🛡️</div>
                                <h3 className="step-title">Get Protection</h3>
                                <p className="step-desc">Receive a risk assessment, flagged phrases, and personalized safety advice.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <SampleConversations onSelect={handleSampleSelect} isLoading={isLoading} />

                <ChatInput
                    onAnalyze={handleAnalyze}
                    isLoading={isLoading}
                    text={inputText}
                    setText={setInputText}
                />

                {/* Error display */}
                {error && (
                    <div className="container">
                        <div className="error-banner animate-in">
                            <span className="error-icon">⚠️</span>
                            <span>{error}</span>
                            <button className="error-dismiss" onClick={() => setError('')}>✕</button>
                        </div>
                    </div>
                )}

                {/* Loading animation */}
                {isLoading && (
                    <div className="container">
                        <div className="scanning-animation animate-in">
                            <div className="scan-visual">
                                <div className="scan-ring ring-1"></div>
                                <div className="scan-ring ring-2"></div>
                                <div className="scan-ring ring-3"></div>
                                <div className="scan-core">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                            </div>
                            <p className="scan-text">Analyzing conversation patterns...</p>
                            <p className="scan-subtext">Scanning for manipulation tactics, scams, and red flags</p>
                        </div>
                    </div>
                )}

                {/* Results */}
                <div ref={resultsRef}>
                    <AnalysisResult result={result} onExportPdf={handleExportPdf} />
                </div>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container footer-inner">
                    <p>Built with ❤️ for <strong>GDG Code4Her Hackathon 2026</strong></p>
                    <p className="footer-sub">Track 2: Cybersecurity &amp; Privacy for Women • Powered by NVIDIA AI</p>
                </div>
            </footer>
        </div>
    )
}

export default App
