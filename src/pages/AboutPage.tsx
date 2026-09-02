import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { ShieldCheck, Award, Leaf } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { publishedState } = useCMS();
  const contact = publishedState.contact;

  return (
    <div className="pt-20 pb-20 bg-brand-background text-brand-primary min-h-screen">
      
      {/* Page Hero Header */}
      <section className="py-14 bg-brand-primary-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-1">
            ABOUT LATA TEAMIX
          </span>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Indian Tea & Jaggery Blends
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto">
            Manufactured with pride by Purple Bean Agro Industries Private Limited in Pune, Maharashtra.
          </p>
        </div>
      </section>

      {/* Corporate Purpose & Vision */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
          
          <div className="md:col-span-7 space-y-3">
            <span className="text-[11px] font-bold tracking-widest text-brand-accent uppercase font-sans">
              PURPOSE & STANDARDS
            </span>
            <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-brand-primary-dark leading-snug">
              Unadulterated Tea in Every Boiling Cup
            </h2>
            <p className="text-xs sm:text-sm text-brand-primary leading-relaxed font-sans">
              Lata Teamix was established to solve an everyday challenge: giving families, cafés, and corporate workplaces access to authentic jaggery chai without curdling milk or burning sweetness.
            </p>
            <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
              Blended in a cleanroom in Pune, our products deliver consistent taste and aroma across homes, pantries, and vending machines.
            </p>

            <div className="pt-3 border-t border-brand-border grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-brand-surface border border-brand-border shadow-xs">
                <div className="text-xl font-bold font-rajwada text-brand-primary-dark">500+</div>
                <div className="text-[11px] text-brand-text-muted font-sans">Retail & Pantry Partners</div>
              </div>
              <div className="p-3 rounded-lg bg-brand-surface border border-brand-border shadow-xs">
                <div className="text-xl font-bold font-rajwada text-brand-primary-dark">100%</div>
                <div className="text-[11px] text-brand-text-muted font-sans">Pure Cane Jaggery</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-brand-border aspect-[4/3] bg-brand-surface shadow-xs">
              <img
                src="/assets/images/royal_tea_bowl.jpg"
                alt="Lata Teamix Blends"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Hygiene & Infrastructure */}
      <section className="py-14 bg-brand-surface border-y border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-10">
            <span className="text-[11px] font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-1">
              HYGIENE & STANDARDS
            </span>
            <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-brand-primary-dark">
              Controlled Production
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-accent-pale text-brand-accent flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-rajwada text-base font-bold text-brand-primary-dark">
                Controlled Cleanroom
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                Formulated under humidity-controlled cleanroom conditions in Pune to protect spice essential oils.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-accent-pale text-brand-accent flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-rajwada text-base font-bold text-brand-primary-dark">
                Barrier Packaging
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                Food-grade barrier pouches preserve ambient freshness with zero chemical preservatives.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-brand-background border border-brand-border space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-accent-pale text-brand-accent flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h3 className="font-rajwada text-base font-bold text-brand-primary-dark">
                Direct Sourcing
              </h3>
              <p className="text-xs text-brand-text-muted leading-relaxed font-sans">
                Direct partnerships with Kolhapur sugarcane jaggery crushers and Assam CTC estates.
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-brand-primary-dark text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-rajwada text-lg font-bold text-white">
                Request a Tasting Kit for Your Business
              </h4>
              <p className="text-xs text-slate-200 mt-0.5 font-sans">
                Trial sample kits available for office pantries, hotels, and distributors.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-5 py-2 rounded-md text-xs font-bold uppercase tracking-wider bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors shrink-0"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
