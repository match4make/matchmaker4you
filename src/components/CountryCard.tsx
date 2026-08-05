import React, { useState } from 'react';
import { CountryData } from '../types';
import { ExternalLink, Heart, MapPin, Users, Star, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';

interface CountryCardProps {
  country: CountryData;
  onSelectCountry?: (countryId: string) => void;
}

export const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const [showAllLinks, setShowAllLinks] = useState(false);

  return (
    <div className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col h-full border border-purple-500/20 group relative">
      {/* Top Visual Banner (Landmark & Romantic Background) */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        {/* Landmark Background Image */}
        <img
          src={country.landmarkImage}
          alt={`${country.famousCity} background`}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0617] via-[#0d0617]/50 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#090510]/80 backdrop-blur-md border border-white/10 text-xs font-semibold text-pink-300">
            <span className="text-base">{country.flag}</span>
            <span>{country.code}</span>
          </span>

          <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-[11px] font-semibold text-emerald-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{country.activeSingles} Online</span>
          </span>
        </div>

        {/* Couple Profile Avatar Overlay */}
        <div className="absolute -bottom-4 left-5 flex items-end space-x-3">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-pink-500 shadow-xl shadow-pink-500/30 bg-purple-900">
            <img
              src={country.coupleImage}
              alt={`Happy Couple in ${country.name}`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="pb-4">
            <div className="flex items-center space-x-1 text-xs text-amber-300 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-sm">
              <Star className="w-3 h-3 fill-amber-300" />
              <span className="font-bold">{country.rating}</span>
              <span className="text-gray-400">({country.reviewsCount.toLocaleString()})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Header & Landmark */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-pink-400 transition-colors flex items-center gap-2">
                <span>{country.name}</span>
              </h3>
              <div className="flex items-center text-xs text-purple-300/80 space-x-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span className="font-medium truncate">{country.famousCity}</span>
              </div>
            </div>
          </div>

          {/* Popular Interests Tags */}
          <div className="flex flex-wrap gap-1.5 my-3">
            {country.popularInterests.map((interest, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-500/20 text-purple-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Primary CTA & Links */}
        <div className="space-y-2.5 pt-2 border-t border-purple-900/30">
          {/* Main Direct Affiliate CTA */}
          <a
            href={country.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-gradient py-3 px-4 rounded-xl text-sm font-bold text-white flex items-center justify-center space-x-2 group/btn cursor-pointer shadow-lg shadow-pink-500/20"
          >
            <Heart className="w-4 h-4 fill-white group-hover/btn:scale-125 transition-transform" />
            <span>Start Matching in {country.name.split(' ')[0]}</span>
            <ExternalLink className="w-4 h-4 text-white/80 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>

          {/* Multiple Affiliate Links Expansion (if country has >1 campaign link) */}
          {country.affiliateLinks.length > 1 && (
            <div>
              <button
                onClick={() => setShowAllLinks(!showAllLinks)}
                className="w-full py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-purple-300 hover:text-white flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>{country.affiliateLinks.length} Partner Dating Portals Available</span>
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllLinks ? 'rotate-180' : ''}`} />
              </button>

              {showAllLinks && (
                <div className="mt-2 space-y-1.5 p-2 rounded-xl bg-[#090510]/90 border border-purple-500/30 text-xs animate-in fade-in duration-200">
                  <div className="text-[10px] text-purple-400 font-semibold uppercase px-1 pb-1 border-b border-purple-900/40">
                    All Partner Offer Links:
                  </div>
                  {country.affiliateLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded-lg bg-purple-950/40 hover:bg-pink-500/20 text-gray-200 hover:text-pink-300 transition-colors"
                    >
                      <span className="flex items-center gap-1.5 truncate pr-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                        <span className="truncate">{link.name}</span>
                      </span>
                      <ExternalLink className="w-3 h-3 text-purple-400 shrink-0" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
