import { useState, useEffect } from 'react';
import './Navbar.css';

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Profiles', href: '#coding-profiles' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navLinks.map(l => l.href.replace('#', ''));
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.getBoundingClientRect().top <= 120) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = () => {
        setMobileOpen(false);
    };

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="navbar__container container">
                <a href="#hero" className="navbar__logo">
                    <span className="navbar__logo-bracket">&lt;</span>
                    TK
                    <span className="navbar__logo-bracket"> /&gt;</span>
                </a>

                <div className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                            onClick={handleLinkClick}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/Tawfeek_Khan_Resume.pdf"
                        className="btn-primary navbar__resume-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>Resume</span>
                    </a>
                </div>

                <button
                    className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    );
}
