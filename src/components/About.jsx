import './About.css';

export default function About() {
    return (
        <section className="about section" id="about">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-subtitle">
                        Crafting robust backend solutions that power businesses at scale
                    </p>
                </div>

                <div className="about__grid">
                    <div className="about__text fade-in-left">
                        <p>
                            I'm a <strong>Senior Software Engineer</strong> at <strong>Persistent Systems</strong>,
                            working on <strong>QuickBooks Online (QBO)</strong> for <strong>Intuit</strong>. I specialize
                            in designing and building scalable microservices using <strong>Java</strong>, <strong>Spring Boot</strong>,
                            <strong> GraphQL</strong>, and <strong>REST APIs</strong>.
                        </p>
                        <p>
                            With a strong focus on <strong>clean architecture</strong> and <strong>test-driven development</strong>,
                            I deliver backend systems that are robust, maintainable, and performant. I'm experienced
                            in performing thorough change impact evaluations, writing technical documentation, and
                            leading Test Jam exercises to ensure stable, bug-free releases.
                        </p>
                        <p>
                            I enjoy collaborating with diverse, cross-functional global teams and I'm passionate about
                            mentoring and fostering inclusive, agile environments. I've also led the development of
                            proof-of-concept solutions to rapidly validate innovative ideas.
                        </p>
                    </div>

                    <div className="about__highlights fade-in-right">
                        <div className="about__highlight glass-card">
                            <div className="about__highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <div>
                                <h4>2+ Years</h4>
                                <p>Professional engineering experience in enterprise-grade applications</p>
                            </div>
                        </div>
                        <div className="about__highlight glass-card">
                            <div className="about__highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                            </div>
                            <div>
                                <h4>200+ Regions</h4>
                                <p>Features enabled globally with 100% regulatory compliance</p>
                            </div>
                        </div>
                        <div className="about__highlight glass-card">
                            <div className="about__highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <div>
                                <h4>85%+ Coverage</h4>
                                <p>Rigorous test coverage with JUnit & Mockito for CI/CD readiness</p>
                            </div>
                        </div>
                        <div className="about__highlight glass-card">
                            <div className="about__highlight-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                            </div>
                            <div>
                                <h4>AWS Certified</h4>
                                <p>Cloud Practitioner certified for scalable cloud deployments</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
