import './Experience.css';

const experiences = [
    {
        role: 'Senior Software Engineer',
        company: 'Persistent Systems Limited, Nagpur',
        client: 'QuickBooks Online (QBO) — Client: Intuit',
        period: 'Sept 2023 — Present',
        type: 'full-time',
        highlights: [
            'Designed and implemented 5+ new features for QuickBooks Online using Java, Spring Boot, GraphQL, and REST APIs to improve UX and platform functionality.',
            'Resolved high-priority (P0) issues under strict deadlines, ensuring uninterrupted business operations across cloud-based microservices.',
            'Collaborated with the Global by Default team to enable features in 200+ regions with 100% regulatory compliance and zero post-deployment incidents.',
            'Developed 2+ microservices enhancing backend processing efficiency and system scalability.',
            'Conducted detailed impact analysis for 50+ code changes and documented implementation strategies.',
            'Maintained 85%+ code coverage using JUnit and Mockito, ensuring CI/CD readiness and production-grade quality.',
            'Leveraged GitHub Copilot to accelerate development and automate tasks, boosting team productivity by 20%.',
        ],
    },
    {
        role: 'Software Engineer Intern',
        company: 'Persistent Systems Limited, Nagpur',
        period: 'Jan 2023 — July 2023',
        type: 'internship',
        highlights: [
            'Completed a 6-month intensive Java development training program.',
            'Focused on Spring Boot, Spring Framework, REST APIs, MySQL, Hibernate, and backend best practices.',
            'Studied design patterns and coding standards for enterprise software development.',
        ],
    },
];

export default function Experience() {
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
                                <div className="experience__dot"></div>
                                {i < experiences.length - 1 && <div className="experience__line"></div>}
                            </div>
                            <div className="experience__card glass-card">
                                <div className="card__glow"></div>
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
                                <ul className="experience__highlights" style={{ position: 'relative', zIndex: 1 }}>
                                    {exp.highlights.map((h, j) => (
                                        <li key={j}>
                                            <span className="experience__bullet">▹</span>
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
