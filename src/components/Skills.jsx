import './Skills.css';
import TagIcon from '../utils/TagIcon';
import skillsData from '../data/skillsData.json';

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
                    {skillsData.map((cat, i) => (
                        <div
                            className="skills__card neo-card fade-in"
                            key={cat.title}
                            style={{ transitionDelay: `${i * 0.1}s` }}
                        >
                            <div className="skills__card-header">
                                <span className="skills__card-icon" style={{ background: `${cat.color}15` }}>
                                    {cat.icon}
                                </span>
                                <h3 className="skills__card-title">{cat.title}</h3>
                            </div>

                            <div className="skills__items-grid">
                                {cat.skills.map(skill => (
                                    <div className="skills__item" key={skill}>
                                        <div className="skills__item-icon">
                                            <TagIcon name={skill} size={42} />
                                        </div>
                                        <span className="skills__item-name">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
