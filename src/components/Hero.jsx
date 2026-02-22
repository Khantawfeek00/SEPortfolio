import { useState, useEffect } from 'react';
import './Hero.css';

const titles = [
    'Senior Software Engineer',
    'Java Developer',
    'Backend Architect',
    'Microservices Expert',
];

export default function Hero() {
    const [titleIndex, setTitleIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const current = titles[titleIndex];
        let timeout;

        if (!isDeleting && text === current) {
            timeout = setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && text === '') {
            setIsDeleting(false);
            setTitleIndex((titleIndex + 1) % titles.length);
        } else {
            timeout = setTimeout(() => {
                setText(current.substring(0, text.length + (isDeleting ? -1 : 1)));
            }, isDeleting ? 40 : 80);
        }

        return () => clearTimeout(timeout);
    }, [text, isDeleting, titleIndex]);

    return (
        <section className="hero" id="hero">
            <div className="hero__bg">
                <div className="hero__grid bg-grid"></div>
                <div className="hero__glow hero__glow--1"></div>
                <div className="hero__glow hero__glow--2"></div>
                <div className="hero__orb hero__orb--1"></div>
                <div className="hero__orb hero__orb--2"></div>
                <div className="hero__orb hero__orb--3"></div>
            </div>

            <div className="hero__content container">
                <div className="hero__badge fade-in">
                    <span className="hero__badge-dot"></span>
                    Available for opportunities
                </div>

                <h1 className="hero__name fade-in">
                    Hi, I'm <span className="gradient-text">Tawfeek Khan</span>
                </h1>

                <div className="hero__title fade-in">
                    <span className="hero__title-text">{text}</span>
                    <span className="hero__cursor">|</span>
                </div>

                <p className="hero__description fade-in">
                    Building scalable microservices and robust backend systems with
                    <strong> Java</strong>, <strong>Spring Boot</strong>, <strong>GraphQL</strong>, and <strong>AWS</strong>.
                    Passionate about clean architecture, test-driven development, and delivering
                    high-performance solutions.
                </p>

                <div className="hero__cta fade-in">
                    <a href="#projects" className="btn-primary">
                        <span>View My Work</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                    </a>
                    <a href="#contact" className="btn-outline">
                        Contact Me
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                </div>

                <div className="hero__stats fade-in">
                    <div className="hero__stat">
                        <span className="hero__stat-value">2+</span>
                        <span className="hero__stat-label">Years Exp.</span>
                    </div>
                    <div className="hero__stat-divider"></div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">200+</span>
                        <span className="hero__stat-label">Regions</span>
                    </div>
                    <div className="hero__stat-divider"></div>
                    <div className="hero__stat">
                        <span className="hero__stat-value">100%</span>
                        <span className="hero__stat-label">Stable Releases</span>
                    </div>
                </div>
            </div>

            <div className="hero__scroll-indicator">
                <div className="hero__scroll-mouse">
                    <div className="hero__scroll-wheel"></div>
                </div>
                <span>Scroll Down</span>
            </div>
        </section>
    );
}
