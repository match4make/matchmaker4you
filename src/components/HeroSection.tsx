import React from 'react';
import { Heart, Sparkles, ShieldCheck, Users, ArrowRight, Zap, Star } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';

interface HeroSectionProps {
  onStartNow: () => void;
  onSelectCountry: (countryId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartNow, onSelectCountry }) => {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      {/* Background Ambient Glows & Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/25 via-pink-600/30 to-indigo-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-pink-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-700/20 rounded-full blur-[90px] pointer-events-none" />

      {/* Floating Decorative Hearts */}
      <div className="absolute top-24 left-[10%] text-pink-500/30 animate-bounce duration-1000 hidden sm:block">
        <Heart className="w-8 h-8 fill-pink-500/20" />
      </div>
      <div className="absolute top-40 right-[12%] text-purple-400/40 animate-pulse hidden sm:block">
        <Heart className="w-10 h-10 fill-purple-500/20" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Trust Banner Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-card border-pink-500/30 mb-6 shadow-lg shadow-pink-500/10 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-200">
              #1 Global Verified Singles Network
            </span>
          </div>

          {/* Main Headline */}
          <div className="inline-block glass-headline-container px-6 sm:px-10 py-5 sm:py-7 rounded-3xl mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight font-century-gothic font-bold">
              <span className="glass-morph-headline text-3xl sm:text-5xl lg:text-6xl inline-block pr-1">
                Find Your Perfect Match Today
              </span>
              <span className="inline-block text-2xl sm:text-4xl lg:text-5xl ml-2 text-pink-400">❤️</span>
            </h1>
          </div>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-purple-200/90 max-w-2xl mx-auto leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            Choose your country and meet real singles near you. High-match technology, free registration, and instant connections worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <button
              onClick={onStartNow}
              className="w-full sm:w-auto btn-gradient px-8 py-4 rounded-full text-lg font-bold text-white flex items-center justify-center space-x-3 group cursor-pointer"
            >
              <span>Start Now</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#countries-section"
              className="w-full sm:w-auto px-8 py-4 rounded-full glass-card border border-purple-500/30 hover:border-pink-500/50 text-base font-semibold text-gray-200 hover:text-white transition-all flex items-center justify-center space-x-2"
            >
              <span>Browse 10+ Countries</span>
            </a>
          </div>

          {/* Quick Country Pill Launcher */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border-purple-500/20 max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-purple-300 uppercase tracking-wider px-1">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-pink-400" />
                Select Your Country to Connect:
              </span>
              <span className="text-pink-400 font-normal">100% Free Access</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {COUNTRIES_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c.id);
                    const el = document.getElementById('countries-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-gradient-to-r hover:from-pink-500/30 hover:to-purple-600/30 border border-purple-500/20 hover:border-pink-500/50 text-xs font-medium text-gray-200 hover:text-white transition-all flex items-center space-x-2 cursor-pointer group shadow-sm"
                >
                  <span className="text-base group-hover:scale-110 transition-transform">{c.flag}</span>
                  <span className="font-semibold">{c.name.split(' ')[0]}</span>
                  <span className="text-[10px] text-pink-400 font-mono bg-pink-500/10 px-1.5 py-0.5 rounded-md">
                    {c.activeSingles}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="glass-card rounded-2xl p-3.5 text-center border-purple-500/20">
              <div className="flex justify-center mb-1 text-pink-400">
                <Users className="w-5 h-5" />
              </div>
              <div className="font-heading text-xl sm:text-2xl font-bold text-white">2.4M+</div>
              <div className="text-xs text-purple-200/70">Verified Singles</div>
            </div>

            <div className="glass-card rounded-2xl p-3.5 text-center border-purple-500/20">
              <div className="flex justify-center mb-1 text-pink-400">
                <Heart className="w-5 h-5 fill-pink-400/40" />
              </div>
              <div className="font-heading text-xl sm:text-2xl font-bold text-white">10 Countries</div>
              <div className="text-xs text-purple-200/70">Dedicated Networks</div>
            </div>

            <div className="glass-card rounded-2xl p-3.5 text-center border-purple-500/20">
              <div className="flex justify-center mb-1 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div className="font-heading text-xl sm:text-2xl font-bold text-white">4.9 / 5.0</div>
              <div className="text-xs text-purple-200/70">User Satisfaction</div>
            </div>

            <div className="glass-card rounded-2xl p-3.5 text-center border-purple-500/20">
              <div className="flex justify-center mb-1 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="font-heading text-xl sm:text-2xl font-bold text-white">100% Free</div>
              <div className="text-xs text-purple-200/70">Direct Signup Link</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
