import React from 'react';
import { Heart, Globe, ShieldCheck, Lock, Sparkles, ArrowUp } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSelectCountry: (countryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenTerms, onSelectCountry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050309] border-t border-purple-900/40 text-purple-200/80 text-xs py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-purple-900/30">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-[#090510] rounded-[10px] flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                </div>
              </div>
              <span className="glass-morph-brand text-2xl font-century-gothic font-bold">
                Match Maker.Pro
              </span>
            </div>
            <p className="text-xs text-purple-200/70 leading-relaxed">
              Find your perfect match today. Premium, verified regional dating portals connecting real singles worldwide.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[10px] text-pink-300 font-medium">
                <ShieldCheck className="w-3 h-3 text-pink-400" />
                <span>18+ Adult Verified</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-[10px] text-purple-300 font-medium">
                <Lock className="w-3 h-3 text-purple-400" />
                <span>256-Bit SSL</span>
              </span>
            </div>
          </div>

          {/* Quick Country Links */}
          <div className="md:col-span-2">
            <h4 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider text-purple-300">
              Country Match Portals
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COUNTRIES_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c.id);
                    const el = document.getElementById('countries-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-2 p-2 rounded-xl bg-white/5 hover:bg-pink-500/20 text-xs text-gray-300 hover:text-white transition-colors text-left"
                >
                  <span className="text-base">{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation & Legal */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="font-heading font-bold text-white text-sm mb-4 uppercase tracking-wider text-purple-300">
              Information & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenPrivacy}
                  className="hover:text-pink-400 transition-colors cursor-pointer text-xs"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-pink-400 transition-colors cursor-pointer text-xs"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <a
                  href="#countries-section"
                  className="hover:text-pink-400 transition-colors text-xs"
                >
                  All Affiliate Offers
                </a>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="hover:text-pink-400 transition-colors flex items-center gap-1 text-xs pt-2"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-pink-400" />
                  <span>Back to Top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-purple-300/60">
          <p>
            © {new Date().getFullYear()} Match Maker.Pro. All rights reserved. 18+ Only.
          </p>
          <p className="text-center sm:text-right max-w-md">
            Disclaimer: Match Maker.Pro provides promotional referral links to independent licensed dating services.
          </p>
        </div>
      </div>
    </footer>
  );
};
