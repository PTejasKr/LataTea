import React, { useState, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MediaItem } from '../../types/cms';
import { cmsStore } from '../../services/cmsStore';
import { Image as ImageIcon, Upload, Search, Trash2, Eye, FileText, Check, AlertCircle } from 'lucide-react';

export const MediaLibraryView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMedia = draftState.mediaLibrary.filter(m =>
    m.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.alt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await cmsStore.uploadFile(file);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDeleteMedia = (id: string) => {
    if (window.confirm('Delete this asset from media library? (Slots referencing it will fallback)')) {
      updateDraft(prev => ({
        ...prev,
        mediaLibrary: prev.mediaLibrary.filter(m => m.id !== id)
      }));
      if (selectedMedia?.id === id) setSelectedMedia(null);
    }
  };

  const handleUpdateAlt = (id: string, alt: string) => {
    updateDraft(prev => ({
      ...prev,
      mediaLibrary: prev.mediaLibrary.map(m => (m.id === id ? { ...m, alt } : m))
    }));
    if (selectedMedia?.id === id) {
      setSelectedMedia(prev => (prev ? { ...prev, alt } : null));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-cms-section text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-amber-400" />
            <span>Media Library & Asset Manager</span>
          </h2>
          <p className="text-cms-small text-slate-400 mt-1">
            Upload, inspect, and organize image assets (PNG, JPG, WebP, SVG).
          </p>
        </div>

        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-cms-small flex items-center gap-1.5 shadow-md disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>{isUploading ? 'Uploading...' : 'Upload Asset'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1E293B] border border-slate-700">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search media by filename or alt text..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-white text-cms-small placeholder-slate-500 focus:outline-none"
        />
      </div>

      {/* Asset Grid & Details Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Media Grid */}
        <div className={selectedMedia ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredMedia.map(media => {
              const isSelected = selectedMedia?.id === media.id;
              return (
                <div
                  key={media.id}
                  onClick={() => setSelectedMedia(media)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 shadow-md ring-1 ring-amber-400'
                      : 'bg-[#1E293B] border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                  }`}
                >
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center mb-2">
                    <img src={media.url} alt={media.alt} className="w-full h-full object-contain p-1" />
                  </div>
                  <div>
                    <div className="font-bold text-cms-small text-white truncate">{media.filename}</div>
                    <div className="flex items-center justify-between text-cms-small text-slate-400 mt-1">
                      <span>{media.fileSize || 'Asset'}</span>
                      <span className="uppercase text-amber-400/80">{media.mediaType?.split('/')[1] || 'img'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Media Details Panel */}
        {selectedMedia && (
          <div className="lg:col-span-4 p-6 rounded-3xl bg-[#1E293B] border border-slate-700 shadow-xl space-y-4 text-cms-small">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700">
              <h3 className="font-bold text-white text-cms-body">Asset Metadata</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2">
              <img src={selectedMedia.url} alt={selectedMedia.alt} className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-slate-400 font-bold uppercase text-cms-small mb-1">
                  Filename
                </label>
                <div className="font-mono text-white break-all bg-slate-900 p-2 rounded-lg border border-slate-800">
                  {selectedMedia.filename}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-bold uppercase text-cms-small mb-1">
                  Alt Text (SEO & Accessibility)
                </label>
                <input
                  type="text"
                  value={selectedMedia.alt}
                  onChange={e => handleUpdateAlt(selectedMedia.id, e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-sans text-cms-small"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 text-cms-small text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="block text-slate-500">File Size:</span>
                  <span className="text-white font-bold">{selectedMedia.fileSize || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-slate-500">MIME Type:</span>
                  <span className="text-white font-bold">{selectedMedia.mediaType}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => handleDeleteMedia(selectedMedia.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Asset</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};



