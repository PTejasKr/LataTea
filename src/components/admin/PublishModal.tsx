import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { cmsStore } from '../../services/cmsStore';
import { 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  RotateCcw, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  Activity
} from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  const { draftState, publish, discardDraft, hasDraftChanges, setActiveView } = useCMS();
  const [publishSuccess, setPublishSuccess] = useState(false);

  if (!isOpen) return null;

  const issues = cmsStore.validateState(draftState);
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');

  const handleConfirmPublish = async () => {
    const res = await publish();
    if (res.success) {
      setPublishSuccess(true);
      setTimeout(() => {
        setPublishSuccess(false);
        onClose();
      }, 1800);
    }
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard all pending draft changes?')) {
      discardDraft();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1E293B] border border-slate-700 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-xs">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-[#1E293B] p-6 border-b border-slate-700 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold uppercase tracking-wider text-[10px] mb-2 border border-amber-500/30">
            <Activity className="w-3.5 h-3.5" />
            <span>Pre-Deployment Safety Gate</span>
          </div>

          <h3 className="font-bold text-xl text-white">
            Publish Content to Public Website
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Validating draft state against 9 production integrity rules before deploying live.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {publishSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl text-white">
                Website Successfully Published!
              </h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                All changes have been committed to the live public endpoint. The website is now live with your latest updates.
              </p>
            </div>
          ) : (
            <>
              {/* Validation Status Box */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-xs">
                  <span className="text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Audit Checklist Status</span>
                  </span>
                  <span className={errors.length === 0 ? 'text-emerald-400' : 'text-rose-400'}>
                    {errors.length === 0 ? 'Ready to Deploy' : `${errors.length} Critical Issue(s)`}
                  </span>
                </div>

                {/* Errors if any */}
                {errors.length > 0 && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-1">
                    <div className="font-bold text-rose-400 flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5" />
                      <span>Errors (Deployment Blocked):</span>
                    </div>
                    {errors.map(err => (
                      <div key={err.id} className="text-[11px] text-rose-300">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1">
                    <div className="font-bold text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Quality Warnings ({warnings.length}):</span>
                    </div>
                    {warnings.slice(0, 3).map(warn => (
                      <div key={warn.id} className="text-[11px] text-slate-300">
                        • {warn.message}
                      </div>
                    ))}
                  </div>
                )}

                {errors.length === 0 && warnings.length === 0 && (
                  <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Zero validation issues detected. All content models are complete.</span>
                  </div>
                )}
              </div>

              {/* Publication Scope Summary */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Tea Stories</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {(draftState.teaStories || []).filter(p => p.isVisible).length}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Media Slots</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {Object.keys(draftState.mediaSlots).length}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Menu Links</div>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {draftState.navigation.filter(n => n.isEnabled).length}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={!hasDraftChanges}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Discard Draft</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={errors.length > 0}
                    onClick={handleConfirmPublish}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider text-xs flex items-center gap-2 shadow-lg disabled:opacity-40"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Confirm & Deploy Live</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
};
