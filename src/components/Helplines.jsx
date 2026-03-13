import React from 'react';
import './Helplines.css';

const helplines = [
    {
        id: 'national-cyber',
        name: 'National Cyber Crime Helpline',
        detail: '1930',
        description: 'Report online fraud, financial cyber crimes, and digital harassment',
        tags: ['CYBERCRIME', '24X7']
    },
    {
        id: 'cyber-portal',
        name: 'Cyber Crime Portal',
        detail: 'cybercrime.gov.in',
        description: 'File online complaints for cybercrime including phishing, fraud, and online abuse',
        tags: ['NATIONAL', 'INDIA']
    },
    {
        id: 'icall',
        name: 'iCall Psychosocial Helpline',
        detail: '9152987821',
        description: 'Free counselling for emotional distress, harassment, and online abuse',
        tags: ['MENTAL HEALTH', 'ENGLISH/HINDI']
    },
    {
        id: 'snehi',
        name: 'Snehi India',
        detail: '044-24640050',
        description: 'Emotional support and crisis intervention helpline',
        tags: ['EMOTIONAL SUPPORT']
    },
    {
        id: 'ncw',
        name: 'National Commission for Women',
        detail: '7827170170',
        description: 'WhatsApp helpline for women facing online harassment and cyber crimes',
        tags: ['WOMEN', 'WHATSAPP']
    },
    {
        id: 'childline',
        name: 'Childline India',
        detail: '1098',
        description: 'Emergency helpline for children in distress, abuse, or grooming situations',
        tags: ['CHILDREN', '24X7', 'FREE']
    },
    {
        id: 'whl',
        name: 'Women Helpline (WHL)',
        detail: '181',
        description: 'Distress helpline for women facing violence, stalking, or online harassment',
        tags: ['WOMEN', '24X7']
    },
    {
        id: 'idream',
        name: 'iDream Foundation',
        detail: 'idreamfoundation.org',
        description: 'Online safety education and cyber awareness resources for women',
        tags: ['EDUCATION', 'RESOURCES']
    }
];

export default function Helplines() {
    return (
        <div className="helplines-container">
            <div className="helplines-hero">
                <h1 className="helplines-title">Emergency Helplines &amp; Resources</h1>
                <p className="helplines-subtitle">
                    India-specific and international safety resources.
                </p>
            </div>

            <div className="helpline-grid">
                {helplines.map((item) => (
                    <div key={item.id} className="helpline-card glass-dark">
                        <h2 className="helpline-name">{item.name}</h2>
                        <div className="helpline-detail">{item.detail}</div>
                        <p className="helpline-desc">{item.description}</p>
                        <div className="helpline-tags">
                            {item.tags.map((tag, idx) => (
                                <span key={idx} className="helpline-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
