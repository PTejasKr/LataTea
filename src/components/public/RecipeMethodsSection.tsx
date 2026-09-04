import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ChefHat, CheckCircle2 } from 'lucide-react';

interface Props {
  isDraftPreview?: boolean;
}

export const RecipeMethodsSection: React.FC<Props> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const recipes = state.recipes?.filter((r: any) => r.isVisible).sort((a: any, b: any) => a.displayOrder - b.displayOrder) || [];

  if (recipes.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {language === 'mr' ? 'रेसिपी आणि पद्धती' : 'PREPARATION METHODS'}
          </span>
          <h2 className="font-rajwada text-pub-section font-bold text-brand-primary tracking-tight">
            {language === 'mr' ? 'आमचे चहा कसे बनवायचे' : 'How To Prepare Our Blends'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {recipes.map((recipe: any) => (
            <div key={recipe.id} className="bg-white rounded-2xl border border-brand-border/40 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-brand-surface p-6 sm:p-8 border-b border-brand-border/40 flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-rajwada text-pub-sub font-bold text-brand-primary mb-1">
                    {language === 'mr' ? recipe.titleMr : recipe.titleEn}
                  </h3>
                  <div className="text-pub-small font-bold uppercase tracking-wider text-brand-accent">
                    {language === 'mr' ? 'रेसिपी' : 'Recipe Method'}
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <div className="space-y-4">
                  {(language === 'mr' ? recipe.instructionsMr : recipe.instructionsEn).split('\n').filter(Boolean).map((step: string, idx: number) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-brand-accent mt-1" />
                      <p className="text-pub-body text-slate-700 leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
