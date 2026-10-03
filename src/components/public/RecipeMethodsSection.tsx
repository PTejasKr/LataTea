import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ChefHat, CheckCircle2, Play, PlayCircle, ExternalLink, Video } from 'lucide-react';

interface Props {
  isDraftPreview?: boolean;
}

export const RecipeMethodsSection: React.FC<Props> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  
  const recipes = state.recipes?.filter((r: any) => r.isVisible).sort((a: any, b: any) => a.displayOrder - b.displayOrder) || [];
  const videos = state.helpfulVideos?.filter((v: any) => v.isVisible).sort((a: any, b: any) => a.displayOrder - b.displayOrder) || [];

  if (recipes.length === 0 && videos.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 bg-brand-background border-b border-brand-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="font-rajwada text-2xl sm:text-3xl md:text-4xl font-bold text-brand-primary tracking-tight">
            {language === 'mr' ? 'आमचे चहा कसे बनवायचे' : 'How To Prepare Our Blends'}
          </h2>
          <div className="mt-2.5 w-12 h-1 bg-brand-accent mx-auto rounded-full"></div>
          <p className="mt-2.5 text-xs sm:text-sm text-brand-text-muted font-sans">
            {language === 'mr'
              ? 'अस्सल चव आणि परिपूर्ण चहासाठी स्टेप-बाय-स्टेप कृती आणि व्हिडिओ प्रात्यक्षिक.'
              : 'Follow our step-by-step master recipe and watch video demonstrations for the perfect brew.'}
          </p>
        </div>

        {/* Combined Side-by-Side (PC) & Stacked (Mobile) Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left Column: Recipe Methods */}
          <div className={`space-y-6 ${videos.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            {recipes.map((recipe: any) => {
              const rawInstructions = language === 'mr' ? recipe.instructionsMr : recipe.instructionsEn;
              const steps = rawInstructions.split('\n').filter((s: string) => s.trim().length > 0);

              return (
                <div 
                  key={recipe.id} 
                  className="h-full bg-white rounded-2xl border border-brand-border/60 overflow-hidden shadow-sm flex flex-col justify-between"
                >
                  {/* Recipe Header */}
                  <div className="bg-brand-surface p-5 sm:p-6 border-b border-brand-border/50 flex items-center gap-3.5">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-brand-accent-pale flex items-center justify-center text-brand-accent">
                      <ChefHat className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-rajwada text-xl sm:text-2xl font-bold text-brand-primary leading-snug">
                        {language === 'mr' ? recipe.titleMr : recipe.titleEn}
                      </h3>
                    </div>
                  </div>

                  {/* Recipe Steps */}
                  <div className="p-5 sm:p-6 flex-grow">
                    <div className="space-y-3.5">
                      {steps.map((step: string, idx: number) => {
                        // Split potential "STEP X:" prefix
                        const stepMatch = step.match(/^(STEP\s*\d+:?|स्टेप\s*[\d१-९]+:?)\s*(.*)/i);
                        const label = stepMatch ? stepMatch[1] : `Step ${idx + 1}`;
                        const content = stepMatch ? stepMatch[2] : step;

                        return (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-brand-background/60 border border-brand-border/30 hover:border-brand-accent/40 transition-colors">
                            <div className="w-6 h-6 rounded-md bg-brand-accent-pale text-brand-accent flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                              {idx + 1}
                            </div>
                            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                              {stepMatch ? (
                                <>
                                  <span className="font-bold text-brand-primary mr-1">{label}</span>
                                  <span>{content}</span>
                                </>
                              ) : (
                                <span>{step}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="px-5 sm:px-6 py-3 bg-brand-surface border-t border-brand-border/40 text-[11px] text-brand-text-muted flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                    <span>
                      {language === 'mr' 
                        ? 'दूध न फाटता ३ मिनिटांत परिपूर्ण चहा तयार होतो.' 
                        : 'Ready in 3 minutes without curdling milk.'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Helpful Video Guide */}
          {videos.length > 0 && (
            <div className="lg:col-span-5 space-y-6">
              {videos.map((video: any) => (
                <div 
                  key={video.id}
                  className="h-full group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-brand-border/60 flex flex-col justify-between"
                >
                  {/* Video Media Preview */}
                  <div 
                    className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer"
                    onClick={() => window.open(video.instagramUrl, '_blank')}
                  >
                    <img 
                      src={video.thumbnailUrl || '/assets/images/royal_tea_bowl.webp?v=16'} 
                      alt={video.titleEn} 
                      className="w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-105 transition-all duration-500 ease-out" 
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    
                    {/* Play Badge Center */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-accent/90 hover:bg-brand-accent backdrop-blur-xs flex items-center justify-center shadow-xl text-white transform transition-all duration-300 group-hover:scale-110">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                    
                    {/* Video Tag Badge */}
                    <div className="absolute top-3.5 right-3.5 bg-black/70 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5 text-white text-[10px] font-bold uppercase tracking-wider">
                      <Video className="w-3 h-3 text-brand-accent" />
                      <span>{language === 'mr' ? 'व्हिडिओ' : 'Video Guide'}</span>
                    </div>
                  </div>

                  {/* Video Information */}
                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow bg-brand-surface">
                    <div className="space-y-1.5 mb-4">
                      <h3 className="font-rajwada text-lg sm:text-xl font-bold text-brand-primary leading-snug">
                        {language === 'mr' ? video.titleMr : video.titleEn}
                      </h3>
                      <p className="text-xs text-brand-text-muted font-sans leading-relaxed">
                        {language === 'mr' ? video.descriptionMr : video.descriptionEn}
                      </p>
                    </div>
                    
                    <a 
                      href={video.instagramUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{language === 'mr' ? 'व्हिडिओ पहा' : 'Watch Video Demo'}</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-0.5 opacity-80" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
