import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Lock, ShieldCheck, User, KeyRound, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export const CmsLoginView: React.FC = () => {
  const { loginCms, setActiveView } = useCMS();
  const [username, setUsername] = useState('Murjo Basu');
  const [password, setPassword] = useState('Basu@123');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      const ok = loginCms(username, password);
      if (!ok) {
        setError('Invalid administrative credentials. Access restricted.');
      }
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090E17] text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Lighting */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-latagreen-700/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-lataamber-500/10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-[#162032] border border-slate-700/80 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        
        {/* Top Crest */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-latagreen-800 to-latagreen-950 border border-amber-400/40 mx-auto flex items-center justify-center text-amber-300 font-serif font-black text-2xl shadow-xl">
            LT
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-500/30 mt-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Administrative Security Gate</span>
          </div>

          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
            Media Management System
          </h1>
          <p className="text-xs text-slate-400">
            Sign in with authorized administrator credentials to manage public website content.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Murjo Basu"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Secret Password
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Basu@123"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Lock className="w-4 h-4" />
              <span>{isLoading ? 'Authenticating...' : 'Access CMS Dashboard'}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </form>

        {/* Back to Public site */}
        <div className="pt-4 border-t border-slate-700/60 text-center">
          <button
            onClick={() => {
              window.location.hash = '';
              setActiveView('public');
            }}
            className="text-xs text-slate-400 hover:text-amber-300 transition-colors"
          >
            ← Return to Public LataTea Website
          </button>
        </div>

      </div>
    </div>
  );
};
