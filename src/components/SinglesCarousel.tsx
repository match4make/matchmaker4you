import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries';
import { SingleProfile } from '../types';
import { Heart, MapPin, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';

export const SinglesCarousel: React.FC = () => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('usa');

  const selectedCountry = COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[1];
  const allProfiles: { profile: SingleProfile; countryName: string; flag: string; affiliateUrl: string }[] = [];

  COUNTRIES_DATA.forEach((c) => {
    c.sampleProfiles.forEach((p) => {
      allProfiles.push({
        profile: p,
        countryName: c.name,
        flag: c.flag,
        affiliateUrl: c.primaryUrl,
      });
    });
  });

  return (
    <section id="singles-preview" className="py-16 md:py-24 relative overflow-hidden bg-purple-950/20 border-y border-purple-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border-pink-500/30 text-xs font-semibold uppercase tracking-wider text-pink-300 mb-4">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Real Local Profiles</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Featured Singles <span className="text-gradient">Near You</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Preview verified members online right now. Select your country to unlock full profiles and chat.
          </p>
        </div>

        {/* Country Filter Bar */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {COUNTRIES_DATA.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCountryId(c.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center space-x-1.5 cursor-pointer ${
                selectedCountryId === c.id
                  ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30 font-bold scale-105'
                  : 'glass-card text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedCountry.sampleProfiles.map((p) => (
            <div
              key={p.id}
              className="glass-card glass-card-hover rounded-3xl overflow-hidden border border-purple-500/20 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={p.avatar}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090510] via-transparent to-black/30" />

                {/* Status Badges */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online Now</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-lg bg-black/40 px-2 py-1 rounded-full backdrop-blur-md border border-white/10">
                    {selectedCountry.flag}
                  </span>
                </div>

                {/* Profile Name Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h4 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <span>{p.name}, {p.age}</span>
                  </h4>
                  <div className="flex items-center text-xs text-purple-200 space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-pink-400" />
                    <span>{p.city}</span>
                    <span className="text-purple-400">• {p.distance}</span>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-purple-100 italic leading-relaxed line-clamp-2">
                  "{p.tagline}"
                </p>

                <div className="flex flex-wrap gap-1">
                  {p.interests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-purple-900/40 border border-purple-500/20 text-purple-200 font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>

                <a
                  href={selectedCountry.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-gradient py-2.5 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 cursor-pointer shadow-md shadow-pink-500/20 mt-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Message to {p.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/80" />
                </a>
              </div>
            </div>
          ))}

          {/* Additional Global Highlight Card */}
          <div className="glass-card rounded-3xl p-6 border border-pink-500/30 flex flex-col justify-between text-center bg-gradient-to-b from-purple-900/40 to-pink-900/30">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-4 text-pink-400">
                <Heart className="w-6 h-6 fill-pink-500/30" />
              </div>
              <h4 className="font-heading font-bold text-lg text-white mb-2">
                Want to see 500+ Singles in {selectedCountry.name}?
              </h4>
              <p className="text-xs text-purple-200/80 leading-relaxed mb-4">
                Create a free profile to view full photo galleries, send instant winks, and match with verified local members.
              </p>
            </div>

            <a
              href={selectedCountry.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-gradient py-3 px-4 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-1.5 cursor-pointer shadow-lg"
            >
              <span>Unlock All {selectedCountry.name} Singles</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
