import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface BrandStatementSectionProps {
  isDraftPreview?: boolean;
}

export const BrandStatementSection: React.FC<BrandStatementSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const stmt = state.content.brandStatement;

  return (
    <section className="py-24 sm:py-32 bg-[#162D18] text-white relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="w-12 h-12 rounded-full bg-black/40 border border-amber-400/30 flex items-center justify-center mx-auto mb-8">
          <TeaLeafIcon className="w-6 h-6 text-amber-300" />
        </div>

        <blockquote className="font-rajwada text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-100 leading-tight">
          {t(stmt.quote)}
        </blockquote>

        <p className="mt-6 text-sm sm:text-base text-slate-300 font-sans font-light max-w-xl mx-auto">
          {t(stmt.subtext)}
        </p>

        <div className="mt-8 font-mono text-xs text-amber-400 uppercase tracking-widest">
          {t(stmt.author)}
        </div>

      </div>

      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
    </section>
  );
};
