import React from 'react';
import { ShieldCheck, Lock, UserCheck, Zap, Award, Sparkles } from 'lucide-react';

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-12 bg-purple-950/30 border-y border-purple-900/40 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">256-Bit SSL Encryption</h4>
            <p className="text-xs text-purple-200/70">Your data and browsing stay 100% private and protected.</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-1">
              <UserCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">18+ Adult Verified</h4>
            <p className="text-xs text-purple-200/70">Strict moderation ensuring real adult singles only.</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-1">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">Instant Free Signup</h4>
            <p className="text-xs text-purple-200/70">No hidden fees, quick email registration in 30 seconds.</p>
          </div>

          <div className="flex flex-col items-center space-y-2 p-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-1">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="font-heading font-bold text-white text-sm">Targeted Geo-Matching</h4>
            <p className="text-xs text-purple-200/70">Automatic redirection to official dating portals in your region.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
