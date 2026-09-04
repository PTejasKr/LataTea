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
      <div className="bg-[#0a0a0a] border border-[#222] rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl text-cms-small">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-[#1E293B] p-6 border-b border-[#222] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-sm text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-white text-black/20 text-white font-bold uppercase tracking-wider text-cms-small mb-2 border border-[#333]">
            <Activity className="w-3.5 h-3.5" />
            <span>Pre-Deployment Safety Gate</span>
          </div>

          <h3 className="font-bold text-xl text-white">
            Publish Content to Public Website
          </h3>
          <p className="text-cms-small text-neutral-400 mt-1">
            Validating draft state against 9 production integrity rules before deploying live.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {publishSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-sm bg-white text-black flex items-center justify-center mx-auto border border-[#333] animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-bold text-xl text-white">
                Website Successfully Published!
              </h4>
              <p className="text-cms-small text-neutral-300 max-w-sm mx-auto">
                All changes have been committed to the live public endpoint. The website is now live with your latest updates.
              </p>
            </div>
          ) : (
            <>
              {/* Validation Status Box */}
              <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between font-bold text-cms-small">
                  <span className="text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-neutral-300" />
                    <span>Audit Checklist Status</span>
                  </span>
                  <span className={errors.length === 0 ? 'text-neutral-300' : 'text-neutral-400 hover:text-white'}>
                    {errors.length === 0 ? 'Ready to Deploy' : `${errors.length} Critical Issue(s)`}
                  </span>
                </div>

                {/* Errors if any */}
                {errors.length > 0 && (
                  <div className="p-3 rounded-sm bg-neutral-800 text-white/10 border border-[#333] space-y-1">
                    <div className="font-bold text-neutral-400 hover:text-white flex items-center gap-1.5">
                      <X className="w-3.5 h-3.5" />
                      <span>Errors (Deployment Blocked):</span>
                    </div>
                    {errors.map(err => (
                      <div key={err.id} className="text-cms-small text-white">
                        • {err.message}
                      </div>
                    ))}
                  </div>
                )}

                {/* Warnings */}
                {warnings.length > 0 && (
                  <div className="p-3 rounded-sm bg-white text-black/10 border border-[#333] space-y-1">
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Quality Warnings ({warnings.length}):</span>
                    </div>
                    {warnings.slice(0, 3).map(warn => (
                      <div key={warn.id} className="text-cms-small text-neutral-300">
                        • {warn.message}
                      </div>
                    ))}
                  </div>
                )}

                {errors.length === 0 && warnings.length === 0 && (
                  <div className="text-cms-small text-neutral-300 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Zero validation issues detected. All content models are complete.</span>
                  </div>
                )}
              </div>

              {/* Publication Scope Summary */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-sm bg-[#0a0a0a] border border-slate-800">
                  <div className="text-neutral-400 text-cms-small uppercase font-bold">Tea Stories</div>
                  <div className="text-cms-card text-white mt-0.5">
                    {(draftState.teaStories || []).filter(p => p.isVisible).length}
                  </div>
                </div>
                <div className="p-3 rounded-sm bg-[#0a0a0a] border border-slate-800">
                  <div className="text-neutral-400 text-cms-small uppercase font-bold">Media Slots</div>
                  <div className="text-cms-card text-white mt-0.5">
                    {Object.keys(draftState.mediaSlots).length}
                  </div>
                </div>
                <div className="p-3 rounded-sm bg-[#0a0a0a] border border-slate-800">
                  <div className="text-neutral-400 text-cms-small uppercase font-bold">Menu Links</div>
                  <div className="text-cms-card text-white mt-0.5">
                    {draftState.navigation.filter(n => n.isEnabled).length}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[#222]">
                <button
                  type="button"
                  onClick={handleDiscard}
                  disabled={!hasDraftChanges}
                  className="px-4 py-2.5 rounded-sm bg-[#111111] hover:bg-neutral-800 text-white/20 text-neutral-400 hover:text-white text-cms-btn flex items-center gap-1.5 disabled:opacity-40"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Discard Draft</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-sm bg-[#111111] text-neutral-300 hover:bg-[#222222]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    disabled={errors.length > 0}
                    onClick={handleConfirmPublish}
                    className="px-6 py-2.5 rounded-sm bg-[#111111] hover:bg-white text-black font-bold uppercase tracking-wider text-cms-small flex items-center gap-2  disabled:opacity-40"
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



