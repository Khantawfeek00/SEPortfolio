import './Education.css';

const educationData = [
    {
        degree: 'Bachelor of Engineering',
        field: 'Information Technology',
        school: 'Yashwantrao Chavan College of Engineering',
        url: 'https://ycce.edu/',
        period: 'Sept 2019 — May 2023',
        cgpa: '8.4 / 10.0',
        color: 'var(--accent-theme)',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" /></svg>
        ),
    }
];

export default function Education() {
    return (
        <section className="education section" id="education">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Education</h2>
                    <p className="section-subtitle">
                        Academic foundation that drives my engineering career
                    </p>
                </div>

                <div className="education__timeline">
                    {educationData.map((edu, idx) => (
                        <div className="education__item fade-in" key={idx} style={{ transitionDelay: `${idx * 0.15}s` }}>
                            {/* Decorative Line (Hidden on last item or short screens, handle in CSS) */}
                            <div className="education__line"></div>

                            {/* Dot / Icon */}
                            <div className="education__dot">
                                <div className="education__icon" style={{ color: edu.color }}>
                                    {edu.icon}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="education__card glass-card">
                                <div className="education__glow"></div>

                                <div className="education__card-content">
                                    <div className="education__header-top">
                                        <h3 className="education__degree">{edu.degree}</h3>
                                        <div className="education__cgpa-badge">
                                            <span>CGPA: </span><strong>{edu.cgpa}</strong>
                                        </div>
                                    </div>

                                    <p className="education__field" style={{ color: edu.color }}>{edu.field}</p>

                                    <div className="education__details">
                                        <div className="education__detail-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                            {edu.url ? (
                                                <a href={edu.url} target="_blank" rel="noopener noreferrer" className="education__school-link">
                                                    {edu.school}
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                                </a>
                                            ) : (
                                                <span>{edu.school}</span>
                                            )}
                                        </div>
                                        <div className="education__detail-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                            <span>{edu.period}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
