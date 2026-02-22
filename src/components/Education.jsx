import './Education.css';

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

                <div className="education__single fade-in">
                    <div className="education__card glass-card">
                        <div className="card__glow"></div>
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '1.5rem', width: '100%', alignItems: 'flex-start' }}>
                            <div className="education__card-icon education__card-icon--blue">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" /></svg>
                            </div>
                            <div className="education__card-content">
                                <h3>Bachelor of Engineering</h3>
                                <p className="education__field">Information Technology</p>
                                <p className="education__school">Yashwantrao Chavan College of Engineering</p>
                                <div className="education__meta">
                                    <span className="education__period">Sept 2019 — May 2023</span>
                                    <span className="education__cgpa">CGPA: <strong>8.4 / 10.0</strong></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
