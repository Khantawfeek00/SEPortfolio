import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import './ThemeToggle.css';

function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button
            onClick={toggleTheme}
            className={`theme-toggle neo-btn ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}
            aria-label="Toggle Theme"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
            <div className="icon-container">
                {theme === 'light' ? (
                    <MoonIcon className="theme-icon" />
                ) : (
                    <SunIcon className="theme-icon text-yellow" />
                )}
            </div>
        </button>
    );
}

export default ThemeToggle;
