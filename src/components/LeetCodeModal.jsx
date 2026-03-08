import { useState, useEffect, useCallback, useRef } from 'react';
import './LeetCodeModal.css';

const USERNAME = 'TawfeekKhan';
const TOTAL_QUESTIONS = { EASY: 927, MEDIUM: 2010, HARD: 909 }; // approx totals on LeetCode

// ---- GraphQL helper ----
async function lcQuery(query, variables, operationName) {
    try {
        const body = JSON.stringify({ query, variables, operationName });
        // Try Vite proxy first (dev)
        const res = await fetch('/api/leetcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });
        if (res.ok) return await res.json();
    } catch { /* ignore */ }
    return null;
}

// ---- Queries ----
async function fetchSolvedProgress() {
    const data = await lcQuery(
        `query userProfileUserQuestionProgressV2($userSlug: String!) {
      userProfileUserQuestionProgressV2(userSlug: $userSlug) {
        numAcceptedQuestions { count difficulty }
      }
    }`,
        { userSlug: USERNAME },
        'userProfileUserQuestionProgressV2'
    );
    return data?.data?.userProfileUserQuestionProgressV2?.numAcceptedQuestions || null;
}

async function fetchContestRanking() {
    const data = await lcQuery(
        `query userContestRankingInfo($username: String!) {
      userContestRanking(username: $username) {
        attendedContestsCount rating globalRanking totalParticipants topPercentage
      }
    }`,
        { username: USERNAME },
        'userContestRankingInfo'
    );
    return data?.data?.userContestRanking || null;
}

async function fetchBadges() {
    const data = await lcQuery(
        `query userBadges($username: String!) {
      matchedUser(username: $username) {
        badges { id name shortName displayName icon hoverText creationDate }
      }
    }`,
        { username: USERNAME },
        'userBadges'
    );
    return data?.data?.matchedUser?.badges || [];
}

async function fetchCalendar() {
    const data = await lcQuery(
        `query userProfileCalendar($username: String!, $year: Int) {
      matchedUser(username: $username) {
        userCalendar(year: $year) {
          streak totalActiveDays submissionCalendar
        }
      }
    }`,
        { username: USERNAME },
        'userProfileCalendar'
    );
    return data?.data?.matchedUser?.userCalendar || null;
}

async function fetchRecentAC() {
    const data = await lcQuery(
        `query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id title titleSlug timestamp
      }
    }`,
        { username: USERNAME, limit: 50 },
        'recentAcSubmissions'
    );
    return data?.data?.recentAcSubmissionList || [];
}

// ---- Donut SVG ----
function SolvedDonut({ easy, medium, hard, total, totalQ }) {
    const r = 52, cx = 60, cy = 60, c = 2 * Math.PI * r;
    const easyPct = (easy / totalQ) * c;
    const medPct = (medium / totalQ) * c;
    const hardPct = (hard / totalQ) * c;
    const gap = 4;
    const easyOff = 0;
    const medOff = easyPct + gap;
    const hardOff = easyPct + medPct + gap * 2;

    return (
        <div className="lc__donut-wrap">
            <svg viewBox="0 0 120 120" className="lc__donut-svg">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10b981" strokeWidth="8"
                    strokeDasharray={`${easyPct} ${c - easyPct}`} strokeDashoffset={-easyOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f59e0b" strokeWidth="8"
                    strokeDasharray={`${medPct} ${c - medPct}`} strokeDashoffset={-medOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="#ef4444" strokeWidth="8"
                    strokeDasharray={`${hardPct} ${c - hardPct}`} strokeDashoffset={-hardOff}
                    strokeLinecap="round" transform={`rotate(-90 ${cx} ${cy})`} />
            </svg>
            <div className="lc__donut-center">
                <span className="lc__donut-total">{total}</span>
                <span className="lc__donut-label">Solved</span>
            </div>
        </div>
    );
}

// ---- Heatmap ----
function SubmissionHeatmap({ calendarJson, totalDays, streak }) {
    const [cells, setCells] = useState([]);
    const [totalSubs, setTotalSubs] = useState(0);
    const [hoveredCell, setHoveredCell] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [cells]);

    useEffect(() => {
        if (!calendarJson) return;
        try {
            const map = JSON.parse(calendarJson);

            const total = Object.values(map).reduce((sum, n) => sum + n, 0);
            setTotalSubs(total);

            const dayMap = {};
            for (const [ts, count] of Object.entries(map)) {
                const date = new Date(Number(ts) * 1000);
                const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
                dayMap[key] = (dayMap[key] || 0) + count;
            }

            const now = new Date();
            const oneYearAgo = new Date(now);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

            // Align start to previous Monday (Mon=1 in getDay, Sun=0)
            const d = new Date(oneYearAgo);
            const dayOfWeek = d.getDay(); // 0=Sun,1=Mon,...6=Sat
            const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // how far back to Monday
            d.setDate(d.getDate() - mondayOffset);

            const result = [];
            while (d <= now) {
                const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
                const count = dayMap[key] || 0;
                result.push({ date: new Date(d), count, isEmpty: d < oneYearAgo || d > now });
                d.setDate(d.getDate() + 1);
            }
            // Pad the last week to 7 days if needed
            const lastDay = result[result.length - 1].date;
            const lastDayOfWeek = lastDay.getDay();
            const remaining = lastDayOfWeek === 0 ? 0 : 7 - lastDayOfWeek; // days until Sunday
            for (let i = 0; i < remaining; i++) {
                const pad = new Date(lastDay);
                pad.setDate(pad.getDate() + i + 1);
                result.push({ date: pad, count: 0, isEmpty: true });
            }
            setCells(result);
        } catch { /* ignore */ }
    }, [calendarJson]);

    if (cells.length === 0) return null;

    // Group into weeks of 7 (Mon–Sun per column)
    const weeks = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    // Build columns, splitting transition weeks into two visual columns
    let previousMonth = -1;
    const columns = [];
    weeks.forEach(week => {
        const realCells = week.filter(c => !c.isEmpty);
        const monthsInWeek = [...new Set(realCells.map(c => c.date.getMonth()))];

        if (monthsInWeek.length === 2 && previousMonth !== -1) {
            // Transition week: split into old-month tail + new-month head
            const oldMonth = previousMonth;
            const newMonth = monthsInWeek.find(m => m !== oldMonth);

            // Column for old month's last days
            columns.push({
                week, monthNum: oldMonth, isNewMonth: false, monthLabel: null
            });
            // Column for new month's first days (with separator)
            columns.push({
                week, monthNum: newMonth, isNewMonth: true,
                monthLabel: monthNames[newMonth]
            });
            previousMonth = newMonth;
        } else {
            // Single-month week
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

    // Second pass: calculate centered label offset for each month
    for (let i = 0; i < columns.length; i++) {
        if (columns[i].monthLabel) {
            const m = columns[i].monthNum;
            let count = 0;
            for (let j = i; j < columns.length && columns[j].monthNum === m; j++) {
                count++;
            }
            columns[i].labelOffset = (count * 16) / 2; // 14px cell + 2px gap = 16px per col
        }
    }

    return (
        <div className="lc__heatmap-section" style={{ position: 'relative' }}>
            <div className="lc__heatmap-header">
                <span><strong>{totalSubs}</strong> submissions in the past year</span>
                <span className="lc__heatmap-meta">Active: <strong>{totalDays}</strong>d &nbsp; Streak: <strong>{streak}</strong></span>
            </div>
            <div className="lc__heatmap-scroll" ref={scrollRef}>
                {/* Day labels on the left */}
                <div className="lc__heatmap-day-labels">
                    {dayLabels.map(d => <span key={d}>{d}</span>)}
                </div>
                <div className="lc__heatmap-grid" onMouseLeave={() => setHoveredCell(null)}>
                    {columns.map(({ week, isNewMonth, monthLabel, monthNum, labelOffset }, wi) => (
                        <div key={wi} className="lc__heatmap-col-wrapper">
                            {monthLabel && (
                                <span className="lc__heatmap-month-label" style={{ left: labelOffset || 0 }}>{monthLabel}</span>
                            )}
                            <div className={`lc__heatmap-col ${isNewMonth && wi !== 0 ? 'lc__heatmap-col--new-month' : ''}`}>
                                {week.map((cell, ci) => {
                                    if (cell.isEmpty || cell.date.getMonth() !== monthNum) {
                                        return <div key={ci} className="lc__heatmap-cell lc__heatmap-cell--empty" onMouseEnter={() => setHoveredCell(null)} />;
                                    }
                                    let level = 0;
                                    if (cell.count >= 1) level = 1;
                                    if (cell.count >= 3) level = 2;
                                    if (cell.count >= 5) level = 3;
                                    if (cell.count >= 8) level = 4;

                                    const handleMouseEnter = (e) => {
                                        const rect = e.target.getBoundingClientRect();
                                        const sectionRect = document.querySelector('.lc__heatmap-section').getBoundingClientRect();
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
                                            className={`lc__heatmap-cell lc__heatmap-cell--${level}`}
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
                    className={`lc__heatmap-tooltip ${hoveredCell.positionClass || ''}`}
                    style={{
                        left: hoveredCell.x,
                        top: hoveredCell.y
                    }}
                >
                    {hoveredCell.count} submission{hoveredCell.count !== 1 ? 's' : ''} on {hoveredCell.date}
                    <div className="lc__heatmap-tooltip-arrow"></div>
                </div>
            )}
        </div>
    );
}

// ---- Main Modal ----
export default function LeetCodeModal({ onClose }) {
    const [solved, setSolved] = useState(null);
    const [contest, setContest] = useState(null);
    const [badges, setBadges] = useState([]);
    const [calendar, setCalendar] = useState(null);
    const [recentAC, setRecentAC] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeBadgeIndex, setActiveBadgeIndex] = useState(0);

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

    useEffect(() => {
        Promise.all([
            fetchSolvedProgress(),
            fetchContestRanking(),
            fetchBadges(),
            fetchCalendar(),
            fetchRecentAC(),
        ]).then(([s, c, b, cal, ac]) => {
            setSolved(s);
            setContest(c);
            setBadges(b);
            setCalendar(cal);
            setRecentAC(ac);
            setLoading(false);
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

    let easy = 0, medium = 0, hard = 0, total = 0;
    if (solved) {
        for (const q of solved) {
            if (q.difficulty === 'EASY') easy = q.count;
            else if (q.difficulty === 'MEDIUM') medium = q.count;
            else if (q.difficulty === 'HARD') hard = q.count;
        }
        total = easy + medium + hard;
    }

    const totalQ = TOTAL_QUESTIONS.EASY + TOTAL_QUESTIONS.MEDIUM + TOTAL_QUESTIONS.HARD;

    function timeAgo(timestamp) {
        const diff = Date.now() / 1000 - Number(timestamp);
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

    return (
        <div className="lc__overlay" onClick={onClose}>
            <div className="lc__modal" onClick={(e) => e.stopPropagation()}>
                {/* Close */}
                <button className="lc__close" onClick={onClose} aria-label="Close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                </button>

                {/* Header with Visit Profile Button */}
                <div className="lc__header">
                    <div className="lc__avatar">
                        <svg viewBox="0 0 24 24" width="22" height="22" fill="white">
                            <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                        </svg>
                    </div>
                    <div className="lc__header-info">
                        <h2 className="lc__name">Tawfeek Khan</h2>
                        <p className="lc__username">@{USERNAME}</p>
                    </div>
                    <a href={`https://leetcode.com/u/${USERNAME}`} target="_blank" rel="noopener noreferrer" className="lc__visit-btn">
                        View Full Profile
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>

                {loading ? (
                    <div className="global-loader-container">
                        <div className="global-spinner"></div>
                    </div>
                ) : (
                    <div className="lc__body">
                        {/* Contest Stats Row */}
                        {contest && (
                            <div className="lc__contest-row">
                                <div className="lc__contest-stat">
                                    <span className="lc__contest-value">{Math.round(contest.rating)}</span>
                                    <span className="lc__contest-label">Rating</span>
                                </div>
                                <div className="lc__contest-stat">
                                    <span className="lc__contest-value">{contest.globalRanking?.toLocaleString()}<span className="lc__contest-dim">/{contest.totalParticipants?.toLocaleString()}</span></span>
                                    <span className="lc__contest-label">Global Rank</span>
                                </div>
                                <div className="lc__contest-stat">
                                    <span className="lc__contest-value">{contest.attendedContestsCount}</span>
                                    <span className="lc__contest-label">Contests</span>
                                </div>
                                <div className="lc__contest-stat">
                                    <span className="lc__contest-value lc__contest-top">{contest.topPercentage?.toFixed(1)}%</span>
                                    <span className="lc__contest-label">Top %</span>
                                </div>
                            </div>
                        )}

                        {/* Solved + Badges Row */}
                        <div className="lc__main-row">
                            <div className="lc__solved-card">
                                {total > 0 && (
                                    <SolvedDonut easy={easy} medium={medium} hard={hard} total={total} totalQ={totalQ} />
                                )}
                                <div className="lc__diff-list">
                                    <div className="lc__diff-item">
                                        <span className="lc__diff-dot" style={{ background: '#10b981' }}></span>
                                        <span className="lc__diff-label">Easy</span>
                                        <span className="lc__diff-count" style={{ color: '#10b981' }}>{easy}<span className="lc__diff-total">/{TOTAL_QUESTIONS.EASY}</span></span>
                                    </div>
                                    <div className="lc__diff-item">
                                        <span className="lc__diff-dot" style={{ background: '#f59e0b' }}></span>
                                        <span className="lc__diff-label">Med</span>
                                        <span className="lc__diff-count" style={{ color: '#f59e0b' }}>{medium}<span className="lc__diff-total">/{TOTAL_QUESTIONS.MEDIUM}</span></span>
                                    </div>
                                    <div className="lc__diff-item">
                                        <span className="lc__diff-dot" style={{ background: '#ef4444' }}></span>
                                        <span className="lc__diff-label">Hard</span>
                                        <span className="lc__diff-count" style={{ color: '#ef4444' }}>{hard}<span className="lc__diff-total">/{TOTAL_QUESTIONS.HARD}</span></span>
                                    </div>
                                </div>
                            </div>

                            {badges.length > 0 && (
                                <div className="lc__badges-card">
                                    <div className="lc__carousel">
                                        {badges.map((badge, idx) => (
                                            <div key={badge.id} className={`lc__carousel-slide ${idx === activeBadgeIndex ? 'active' : ''}`}>
                                                <div className="lc__badge-card">
                                                    <div className="lc__badge-icon-wrap">
                                                        {badge.icon ? (
                                                            <img src={badge.icon} alt={badge.displayName} />
                                                        ) : (
                                                            <span>🏆</span>
                                                        )}
                                                    </div>
                                                    <div className="lc__badge-info">
                                                        <span className="lc__badge-name" title={badge.displayName}>{badge.displayName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="lc__carousel-dots">
                                        {badges.map((_, idx) => (
                                            <div key={idx} className={`lc__carousel-dot ${idx === activeBadgeIndex ? 'active' : ''}`} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Heatmap */}
                        {calendar && (
                            <SubmissionHeatmap
                                calendarJson={calendar.submissionCalendar}
                                totalDays={calendar.totalActiveDays}
                                streak={calendar.streak}
                            />
                        )}

                        {/* Recent AC — compact */}
                        {recentAC.length > 0 && (
                            <div className="lc__recent">
                                <h4 className="lc__recent-title">Recent Accepted</h4>
                                <div
                                    className="lc__recent-list"
                                    tabIndex={0}
                                    aria-label="Recent Accepted List"
                                    onWheel={(e) => {
                                        const list = e.currentTarget;
                                        const modal = list.closest('.lc__body');
                                        if (!modal) return;

                                        const isAtTop = list.scrollTop === 0;
                                        const isAtBottom = Math.abs(list.scrollHeight - list.scrollTop - list.clientHeight) < 1;

                                        if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
                                            modal.scrollTop += e.deltaY;
                                        }
                                    }}
                                >
                                    {recentAC.map((sub) => (
                                        <a key={sub.id} href={`https://leetcode.com/problems/${sub.titleSlug}`} target="_blank" rel="noopener noreferrer" className="lc__recent-item">
                                            <span className="lc__recent-icon">
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="16 18 22 12 16 6"></polyline>
                                                    <polyline points="8 6 2 12 8 18"></polyline>
                                                </svg>
                                            </span>
                                            <span className="lc__recent-name">{sub.title}</span>
                                            <span className="lc__recent-time">{timeAgo(sub.timestamp)}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
