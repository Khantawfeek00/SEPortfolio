import './Projects.css';

const projects = [
    {
        title: 'Airbnb Backend Clone',
        description:
            'A production-grade backend system for an Airbnb-like platform built with clean architecture and SOLID principles, serving 100+ concurrent users.',
        techStack: ['Java', 'Spring Boot', 'REST APIs', 'MySQL', 'JPA/Hibernate', 'Spring Security', 'JWT', 'JUnit', 'Mockito', 'Swagger', 'Maven'],
        highlights: [
            'JWT authentication & role-based access control with Spring Security across 15+ endpoints',
            'Optimized ORM-based data access, reducing query response time by 40%',
            '15+ REST endpoints validated with Postman; Swagger documented with examples',
            'Global exception handling with 99.9% error coverage',
            '90% code coverage using JUnit & Mockito with CI/CD integration',
        ],
        github: 'https://github.com/Khantawfeek00/Airbnb',
        featured: true,
    },
];

export default function Projects() {
    return (
        <section className="projects section" id="projects">
            <div className="projects__glow bg-glow" style={{ background: 'rgba(6,182,212,0.1)', bottom: '10%', left: '-10%' }}></div>
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-subtitle">
                        Showcasing hands-on engineering with real-world complexity
                    </p>
                </div>

                <div className="projects__grid">
                    {projects.map((project, i) => (
                        <div
                            className={`projects__card glass-card fade-in ${project.featured ? 'projects__card--featured' : ''}`}
                            key={i}
                        >
                            <div className="projects__card-header">
                                <div className="projects__card-icon">
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                                </div>
                                <div className="projects__card-links">
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="projects__link" title="View on GitHub">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="projects__card-title">{project.title}</h3>
                            <p className="projects__card-desc">{project.description}</p>

                            <ul className="projects__highlights">
                                {project.highlights.map((h, j) => (
                                    <li key={j}>
                                        <span className="experience__bullet">▹</span>
                                        {h}
                                    </li>
                                ))}
                            </ul>

                            <div className="projects__tech">
                                {project.techStack.map(tech => (
                                    <span className="tag" key={tech}>{tech}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
