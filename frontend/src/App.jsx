import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Code2, Terminal, HelpCircle, AlertCircle, Sparkles } from 'lucide-react';
import { uploadAndReviewCode } from './services/api';
import ReviewDashboard from './components/ReviewDashboard';

export default function App() {
    const [file, setFile] = useState(null);
    const [rawCode, setRawCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setError('');

            const reader = new FileReader();
            reader.onload = (event) => setRawCode(event.target.result);
            reader.readAsText(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a valid repository file first.');
            return;
        }
        setLoading(true);
        setResult(null);
        setError('');

        try {
            const data = await uploadAndReviewCode(file, language);
            setResult(data);
        } catch (err) {
            setError(err.response?.data?.detail || 'Engine failed to process code alignment.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-100 font-sans antialiased selection:bg-indigo-500/30 overflow-x-hidden">

            {/* Background Glow Deco */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />

            {/* Header */}
            <header className="border-b border-slate-800/60 bg-[#0b0f19]/50 backdrop-blur-xl sticky top-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                            className="bg-gradient-to-tr from-indigo-600 to-violet-500 p-2.5 rounded-xl text-white shadow-xl shadow-indigo-500/10"
                        >
                            <Code2 className="w-5 h-5" />
                        </motion.div>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
                                Core Review Node <span className="text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-md font-mono">v1.5</span>
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> Live Dev-Server</span>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="max-w-7xl mx-auto py-10 px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">

                {/* Left Form Control */}
                <div className="lg:col-span-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-[#0b0f19]/60 backdrop-blur-md p-6 rounded-2xl border border-slate-800/80 shadow-2xl space-y-6 sticky top-24"
                    >
                        <div>
                            <h2 className="text-sm font-bold text-white tracking-wide uppercase flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-indigo-400" /> Pipeline Settings
                            </h2>
                            <p className="text-xs text-slate-400 mt-1">Deploy raw scripts into the machine-learning audit node.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Target Language</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full p-3 bg-[#030712] border border-slate-800 hover:border-slate-700 rounded-xl outline-none text-slate-200 font-medium text-sm transition-all focus:border-indigo-500"
                                >
                                    <option value="python">Python Project (.py)</option>
                                    <option value="javascript">JavaScript Platform (.js, .jsx)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Payload Source</label>
                                <label className="group border-2 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-xl p-6 transition-all bg-[#030712]/50 flex flex-col items-center justify-center cursor-pointer relative overflow-hidden">
                                    <input type="file" onChange={handleFileChange} accept=".py,.js,.jsx" className="hidden" />
                                    <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors mb-2" />
                                    <span className="text-xs font-medium text-slate-300 text-center truncate max-w-full px-2">
                                        {file ? file.name : 'Select script asset'}
                                    </span>
                                </label>
                            </div>

                            <AnimatePresence mode="wait">
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-3 bg-rose-500/5 text-rose-400 text-xs font-medium rounded-xl border border-rose-500/15 flex items-center gap-2"
                                    >
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all text-xs tracking-wider uppercase"
                            >
                                {loading ? 'Analyzing Syntaxes...' : 'Execute Diagnostic'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>

                {/* Right Dashboard Area */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-24 bg-[#0b0f19]/40 border border-slate-800/80 rounded-2xl shadow-2xl relative overflow-hidden"
                            >
                                <div className="w-10 h-10 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin mb-4" />
                                <p className="text-xs font-bold tracking-widest text-slate-200 uppercase">Compiling Syntax Map</p>
                            </motion.div>
                        )}

                        {!loading && !result && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-32 border border-dashed border-slate-800/80 rounded-2xl text-slate-500"
                            >
                                <Terminal className="w-12 h-12 mb-3 text-slate-700 animate-pulse-slow" />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node Idle</p>
                                <p className="text-[11px] text-slate-500 mt-1">Awaiting data stream injection from control deck.</p>
                            </motion.div>
                        )}

                        {!loading && result && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                <ReviewDashboard result={result} rawCode={rawCode} language={language} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}