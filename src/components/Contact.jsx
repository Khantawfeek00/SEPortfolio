import { useState, useRef, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

// ──────────────────────────────────────────────
// EmailJS Configuration
// Sign up at https://www.emailjs.com and fill these in:
const EMAILJS_SERVICE_ID = 'service_69zbrqs';
const EMAILJS_TEMPLATE_ID = 'template_3erh59j';
const EMAILJS_PUBLIC_KEY = 'PDgD7l4QXcPOwY1Qv';
// ──────────────────────────────────────────────

export default function Contact() {
    const formRef = useRef(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [honeypot, setHoneypot] = useState('');
    const [sending, setSending] = useState(false);
    const [lastSentAt, setLastSentAt] = useState(0);
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    // Math CAPTCHA
    const [captcha, setCaptcha] = useState({ a: 0, b: 0 });
    const [captchaInput, setCaptchaInput] = useState('');

    // Timing — track when the form was first interacted with
    const [formLoadedAt] = useState(Date.now());

    const generateCaptcha = useCallback(() => {
        setCaptcha({
            a: Math.floor(Math.random() * 10) + 1,
            b: Math.floor(Math.random() * 10) + 1
        });
        setCaptchaInput('');
    }, []);

    useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const showToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: '', message: '' }), 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🛡️ Anti-Spam: Honeypot check
        if (honeypot) {
            showToast('success', 'Message sent! I\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
            return;
        }

        // 🛡️ Anti-Spam: Math CAPTCHA check
        if (parseInt(captchaInput, 10) !== captcha.a + captcha.b) {
            showToast('error', 'Incorrect answer. Please solve the math question.');
            generateCaptcha();
            return;
        }

        // 🛡️ Anti-Spam: Rate limiting (60s cooldown)
        const now = Date.now();
        const cooldown = 60000;
        if (now - lastSentAt < cooldown) {
            const remaining = Math.ceil((cooldown - (now - lastSentAt)) / 1000);
            showToast('error', `Please wait ${remaining}s before sending another message.`);
            return;
        }

        setSending(true);

        try {
            await emailjs.sendForm(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formRef.current,
                EMAILJS_PUBLIC_KEY
            );
            setLastSentAt(Date.now());
            showToast('success', 'Message sent! I\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
            generateCaptcha();
        } catch (error) {
            console.error('EmailJS error:', error);
            // Show more descriptive error if possible
            const errorMsg = error?.text || error?.message || 'Check your Template ID or Service ID.';
            showToast('error', `Failed: ${errorMsg}`);
        } finally {
            setSending(false);
        }
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
                    <form className="contact__form glass-card fade-in-right" ref={formRef} onSubmit={handleSubmit}>
                        {/* Honeypot — invisible to humans, bots fill this */}
                        <input
                            type="text"
                            name="hp_field"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            style={{ position: 'absolute', opacity: 0, height: 0, width: 0, zIndex: -1 }}
                            tabIndex={-1}
                            autoComplete="new-password"
                        />
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
                        <div className="contact__captcha">
                            <label htmlFor="captcha">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                What is {captcha.a} + {captcha.b}?
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                id="captcha"
                                name="captcha_quiz"
                                value={captchaInput}
                                onChange={(e) => setCaptchaInput(e.target.value.replace(/\D/g, ''))}
                                placeholder="?"
                                required
                                autoComplete="off"
                            />
                        </div>
                        <button type="submit" className="btn-primary contact__submit" disabled={sending}>
                            <span>{sending ? 'Sending...' : 'Send Message'}</span>
                            {!sending && (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: 'relative', zIndex: 1 }}><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                            )}
                            {sending && (
                                <span className="contact__spinner"></span>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Notification */}
            {toast.show && (
                <div className={`contact__toast contact__toast--${toast.type}`}>
                    <div className="contact__toast-icon">
                        {toast.type === 'success' ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                        )}
                    </div>
                    <span>{toast.message}</span>
                </div>
            )}
        </section>
    );
}
