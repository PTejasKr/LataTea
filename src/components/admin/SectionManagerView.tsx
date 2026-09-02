import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { SectionConfig } from '../../types/cms';
import { Layers, Eye, EyeOff, ArrowUp, ArrowDown, Check } from 'lucide-react';

export const SectionManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const sections = draftState.sections;

  const handleToggle = (id: string) => {
    updateDraft(prev => ({
      ...prev,
      sections: prev.sections.map(s => (s.id === id ? { ...s, isEnabled: !s.isEnabled } : s))
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const list = [...sections];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateDraft(prev => ({
      ...prev,
      sections: reordered
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="pb-4 border-b border-slate-700">
        <h2 className="text-cms-section text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <span>Homepage Section Management</span>
        </h2>
        <p className="text-cms-small text-slate-400 mt-1">
          Enable, disable, and organize public website sections.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4">
        <div className="space-y-3">
          {sections.map((section, idx) => (
            <div
              key={section.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                section.isEnabled
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-900/30 border-slate-800/40 opacity-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono font-bold text-cms-small flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div>
                  <div className="font-bold text-white text-cms-body flex items-center gap-2">
                    <span>{section.name}</span>
                    <span className="font-mono text-cms-small text-amber-400">#{section.key}</span>
                  </div>
                  <p className="text-cms-small text-slate-400 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <button
                  onClick={() => handleToggle(section.id)}
                  className={`px-3 py-1.5 rounded-xl text-cms-btn flex items-center gap-1.5 transition-colors ${
                    section.isEnabled
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {section.isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{section.isEnabled ? 'Active' : 'Disabled'}</span>
                </button>

                <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


