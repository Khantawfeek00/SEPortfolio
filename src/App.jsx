import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import CodingProfiles from './components/CodingProfiles';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
    const [theme, setTheme] = useState(() => {
        // Run once on mount to get initial theme
        return localStorage.getItem('portfolio-theme') || 'dark';
    });

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        // Set data-theme attribute on document root
        document.documentElement.setAttribute('data-theme', theme);
        // Save to local storage
        localStorage.setItem('portfolio-theme', theme);

        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        const animatedElements = document.querySelectorAll(
            '.fade-in, .fade-in-left, .fade-in-right, .scale-in'
        );
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [theme]);

    return (
        <div className="app-wrapper">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <main>
                <Hero />
                <About />
                <Skills />
                <Experience />
                <Projects />
                <Education />
                <Certifications />
                <CodingProfiles />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
