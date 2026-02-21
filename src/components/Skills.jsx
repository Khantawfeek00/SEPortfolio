import './Skills.css';

const skillCategories = [
    {
        title: 'Backend Development',
        icon: '⚙️',
        color: '#06b6d4',
        skills: ['Java', 'Java EE', 'Spring Boot', 'GraphQL', 'REST APIs', 'Microservices'],
    },
    {
        title: 'Database',
        icon: '🗄️',
        color: '#8b5cf6',
        skills: ['SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Hibernate', 'JPA'],
    },
    {
        title: 'Cloud & DevOps',
        icon: '☁️',
        color: '#f59e0b',
        skills: ['AWS', 'Docker', 'CI/CD', 'Maven'],
    },
    {
        title: 'Testing & QA',
        icon: '🧪',
        color: '#10b981',
        skills: ['JUnit', 'Mockito', 'Postman', 'TDD', 'Test Jams'],
    },
    {
        title: 'Version Control',
        icon: '🔀',
        color: '#ec4899',
        skills: ['Git', 'GitHub', 'Jira'],
    },
    {
        title: 'AI & Methodologies',
        icon: '🤖',
        color: '#3b82f6',
        skills: ['GitHub Copilot', 'Cursor', 'Agile Scrum', 'Kanban', 'SDLC'],
    },
];

export default function Skills() {
    return (
        <section className="skills section" id="skills">
            <div className="skills__glow bg-glow" style={{ background: 'rgba(139,92,246,0.08)', top: '20%', right: '-10%' }}></div>
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Tech Stack</h2>
                    <p className="section-subtitle">
                        Technologies and tools I work with to build enterprise-grade solutions
                    </p>
                </div>

                <div className="skills__grid">
                    {skillCategories.map((cat, i) => (
                        <div
                            className="skills__card glass-card fade-in"
                            key={cat.title}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className="skills__card-header">
                                <span className="skills__card-icon" style={{ background: `${cat.color}15` }}>
                                    {cat.icon}
                                </span>
                                <h3 className="skills__card-title">{cat.title}</h3>
                            </div>
                            <div className="skills__tags">
                                {cat.skills.map(skill => (
                                    <span
                                        className="skills__tag"
                                        key={skill}
                                        style={{
                                            borderColor: `${cat.color}33`,
                                            color: cat.color,
                                            background: `${cat.color}0a`,
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
