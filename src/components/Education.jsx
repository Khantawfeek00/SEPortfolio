import './Education.css';

export default function Education() {
    return (
        <section className="education section" id="education">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Education & Certifications</h2>
                    <p className="section-subtitle">
                        Academic foundation and professional credentials
                    </p>
                </div>

                <div className="education__grid">
                    {/* Education */}
                    <div className="education__card glass-card fade-in">
                        <div className="education__card-icon education__card-icon--blue">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" /></svg>
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

                    {/* Certifications */}
                    <div className="education__card glass-card fade-in" style={{ transitionDelay: '0.1s' }}>
                        <div className="education__card-icon education__card-icon--orange">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></svg>
                        </div>
                        <div className="education__card-content">
                            <h3>Certifications</h3>
                            <div className="education__certs">
                                <div className="education__cert">
                                    <span className="education__cert-badge">AWS</span>
                                    <div>
                                        <p className="education__cert-name">AWS Certified Cloud Practitioner</p>
                                        <p className="education__cert-period">Jan 2024 — Jan 2027</p>
                                    </div>
                                </div>
                                <div className="education__cert">
                                    <span className="education__cert-badge education__cert-badge--purple">DSA</span>
                                    <div>
                                        <p className="education__cert-name">Data Structures & Algorithms Master Course</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Coding Profiles */}
                    <div className="education__card glass-card fade-in" style={{ transitionDelay: '0.2s' }}>
                        <div className="education__card-icon education__card-icon--green">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                        </div>
                        <div className="education__card-content">
                            <h3>Coding Profiles</h3>
                            <div className="education__profiles">
                                <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="education__profile">
                                    <span className="education__profile-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>LC</span>
                                    LeetCode
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </a>
                                <a href="https://www.geeksforgeeks.org/" target="_blank" rel="noopener noreferrer" className="education__profile">
                                    <span className="education__profile-icon" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>GFG</span>
                                    GeeksforGeeks
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </a>
                                <a href="https://www.hackerrank.com/" target="_blank" rel="noopener noreferrer" className="education__profile">
                                    <span className="education__profile-icon" style={{ background: 'rgba(59,130,246,0.1)', color: '#3b82f6' }}>HR</span>
                                    HackerRank
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
