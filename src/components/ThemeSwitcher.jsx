import { useState, useEffect, useRef } from 'react';
import { themes, applyTheme, getActiveThemeKey } from '../theme';
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTheme, setActiveTheme] = useState('cyan');
    const switcherRef = useRef(null);

    useEffect(() => {
        const savedTheme = getActiveThemeKey();
        setActiveTheme(savedTheme);
        applyTheme(savedTheme);

        const handleClickOutside = (event) => {
            if (switcherRef.current && !switcherRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleThemeChange = (themeKey) => {
        setActiveTheme(themeKey);
        applyTheme(themeKey);
    };

    return (
        <div className={`theme-switcher ${isOpen ? 'open' : ''}`} ref={switcherRef}>
            <button 
                className="theme-switcher__toggle glass-card"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle theme picker"
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
            </button>
            
            <div className="theme-switcher__panel glass-card">
                <h4 className="theme-switcher__title">Color Theme</h4>
                <div className="theme-switcher__grid">
                    {Object.values(themes).map((theme) => (
                        <button
                            key={theme.id}
                            className={`theme-switcher__color ${activeTheme === theme.id ? 'active' : ''}`}
                            style={{ background: theme.accent1 }}
                            title={theme.name}
                            onClick={() => handleThemeChange(theme.id)}
                            aria-label={`Select ${theme.name} theme`}
                        >
                            {activeTheme === theme.id && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
