// ============================================
// THEME CONFIGURATION
// ============================================
// Change `activeTheme` below to switch the entire color palette.
// Available: 'cyan', 'purple', 'emerald', 'sunset', 'rose'

const activeTheme = 'cyan';

// ---- Theme Presets ----
const themes = {
    cyan: {
        name: 'Cyan Blue',
        accent1: '#06b6d4',
        accent2: '#3b82f6',
        accent3: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
        gradientSecondary: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        gradientAccent: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
        glowRgb: '6, 182, 212',
    },
    purple: {
        name: 'Royal Purple',
        accent1: '#a855f7',
        accent2: '#6366f1',
        accent3: '#ec4899',
        gradient: 'linear-gradient(135deg, #a855f7, #6366f1)',
        gradientSecondary: 'linear-gradient(135deg, #6366f1, #ec4899)',
        gradientAccent: 'linear-gradient(135deg, #a855f7, #ec4899)',
        glowRgb: '168, 85, 247',
    },
    emerald: {
        name: 'Emerald Green',
        accent1: '#10b981',
        accent2: '#059669',
        accent3: '#06b6d4',
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
        gradientSecondary: 'linear-gradient(135deg, #059669, #06b6d4)',
        gradientAccent: 'linear-gradient(135deg, #10b981, #06b6d4)',
        glowRgb: '16, 185, 129',
    },
    sunset: {
        name: 'Sunset Orange',
        accent1: '#f97316',
        accent2: '#ef4444',
        accent3: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f97316, #ef4444)',
        gradientSecondary: 'linear-gradient(135deg, #ef4444, #f59e0b)',
        gradientAccent: 'linear-gradient(135deg, #f97316, #f59e0b)',
        glowRgb: '249, 115, 22',
    },
    rose: {
        name: 'Rose Pink',
        accent1: '#f43f5e',
        accent2: '#e11d48',
        accent3: '#a855f7',
        gradient: 'linear-gradient(135deg, #f43f5e, #e11d48)',
        gradientSecondary: 'linear-gradient(135deg, #e11d48, #a855f7)',
        gradientAccent: 'linear-gradient(135deg, #f43f5e, #a855f7)',
        glowRgb: '244, 63, 94',
    },
};

// ---- Apply Theme ----
export function applyTheme() {
    const theme = themes[activeTheme] || themes.cyan;
    const root = document.documentElement;

    root.style.setProperty('--accent-theme', theme.accent1);
    root.style.setProperty('--accent-theme-2', theme.accent2);
    root.style.setProperty('--accent-theme-3', theme.accent3);
    root.style.setProperty('--gradient-primary', theme.gradient);
    root.style.setProperty('--gradient-secondary', theme.gradientSecondary);
    root.style.setProperty('--gradient-accent', theme.gradientAccent);
    root.style.setProperty('--glow-rgb', theme.glowRgb);
}

export function getTheme() {
    return themes[activeTheme] || themes.cyan;
}

export default themes;
