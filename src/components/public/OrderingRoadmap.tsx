import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Phone, 
  Package, 
  CheckCircle2, 
  IndianRupee, 
  Truck, 
  HeartHandshake, 
  UserCheck, 
  ArrowRight 
} from 'lucide-react';

interface OrderingRoadmapProps {
  onOpenInquiry: () => void;
  isDraftPreview?: boolean;
}

export const OrderingRoadmap: React.FC<OrderingRoadmapProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const steps = [
    { num: 1, title: 'CALL', desc: 'Share your requirements with us.', icon: <Phone className="w-8 h-8 text-white" /> },
    { num: 2, title: 'SELECT', desc: 'Choose your preferred product.', icon: <Package className="w-8 h-8 text-white" /> },
    { num: 3, title: 'CONFIRM ORDER', desc: 'We confirm and process your order.', icon: <CheckCircle2 className="w-8 h-8 text-white" /> },
    { num: 4, title: 'PAYMENT', desc: 'Make secure payment in full.', icon: <IndianRupee className="w-8 h-8 text-white" /> },
    { num: 5, title: 'DISPATCH', desc: 'We pack and ship your order.', icon: <Truck className="w-8 h-8 text-white" /> },
    { num: 6, title: 'SUPPORT', desc: 'Our team provides after-sales support.', icon: <HeartHandshake className="w-8 h-8 text-white" /> },
    { num: 7, title: 'AFTER-SALES CARE', desc: 'Return and exchange support.', icon: <UserCheck className="w-8 h-8 text-white" /> },
  ];

  return (
    <section id="ordering" className="py-24 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-rajwada text-4xl sm:text-6xl font-black text-[#1E3F20] tracking-tight">
            Our Ordering Process
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
        </div>

        {/* 7-Step Circular Green Icon Track (Exact Brochure Style) */}
        <div className="relative py-8">
          
          {/* Connecting Track Line behind icons (Desktop) */}
          <div className="hidden lg:block absolute top-[68px] left-[6%] right-[6%] h-1 bg-[#1E3F20] z-0 rounded-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 relative z-10">
            {steps.map(step => (
              <div key={step.num} className="flex flex-col items-center text-center group">
                
                {/* Large Circular Green Badge with White Icon */}
                <div className="w-24 h-24 rounded-full bg-[#1E3F20] flex items-center justify-center shadow-xl border-4 border-[#FAF6EE] group-hover:scale-110 group-hover:border-amber-400 transition-all duration-300 relative">
                  {step.icon}
                </div>

                {/* Step Number Circle */}
                <div className="w-8 h-8 rounded-full bg-[#1E3F20] text-white font-rajwada font-bold text-sm flex items-center justify-center my-3 shadow-md border-2 border-amber-300">
                  {step.num}
                </div>

                {/* Step Title */}
                <h3 className="font-rajwada font-bold text-lg text-[#1E3F20] uppercase tracking-wide leading-tight mb-1.5">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs text-slate-600 leading-snug font-sans max-w-[150px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Sample / Quotation Action Callout */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenInquiry}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-[#1E3F20] hover:bg-[#142915] text-amber-300 font-bold uppercase tracking-wider text-xs shadow-xl hover:scale-105 transition-all font-sans"
          >
            <span>Start Order or Request Sample Box</span>
            <ArrowRight className="w-4 h-4 text-lataamber-400" />
          </button>
        </div>

      </div>
    </section>
  );
};
