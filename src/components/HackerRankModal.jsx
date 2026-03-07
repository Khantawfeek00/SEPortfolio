import { useEffect, useState, useCallback } from 'react';
import './HackerRankModal.css';
import historyData from '../data/hackerrank_history.json';

const USERNAME = 'khantawfeek00';

// Hardcoded data based on live fetch
const BADGES = [
    { name: 'Problem Solving', stars: 5 },
    { name: 'Java', stars: 5 },
    { name: 'C++', stars: 2 },
    { name: 'Python', stars: 2 },
    { name: '30 Days of Code', stars: 2 },
    { name: 'SQL', stars: 2 },
];

const SKILLS = [
    { label: 'Algorithms', val: 617, color: '#3b82f6' },
    { label: 'Tutorials', val: 285, color: '#ec4899' },
    { label: 'SQL', val: 275, color: '#10b981' },
    { label: 'Java', val: 274, color: '#f59e0b' },
    { label: 'Others', val: 433, color: '#8b5cf6' }
];

const RECENT_AC = [
    { name: 'Merge Sort: Counting Inversions', slug: 'ctci-merge-sort', time: '2025-04-05T09:36:42.000Z' },
    { name: 'Arrays Introduction', slug: 'arrays-introduction', time: '2023-02-26T18:27:52.000Z' },
    { name: 'Functions', slug: 'c-tutorial-functions', time: '2023-02-26T18:24:13.000Z' },
    { name: 'For Loop', slug: 'c-tutorial-for-loop', time: '2023-02-26T18:22:48.000Z' },
    { name: 'Conditional Statements', slug: 'c-tutorial-conditional-if-else', time: '2023-02-26T18:18:59.000Z' }
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
            <div className="hr__modal" onClick={(e) => e.stopPropagation()}>
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
                            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                        </svg>
                    </a>
                </div>

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
                            <span className="hr__top-value">6</span>
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
                            <div className="hr__badges-header">
                                <span className="hr__badges-header-title">Verified Badges</span>
                            </div>
                            <div className="hr__badges-grid">
                                {BADGES.map((badge, idx) => (
                                    <div key={idx} className={`hr__badge-card ${badge.stars === 5 ? 'hr__badge-gold' : ''}`}>
                                        <div className="hr__badge-info">
                                            <span className="hr__badge-name">{badge.name}</span>
                                            {renderStars(badge.stars)}
                                        </div>
                                    </div>
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
                            {RECENT_AC.map((sub, idx) => (
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
            </div>
        </div>
    );
}
