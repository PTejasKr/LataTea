import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { cmsStore } from '../../services/cmsStore';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, FolderOpen } from 'lucide-react';

interface ImageSlotPickerProps {
  slotKey: string;
  label?: string;
  helperText?: string;
  compact?: boolean;
}

export const ImageSlotPicker: React.FC<ImageSlotPickerProps> = ({
  slotKey,
  label = 'Section Imagery',
  helperText,
  compact = false
}) => {
  const { draftState, updateDraft, resolveSlotImage } = useCMS();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showLibrary, setShowLibrary] = useState(false);

  // Resolve current draft image
  const resolved = resolveSlotImage(slotKey, false, true);
  const slot = draftState.mediaSlots[slotKey];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const newMedia = await cmsStore.uploadFile(file);
      // Link slot to this new media
      updateDraft(prev => ({
        ...prev,
        mediaSlots: {
          ...prev.mediaSlots,
          [slotKey]: {
            ...(prev.mediaSlots[slotKey] || {
              id: 'slot_' + slotKey.toLowerCase(),
              slotKey,
              label: label,
              category: 'general',
              focalX: 50,
              focalY: 50,
              objectFit: 'cover'
            }),
            desktopImageId: newMedia.id,
            mobileImageId: newMedia.id
          }
        }
      }));
    } catch (err) {
      console.error('Failed to upload image:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleApplyUrl = () => {
    if (!imageUrl.trim()) return;
    const newMedia = cmsStore.addMediaByUrl(imageUrl, slotKey.toLowerCase() + '.jpg', label);
    updateDraft(prev => ({
      ...prev,
      mediaSlots: {
        ...prev.mediaSlots,
        [slotKey]: {
          ...(prev.mediaSlots[slotKey] || {
            id: 'slot_' + slotKey.toLowerCase(),
            slotKey,
            label: label,
            category: 'general',
            focalX: 50,
            focalY: 50,
            objectFit: 'cover'
          }),
          desktopImageId: newMedia.id,
          mobileImageId: newMedia.id
        }
      }
    }));
    setImageUrl('');
    setShowUrlInput(false);
  };

  const handleSelectFromLibrary = (mediaId: string) => {
    updateDraft(prev => ({
      ...prev,
      mediaSlots: {
        ...prev.mediaSlots,
        [slotKey]: {
          ...(prev.mediaSlots[slotKey] || {
            id: 'slot_' + slotKey.toLowerCase(),
            slotKey,
            label: label,
            category: 'general',
            focalX: 50,
            focalY: 50,
            objectFit: 'cover'
          }),
          desktopImageId: mediaId,
          mobileImageId: mediaId
        }
      }
    }));
    setShowLibrary(false);
  };

  return (
    <div className={`rounded-sm bg-[#0a0a0a] border border-[#222] ${compact ? 'p-3' : 'p-4 sm:p-5'} space-y-3`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#1f1f1f]">
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <ImageIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span>{label}</span>
          </div>
          {helperText && (
            <p className="text-[11px] text-neutral-400 mt-0.5">{helperText}</p>
          )}
        </div>
        <span className="text-[10px] font-mono text-neutral-400 bg-[#141414] px-2 py-0.5 rounded-sm border border-[#262626] self-start sm:self-auto">
          Slot: {slotKey}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Thumbnail Preview */}
        <div className="w-full sm:w-28 h-28 shrink-0 rounded-sm overflow-hidden bg-[#111] border border-[#2a2a2a] relative group">
          <img
            src={resolved.url}
            alt={resolved.alt || label}
            style={resolved.style}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-medium p-1 text-center">
            Active Image
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex-1 space-y-2.5 w-full">
          <div className="flex flex-wrap items-center gap-2">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-1.5 rounded-sm bg-white text-black hover:bg-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer min-h-[32px] disabled:opacity-50"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowLibrary(!showLibrary)}
              className="px-3 py-1.5 rounded-sm bg-[#161616] hover:bg-[#222] text-neutral-200 border border-[#333] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer min-h-[32px]"
            >
              <FolderOpen className="w-3.5 h-3.5 text-neutral-400" />
              <span>Media Library</span>
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-1.5 rounded-sm bg-[#161616] hover:bg-[#222] text-neutral-200 border border-[#333] text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer min-h-[32px]"
            >
              <LinkIcon className="w-3.5 h-3.5 text-neutral-400" />
              <span>Paste URL</span>
            </button>
          </div>

          {/* Optional Paste URL Bar */}
          {showUrlInput && (
            <div className="flex items-center gap-2 pt-1 animate-in fade-in">
              <input
                type="url"
                placeholder="https://example.com/tea-photo.jpg"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-sm bg-[#141414] border border-[#333] text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400"
              />
              <button
                type="button"
                onClick={handleApplyUrl}
                className="px-3 py-1.5 rounded-sm bg-neutral-200 hover:bg-white text-black text-xs font-bold transition-colors cursor-pointer"
              >
                Apply
              </button>
            </div>
          )}

          {/* Quick Media Library Picker Tray */}
          {showLibrary && (
            <div className="p-3 bg-[#111] border border-[#262626] rounded-sm space-y-2 mt-2 animate-in fade-in">
              <div className="text-[11px] text-neutral-400 font-medium flex items-center justify-between">
                <span>Select asset from library:</span>
                <button 
                  onClick={() => setShowLibrary(false)}
                  className="text-neutral-500 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-36 overflow-y-auto p-1">
                {(draftState.mediaLibrary || []).map(media => {
                  const isCurrent = slot?.desktopImageId === media.id;
                  return (
                    <button
                      key={media.id}
                      type="button"
                      onClick={() => handleSelectFromLibrary(media.id)}
                      className={`aspect-square rounded-sm overflow-hidden border transition-all relative group cursor-pointer ${
                        isCurrent 
                          ? 'border-white ring-1 ring-white' 
                          : 'border-[#262626] hover:border-[#444]'
                      }`}
                    >
                      <img src={media.url} alt={media.alt} className="w-full h-full object-cover" />
                      {isCurrent && (
                        <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-black flex items-center justify-center text-[9px] font-bold">
                          ✓
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
