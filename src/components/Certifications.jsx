import './Certifications.css';

const certifications = [
    {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        period: 'Jan 2024 — Jan 2027',
        badge: 'AWS',
        color: '#f59e0b',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" /></svg>
        ),
    },
    {
        name: 'Data Structures & Algorithms Master Course',
        issuer: 'Certification Course',
        period: '',
        badge: 'DSA',
        color: '#8b5cf6',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
        ),
    },
];

export default function Certifications() {
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
                        <div className="certs__card glass-card fade-in" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <div className="certs__card-top">
                                <div className="certs__badge" style={{ background: `${cert.color}15`, color: cert.color, borderColor: `${cert.color}33` }}>
                                    {cert.badge}
                                </div>
                                <div className="certs__icon" style={{ color: cert.color }}>
                                    {cert.icon}
                                </div>
                            </div>
                            <h3 className="certs__name">{cert.name}</h3>
                            <p className="certs__issuer">{cert.issuer}</p>
                            {cert.period && <p className="certs__period">{cert.period}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
