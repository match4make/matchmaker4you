import React from 'react';
import { TESTIMONIALS } from '../data/countries';
import { Star, Heart, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border-pink-500/30 text-xs font-semibold uppercase tracking-wider text-pink-300 mb-4">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>Success Stories</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Real Couples Found <span className="text-gradient">Real Love</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Read stories from members who found their soulmate using our country-specific dating portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border-purple-500/20 flex flex-col justify-between relative"
            >
              <Quote className="w-10 h-10 text-pink-500/15 absolute top-6 right-6" />

              <div>
                <div className="flex items-center space-x-1 text-amber-400 mb-4">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{t.story}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-4 border-t border-purple-900/30">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-500/50 shadow-md">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">{t.name}</h4>
                  <div className="text-xs text-pink-400 font-medium">{t.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
