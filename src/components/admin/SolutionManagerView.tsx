import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { SolutionItem } from '../../types/cms';
import { 
  Building2, 
  Hotel, 
  Utensils, 
  Coffee, 
  Store, 
  Cpu, 
  Edit3, 
  Save, 
  Check, 
  Plus, 
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react';

export const SolutionManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const solutions = draftState.solutions || [];

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(solutions[0]?.id || '');
  const [saveToast, setSaveToast] = useState(false);

  const selectedSolution = solutions.find(s => s.id === selectedSolutionId) || solutions[0];

  const handleUpdateCurrentSolution = (updates: Partial<SolutionItem>) => {
    if (!selectedSolution) return;
    const updatedList = solutions.map(s => 
      s.id === selectedSolution.id ? { ...s, ...updates } : s
    );
    updateDraft(prev => ({ ...prev, solutions: updatedList }));
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleToggleEnable = (id: string) => {
    const updatedList = solutions.map(s => 
      s.id === id ? { ...s, isEnabled: !s.isEnabled } : s
    );
    updateDraft(prev => ({ ...prev, solutions: updatedList }));
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Building2 className="w-6 h-6 text-emerald-400" />
            <span>B2B & HoReCa Solutions Manager</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage the 6 commercial industry pages, value propositions, benefits, and recommended formulations.
          </p>
        </div>

        {saveToast && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-fade-in">
            <Check className="w-4 h-4" />
            <span>Changes Saved to Draft</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Solution Selector Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
            Industry Sectors ({solutions.length})
          </div>

          {solutions.map(sol => (
            <button
              key={sol.id}
              type="button"
              onClick={() => setSelectedSolutionId(sol.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                selectedSolutionId === sol.id
                  ? 'bg-slate-800 border-emerald-400 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div>
                <div className="text-xs font-bold">{sol.title}</div>
                <div className="text-[10px] text-slate-400 truncate max-w-[180px]">
                  /solutions/{sol.slug}
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleEnable(sol.id);
                }}
                className={`p-1.5 rounded-lg ${sol.isEnabled ? 'text-emerald-400 hover:bg-emerald-500/20' : 'text-slate-500 hover:bg-slate-800'}`}
                title={sol.isEnabled ? 'Active' : 'Disabled'}
              >
                {sol.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </button>
          ))}
        </div>

        {/* Selected Solution Edit Form */}
        {selectedSolution && (
          <div className="lg:col-span-8 bg-slate-900/80 border border-slate-700 rounded-3xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{selectedSolution.title}</h3>
                <span className="text-xs text-emerald-400 font-mono">Route: /solutions/{selectedSolution.slug}</span>
              </div>

              <a
                href={`#/solutions/${selectedSolution.slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-amber-300 hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Live View ↗</span>
              </a>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Page Title</label>
                <input
                  type="text"
                  value={selectedSolution.title}
                  onChange={e => handleUpdateCurrentSolution({ title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Subheading / Value Pitch</label>
                <input
                  type="text"
                  value={selectedSolution.subtitle}
                  onChange={e => handleUpdateCurrentSolution({ subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">Commercial Challenge / Problem Statement</label>
                <textarea
                  rows={3}
                  value={selectedSolution.problemStatement}
                  onChange={e => handleUpdateCurrentSolution({ problemStatement: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">The Lata Tea Solution</label>
                <textarea
                  rows={3}
                  value={selectedSolution.lataSolution}
                  onChange={e => handleUpdateCurrentSolution({ lataSolution: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:border-emerald-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Key Business Benefits</label>
                <div className="space-y-3">
                  {selectedSolution.benefits.map((b, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
                      <input
                        type="text"
                        value={b.title}
                        onChange={e => {
                          const updated = [...selectedSolution.benefits];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          handleUpdateCurrentSolution({ benefits: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold focus:border-emerald-400 focus:outline-none"
                      />
                      <textarea
                        rows={2}
                        value={b.description}
                        onChange={e => {
                          const updated = [...selectedSolution.benefits];
                          updated[idx] = { ...updated[idx], description: e.target.value };
                          handleUpdateCurrentSolution({ benefits: updated });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs focus:border-emerald-400 focus:outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
