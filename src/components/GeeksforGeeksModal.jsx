import React, { useState, useEffect, useCallback } from 'react';
import './GeeksforGeeksModal.css';

// ---- Donut SVG ----
function GFGDonut({ school, basic, easy, medium, hard, total, totalQ }) {
    const r = 52, cx = 60, cy = 60, c = 2 * Math.PI * r;
    const schoolPct = (school / totalQ) * c;
    const basicPct = (basic / totalQ) * c;
    const easyPct = (easy / totalQ) * c;
    const medPct = (medium / totalQ) * c;
    const hardPct = (hard / totalQ) * c;
    const gap = 4;

    let off = 0;
    const schoolOff = off; off += school > 0 ? schoolPct + gap : 0;
    const basicOff = off; off += basic > 0 ? basicPct + gap : 0;
    const easyOff = off; off += easy > 0 ? easyPct + gap : 0;
    const medOff = off; off += medium > 0 ? medPct + gap : 0;
    const hardOff = off;

    return (
        <div className="gfg__donut-wrap">
            <svg viewBox="0 0 120 120" className="gfg__donut-svg">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                {school > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#9333ea" strokeWidth="8"
                    strokeDasharray={`${schoolPct} ${c - schoolPct}`} strokeDashoffset={-schoolOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />}
                {basic > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#06b6d4" strokeWidth="8"
                    strokeDasharray={`${basicPct} ${c - basicPct}`} strokeDashoffset={-basicOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />}
                {easy > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#2f8d46" strokeWidth="8"
                    strokeDasharray={`${easyPct} ${c - easyPct}`} strokeDashoffset={-easyOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />}
                {medium > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="8"
                    strokeDasharray={`${medPct} ${c - medPct}`} strokeDashoffset={-medOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />}
                {hard > 0 && <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth="8"
                    strokeDasharray={`${hardPct} ${c - hardPct}`} strokeDashoffset={-hardOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />}
            </svg>
            <div className="gfg__donut-center">
                <span className="gfg__donut-total">{total}</span>
                <span className="gfg__donut-label">Solved</span>
            </div>
        </div>
    );
}

// ---- Heatmap ----
function SubmissionHeatmap({ calendarJson, totalDays, streak }) {
    const [cells, setCells] = useState([]);
    const [totalSubs, setTotalSubs] = useState(0);
    const [hoveredCell, setHoveredCell] = useState(null);

    // Format date like the screenshot: "Monday, February 2, 2026"
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        if (!calendarJson) return;
        try {
            const map = JSON.parse(calendarJson);
            const total = Object.values(map).reduce((sum, n) => sum + n, 0);
            setTotalSubs(total);

            const dayMap = {};
            for (const [ts, count] of Object.entries(map)) {
                let key = ts;
                // If it's a Unix timestamp (no hyphens), convert it to YYYY-MM-DD
                if (!ts.includes('-')) {
                    const date = new Date(Number(ts) * 1000);
                    key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
                }
                dayMap[key] = (dayMap[key] || 0) + count;
            }

            const now = new Date();
            const oneYearAgo = new Date(now);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            const result = [];
            const d = new Date(oneYearAgo);
            d.setDate(d.getDate() - d.getDay());

            while (d <= now) {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const count = dayMap[key] || 0;
                result.push({ date: new Date(d), count });
                d.setDate(d.getDate() + 1);
            }
            setCells(result);
        } catch { /* ignore */ }
    }, [calendarJson]);

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

    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];

    return (
        <div className="gfg__heatmap-section" style={{ marginTop: '0.875rem', position: 'relative' }}>
            <div className="gfg__heatmap-header">
                <span><strong>{totalSubs}</strong> submissions in the past year</span>
                <span className="gfg__heatmap-meta">Active: <strong>{totalDays}</strong>d &nbsp; Streak: <strong>{streak}</strong></span>
            </div>
            <div className="gfg__heatmap-scroll">
                <div className="gfg__heatmap-grid-wrapper">
                    <div className="gfg__heatmap-grid" onMouseLeave={() => setHoveredCell(null)}>
                        {weeks.map((week, wi) => (
                            <div key={wi} className="gfg__heatmap-col">
                                {week.map((cell, ci) => {
                                    let level = 0;
                                    if (cell.count >= 1) level = 1;
                                    if (cell.count >= 3) level = 2;
                                    if (cell.count >= 5) level = 3;
                                    if (cell.count >= 8) level = 4;

                                    const handleMouseEnter = (e) => {
                                        const rect = e.target.getBoundingClientRect();
                                        const containerRect = e.target.closest('.gfg__heatmap-section').getBoundingClientRect();
                                        const xPos = rect.left - containerRect.left;

                                        let positionClass = '';
                                        // If cell is near right edge, shift tooltip left
                                        if (xPos > containerRect.width - 120) positionClass = 'gfg__heatmap-tooltip--right';
                                        // If cell is near left edge, shift tooltip right
                                        else if (xPos < 60) positionClass = 'gfg__heatmap-tooltip--left';

                                        setHoveredCell({
                                            count: cell.count,
                                            date: formatDate(cell.date),
                                            x: xPos + (rect.width / 2),
                                            y: rect.top - containerRect.top - 8,
                                            positionClass
                                        });
                                    };

                                    return (
                                        <div
                                            key={ci}
                                            className={`gfg__heatmap-cell gfg__heatmap-cell--${level}`}
                                            onMouseEnter={handleMouseEnter}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="gfg__heatmap-months">
                    {months.map((m) => <span key={m}>{m}</span>)}
                </div>
            </div>
            {hoveredCell && (
                <div
                    className={`gfg__heatmap-tooltip ${hoveredCell.positionClass || ''}`}
                    style={{
                        left: hoveredCell.x,
                        top: hoveredCell.y
                    }}
                >
                    {hoveredCell.count} submission{hoveredCell.count !== 1 ? 's' : ''} on {hoveredCell.date}
                    <div className="gfg__heatmap-tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
}

// ---- Main Modal ----
export default function GeeksforGeeksModal({ isOpen, onClose, username, stats }) {
    const handleEsc = useCallback((e) => { if (e.key === 'Escape') onClose(); }, [onClose]);
    const [activeTab, setActiveTab] = useState('medium');

    useEffect(() => {
        if (!isOpen) return;
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isOpen, handleEsc]);

    if (!isOpen) return null;

    // Use passed stats or placeholders
    const data = stats || { total: 0, school: 0, basic: 0, easy: 0, medium: 0, hard: 0 };
    const {
        total = 0, school = 0, basic = 0, easy = 0, medium = 0, hard = 0,
        codingScore = '-', instituteRank = '-', streak = '-', potd = '-',
        heatmapJson = "{}", totalDays = 0,
        schoolList = [], basicList = [], easyList = [], mediumList = [], hardList = []
    } = data;

    // GFG doesn't expose a "total available" easily, so we use max approximation or a fixed number to make donut look good
    const totalQ = Math.max(total + 500, 3000);

    const TABS = [
        { id: 'school', label: 'SCHOOL', count: school, list: schoolList },
        { id: 'basic', label: 'BASIC', count: basic, list: basicList },
        { id: 'easy', label: 'EASY', count: easy, list: easyList },
        { id: 'medium', label: 'MEDIUM', count: medium, list: mediumList },
        { id: 'hard', label: 'HARD', count: hard, list: hardList },
    ];

    let activeListData = TABS.find(t => t.id === activeTab)?.list || [];

    return (
        <div className="gfg__overlay" onClick={onClose}>
            <div className="gfg__modal" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className="gfg__close" onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Header with Visit Profile Button */}
                <div className="gfg__header">
                    <div className="gfg__avatar">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                            alt="GeeksforGeeks"
                            style={{ width: '22px', height: '22px', background: 'white', borderRadius: '4px', padding: '2px' }}
                        />
                    </div>
                    <div className="gfg__header-info">
                        <h2 className="gfg__name">Tawfeek Khan</h2>
                        <p className="gfg__username">@{username}</p>
                    </div>
                    <a href={`https://auth.geeksforgeeks.org/user/${username}/`} target="_blank" rel="noopener noreferrer" className="gfg__visit-btn">
                        View Full Profile
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                        </svg>
                    </a>
                </div>

                <div className="gfg__body">
                    {/* Top Stats Row */}
                    <div className="gfg__top-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                        <div className="gfg__top-stat">
                            <span className="gfg__top-value" style={{ color: '#2f8d46' }}>{codingScore}</span>
                            <span className="gfg__top-label">Coding Score</span>
                        </div>
                        <div className="gfg__top-stat">
                            <span className="gfg__top-value">{instituteRank}</span>
                            <span className="gfg__top-label">Institute Rank</span>
                        </div>
                        <div className="gfg__top-stat">
                            <span className="gfg__top-value">{streak}</span>
                            <span className="gfg__top-label">Longest Streak</span>
                        </div>
                        <div className="gfg__top-stat">
                            <span className="gfg__top-value">{potd}</span>
                            <span className="gfg__top-label">POTD Solved</span>
                        </div>
                    </div>

                    {/* Solved Row */}
                    <div className="gfg__main-row" style={{ gridTemplateColumns: '1fr' }}>
                        <div className="gfg__solved-card" style={{ maxWidth: '400px', margin: '0 auto', width: '100%' }}>
                            <GFGDonut school={school} basic={basic} easy={easy} medium={medium} hard={hard} total={total} totalQ={totalQ} />

                            <div className="gfg__diff-list">
                                <div className="gfg__diff-item">
                                    <span className="gfg__diff-dot" style={{ background: '#9333ea' }}></span>
                                    <span className="gfg__diff-label">School</span>
                                    <span className="gfg__diff-count" style={{ color: '#9333ea' }}>{school}</span>
                                </div>
                                <div className="gfg__diff-item">
                                    <span className="gfg__diff-dot" style={{ background: '#06b6d4' }}></span>
                                    <span className="gfg__diff-label">Basic</span>
                                    <span className="gfg__diff-count" style={{ color: '#06b6d4' }}>{basic}</span>
                                </div>
                                <div className="gfg__diff-item">
                                    <span className="gfg__diff-dot" style={{ background: '#2f8d46' }}></span>
                                    <span className="gfg__diff-label">Easy</span>
                                    <span className="gfg__diff-count" style={{ color: '#2f8d46' }}>{easy}</span>
                                </div>
                                <div className="gfg__diff-item">
                                    <span className="gfg__diff-dot" style={{ background: '#f59e0b' }}></span>
                                    <span className="gfg__diff-label">Med</span>
                                    <span className="gfg__diff-count" style={{ color: '#f59e0b' }}>{medium}</span>
                                </div>
                                <div className="gfg__diff-item">
                                    <span className="gfg__diff-dot" style={{ background: '#ef4444' }}></span>
                                    <span className="gfg__diff-label">Hard</span>
                                    <span className="gfg__diff-count" style={{ color: '#ef4444' }}>{hard}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <SubmissionHeatmap calendarJson={heatmapJson} totalDays={totalDays} streak={streak === '-' ? 0 : streak} />

                    {/* Problems Breakdown Card (Moved to bottom) */}
                    <div className="gfg__badges-card" style={{ justifyContent: 'flex-start' }}>
                        <div className="gfg__badges-header">
                            <span className="gfg__badges-title" style={{ fontSize: '0.9375rem' }}>Problems Breakdown (Total Problems : {total})</span>
                        </div>

                        <div className="gfg__tabs-container">
                            {TABS.map(tab => (
                                <button
                                    key={tab.id}
                                    className={`gfg__tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                        </div>

                        <div
                            className="gfg__recent-list"
                            tabIndex={0}
                            aria-label="Problems List"
                            onWheel={(e) => {
                                const list = e.currentTarget;
                                const modal = list.closest('.gfg__modal');
                                if (!modal) return;

                                const isAtTop = list.scrollTop === 0;
                                const isAtBottom = Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 1;

                                if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                                    modal.scrollTop += e.deltaY;
                                }
                            }}
                        >
                            {activeListData.length > 0 ? (
                                activeListData.map((prob, i) => (
                                    <div key={i} className="gfg__recent-item">
                                        <span className="gfg__recent-check">•</span>
                                        <span className="gfg__recent-name">{prob}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="gfg__placeholder-content" style={{ gridColumn: '1 / -1' }}>
                                    <p style={{ color: '#a0aec0', fontSize: '1rem', lineHeight: '1.6' }}>
                                        No problems fetched for this category.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
