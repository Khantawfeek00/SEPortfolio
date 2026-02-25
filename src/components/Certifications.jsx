import { useState, useEffect } from 'react';
import './Certifications.css';
import awsCertImg from '../files/aws-certificate.png';
import dsaCertImg from '../files/dsa-certificate.png';

const certifications = [
    {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        period: 'Jan 2024 — Jan 2027',
        badge: 'AWS',
        color: '#ff9900', // Official AWS Orange
        image: awsCertImg,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" /></svg>
        ),
    },
    {
        name: 'Data Structures & Algorithms Master Course',
        issuer: 'Code Help',
        period: 'Completed in 2023',
        badge: 'DSA',
        color: '#2f8d46', // GFG Green
        image: dsaCertImg,
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        ),
    },
];

export default function Certifications() {
    const [selectedCert, setSelectedCert] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedCert) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [selectedCert]);

    return (
        <section className="certs section" id="certifications">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Certifications</h2>
                    <p className="section-subtitle">
                        Professional credentials validating my expertise
                    </p>
                </div>

                <div className="certs__grid">
                    {certifications.map((cert, i) => (
                        <div
                            className="certs__card glass-card fade-in"
                            key={i}
                            style={{
                                transitionDelay: `${i * 0.15}s`,
                                '--cert-color': cert.color
                            }}
                        >
                            <div className="certs__glow" style={{ background: `radial-gradient(circle at top right, ${cert.color}25, transparent 60%)` }}></div>

                            <div className="certs__content">
                                <div className="certs__header-row">
                                    <div className="certs__icon-wrap" style={{ color: cert.color, background: `${cert.color}15`, border: `1px solid ${cert.color}30` }}>
                                        {cert.icon}
                                    </div>
                                    <div className="certs__status">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        <span>Verified</span>
                                    </div>
                                </div>

                                <div className="certs__info">
                                    <div className="certs__badge" style={{ color: cert.color }}>
                                        {cert.badge}
                                    </div>
                                    <h3 className="certs__name">{cert.name}</h3>
                                    <p className="certs__issuer">{cert.issuer}</p>
                                </div>

                                <div className="certs__footer">
                                    <span className="certs__period">{cert.period}</span>
                                    <button
                                        className="certs__action"
                                        style={{ color: cert.color, background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', outline: 'none' }}
                                        onClick={() => setSelectedCert(cert)}
                                    >
                                        View Certificate
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Certificate Modal Viewer */}
            {selectedCert && (
                <div className="certs__modal-overlay" onClick={() => setSelectedCert(null)}>
                    <button className="certs__modal-close" onClick={() => setSelectedCert(null)}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="certs__modal glass-card" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedCert.image}
                            alt={`${selectedCert.name} Certificate`}
                            className="certs__modal-image"
                        />
                        <div className="certs__modal-info">
                            <h3 style={{ color: selectedCert.color }}>{selectedCert.name}</h3>
                            <p>Issued by {selectedCert.issuer}</p>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
