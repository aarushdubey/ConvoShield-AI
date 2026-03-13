import { useState } from 'react'
import './Header.css'

export default function Header({ onReset }) {
    return (
        <header className="header" id="app-header">
            <div className="header-inner container">
                <a href="#" className="header-logo" onClick={(e) => { e.preventDefault(); onReset?.(); }}>
                    <div className="logo-icon">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 4L36 14V30L20 40L4 30V14L20 4Z" stroke="url(#logo-grad)" strokeWidth="2.5" fill="rgba(0,212,255,0.08)" />
                            <path d="M20 12V24M20 28V30" stroke="url(#logo-grad)" strokeWidth="3" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="logo-grad" x1="4" y1="4" x2="36" y2="40">
                                    <stop stopColor="#00d4ff" />
                                    <stop offset="1" stopColor="#7b2ff7" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <span className="logo-text">
                        <span className="gradient-text">ConvoShield</span>
                        <span className="logo-ai">AI</span>
                    </span>
                </a>

                <nav className="header-nav">
                    <a href="#analyzer" className="nav-link">Analyze</a>
                    <a href="#how-it-works" className="nav-link">How It Works</a>
                    <span className="header-badge">
                        <span className="badge-dot"></span>
                        GDG Code4Her
                    </span>
                </nav>
            </div>
        </header>
    )
}
