import { useState, useEffect } from 'react';
import './Experience.css';

// ... experiences array defined here

const experiences = [
    {
        role: 'Senior Software Engineer',
        company: 'Persistent Systems Limited, Nagpur',
        client: 'QuickBooks Online (QBO) — Client: Intuit',
        period: 'Oct 2025 — Present',
        type: 'full-time',
        color: 'var(--accent-theme)',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        ),
        highlights: [
            'Leading technical initiatives for QuickBooks Online using Java, Spring Boot, GraphQL, and REST APIs.',
            'Collaborating with the Global by Default team to architect features enabling global scaling and compliance.',
        ],
        details: 'Spearheaded the redesign of user authentication workflows, reducing latency by 30%. Implemented a robust caching strategy using Redis. Continually mentoring junior developers and conducting weekly code-review sessions to ensure high coding standards.',
    },
    {
        role: 'Software Engineer',
        company: 'Persistent Systems Limited, Nagpur',
        client: 'QuickBooks Online (QBO) — Client: Intuit',
        period: 'Sept 2023 — Sept 2025',
        type: 'full-time',
        color: '#10b981', // green theme
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
        ),
        highlights: [
            'Designed and implemented 5+ new features for QuickBooks Online to improve UX and platform functionality.',
            'Resolved high-priority (P0) issues under strict deadlines, ensuring uninterrupted business operations across cloud-based microservices.',
            'Developed 2+ microservices enhancing backend processing efficiency and system scalability.',
            'Conducted detailed impact analysis for 50+ code changes and documented implementation strategies.',
            'Maintained 85%+ code coverage using JUnit and Mockito, ensuring CI/CD readiness and production-grade quality.',
            'Leveraged GitHub Copilot to accelerate development and automate tasks, boosting team productivity by 20%.',
        ],
        details: 'Recognized for excellent performance during the QBO migration to Kubernetes. Actively contributed to the internal UI component library. Completed AWS certification to further cloud computing skills.',
    },
    {
        role: 'Software Engineer Intern',
        company: 'Persistent Systems Limited, Nagpur',
        period: 'Jan 2023 — June 2023',
        type: 'internship',
        color: 'var(--accent-purple)',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
        ),
        highlights: [
            'Completed a 6-month intensive Java development training program.',
            'Focused on Spring Boot, Spring Framework, REST APIs, MySQL, Hibernate, and backend best practices.',
            'Studied design patterns and coding standards for enterprise software development.',
        ],
        details: 'Received exemplary feedback for final presentation on microservices architecture. Participated in multiple hackathons, securing 2nd place in the internal company-wide coding challenge.',
    },
];

export default function Experience() {
    const [selectedExp, setSelectedExp] = useState(null);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        if (selectedExp) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
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
                    {experiences.map((exp, i) => (
                        <div className="experience__item fade-in" key={i} style={{ transitionDelay: `${i * 0.15}s` }}>
                            <div className="experience__dot-line">
                                <div className="experience__dot" style={{ borderColor: `${exp.color}40`, boxShadow: `0 0 15px ${exp.color}20` }}>
                                    <div className="experience__icon" style={{ color: exp.color }}>
                                        {exp.icon}
                                    </div>
                                </div>
                                {i < experiences.length - 1 && <div className="experience__line"></div>}
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

                            {/* Placeholder for an actual certificate image if needed in the future:
                            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                                <img src="..." alt="Certificate" style={{ maxWidth: '100%', borderRadius: '8px', border: `1px solid ${selectedExp.color}40` }} />
                            </div>
                            */}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
