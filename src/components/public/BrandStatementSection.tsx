import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface BrandStatementSectionProps {
  isDraftPreview?: boolean;
}

export const BrandStatementSection: React.FC<BrandStatementSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const stmt = state.content.brandStatement;

  return (
    <section className="py-16 sm:py-24 bg-[#162D18] text-white text-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        <p className="font-rajwada text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          {t(stmt.quote)}
        </p>

        <p className="text-xs sm:text-sm text-slate-300 font-sans font-light max-w-lg mx-auto">
          {t(stmt.subtext)}
        </p>

      </div>
    </section>
  );
};
