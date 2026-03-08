import { useEffect, useState, useCallback } from 'react';
import './HackerRankModal.css';
import historyData from '../data/hackerrank_history.json';

const USERNAME = 'khantawfeek00';



function getBadgeColor(stars) {
    if (stars === 5) return '#fbbf24'; // gold
    if (stars === 4) return '#94a3b8'; // silver
    if (stars >= 1) return '#cd7f32'; // bronze
    return '#475569';
}

function getBadgeIcon(name) {
    const n = name.toLowerCase();
    if (n.includes('java')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <path d="M18 10c0-3.3-3.6-6-8-6S2 6.7 2 10s3.6 6 8 6" />
                <path d="M18 10c0-2-3-3-6-3" />
                <path d="M12 21c-4.4 0-8-1.7-8-3.8" />
                <path d="M22 17.5c0-1.4-1.8-2.5-4-2.5-1.5 0-3 .7-3.7 1.8" />
                <path d="M16 19.3c1.2.7 2.8 1.2 4.2.7" />
                <path d="M9 2v4" />
                <path d="M13 2v4" />
                <path d="M5 2v4" />
            </svg>
        );
    }
    if (n.includes('python')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <path d="M12 2C8.69 2 6 4.69 6 8v3h6v4H6v1c0 3.31 2.69 6 6 6s6-2.69 6-6v-3H12v-4h6V8c0-3.31-2.69-6-6-6z" />
                <circle cx="9" cy="5" r="1" fill="currentColor" />
                <circle cx="15" cy="19" r="1" fill="currentColor" />
            </svg>
        );
    }
    if (n.includes('c++') || n.includes('cpp') || n.includes('c ')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <path d="M18 9v6" />
                <path d="M15 12h6" />
                <path d="M10 9v6" />
                <path d="M7 12h6" />
                <path d="M5.5 16A4.5 4.5 0 0 1 1 12a4.5 4.5 0 0 1 4.5-4.5" />
            </svg>
        );
    }
    if (n.includes('sql') || n.includes('database')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
        );
    }
    if (n.includes('problem solving') || n.includes('algorithm')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
                <path d="M8.5 14l3.5-3.5 3.5 3.5" />
            </svg>
        );
    }
    if (n.includes('30 days') || n.includes('days of code')) {
        return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="M9 16l2 2 4-4" />
            </svg>
        );
    }

    // Default shield
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
    );
}

const SKILLS = [
    { label: 'Algorithms', val: 617, color: '#3b82f6' },
    { label: 'Tutorials', val: 285, color: '#ec4899' },
    { label: 'SQL', val: 275, color: '#10b981' },
    { label: 'Java', val: 274, color: '#f59e0b' },
    { label: 'Others', val: 433, color: '#8b5cf6' }
];



// ---- Donut SVG ----
function SkillsDonut() {
    const total = SKILLS.reduce((acc, s) => acc + s.val, 0); // ~1884

    const r = 52, cx = 60, cy = 60, c = 2 * Math.PI * r;
    let currentOffset = 0;

    return (
        <>
            <div className="hr__donut-wrap">
                <svg viewBox="0 0 120 120" className="hr__donut-svg">
                    <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                    {SKILLS.map((s, i) => {
                        const pct = (s.val / total) * c;
                        const offset = currentOffset;
                        currentOffset += pct;
                        return (
                            <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth="8"
                                strokeDasharray={`${Math.max(0, pct - 2)} ${c}`} strokeDashoffset={-offset}
                                strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
                        );
                    })}
                </svg>
                <div className="hr__donut-center">
                    <span className="hr__donut-total">1.8k</span>
                    <span className="hr__donut-label">Points</span>
                </div>
            </div>
            <div className="hr__diff-list">
                {SKILLS.map(s => (
                    <div className="hr__diff-item" key={s.label}>
                        <span className="hr__diff-dot" style={{ background: s.color }}></span>
                        <span className="hr__diff-label">{s.label}</span>
                        <span className="hr__diff-count" style={{ color: s.color }}>{s.val}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

// ---- Heatmap ----
function SubmissionHeatmap({ historyMap }) {
    const [cells, setCells] = useState([]);
    const [totalSubs, setTotalSubs] = useState(0);

    useEffect(() => {
        if (!historyMap) return;
        try {
            const total = Object.values(historyMap).reduce((sum, n) => sum + n, 0);
            setTotalSubs(total);

            // Determine peak year by finding max date
            const dates = Object.keys(historyMap).sort();
            let latestDateStr = dates[dates.length - 1];
            if (!latestDateStr) latestDateStr = new Date().toISOString().split('T')[0];

            const maxDate = new Date(latestDateStr);
            const oneYearAgo = new Date(maxDate);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const result = [];
            const d = new Date(oneYearAgo);
            d.setDate(d.getDate() - d.getDay()); // align Sunday

            while (d <= maxDate) {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const count = historyMap[key] || 0;
                result.push({ date: new Date(d), count });
                d.setDate(d.getDate() + 1);
            }
            setCells(result);
        } catch { /* ignore */ }
    }, [historyMap]);

    if (cells.length === 0) return null;

    const weeks = [];
    let currentWeek = [];
    cells.forEach((cell, i) => {
        currentWeek.push(cell);
        if (currentWeek.length === 7 || i === cells.length - 1) {
            weeks.push(currentWeek);
            currentWeek = [];
        }
    });

    return (
        <div className="hr__heatmap-section">
            <div className="hr__heatmap-header">
                <span><strong>{totalSubs}</strong> submissions recorded all-time</span>
            </div>
            <div className="hr__heatmap-scroll">
                <div className="hr__heatmap-grid">
                    {weeks.map((week, wi) => (
                        <div key={wi} className="hr__heatmap-col">
                            {week.map((cell, ci) => {
                                let level = 0;
                                if (cell.count >= 1) level = 1;
                                if (cell.count >= 3) level = 2;
                                if (cell.count >= 5) level = 3;
                                if (cell.count >= 8) level = 4;
                                return (
                                    <div
                                        key={ci}
                                        className={`hr__heatmap-cell hr__heatmap-cell--${level}`}
                                        title={`${cell.date.toLocaleDateString()}: ${cell.count} submissions`}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function HackerRankModal({ onClose }) {
    const handleEsc = useCallback((e) => { if (e.key === 'Escape') onClose(); }, [onClose]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeBadgeIndex, setActiveBadgeIndex] = useState(0);
    const [badges, setBadges] = useState([]);
    const [recentAC, setRecentAC] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        // HackerRank blocks direct browser fetches via CORS, so we must route through a secure proxy
        const badgesReq = fetch(`https://corsproxy.io/?https://www.hackerrank.com/rest/hackers/${USERNAME}/badges`)
            .then(r => {
                if (!r.ok) throw new Error("CORS Proxy Network ERror");
                return r.json();
            })
            .then(data => {
                if (data && data.models) {
                    const earnedBadges = data.models
                        .filter(b => b.stars > 0)
                        .map(b => ({
                            name: b.badge_name,
                            stars: b.stars
                        }));
                    setBadges(earnedBadges);
                }
            })
            .catch(err => {
                console.error("Error fetching HackerRank badges:", err);
                setBadges([
                    { name: 'Problem Solving', stars: 5 },
                    { name: 'Java', stars: 5 },
                    { name: 'C++', stars: 2 },
                    { name: 'Python', stars: 2 },
                    { name: '30 Days of Code', stars: 2 },
                    { name: 'SQL', stars: 2 },
                ]);
            });

        // Fetch Recent Challenges
        const recentReq = fetch(`https://corsproxy.io/?https://www.hackerrank.com/rest/hackers/${USERNAME}/recent_challenges?limit=20`)
            .then(r => {
                if (!r.ok) throw new Error("CORS Proxy Network ERror for Recent Challenges");
                return r.json();
            })
            .then(data => {
                if (data && data.models) {
                    const recentList = data.models.map(ch => ({
                        name: ch.name,
                        slug: ch.ch_slug,
                        time: ch.created_at
                    }));
                    setRecentAC(recentList);
                }
            })
            .catch(err => {
                console.error("Error fetching HackerRank recent challenges:", err);
                setRecentAC([
                    { name: 'Merge Sort: Counting Inversions', slug: 'ctci-merge-sort', time: '2025-04-05T09:36:42.000Z' },
                    { name: 'Arrays Introduction', slug: 'arrays-introduction', time: '2023-02-26T18:27:52.000Z' },
                    { name: 'Functions', slug: 'c-tutorial-functions', time: '2023-02-26T18:24:13.000Z' }
                ]);
            });

        Promise.all([badgesReq, recentReq]).finally(() => {
            // Artificial delay to ensure loader is visible for testing
            setTimeout(() => setIsLoading(false), 800);
        });
    }, []);

    // Carousel Timer
    useEffect(() => {
        if (badges.length <= 1) return;
        const timer = setInterval(() => {
            setActiveBadgeIndex(prev => (prev + 1) % badges.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [badges]);

    useEffect(() => {
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [handleEsc]);

    function renderStars(count) {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < count ? "#f59e0b" : "transparent"} stroke={i < count ? "#f59e0b" : "rgba(255,255,255,0.2)"} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            );
        }
        return <div className="hr__stars">{stars}</div>;
    }

    return (
        <div className="hr__overlay" onClick={onClose}>
            <div className={`hr__modal ${isLoading ? 'hr__modal-loading-state' : ''}`} onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className="hr__close" onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Header */}
                <div className="hr__header">
                    <div className="hr__avatar">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                            <path d="M11.999 0C10.626 0 2.195 4.818 1.514 6c-.69 1.195-.69 10.81 0 12 .682 1.183 9.112 6 10.485 6 1.374 0 9.804-4.817 10.485-6 .69-1.19.69-10.805 0-12C21.803 4.818 13.373 0 11.999 0zm3.226 16.063a.432.432 0 0 1-.209.063.489.489 0 0 1-.238-.063l-2.778-1.585-2.779 1.585a.49.49 0 0 1-.238.063.432.432 0 0 1-.209-.063.403.403 0 0 1-.192-.354V12.39H7.3a.5.5 0 0 1-.5-.5v-.778a.5.5 0 0 1 .5-.5h2.282V8.119a.403.403 0 0 1 .192-.354c.127-.072.319-.072.447 0L13 9.35l2.779-1.585c.128-.072.32-.072.447 0a.403.403 0 0 1 .192.354v3.493h2.282a.5.5 0 0 1 .5.5v.778a.5.5 0 0 1-.5.5h-2.282v3.319a.403.403 0 0 1-.193.354z" />
                        </svg>
                    </div>
                    <div className="hr__header-info">
                        <h2 className="hr__name">Tawfeek Khan</h2>
                        <p className="hr__username">@{USERNAME}</p>
                    </div>
                    <a href={`https://www.hackerrank.com/profile/${USERNAME}`} target="_blank" rel="noopener noreferrer" className="hr__visit-btn">
                        View Full Profile
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>

                {isLoading ? (
                    <div className="global-loader-container">
                        <div className="global-spinner"></div>
                    </div>
                ) : (
                    <>

                        <div className="hr__body">
                            {/* Top Stats Row */}
                            <div className="hr__top-row">
                                <div className="hr__top-stat">
                                    <span className="hr__top-value" style={{ color: '#3b82f6' }}>1,884</span>
                                    <span className="hr__top-label">Total Points</span>
                                </div>
                                <div className="hr__top-stat">
                                    <span className="hr__top-value">138</span>
                                    <span className="hr__top-label">Solved</span>
                                </div>
                                <div className="hr__top-stat">
                                    <span className="hr__top-value">{badges.length}</span>
                                    <span className="hr__top-label">Badges</span>
                                </div>
                                <div className="hr__top-stat">
                                    <span className="hr__top-value">5★</span>
                                    <span className="hr__top-label">Top Rank</span>
                                </div>
                            </div>
                            {/* Chart + Badges Layout */}
                            <div className="hr__main-row">
                                <div className="hr__donut-box">
                                    <SkillsDonut />
                                </div>

                                {/* Skill Badges Area */}
                                <div className="hr__badges-container">
                                    <div className="hr__carousel">
                                        {badges.map((badge, idx) => {
                                            const badgeColor = getBadgeColor(badge.stars);
                                            return (
                                                <div key={idx} className={`hr__carousel-slide ${idx === activeBadgeIndex ? 'active' : ''}`}>
                                                    <div className={`hr__badge-card ${badge.stars === 5 ? 'hr__badge-gold' : ''}`}>
                                                        <div className="hr__badge-icon-wrap" style={{ color: badgeColor, background: `${badgeColor}15` }}>
                                                            {getBadgeIcon(badge.name)}
                                                        </div>
                                                        <div className="hr__badge-info">
                                                            <span className="hr__badge-name">{badge.name}</span>
                                                            {renderStars(badge.stars)}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="hr__carousel-dots">
                                        {badges.map((_, idx) => (
                                            <div key={idx} className={`hr__carousel-dot ${idx === activeBadgeIndex ? 'active' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Heatmap */}
                            <SubmissionHeatmap historyMap={historyData} />

                            {/* Recent AC */}
                            <div className="hr__recent">
                                <h4 className="hr__section-title">Recent Accepted</h4>
                                <div
                                    className="hr__recent-list"
                                    tabIndex={0}
                                    aria-label="Recent Accepted List"
                                    onWheel={(e) => {
                                        const list = e.currentTarget;
                                        const modal = list.closest('.hr__body');
                                        if (!modal) return;

                                        const isAtTop = list.scrollTop === 0;
                                        const isAtBottom = Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 1;

                                        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                                            modal.scrollTop += e.deltaY;
                                        }
                                    }}
                                >
                                    {recentAC.map((sub, idx) => (
                                        <a key={idx} href={`https://www.hackerrank.com/challenges/${sub.slug}`} target="_blank" rel="noopener noreferrer" className="hr__recent-item">
                                            <span className="hr__recent-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="16 18 22 12 16 6"></polyline>
                                                    <polyline points="8 6 2 12 8 18"></polyline>
                                                </svg>
                                            </span>
                                            <span className="hr__recent-name">{sub.name}</span>
                                            <span className="hr__recent-time">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(sub.time))}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
