import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Save, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { ProcessStepItem } from '../../types/cms';

export const ProcessStepsManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const steps = draftState.processSteps || [];

  const handleUpdate = (updatedSteps: ProcessStepItem[]) => {
    updateDraft(prev => ({ ...prev, processSteps: updatedSteps }));
  };

  const handleChange = (id: number, field: keyof ProcessStepItem, value: string) => {
    const newSteps = steps.map(s => s.id === id ? { ...s, [field]: value } : s);
    handleUpdate(newSteps);
  };

  const handleAdd = () => {
    const maxId = steps.length > 0 ? Math.max(...steps.map(s => s.id)) : 0;
    const newStep: ProcessStepItem = {
      id: maxId + 1,
      titleEn: 'New Step',
      titleMr: 'नवीन टप्पा',
      descEn: 'Description here',
      descMr: 'येथे वर्णन करा'
    };
    handleUpdate([...steps, newStep]);
  };

  const handleRemove = (id: number) => {
    handleUpdate(steps.filter(s => s.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === steps.length - 1) return;

    const newSteps = [...steps];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newSteps[index], newSteps[targetIndex]] = [newSteps[targetIndex], newSteps[index]];
    handleUpdate(newSteps);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-cms-card font-bold text-white font-rajwada">Order Process Steps</h2>
          <p className="text-cms-body text-slate-400 mt-1">Manage the visual steps from Order to Delivery.</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl font-bold text-cms-body flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Step
        </button>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.id} className="p-4 sm:p-6 rounded-2xl bg-slate-800 border border-slate-700 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="text-cms-body font-bold text-amber-400">Step {index + 1}</div>
              <div className="flex gap-2">
                <button onClick={() => handleMove(index, 'up')} disabled={index === 0} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={() => handleMove(index, 'down')} disabled={index === steps.length - 1} className="p-1 text-slate-400 hover:text-white disabled:opacity-30">
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button onClick={() => handleRemove(step.id)} className="p-1 text-rose-400 hover:text-rose-300 ml-2">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-cms-small font-bold text-slate-400 mb-1">Title (EN)</label>
                <input
                  type="text"
                  value={step.titleEn}
                  onChange={e => handleChange(step.id, 'titleEn', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-cms-body text-white"
                />
              </div>
              <div>
                <label className="block text-cms-small font-bold text-slate-400 mb-1">Title (MR)</label>
                <input
                  type="text"
                  value={step.titleMr}
                  onChange={e => handleChange(step.id, 'titleMr', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-cms-body text-white"
                />
              </div>
              <div>
                <label className="block text-cms-small font-bold text-slate-400 mb-1">Description (EN)</label>
                <textarea
                  value={step.descEn}
                  onChange={e => handleChange(step.id, 'descEn', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-cms-body text-white h-20"
                />
              </div>
              <div>
                <label className="block text-cms-small font-bold text-slate-400 mb-1">Description (MR)</label>
                <textarea
                  value={step.descMr}
                  onChange={e => handleChange(step.id, 'descMr', e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-cms-body text-white h-20"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



