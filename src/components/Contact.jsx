import { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [sending, setSending] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        // Simulate send — in production, wire up to a backend or email service
        setTimeout(() => {
            setSending(false);
            alert('Message sent! I\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section className="contact section" id="contact">
            <div className="contact__glow bg-glow" style={{ background: 'rgba(139,92,246,0.08)', top: '10%', right: '-8%' }}></div>
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Get In Touch</h2>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? Let's connect!
                    </p>
                </div>

                <div className="contact__grid">
                    {/* Contact Info */}
                    <div className="contact__info fade-in-left">
                        <h3 className="contact__info-title">Contact Information</h3>
                        <p className="contact__info-desc">
                            Feel free to reach out through any of these channels. I'm always open to
                            discussing new projects, creative ideas, or opportunities.
                        </p>

                        <div className="contact__channels">
                            <a href="mailto:khantawfeek00@gmail.com" className="contact__channel glass-card">
                                <div className="contact__channel-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </div>
                                <div>
                                    <p className="contact__channel-label">Email</p>
                                    <p className="contact__channel-value">khantawfeek00@gmail.com</p>
                                </div>
                            </a>

                            <a href="tel:+919673500285" className="contact__channel glass-card">
                                <div className="contact__channel-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                                </div>
                                <div>
                                    <p className="contact__channel-label">Phone</p>
                                    <p className="contact__channel-value">+91-9673500285</p>
                                </div>
                            </a>

                            <a href="https://linkedin.com/in/tawfeek-khan" target="_blank" rel="noopener noreferrer" className="contact__channel glass-card">
                                <div className="contact__channel-icon contact__channel-icon--blue">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </div>
                                <div>
                                    <p className="contact__channel-label">LinkedIn</p>
                                    <p className="contact__channel-value">tawfeek-khan</p>
                                </div>
                            </a>

                            <a href="https://github.com/Khantawfeek00" target="_blank" rel="noopener noreferrer" className="contact__channel glass-card">
                                <div className="contact__channel-icon">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </div>
                                <div>
                                    <p className="contact__channel-label">GitHub</p>
                                    <p className="contact__channel-value">Khantawfeek00</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form className="contact__form glass-card fade-in-right" onSubmit={handleSubmit}>
                        <div className="contact__field">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        <div className="contact__field">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell me about your project..."
                                rows={5}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-primary contact__submit" disabled={sending}>
                            <span>{sending ? 'Sending...' : 'Send Message'}</span>
                            {!sending && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
