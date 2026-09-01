import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaSlot, ObjectFitMode } from '../../types/cms';
import { 
  Crosshair, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Image as ImageIcon, 
  RotateCcw, 
  Check, 
  Layers, 
  Sliders, 
  Upload, 
  FolderOpen 
} from 'lucide-react';

export const ImagePositionEditorView: React.FC = () => {
  const { draftState, updateDraft, getMediaItem } = useCMS();
  const slots = Object.values(draftState.mediaSlots);

  const [selectedSlotKey, setSelectedSlotKey] = useState<string>(slots[0]?.slotKey || 'HOME_HERO_PRIMARY');
  const [activeDevicePreview, setActiveDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isEditingMobileOverrides, setIsEditingMobileOverrides] = useState(false);
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const currentSlot = draftState.mediaSlots[selectedSlotKey] || slots[0];
  const targetImageId = (isEditingMobileOverrides && currentSlot?.mobileImageId) 
    ? currentSlot.mobileImageId 
    : currentSlot?.desktopImageId;

  const currentMedia = getMediaItem(targetImageId || '', true);

  const focalX = isEditingMobileOverrides 
    ? (currentSlot?.mobileFocalX ?? currentSlot?.focalX ?? 50)
    : (currentSlot?.focalX ?? 50);

  const focalY = isEditingMobileOverrides 
    ? (currentSlot?.mobileFocalY ?? currentSlot?.focalY ?? 50)
    : (currentSlot?.focalY ?? 50);

  const imageRef = useRef<HTMLImageElement>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const clampedX = Math.max(0, Math.min(100, x));
    const clampedY = Math.max(0, Math.min(100, y));

    handleFocalChange(clampedX, clampedY);
  };

  const handleFocalChange = (x: number, y: number) => {
    updateDraft(prev => {
      const slot = prev.mediaSlots[selectedSlotKey];
      if (!slot) return prev;

      const updatedSlot: MediaSlot = isEditingMobileOverrides
        ? { ...slot, mobileFocalX: x, mobileFocalY: y }
        : { ...slot, focalX: x, focalY: y };

      return {
        ...prev,
        mediaSlots: {
          ...prev.mediaSlots,
          [selectedSlotKey]: updatedSlot
        }
      };
    });
  };

  const handleObjectFitChange = (fit: ObjectFitMode) => {
    updateDraft(prev => {
      const slot = prev.mediaSlots[selectedSlotKey];
      if (!slot) return prev;
      return {
        ...prev,
        mediaSlots: {
          ...prev.mediaSlots,
          [selectedSlotKey]: { ...slot, objectFit: fit }
        }
      };
    });
  };

  const handleAssignMedia = (mediaId: string) => {
    updateDraft(prev => {
      const slot = prev.mediaSlots[selectedSlotKey];
      if (!slot) return prev;

      const updatedSlot: MediaSlot = isEditingMobileOverrides
        ? { ...slot, mobileImageId: mediaId }
        : { ...slot, desktopImageId: mediaId };

      return {
        ...prev,
        mediaSlots: {
          ...prev.mediaSlots,
          [selectedSlotKey]: updatedSlot
        }
      };
    });
    setShowMediaPicker(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-amber-400" />
              <span>Image Position & Focal Point Editor</span>
            </h2>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              Core CMS Feature
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Click directly on any image to set its optical focal coordinates. Live crop simulation across Desktop, Tablet, and Mobile devices.
          </p>
        </div>

        {/* Device Viewport Preview Selector */}
        <div className="flex items-center bg-slate-900 rounded-xl p-1 border border-slate-700 self-start">
          <button
            onClick={() => setActiveDevicePreview('desktop')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevicePreview === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setActiveDevicePreview('tablet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevicePreview === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setActiveDevicePreview('mobile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeDevicePreview === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Slot Selector + Interactive Canvas + Live Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Slot Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            Named Media Slots ({slots.length})
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {slots.map(slot => {
              const isSelected = slot.slotKey === selectedSlotKey;
              const media = getMediaItem(slot.desktopImageId, true);

              return (
                <div
                  key={slot.slotKey}
                  onClick={() => setSelectedSlotKey(slot.slotKey)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500/60 shadow-md ring-1 ring-amber-500/40'
                      : 'bg-[#1E293B] border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                    {media?.url ? (
                      <img src={media.url} alt={slot.label} className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-xs text-white truncate">{slot.label}</div>
                    <div className="font-mono text-[10px] text-amber-400 truncate">{slot.slotKey}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                      <span>X: {slot.focalX}% Y: {slot.focalY}%</span>
                      <span className="uppercase text-emerald-400 font-semibold">• {slot.objectFit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right Column: Interactive Canvas & Position Controls */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Slot Control Box */}
          <div className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-xl space-y-6">
            
            {/* Slot Header & Target Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {currentSlot?.category} slot
                </span>
                <h3 className="text-base font-bold text-white mt-1">{currentSlot?.label}</h3>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{currentSlot?.slotKey}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Desktop / Mobile Override Switch */}
                <button
                  onClick={() => setIsEditingMobileOverrides(!isEditingMobileOverrides)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                    isEditingMobileOverrides
                      ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>{isEditingMobileOverrides ? 'Mobile Override (Active)' : 'Edit Mobile Override'}</span>
                </button>

                <button
                  onClick={() => setShowMediaPicker(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Replace Image</span>
                </button>
              </div>
            </div>

            {/* Interactive Click-to-Pin Canvas (PDF Spec 6) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Crosshair className="w-4 h-4 text-amber-400" />
                  <span>Interactive Focal Point Canvas (Click to Place Target)</span>
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  Coordinates: X: {focalX}% | Y: {focalY}%
                </span>
              </div>

              <div
                onClick={handleCanvasClick}
                className="relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-700 hover:border-amber-400/80 cursor-crosshair group shadow-inner max-h-[360px] flex items-center justify-center select-none"
              >
                {currentMedia?.url ? (
                  <img
                    ref={imageRef}
                    src={currentMedia.url}
                    alt={currentSlot?.label}
                    className="max-h-[340px] w-auto max-w-full object-contain pointer-events-none opacity-90"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center text-xs text-slate-500">
                    No image linked to slot
                  </div>
                )}

                {/* Visual Target Dot (PDF Spec 6: ● focal point) */}
                <div
                  className="absolute w-8 h-8 -ml-4 -mt-4 pointer-events-none transition-all duration-75 flex items-center justify-center"
                  style={{ left: `${focalX}%`, top: `${focalY}%` }}
                >
                  <div className="w-8 h-8 rounded-full border-2 border-amber-400 bg-amber-400/30 animate-ping absolute" />
                  <div className="w-5 h-5 rounded-full border-2 border-white bg-amber-500 shadow-lg flex items-center justify-center text-[10px] font-bold text-slate-950">
                    ●
                  </div>
                </div>

                {/* Overlay Prompt */}
                <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-[10px] text-slate-300 pointer-events-none">
                  Click anywhere on image to reposition focal center
                </div>
              </div>
            </div>

            {/* Precision Slider Controls (PDF Spec 6) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1.5 font-bold text-slate-300">
                  <span>Focal X Coordinate:</span>
                  <span className="font-mono text-amber-400">{focalX}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={focalX}
                  onChange={e => handleFocalChange(parseInt(e.target.value), focalY)}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5 font-bold text-slate-300">
                  <span>Focal Y Coordinate:</span>
                  <span className="font-mono text-amber-400">{focalY}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={focalY}
                  onChange={e => handleFocalChange(focalX, parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
            </div>

            {/* Object-Fit Mode Selection (PDF Spec 6) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Object Fit Mode (CSS Rendering)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['cover', 'contain', 'scale-down', 'fill'] as ObjectFitMode[]).map(fit => (
                  <button
                    key={fit}
                    onClick={() => handleObjectFitChange(fit)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                      currentSlot?.objectFit === fit
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {fit}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Responsive Viewport Simulation (Desktop / Tablet / Mobile) */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-sky-400" />
                  <span>Real-Time Viewport Crop Simulation ({activeDevicePreview.toUpperCase()})</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  CSS: <code>object-position: {focalX}% {focalY}%</code>
                </span>
              </div>

              {/* Viewport Frame Container */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden min-h-[220px]">
                {activeDevicePreview === 'desktop' && (
                  <div className="w-full max-w-lg aspect-[16/9] rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl relative bg-slate-900">
                    <img
                      src={currentMedia?.url}
                      alt="Desktop Preview"
                      style={{
                        objectFit: currentSlot?.objectFit || 'cover',
                        objectPosition: `${focalX}% ${focalY}%`
                      }}
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      Desktop (16:9)
                    </div>
                  </div>
                )}

                {activeDevicePreview === 'tablet' && (
                  <div className="w-72 aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-700 shadow-2xl relative bg-slate-900">
                    <img
                      src={currentMedia?.url}
                      alt="Tablet Preview"
                      style={{
                        objectFit: currentSlot?.objectFit || 'cover',
                        objectPosition: `${focalX}% ${focalY}%`
                      }}
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      Tablet (4:3)
                    </div>
                  </div>
                )}

                {activeDevicePreview === 'mobile' && (
                  <div className="w-48 aspect-[9/16] rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl relative bg-slate-900">
                    <img
                      src={currentMedia?.url}
                      alt="Mobile Preview"
                      style={{
                        objectFit: currentSlot?.objectFit || 'cover',
                        objectPosition: `${focalX}% ${focalY}%`
                      }}
                      className="w-full h-full"
                    />
                    <div className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded">
                      Mobile (9:16)
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Media Picker Modal */}
      {showMediaPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto p-6 shadow-2xl text-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="font-bold text-base text-white">
                Select Media for Slot: <span className="text-amber-400">{currentSlot?.label}</span>
              </h3>
              <button
                onClick={() => setShowMediaPicker(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {draftState.mediaLibrary.map(media => (
                <div
                  key={media.id}
                  onClick={() => handleAssignMedia(media.id)}
                  className="p-2.5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-400 cursor-pointer transition-all group flex flex-col justify-between"
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center mb-2">
                    <img src={media.url} alt={media.alt} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <div className="font-bold text-white truncate">{media.filename}</div>
                    <div className="text-[10px] text-slate-400">{media.fileSize}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
