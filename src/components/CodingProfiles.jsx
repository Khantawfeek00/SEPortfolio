import { useState, useEffect } from 'react';
import './CodingProfiles.css';
import LeetCodeModal from './LeetCodeModal';
import GeeksforGeeksModal from './GeeksforGeeksModal';

// Official SVG Logos
const LeetCodeLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
);

const GFGLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M21.45 14.315c-.143.28-.334.532-.565.745a3.691 3.691 0 0 1-1.104.695 4.51 4.51 0 0 1-3.116-.016 3.79 3.79 0 0 1-2.135-2.078 3.571 3.571 0 0 1-.292-.906H18.2a.75.75 0 0 0 0-1.5h-3.984a4.6 4.6 0 0 1 .028-.5H18.2a.75.75 0 0 0 0-1.5h-3.747c.18-.632.49-1.217.914-1.713a3.725 3.725 0 0 1 2.23-1.284 4.51 4.51 0 0 1 2.594.22c.415.163.793.397 1.114.69.231.212.424.462.567.74a.75.75 0 0 0 1.317-.72 4.065 4.065 0 0 0-.824-1.076 5.239 5.239 0 0 0-1.53-.95 6.008 6.008 0 0 0-3.455-.293 5.215 5.215 0 0 0-3.118 1.81 5.64 5.64 0 0 0-1.176 2.576H11.4a.75.75 0 0 0 0 1.5h1.537c-.013.164-.02.33-.02.5H11.4a.75.75 0 0 0 0 1.5h1.686a5.55 5.55 0 0 0 1.09 2.355 5.252 5.252 0 0 0 3.03 1.952 6.008 6.008 0 0 0 3.455-.293 5.238 5.238 0 0 0 1.53-.95 4.065 4.065 0 0 0 .824-1.076.75.75 0 1 0-1.317-.72zm-18.9 0c.143.28.334.532.565.745a3.691 3.691 0 0 0 1.104.695 4.51 4.51 0 0 0 3.116-.016 3.79 3.79 0 0 0 2.135-2.078c.117-.29.203-.593.258-.906H5.77a.75.75 0 0 1 0-1.5h3.985a4.6 4.6 0 0 0-.028-.5H5.77a.75.75 0 0 1 0-1.5h3.747a5.08 5.08 0 0 0-.914-1.713A3.725 3.725 0 0 0 6.373 6.28a4.51 4.51 0 0 0-2.594.22 3.69 3.69 0 0 0-1.114.69 2.79 2.79 0 0 0-.567.74.75.75 0 0 1-1.317-.72c.2-.39.463-.746.824-1.076a5.239 5.239 0 0 1 1.53-.95 6.008 6.008 0 0 1 3.455-.293 5.215 5.215 0 0 1 3.118 1.81 5.64 5.64 0 0 1 1.176 2.576H12.6a.75.75 0 0 1 0 1.5h-1.537c.013.164.02.33.02.5H12.6a.75.75 0 0 1 0 1.5h-1.686a5.55 5.55 0 0 1-1.09 2.355 5.252 5.252 0 0 1-3.03 1.952 6.008 6.008 0 0 1-3.455-.293 5.238 5.238 0 0 1-1.53-.95 4.065 4.065 0 0 1-.824-1.076.75.75 0 1 1 1.317-.72z" />
    </svg>
);

const HackerRankLogo = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M11.999 0C10.626 0 2.195 4.818 1.514 6c-.69 1.195-.69 10.81 0 12 .682 1.183 9.112 6 10.485 6 1.374 0 9.804-4.817 10.485-6 .69-1.19.69-10.805 0-12C21.803 4.818 13.373 0 11.999 0zm3.226 16.063a.432.432 0 0 1-.209.063.489.489 0 0 1-.238-.063l-2.778-1.585-2.779 1.585a.49.49 0 0 1-.238.063.432.432 0 0 1-.209-.063.403.403 0 0 1-.192-.354V12.39H7.3a.5.5 0 0 1-.5-.5v-.778a.5.5 0 0 1 .5-.5h2.282V8.119a.403.403 0 0 1 .192-.354c.127-.072.319-.072.447 0L13 9.35l2.779-1.585c.128-.072.32-.072.447 0a.403.403 0 0 1 .192.354v3.493h2.282a.5.5 0 0 1 .5.5v.778a.5.5 0 0 1-.5.5h-2.282v3.319a.403.403 0 0 1-.193.354z" />
    </svg>
);

// ============================================
// CONFIGURE YOUR PROFILES & STATS HERE
// ============================================
// These values are shown immediately on page load.
// The app will also try to fetch live data in the background.
// If live fetch succeeds, stats update automatically + "● Live" badge shows.
// Update these numbers periodically from your actual profiles.

const PROFILES = {
    leetcode: {
        username: 'TawfeekKhan',
        name: 'LeetCode',
        color: '#f59e0b',
        icon: <LeetCodeLogo />,
        url: 'https://leetcode.com/u/TawfeekKhan',
        description: 'Solving algorithmic challenges with focus on data structures, dynamic programming, and system design patterns.',
        stats: { total: 299, easy: 110, medium: 163, hard: 26 },
        highlight: { value: '4 Badges', label: 'Earned', icon: '🏅' },
    },
    gfg: {
        username: 'khantawfeek00',
        name: 'GeeksforGeeks',
        color: '#10b981',
        icon: <GFGLogo />,
        url: 'https://www.geeksforgeeks.org/user/khantawfeek00',
        description: 'Practicing coding problems across topics including arrays, trees, graphs, and competitive programming.',
        stats: {
            total: 230,
            school: 1,
            basic: 22,
            easy: 74,
            medium: 121,
            hard: 12,
            codingScore: 677,
            instituteRank: 37,
            streak: 7,
            potd: 28,
            schoolList: ["Sum of Array", "Print 1 To N Without Loop", "Value equal to index value"],
            basicList: ["Binary Search", "Reverse a String", "Min and Max in Array"],
            easyList: ["Missing number in array", "Find duplicates in an array", "Subarray with given sum", "Parenthesis Checker", "Leaders in an array"],
            mediumList: ["Rotate a Linked List", "Sort a linked list of 0s, 1s and 2s", "0 - 1 Knapsack Problem", "Allocate Minimum Pages", "Kth Smallest", "Longest Common Subsequence"],
            hardList: ["Merge Without Extra Space", "Alien Dictionary", "Word Break - Part 2"],
        },
        highlight: { value: '677', label: 'Coding Score', icon: '⭐' },
    },
    hackerrank: {
        username: 'khantawfeek00',
        name: 'HackerRank',
        color: '#3b82f6',
        icon: <HackerRankLogo />,
        url: 'https://www.hackerrank.com/profile/khantawfeek00',
        description: 'Completing challenges in problem solving, Java, SQL, and earning skill badges across multiple domains.',
        stats: { total: 50, easy: null, medium: null, hard: null },
        highlight: { value: '5★', label: 'Problem Solving', icon: '🎖️' },
    },
};

// ============================================
// LIVE FETCH via Vite proxy (dev) or CORS proxy (prod)
// ============================================
// In development: Vite proxies /api/leetcode → leetcode.com/graphql
// In production: Uses allorigins.win as CORS proxy fallback

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

async function fetchLeetCodeLive(username) {
    const query = `query userProfileUserQuestionProgressV2($userSlug: String!) {
    userProfileUserQuestionProgressV2(userSlug: $userSlug) {
      numAcceptedQuestions { count difficulty }
    }
  }`;
    const body = JSON.stringify({
        query,
        variables: { userSlug: username },
        operationName: 'userProfileUserQuestionProgressV2',
    });

    // Try 1: Vite dev proxy (works in development)
    try {
        const res = await fetch('/api/leetcode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body,
        });
        if (res.ok) {
            const data = await res.json();
            return parseLeetCodeResponse(data);
        }
    } catch { /* fall through */ }

    // Try 2: CORS proxy with third-party API (works in production)
    try {
        const apiUrl = `https://alfa-leetcode-api.onrender.com/${username}/solved`;
        const res = await fetch(`${CORS_PROXY}${encodeURIComponent(apiUrl)}`);
        if (res.ok) {
            const data = await res.json();
            return {
                total: data.solvedProblem ?? data.totalSolved ?? null,
                easy: data.easySolved ?? null,
                medium: data.mediumSolved ?? null,
                hard: data.hardSolved ?? null,
            };
        }
    } catch { /* fall through */ }

    return null;
}

function parseLeetCodeResponse(data) {
    const questions = data?.data?.userProfileUserQuestionProgressV2?.numAcceptedQuestions;
    if (!questions) return null;
    const stats = { total: 0, easy: 0, medium: 0, hard: 0 };
    for (const q of questions) {
        if (q.difficulty === 'EASY') stats.easy = q.count;
        else if (q.difficulty === 'MEDIUM') stats.medium = q.count;
        else if (q.difficulty === 'HARD') stats.hard = q.count;
        stats.total += q.count;
    }
    return stats;
}

function extractProblemNames(categoryObj) {
    if (!categoryObj) return [];
    return Object.values(categoryObj).map(item => {
        if (Array.isArray(item)) return item[0]?.pname;
        return item?.pname;
    }).filter(Boolean);
}

async function fetchGFGLive(username) {
    try {
        let schoolList = [], basicList = [], easyList = [], mediumList = [], hardList = [];
        const body = JSON.stringify({ handle: username, requestType: "", year: "", month: "" });
        const problemRes = await fetch('/api/gfg/api/v1/user/problems/submissions/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        });

        if (problemRes.ok) {
            const probData = await problemRes.json();
            if (probData.status === 'success' && probData.result) {
                schoolList = extractProblemNames(probData.result.School);
                basicList = extractProblemNames(probData.result.Basic);
                easyList = extractProblemNames(probData.result.Easy);
                mediumList = extractProblemNames(probData.result.Medium);
                hardList = extractProblemNames(probData.result.Hard);
            } else {
                console.warn('GFG parsed success but failed structure:', probData);
                return null;
            }
        } else {
            console.warn('GFG HTTP Status NOT OK:', problemRes.status);
            return null;
        }

        // Fetch Heatmap Data (Merged current & previous year)
        const currentYear = new Date().getFullYear();
        const prevYear = currentYear - 1;
        let heatmapJson = "{}";
        let totalDays = 0;

        const fetchYearHeatmap = async (yr) => {
            try {
                const res = await fetch('/api/gfg/api/v1/user/problems/submissions/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ handle: username, requestType: "getYearwiseUserSubmissions", year: yr.toString(), month: "" })
                });
                if (res.ok) {
                    const data = await res.json();
                    return data.result || {};
                }
            } catch (e) { }
            return {};
        };

        try {
            const [curHeatmap, prevHeatmap] = await Promise.all([
                fetchYearHeatmap(currentYear),
                fetchYearHeatmap(prevYear)
            ]);
            // Merge both objects (keys are completely unique strings like '2025-10-22')
            const combinedHeatmap = { ...prevHeatmap, ...curHeatmap };
            heatmapJson = JSON.stringify(combinedHeatmap);
            totalDays = Object.keys(combinedHeatmap).length;
        } catch (e) {
            console.warn("Could not fetch GFG heatmap", e);
        }

        const total = schoolList.length + basicList.length + easyList.length + mediumList.length + hardList.length;

        return {
            total: total > 0 ? total : null,
            easy: easyList.length || null,
            medium: mediumList.length || null,
            hard: hardList.length || null,
            heatmapJson,
            totalDays,
            ...(schoolList.length > 0 && { schoolList }),
            ...(basicList.length > 0 && { basicList }),
            ...(easyList.length > 0 && { easyList }),
            ...(mediumList.length > 0 && { mediumList }),
            ...(hardList.length > 0 && { hardList })
        };
    } catch (e) {
        console.warn("Could not fetch detailed GFG problems, fallback to mock lists", e);
        return null;
    }
}

// ---- Profile list with fetchers ----
const profileList = [
    { ...PROFILES.leetcode, key: 'leetcode', fetcher: () => fetchLeetCodeLive(PROFILES.leetcode.username) },
    { ...PROFILES.gfg, key: 'gfg', fetcher: () => fetchGFGLive(PROFILES.gfg.username) },
    { ...PROFILES.hackerrank, key: 'hackerrank', fetcher: null },
];

// ---- UI Components ----

function DifficultyBar({ easy, medium, hard, total }) {
    if (!total || total === 0) return null;
    const easyPct = ((easy || 0) / total) * 100;
    const medPct = ((medium || 0) / total) * 100;
    const hardPct = ((hard || 0) / total) * 100;
    return (
        <div className="cp__diff-bar">
            <div className="cp__diff-fill cp__diff-fill--easy" style={{ width: `${easyPct}%` }}></div>
            <div className="cp__diff-fill cp__diff-fill--medium" style={{ width: `${medPct}%` }}></div>
            <div className="cp__diff-fill cp__diff-fill--hard" style={{ width: `${hardPct}%` }}></div>
        </div>
    );
}

function Modal({ profile, stats, isLive, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    const hasBreakdown = stats.easy != null || stats.medium != null || stats.hard != null;

    return (
        <div className="cp__overlay" onClick={onClose}>
            <div className="cp__modal glass-card" onClick={(e) => e.stopPropagation()}>
                <div className="cp__modal-header">
                    <div className="cp__modal-identity">
                        <span className="cp__modal-icon" style={{ background: `${profile.color}18`, color: profile.color }}>
                            {profile.icon}
                        </span>
                        <div>
                            <h3 className="cp__modal-name">{profile.name}</h3>
                            <p className="cp__modal-user">@{profile.username}</p>
                        </div>
                    </div>
                    <button className="cp__modal-close" onClick={onClose} aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    </button>
                </div>

                <p className="cp__modal-desc">{profile.description}</p>

                <div className="cp__modal-stats">
                    <div className="cp__modal-total-card" style={{ borderColor: `${profile.color}30` }}>
                        <span className="cp__modal-total-num" style={{ color: profile.color }}>{stats.total}</span>
                        <div>
                            <span className="cp__modal-total-label">Problems Solved</span>
                            {isLive && <span className="cp__modal-live-badge">● Live</span>}
                        </div>
                    </div>

                    {hasBreakdown && (
                        <>
                            <DifficultyBar easy={stats.easy} medium={stats.medium} hard={stats.hard} total={stats.total} />
                            <div className="cp__modal-breakdown">
                                {stats.easy != null && (
                                    <div className="cp__modal-diff">
                                        <div className="cp__modal-diff-dot" style={{ background: '#10b981' }}></div>
                                        <span className="cp__modal-diff-label">Easy</span>
                                        <span className="cp__modal-diff-value" style={{ color: '#10b981' }}>{stats.easy}</span>
                                    </div>
                                )}
                                {stats.medium != null && (
                                    <div className="cp__modal-diff">
                                        <div className="cp__modal-diff-dot" style={{ background: '#f59e0b' }}></div>
                                        <span className="cp__modal-diff-label">Medium</span>
                                        <span className="cp__modal-diff-value" style={{ color: '#f59e0b' }}>{stats.medium}</span>
                                    </div>
                                )}
                                {stats.hard != null && (
                                    <div className="cp__modal-diff">
                                        <div className="cp__modal-diff-dot" style={{ background: '#ef4444' }}></div>
                                        <span className="cp__modal-diff-label">Hard</span>
                                        <span className="cp__modal-diff-value" style={{ color: '#ef4444' }}>{stats.hard}</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                <a href={profile.url} target="_blank" rel="noopener noreferrer" className="cp__modal-visit-btn" style={{ background: `${profile.color}15`, color: profile.color, borderColor: `${profile.color}30` }}>
                    Visit {profile.name} Profile
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </a>
            </div>
        </div>
    );
}

function ProfileCard({ profile, onClick }) {
    const [stats, setStats] = useState(profile.stats);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        if (!profile.fetcher) return;
        let cancelled = false;
        profile.fetcher().then((liveData) => {
            if (!cancelled && liveData && liveData.total != null) {
                setStats(prev => ({ ...prev, ...liveData }));
                setIsLive(true);
            }
        });
        return () => { cancelled = true; };
    }, []);

    const hasBreakdown = stats.easy != null;

    return (
        <div className="cp__card glass-card fade-in" onClick={() => onClick(profile, stats, isLive)} style={{ '--comp-color': profile.color }}>
            <div className="cp__card-glow"></div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem', height: '100%' }}>
                <div className="cp__card-header">
                    <span className="cp__icon" style={{ background: `${profile.color}15`, color: profile.color }}>
                        {profile.icon}
                    </span>
                    <div>
                        <h3 className="cp__name">{profile.name}</h3>
                        <p className="cp__username">@{profile.username}</p>
                    </div>
                    {isLive && <span className="cp__live-dot" title="Live data">●</span>}
                </div>

                {profile.highlight && (
                    <div className="cp__highlight" style={{ borderColor: `${profile.color}30`, background: `${profile.color}05` }}>
                        <span className="cp__highlight-icon">{profile.highlight.icon}</span>
                        <span className="cp__highlight-value" style={{ color: profile.color }}>{profile.highlight.value}</span>
                        <span className="cp__highlight-label">{profile.highlight.label}</span>
                    </div>
                )}

                <div className="cp__stats">
                    <div className="cp__total">
                        <span className="cp__total-value" style={{ color: profile.color }}>{stats.total}</span>
                        <span className="cp__total-label">Solved</span>
                    </div>
                    {hasBreakdown && (
                        <div className="cp__breakdown">
                            <div className="cp__stat-row">
                                <span className="cp__stat-label">Easy</span>
                                <span className="cp__stat-value" style={{ color: '#10b981' }}>{stats.easy}</span>
                            </div>
                            <div className="cp__stat-row">
                                <span className="cp__stat-label">Medium</span>
                                <span className="cp__stat-value" style={{ color: '#f59e0b' }}>{stats.medium}</span>
                            </div>
                            <div className="cp__stat-row">
                                <span className="cp__stat-label">Hard</span>
                                <span className="cp__stat-value" style={{ color: '#ef4444' }}>{stats.hard}</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="cp__card-cta" style={{ color: profile.color }}>
                    <span>View Details</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="cp__cta-arrow">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function CodingProfiles() {
    const [modal, setModal] = useState(null);
    const [showLCModal, setShowLCModal] = useState(false);
    const [showGFGModal, setShowGFGModal] = useState(false);
    const [gfgStats, setGfgStats] = useState(null);

    const openModal = (profile, stats, isLive) => {
        // LeetCode gets the rich modal
        if (profile.key === 'leetcode') {
            setShowLCModal(true);
            return;
        }
        // GeeksforGeeks gets the rich modal
        if (profile.key === 'gfg') {
            setGfgStats(stats);
            setShowGFGModal(true);
            return;
        }
        setModal({ profile, stats, isLive });
    };

    return (
        <section className="cp section" id="coding-profiles">
            <div className="container">
                <div className="section-header fade-in">
                    <h2 className="section-title">Coding Profiles</h2>
                    <p className="section-subtitle">
                        Competitive programming and problem-solving across platforms
                    </p>
                </div>

                <div className="cp__grid">
                    {profileList.map((profile, i) => (
                        <div className="fade-in" key={profile.key} style={{ transitionDelay: `${i * 0.1}s` }}>
                            <ProfileCard profile={profile} onClick={openModal} />
                        </div>
                    ))}
                </div>
            </div>

            {modal && (
                <Modal
                    profile={modal.profile}
                    stats={modal.stats}
                    isLive={modal.isLive}
                    onClose={() => setModal(null)}
                />
            )}

            {showLCModal && (
                <LeetCodeModal onClose={() => setShowLCModal(false)} />
            )}

            {showGFGModal && (
                <GeeksforGeeksModal
                    isOpen={showGFGModal}
                    onClose={() => setShowGFGModal(false)}
                    username="khantawfeek00"
                    stats={gfgStats}
                />
            )}
        </section>
    );
}
