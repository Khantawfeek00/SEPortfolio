import { useState, useEffect } from 'react';
import './Experience.css';

// Import our new external configuration file
import experiencesData from '../data/experienceData.json';

// Dynamically import all images in the Certificates folder and its subfolders
const certImages = import.meta.glob('../files/Certificates/**/*.{png,jpg,jpeg,svg}', { eager: true });

// Group images by their parent folder name
const groupedCertificates = {};
for (const path in certImages) {
    // path looks like: '../files/Certificates/software-engineer/Martian Tawfeek Certificate_page-0001.jpg'
    const parts = path.split('/');
    const folderName = parts[parts.length - 2]; // e.g., 'software-engineer'

    if (!groupedCertificates[folderName]) {
        groupedCertificates[folderName] = [];
    }

    // The default export for matched files holds the URL string
    groupedCertificates[folderName].push(certImages[path].default);
}

// ... experiences array defined here

// Helper function to map string icon identifiers from JSON to an actual SVG
const getIcon = (iconName) => {
    switch (iconName) {
        case 'monitor':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            );
        case 'award':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
            );
        case 'code':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
            );
        case 'compass':
            return (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
            );
        default:
            return null;
    }
};

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState(null);
    const [currentCertIndex, setCurrentCertIndex] = useState(0);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedExp) {
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
    }, [selectedExp]);

    return (
        <section className="experience section" id="experience">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Experience</h2>
                    <p className="section-subtitle">
                        My professional journey building enterprise software
                    </p>
                </div>

                <div className="experience__timeline">
                    {experiencesData.map((exp, i) => (
                        <div className="experience__item fade-in" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                            <div className="experience__dot-line">
                                <div className="experience__dot" style={{ borderColor: `${exp.color}40`, boxShadow: `0 0 15px ${exp.color}20` }}>
                                    <div className="experience__icon" style={{ color: exp.color }}>
                                        {getIcon(exp.iconName)}
                                    </div>
                                </div>
                                {i < experiencesData.length - 1 && <div className="experience__line"></div>}
                            </div>
                            <div className="experience__card glass-card">
                                <div className="experience__glow"></div>
                                <div className="experience__card-header" style={{ position: 'relative', zIndex: 1 }}>
                                    <div>
                                        <h3 className="experience__role">{exp.role}</h3>
                                        <p className="experience__company">{exp.company}</p>
                                        {exp.client && (
                                            <p className="experience__client">{exp.client}</p>
                                        )}
                                    </div>
                                    <div className="experience__meta">
                                        <span className="experience__period">{exp.period}</span>
                                        <span className={`experience__type experience__type--${exp.type}`}>
                                            {exp.type === 'full-time' ? 'Full-time' : 'Internship'}
                                        </span>
                                    </div>
                                </div>
                                <ul className="experience__highlights" style={{ position: 'relative', zIndex: 1, marginBottom: '1.5rem' }}>
                                    {exp.highlights.map((h, j) => (
                                        <li key={j}>
                                            <span className="experience__bullet">▹</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                                <div className="experience__card-footer" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                    <button
                                        className="experience__action"
                                        style={{ color: exp.color, background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', outline: 'none' }}
                                        onClick={() => setSelectedExp(exp)}
                                    >
                                        View Details
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Detail Modal */}
            {selectedExp && (
                <div className="experience__modal-overlay" onClick={() => setSelectedExp(null)}>
                    <button className="experience__modal-close" onClick={() => setSelectedExp(null)}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="experience__modal glass-card" onClick={(e) => e.stopPropagation()}>
                        <div className="experience__modal-header" style={{ borderBottom: `1px solid ${selectedExp.color}30`, paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                            <div className="experience__icon" style={{ color: selectedExp.color, display: 'inline-block', marginBottom: '0.5rem' }}>
                                {selectedExp.icon}
                            </div>
                            <h3 className="experience__role" style={{ color: selectedExp.color, fontSize: '1.75rem', marginBottom: '0.25rem' }}>{selectedExp.role}</h3>
                            <p className="experience__company">{selectedExp.company}</p>
                            <span className="experience__period" style={{ marginTop: '0.5rem', display: 'block' }}>{selectedExp.period}</span>
                        </div>
                        <div className="experience__modal-body">
                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Key Highlights</h4>
                            <ul className="experience__highlights" style={{ marginBottom: '1.5rem' }}>
                                {selectedExp.highlights.map((h, j) => (
                                    <li key={j}>
                                        <span className="experience__bullet" style={{ color: selectedExp.color }}>▹</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>More Details</h4>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                                {selectedExp.details}
                            </p>

                            {/* Render the certificate image if available */}
                            {groupedCertificates[selectedExp.id] && groupedCertificates[selectedExp.id].length > 0 && (
                                <div style={{ marginTop: '2.5rem', textAlign: 'center', position: 'relative' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem', textAlign: 'left' }}>
                                        {groupedCertificates[selectedExp.id].length > 1 ? 'Certificates' : 'Certificate'}
                                    </h4>

                                    <div className="certificate-carousel" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                                        {/* Left Arrow */}
                                        {groupedCertificates[selectedExp.id].length > 1 && (
                                            <button
                                                className="carousel-nav prev"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentCertIndex((prev) => (prev === 0 ? groupedCertificates[selectedExp.id].length - 1 : prev - 1));
                                                }}
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                            </button>
                                        )}

                                        <img
                                            src={groupedCertificates[selectedExp.id][currentCertIndex]}
                                            alt={`${selectedExp.role} Certificate ${currentCertIndex + 1}`}
                                            className="certificate-image"
                                            draggable="false"
                                            onContextMenu={(e) => e.preventDefault()}
                                            style={{
                                                maxWidth: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '8px',
                                                border: `1px solid ${selectedExp.color}40`,
                                                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                                                transition: 'opacity 0.3s ease-in-out',
                                                userSelect: 'none',
                                                WebkitUserSelect: 'none'
                                            }}
                                        />

                                        {/* Right Arrow */}
                                        {groupedCertificates[selectedExp.id].length > 1 && (
                                            <button
                                                className="carousel-nav next"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentCertIndex((prev) => (prev === groupedCertificates[selectedExp.id].length - 1 ? 0 : prev + 1));
                                                }}
                                            >
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                            </button>
                                        )}
                                    </div>

                                    {/* Carousel Dots */}
                                    {groupedCertificates[selectedExp.id].length > 1 && (
                                        <div className="carousel-dots" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1rem' }}>
                                            {groupedCertificates[selectedExp.id].map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentCertIndex(idx);
                                                    }}
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        border: 'none',
                                                        backgroundColor: idx === currentCertIndex ? selectedExp.color : 'rgba(255, 255, 255, 0.2)',
                                                        cursor: 'pointer',
                                                        transition: 'background-color 0.3s ease',
                                                        padding: 0
                                                    }}
                                                    aria-label={`Go to certificate ${idx + 1}`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
