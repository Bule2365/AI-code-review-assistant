import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { AlertTriangle, CheckCircle2, Info, ShieldAlert, Sparkles, Trophy, Copy, Check, Terminal, Layers } from 'lucide-react';

export default function ReviewDashboard({ result, rawCode, language }) {
    const [activeSeverity, setActiveSeverity] = useState('all');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [activeIssue, setActiveIssue] = useState(null);
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const decorationsRef = useRef([]);

    // Sinkronisasi bahasa untuk Monaco Editor
    const editorLanguage = language === 'python' ? 'python' : 'javascript';

    // Tangkap instance editor saat dimuat
    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;
    };

    // Efek interaktif: Gulung dan hias baris saat masalah diklik oleh pengguna
    useEffect(() => {
        if (!editorRef.current || !monacoRef.current || !activeIssue || !activeIssue.line) return;

        const editor = editorRef.current;
        const monaco = monacoRef.current;

        // Gulung editor ke baris yang bermasalah tepat di tengah layar
        editor.revealLineInCenter(activeIssue.line);

        // Berikan efek highlight/dekorasi warna merah/kuning di baris tersebut ala VS Code
        const severityColor = activeIssue.severity.toLowerCase() === 'critical' ? 'rgba(244, 63, 94, 0.25)' : 'rgba(245, 158, 11, 0.2)';

        decorationsRef.current = editor.deltaDecorations(decorationsRef.current, [
            {
                range: new monaco.Range(activeIssue.line, 1, activeIssue.line, 1),
                options: {
                    isWholeLine: true,
                    className: 'bg-indigo-500/10 border-l-4 border-indigo-500',
                    linesDecorationsClassName: activeIssue.severity.toLowerCase() === 'critical' ? 'bg-rose-500 w-2' : 'bg-amber-500 w-2',
                    inlineClassName: 'font-bold text-white',
                }
            }
        ]);
    }, [activeIssue]);

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    // Logika Filter Tab
    const filteredIssues = result.issues.filter(issue => {
        if (activeSeverity === 'all') return true;
        return issue.severity.toLowerCase() === activeSeverity;
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] animate-fadeIn">

            {/* PANEL KIRI (7 Kolom): Live Monaco IDE Workspace */}
            <div className="lg:col-span-7 bg-[#1e1e1e] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-full">
                <div className="bg-[#181818] border-b border-slate-800/80 px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
                        <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                        <span>workspace_inspector.{language === 'python' ? 'py' : 'js'}</span>
                    </div>
                    <span className="text-[10px] bg-slate-800 text-slate-400 font-mono px-2 py-0.5 rounded border border-slate-700">
                        Monaco Core Engine
                    </span>
                </div>

                <div className="flex-1 w-full pt-2">
                    <Editor
                        height="100%"
                        language={editorLanguage}
                        theme="vs-dark"
                        value={rawCode}
                        onMount={handleEditorDidMount}
                        options={{
                            readOnly: true,
                            minimap: { enabled: true },
                            fontSize: 13,
                            fontFamily: "Fira Code, JetBrains Mono, Menlo, monospace",
                            lineHeight: 22,
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                            cursorBlinking: "smooth",
                            renderLineHighlight: "all",
                        }}
                    />
                </div>
            </div>

            {/* PANEL KANAN (5 Kolom): Kontrol Laporan Diagnostik & Analisis */}
            <div className="lg:col-span-5 flex flex-col h-full space-y-4 overflow-hidden">

                {/* Ringkasan Eksekutif Mini Card */}
                <div className="p-4 bg-[#0b0f19] border border-slate-800 rounded-2xl flex items-center justify-between gap-4 shadow-lg">
                    <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 text-indigo-400 text-[10px] font-bold tracking-widest uppercase">
                            <Sparkles className="w-3 h-3" />
                            <span>AI Dashboard Summary</span>
                        </div>
                        <p className="text-slate-300 text-xs leading-relaxed truncate">{result.summary}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-black text-white">{result.score}<span className="text-[10px] text-slate-500 font-normal">/100</span></span>
                    </div>
                </div>

                {/* Tab Filter Navigasi */}
                <div className="bg-[#0b0f19] p-1 rounded-xl border border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                    {['all', 'critical', 'warning'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveSeverity(tab); setActiveIssue(null); }}
                            className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all capitalize ${activeSeverity === tab ? 'bg-slate-800 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Scrollable List Terbuka */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                    {filteredIssues.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-2xl p-6 text-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500/60 mb-2" />
                            <p className="text-xs font-bold text-slate-300">No telemetry warnings found</p>
                        </div>
                    ) : (
                        filteredIssues.map((issue, index) => {
                            const isSelected = activeIssue && activeIssue.line === issue.line && activeIssue.description === issue.description;
                            const isCritical = issue.severity.toLowerCase() === 'critical';

                            return (
                                <div
                                    key={index}
                                    onClick={() => setActiveIssue(issue)}
                                    className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer bg-[#0b0f19]/80 border-slate-800/80 hover:border-slate-700 flex flex-col space-y-3 ${isSelected ? 'ring-2 ring-indigo-500/60 border-transparent bg-[#111726]' : ''}`}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-2">
                                            {isCritical ? <ShieldAlert className="w-4 h-4 text-rose-400" /> : <AlertTriangle className="w-4 h-4 text-amber-400" />}
                                            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${isCritical ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                                {issue.category}
                                            </span>
                                        </div>
                                        {issue.line && (
                                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded">
                                                Line {issue.line}
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                                        {issue.description}
                                    </p>

                                    {/* Komponen Dropdown Rekomendasi yang Terbuka Saat Diklik */}
                                    <div className={`space-y-2 pt-2 border-t border-slate-800/60 transition-all ${isSelected ? 'block animate-fadeIn' : 'hidden'}`} onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                                <Layers className="w-3 h-3 text-indigo-400" /> Recommended Resolution:
                                            </span>
                                            <button
                                                onClick={() => handleCopy(issue.suggestion, index)}
                                                className="p-1 bg-[#070a13] hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-md transition-all flex items-center gap-1 text-[9px] font-bold"
                                            >
                                                {copiedIndex === index ? <><Check className="w-3 h-3 text-emerald-400" /> Copied</> : <><Copy className="w-3 h-3" /> Copy</>}
                                            </button>
                                        </div>

                                        <pre className="p-3 bg-[#05070f] rounded-lg border border-slate-800 text-[11px] font-mono text-indigo-200 whitespace-pre-wrap overflow-x-auto leading-relaxed max-h-40 custom-scrollbar">
                                            {issue.suggestion}
                                        </pre>
                                    </div>

                                    {!isSelected && (
                                        <span className="text-[10px] text-indigo-400 font-semibold self-start flex items-center gap-1">
                                            Inspect issue & resolution →
                                        </span>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
}