import { useState, useEffect } from 'react';
import ResumeViewer from './ResumeViewer';
import ThemeToggle from './ThemeToggle';
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

export default function Navbar({ theme, toggleTheme }) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [resumeOpen, setResumeOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (resumeOpen) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timer);
        }
    }, [resumeOpen]);

    useEffect(() => {
        let isThrottled = false;

        const handleScroll = () => {
            if (isThrottled) return;
            isThrottled = true;

            setTimeout(() => {
                setScrolled(window.scrollY > 50);

                const sections = navLinks.map(l => l.href.replace('#', ''));
                for (let i = sections.length - 1; i >= 0; i--) {
                    const el = document.getElementById(sections[i]);
                    if (el && el.getBoundingClientRect().top <= 120) {
                        setActiveSection(sections[i]);
                        break;
                    }
                }
                isThrottled = false;
            }, 50); // Throttle scroll active-section checks to run at most every 50ms
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') setResumeOpen(false);
        };

        if (resumeOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [resumeOpen]);

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
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <button
                        className="neo-btn navbar__resume-btn"
                        onClick={() => { setMobileOpen(false); setResumeOpen(true); }}
                    >
                        <span>Resume</span>
                    </button>
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

            {resumeOpen && (
                <div className="resume-modal" onClick={() => setResumeOpen(false)}>
                    <div className="resume-modal__content" onClick={e => e.stopPropagation()}>
                        {isLoading ? (
                            <div className="global-loader-container">
                                <div className="global-spinner"></div>
                            </div>
                        ) : (
                            <>
                                <div className="resume-modal__header">
                                    <h3>Resume Preview</h3>
                                    <div className="resume-modal__actions">
                                        <a href="/Resume.pdf" download="Tawfeek_Khan_Resume.pdf" className="neo-btn navbar__download-btn" onClick={() => setResumeOpen(false)}>
                                            <span>Download</span>
                                        </a>
                                        <button className="resume-modal__close" onClick={() => setResumeOpen(false)} aria-label="Close modal">&times;</button>
                                    </div>
                                </div>
                                <div className="resume-modal__body">
                                    <ResumeViewer pdfUrl="/Resume.pdf" />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
