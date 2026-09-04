import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Play, PlayCircle, ExternalLink } from 'lucide-react';

interface Props {
  isDraftPreview?: boolean;
}

export const HelpfulVideosSection: React.FC<Props> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const videos = state.helpfulVideos?.filter((v: any) => v.isVisible).sort((a: any, b: any) => a.displayOrder - b.displayOrder) || [];
  
  if (videos.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-brand-border/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {language === 'mr' ? 'उपयुक्त व्हिडिओ' : 'HELPFUL VIDEOS'}
          </span>
          <h2 className="font-rajwada text-pub-section font-bold text-brand-primary tracking-tight">
            {language === 'mr' ? 'प्रात्यक्षिक आणि मार्गदर्शक' : 'Watch & Learn'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video: any) => (
            <VideoCard key={video.id} video={video} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

const VideoCard: React.FC<{ video: any, language: string }> = ({ video, language }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div 
      className="group flex flex-col bg-brand-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-brand-border/40"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[4/5] bg-slate-900 overflow-hidden cursor-pointer" onClick={() => window.open(video.instagramUrl, '_blank')}>
        <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]">
           {video.thumbnailUrl ? (
             <img src={video.thumbnailUrl} alt={video.titleEn} className="w-full h-full object-cover opacity-90 group-hover:opacity-100" />
           ) : (
             <div className="w-full h-full bg-slate-800 flex items-center justify-center">
               <PlayCircle className="w-12 h-12 text-slate-600" />
             </div>
           )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-brand-accent/90 backdrop-blur-sm flex items-center justify-center shadow-xl text-white transform transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-accent">
            <Play className="w-8 h-8 fill-current ml-1" />
          </div>
        </div>
        
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-1.5 text-white/90">
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest leading-none mt-0.5">Video</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-rajwada text-pub-sub font-bold text-brand-primary mb-2">
          {language === 'mr' ? video.titleMr : video.titleEn}
        </h3>
        <p className="text-pub-body text-slate-600 mb-6 flex-grow">
          {language === 'mr' ? video.descriptionMr : video.descriptionEn}
        </p>
        
        <a 
          href={video.instagramUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-pub-btn font-bold uppercase tracking-wider text-brand-accent hover:text-brand-accent-hover transition-colors"
        >
          <span>{language === 'mr' ? 'व्हिडिओ पहा' : 'Watch Video'}</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
