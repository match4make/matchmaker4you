import React from 'react';
import { X, ShieldCheck, FileText, Lock } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border-purple-500/30 relative shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-purple-900/40 pb-4 mb-4">
          <div className="flex items-center space-x-2">
            {type === 'privacy' ? (
              <ShieldCheck className="w-6 h-6 text-pink-500" />
            ) : (
              <FileText className="w-6 h-6 text-purple-400" />
            )}
            <h3 className="font-heading font-extrabold text-xl text-white">
              {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-2 space-y-4 text-xs sm:text-sm text-purple-200/90 leading-relaxed font-sans">
          {type === 'privacy' ? (
            <>
              <p>
                <strong>Last Updated: August 2026</strong>
              </p>
              <p>
                Welcome to Match Maker.Pro. We are committed to protecting your privacy and ensuring you have a safe, secure experience while exploring global dating services and local verified singles.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">1. Information We Collect</h4>
              <p>
                We do not collect or store personal financial details or passwords on this landing page. When you interact with our country selector or match quiz, your preferences (e.g. region choice) are processed client-side to route you to appropriate verified affiliate partner networks.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">2. Partner Networks & Affiliate Links</h4>
              <p>
                This website contains third-party referral links to licensed dating services. When you click on a country card or affiliate link, you are redirected to third-party platforms which maintain their own independent privacy policies and terms of service.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">3. Cookies & Analytics</h4>
              <p>
                We use non-intrusive standard web analytics to optimize page load speeds, improve country matching accuracy, and provide seamless navigation across mobile and desktop devices.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">4. Age Limit & Compliance</h4>
              <p>
                This platform and all partner dating services are strictly intended for individuals who are 18 years of age or older. We do not knowingly direct services to minors.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Last Updated: August 2026</strong>
              </p>
              <p>
                By accessing or using Match Maker.Pro, you agree to be bound by these Terms and Conditions. Please read them carefully before using our website.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">1. Acceptance of Terms</h4>
              <p>
                Match Maker.Pro provides a curated directory of regional and global dating portals. By clicking any country link or CTA button, you acknowledge that you are at least 18 years old and legally eligible to participate in adult online dating services in your jurisdiction.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">2. Affiliate Disclosure</h4>
              <p>
                Match Maker.Pro operates as an independent promotional gateway. We may receive referral compensation from partner networks when users sign up through links published on this website. This comes at no additional cost to you and ensures our directory remains 100% free to access.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">3. Limitation of Liability</h4>
              <p>
                We strive to maintain accurate, up-to-date links and partner information. However, Match Maker.Pro makes no warranties regarding external third-party dating apps, subscriptions, or interactions taking place on external websites.
              </p>

              <h4 className="font-heading text-white font-bold text-sm pt-2">4. Code of Conduct</h4>
              <p>
                Users agree to interact respectfully with all partner platforms, abide by local dating laws, and report any suspicious behavior directly to the respective third-party service providers.
              </p>
            </>
          )}
        </div>

        {/* Footer Button */}
        <div className="pt-4 border-t border-purple-900/40 mt-4 text-right">
          <button
            onClick={onClose}
            className="btn-gradient px-6 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
