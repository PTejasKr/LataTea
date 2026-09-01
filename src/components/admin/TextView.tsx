import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Type, Sparkles, Save, Check } from 'lucide-react';

export const TextView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const content = draftState.content;

  const [activeSection, setActiveSection] = useState<'hero' | 'about' | 'applications' | 'prep' | 'order' | 'cta' | 'footer'>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const triggerSaveNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleHeroChange = (field: string, val: string) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        hero: {
          ...prev.content.hero,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  const handleAboutChange = (field: string, val: unknown) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        about: {
          ...prev.content.about,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  const handlePrepChange = (field: string, val: unknown) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        preparation: {
          ...prev.content.preparation,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  const handleOrderingChange = (field: string, val: unknown) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        ordering: {
          ...prev.content.ordering,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  const handleCtaChange = (field: string, val: string) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        cta: {
          ...prev.content.cta,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  const handleFooterChange = (field: string, val: unknown) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        footer: {
          ...prev.content.footer,
          [field]: val
        }
      }
    }));
    triggerSaveNotification();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-amber-400" />
            <span>Website Text & Copywriting Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Every public-facing headline, description, button label, and recipe step is editable here.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Draft Auto-Saved</span>
          </div>
        )}
      </div>

      {/* Section Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'hero', label: 'Hero Banner' },
          { id: 'about', label: 'About & Pillars' },
          { id: 'applications', label: 'Applications' },
          { id: 'prep', label: 'Preparation Recipe' },
          { id: 'order', label: 'Ordering Process' },
          { id: 'cta', label: 'Wholesale CTA' },
          { id: 'footer', label: 'Footer & Legal' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeSection === tab.id
                ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Tab Form */}
      {activeSection === 'hero' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-5">
          <h3 className="text-base font-bold text-white mb-2">Homepage Hero Section</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Top Accent Badge / Tagline
              </label>
              <input
                type="text"
                value={content.hero.tagline}
                onChange={e => handleHeroChange('tagline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={content.hero.headline}
                onChange={e => handleHeroChange('headline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-serif text-lg focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Subheadline
              </label>
              <textarea
                rows={2}
                value={content.hero.subheadline}
                onChange={e => handleHeroChange('subheadline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={content.hero.ctaPrimaryText}
                  onChange={e => handleHeroChange('ctaPrimaryText', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Primary Button Link / Anchor
                </label>
                <input
                  type="text"
                  value={content.hero.ctaPrimaryLink}
                  onChange={e => handleHeroChange('ctaPrimaryLink', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={content.hero.ctaSecondaryText}
                  onChange={e => handleHeroChange('ctaSecondaryText', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  value={content.hero.ctaSecondaryLink}
                  onChange={e => handleHeroChange('ctaSecondaryLink', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm focus:ring-2 focus:ring-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* About Tab Form */}
      {activeSection === 'about' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-6">
          <h3 className="text-base font-bold text-white mb-2">About Us & Quality Pillars</h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  value={content.about.tagline}
                  onChange={e => handleAboutChange('tagline', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Heading</label>
                <input
                  type="text"
                  value={content.about.heading}
                  onChange={e => handleAboutChange('heading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Introductory Summary</label>
              <textarea
                rows={2}
                value={content.about.subheading}
                onChange={e => handleAboutChange('subheading', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Story Paragraph 1</label>
              <textarea
                rows={2}
                value={content.about.storyParagraphs[0] || ''}
                onChange={e => {
                  const arr = [...content.about.storyParagraphs];
                  arr[0] = e.target.value;
                  handleAboutChange('storyParagraphs', arr);
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Story Paragraph 2</label>
              <textarea
                rows={2}
                value={content.about.storyParagraphs[1] || ''}
                onChange={e => {
                  const arr = [...content.about.storyParagraphs];
                  arr[1] = e.target.value;
                  handleAboutChange('storyParagraphs', arr);
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>

            {/* 6 Highlights */}
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400 mb-3">
                6 Brochure Pillars (Why Choose Lata)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {content.about.highlights.map((h, idx) => (
                  <div key={h.id} className="p-3 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                    <input
                      type="text"
                      value={h.title}
                      onChange={e => {
                        const copy = [...content.about.highlights];
                        copy[idx] = { ...copy[idx], title: e.target.value };
                        handleAboutChange('highlights', copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs"
                    />
                    <textarea
                      rows={2}
                      value={h.description}
                      onChange={e => {
                        const copy = [...content.about.highlights];
                        copy[idx] = { ...copy[idx], description: e.target.value };
                        handleAboutChange('highlights', copy);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preparation Tab Form */}
      {activeSection === 'prep' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-6">
          <h3 className="text-base font-bold text-white mb-2">6-Step Preparation Recipe (Brochure Page 5)</h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Heading</label>
                <input
                  type="text"
                  value={content.preparation.heading}
                  onChange={e => handlePrepChange('heading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Batch / Yield Tag</label>
                <input
                  type="text"
                  value={content.preparation.yieldText}
                  onChange={e => handlePrepChange('yieldText', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>
            </div>

            {/* 6 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.preparation.steps.map((st, idx) => (
                <div key={st.stepNumber} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                    <span>Step {st.stepNumber}</span>
                  </div>
                  <input
                    type="text"
                    value={st.title}
                    onChange={e => {
                      const copy = [...content.preparation.steps];
                      copy[idx] = { ...copy[idx], title: e.target.value };
                      handlePrepChange('steps', copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs"
                  />
                  <textarea
                    rows={2}
                    value={st.instruction}
                    onChange={e => {
                      const copy = [...content.preparation.steps];
                      copy[idx] = { ...copy[idx], instruction: e.target.value };
                      handlePrepChange('steps', copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Ordering Tab Form */}
      {activeSection === 'order' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-6">
          <h3 className="text-base font-bold text-white mb-2">7-Step Ordering Roadmap (Brochure Page 5)</h3>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Heading</label>
                <input
                  type="text"
                  value={content.ordering.heading}
                  onChange={e => handleOrderingChange('heading', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Footer Tagline</label>
                <input
                  type="text"
                  value={content.ordering.footerNote}
                  onChange={e => handleOrderingChange('footerNote', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>
            </div>

            {/* 7 Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {content.ordering.steps.map((st, idx) => (
                <div key={st.stepNumber} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-amber-400">
                    Step 0{st.stepNumber}
                  </div>
                  <input
                    type="text"
                    value={st.title}
                    onChange={e => {
                      const copy = [...content.ordering.steps];
                      copy[idx] = { ...copy[idx], title: e.target.value };
                      handleOrderingChange('steps', copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs"
                  />
                  <textarea
                    rows={2}
                    value={st.description}
                    onChange={e => {
                      const copy = [...content.ordering.steps];
                      copy[idx] = { ...copy[idx], description: e.target.value };
                      handleOrderingChange('steps', copy);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-xs"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Tab Form */}
      {activeSection === 'cta' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Bottom Call to Action Banner</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Headline</label>
              <input
                type="text"
                value={content.cta.headline}
                onChange={e => handleCtaChange('headline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Subheadline</label>
              <textarea
                rows={2}
                value={content.cta.subheadline}
                onChange={e => handleCtaChange('subheadline', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Primary Button Text</label>
                <input
                  type="text"
                  value={content.cta.primaryButtonText}
                  onChange={e => handleCtaChange('primaryButtonText', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Secondary Button Text</label>
                <input
                  type="text"
                  value={content.cta.secondaryButtonText}
                  onChange={e => handleCtaChange('secondaryButtonText', e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Tab Form */}
      {activeSection === 'footer' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4">
          <h3 className="text-base font-bold text-white mb-2">Footer & Copyright Text</h3>
          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">About Text</label>
              <textarea
                rows={2}
                value={content.footer.aboutText}
                onChange={e => handleFooterChange('aboutText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">Copyright Line</label>
              <input
                type="text"
                value={content.footer.copyrightText}
                onChange={e => handleFooterChange('copyrightText', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
