import { useEffect, useState, useCallback, useRef } from 'react';
import './HackerRankModal.css';
import historyData from '../data/hackerrank_history.json';
import { FcIdea, FcCalendar } from "react-icons/fc";
const USERNAME = 'khantawfeek00';



function getBadgeColor(stars) {
    if (stars === 5) return '#fbbf24'; // gold
    if (stars === 4) return '#94a3b8'; // silver
    if (stars >= 1) return '#cd7f32'; // bronze
    return '#475569';
}

function getBadgeIcon(name) {
    const n = name.toLowerCase();

    // Unified sizing attributes for all SVGs to match LeetCode
    const size = 68;

    if (n.includes('java')) {
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" width={size} height={size} alt="Java" />;
    }
    if (n.includes('python')) {
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" width={size} height={size} alt="Python" />;
    }
    if (n === 'c') {
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" width={size} height={size} alt="C" />;
    }
    if (n.includes('c++') || n.includes('cpp') || n.includes('c ')) {
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" width={size} height={size} alt="C++" />;
    }
    if (n.includes('sql') || n.includes('database')) {
        return <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" width={size} height={size} alt="MySQL" />;
    }
    if (n.includes('problem solving') || n.includes('algorithm')) {
        return <FcIdea size={size * 0.9} />;
    }
    if (n.includes('30 days') || n.includes('days of code')) {
        return <FcCalendar size={size * 0.85} />;
    }

    // Default shield
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    const [totalDays, setTotalDays] = useState(0);
    const [streak, setStreak] = useState(0);
    const [hoveredCell, setHoveredCell] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [cells]);

    useEffect(() => {
        if (!historyMap) return;
        try {
            // Calculate current streak
            let currentStreak = 0;
            const today = new Date();
            let dStreak = new Date(today);
            while (true) {
                const key = `${dStreak.getFullYear()}-${String(dStreak.getMonth() + 1).padStart(2, '0')}-${String(dStreak.getDate()).padStart(2, '0')}`;
                if (historyMap[key] > 0) {
                    currentStreak++;
                    dStreak.setDate(dStreak.getDate() - 1);
                } else if (currentStreak === 0 && historyMap[key] === undefined && new Date().getTime() - dStreak.getTime() < 86400000) {
                    dStreak.setDate(dStreak.getDate() - 1);
                } else {
                    break;
                }
            }
            setStreak(currentStreak);

            // Show precisely the last 12 months from today
            const maxDate = new Date();
            const oneYearAgo = new Date(maxDate);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const d = new Date(oneYearAgo);
            const dayOfWeek = d.getDay();
            const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
            d.setDate(d.getDate() - mondayOffset);

            const result = [];
            let currentYearSubs = 0;
            let currentYearDays = 0;

            while (d <= maxDate) {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const count = historyMap[key] || 0;
                const isEmpty = d < oneYearAgo || d > maxDate;
                result.push({ date: new Date(d), count, isEmpty });

                if (!isEmpty && count > 0) {
                    currentYearSubs += count;
                    currentYearDays += 1;
                }
                d.setDate(d.getDate() + 1);
            }

            setTotalSubs(currentYearSubs);
            setTotalDays(currentYearDays);

            const lastDay = result[result.length - 1].date;
            const lastDayOfWeek = lastDay.getDay();
            const remaining = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek;
            for (let i = 0; i < remaining; i++) {
                const pad = new Date(lastDay);
                pad.setDate(pad.getDate() + i + 1);
                result.push({ date: pad, count: 0, isEmpty: true });
            }
            setCells(result);
        } catch { /* ignore */ }
    }, [historyMap]);

    if (cells.length === 0) return null;

    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    let previousMonth = -1;
    const columns = [];
    weeks.forEach(week => {
        const realCells = week.filter(c => !c.isEmpty);
        const monthsInWeek = [...new Set(realCells.map(c => c.date.getMonth()))];

        if (monthsInWeek.length === 2 && previousMonth !== -1) {
            const oldMonth = previousMonth;
            const newMonth = monthsInWeek.find(m => m !== oldMonth);
            columns.push({
                week, monthNum: oldMonth, isNewMonth: false, monthLabel: null
            });
            columns.push({
                week, monthNum: newMonth, isNewMonth: true,
                monthLabel: monthNames[newMonth]
            });
            previousMonth = newMonth;
        } else {
            const m = monthsInWeek[0] ?? previousMonth;
            const isNew = m !== previousMonth && previousMonth !== -1;
            const showLabel = isNew || previousMonth === -1;
            columns.push({
                week, monthNum: m,
                isNewMonth: isNew,
                monthLabel: showLabel ? monthNames[m] : null
            });
            previousMonth = m;
        }
    });

    for (let i = 0; i < columns.length; i++) {
        if (columns[i].monthLabel) {
            const m = columns[i].monthNum;
            let count = 0;
            for (let j = i; j < columns.length && columns[j].monthNum === m; j++) {
                count++;
            }
            columns[i].labelOffset = (count * 16) / 2;
        }
    }

    return (
        <div className="hr__heatmap-section" style={{ position: 'relative' }}>
            <div className="hr__heatmap-header">
                <span><strong>{totalSubs}</strong> submissions in the past year</span>
                <span className="hr__heatmap-meta">Active: <strong>{totalDays}</strong>d &nbsp; Streak: <strong>{streak}</strong></span>
            </div>
            <div className="hr__heatmap-scroll" ref={scrollRef}>
                <div className="hr__heatmap-day-labels">
                    {dayLabels.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="hr__heatmap-grid" onMouseLeave={() => setHoveredCell(null)}>
                    {columns.map(({ week, isNewMonth, monthLabel, monthNum, labelOffset }, wi) => (
                        <div key={wi} className="hr__heatmap-col-wrapper">
                            {monthLabel && (
                                <span className="hr__heatmap-month-label" style={{ left: labelOffset || 0 }}>{monthLabel}</span>
                            )}
                            <div className={`hr__heatmap-col ${isNewMonth && wi !== 0 ? 'hr__heatmap-col--new-month' : ''}`}>
                                {week.map((cell, ci) => {
                                    if (cell.isEmpty || cell.date.getMonth() !== monthNum) {
                                        return <div key={ci} className="hr__heatmap-cell hr__heatmap-cell--empty" onMouseEnter={() => setHoveredCell(null)} />;
                                    }
                                    let level = 0;
                                    if (cell.count >= 1) level = 1;
                                    if (cell.count >= 3) level = 2;
                                    if (cell.count >= 5) level = 3;
                                    if (cell.count >= 8) level = 4;

                                    const handleMouseEnter = (e) => {
                                        const rect = e.target.getBoundingClientRect();
                                        const sectionRect = document.querySelector('.hr__heatmap-section').getBoundingClientRect();
                                        const x = rect.left - sectionRect.left + rect.width / 2;
                                        const y = rect.top - sectionRect.top - 10;
                                        const positionClass = x > sectionRect.width / 2 ? 'right' : '';
                                        setHoveredCell({
                                            count: cell.count,
                                            date: cell.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                                            x, y, positionClass
                                        });
                                    };

                                    return (
                                        <div
                                            key={ci}
                                            className={`hr__heatmap-cell hr__heatmap-cell--${level}`}
                                            onMouseEnter={handleMouseEnter}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {hoveredCell && (
                <div
                    className={`hr__heatmap-tooltip ${hoveredCell.positionClass || ''}`}
                    style={{
                        left: hoveredCell.x,
                        top: hoveredCell.y
                    }}
                >
                    {hoveredCell.count} submission{hoveredCell.count !== 1 ? 's' : ''} on {hoveredCell.date}
                    <div className="hr__heatmap-tooltip-arrow"></div>
                </div>
            )}
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

    function timeAgo(dateString) {
        const diff = (Date.now() - new Date(dateString).getTime()) / 1000;
        if (diff < 3600) {
            const mins = Math.max(1, Math.floor(diff / 60));
            return `${mins} minute${mins !== 1 ? 's' : ''} ago`;
        }
        if (diff < 86400) {
            const hrs = Math.floor(diff / 3600);
            return `${hrs} hour${hrs !== 1 ? 's' : ''} ago`;
        }
        const days = Math.floor(diff / 86400);
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

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
                                <h4 className="hr__recent-title">Recent Accepted</h4>
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
                                            <span className="hr__recent-time">{timeAgo(sub.time)}</span>
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
