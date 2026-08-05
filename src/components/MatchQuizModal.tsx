import React, { useState } from 'react';
import { COUNTRIES_DATA } from '../data/countries';
import { X, Heart, Sparkles, CheckCircle2, ArrowRight, ExternalLink, Loader2 } from 'lucide-react';

interface MatchQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountryId?: string | null;
}

export const MatchQuizModal: React.FC<MatchQuizModalProps> = ({ isOpen, onClose, initialCountryId }) => {
  const [step, setStep] = useState(1);
  const [lookingFor, setLookingFor] = useState<string>('women');
  const [ageRange, setAgeRange] = useState<string>('24-35');
  const [selectedCountryId, setSelectedCountryId] = useState<string>(initialCountryId || 'usa');
  const [isMatching, setIsMatching] = useState(false);
  const [matchedUrl, setMatchedUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const selectedCountry = COUNTRIES_DATA.find((c) => c.id === selectedCountryId) || COUNTRIES_DATA[1];

  const handleFinishQuiz = () => {
    setIsMatching(true);
    setTimeout(() => {
      setIsMatching(false);
      const targetUrl = selectedCountry.primaryUrl;
      setMatchedUrl(targetUrl);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 1200);
  };

  const handleReset = () => {
    setStep(1);
    setMatchedUrl(null);
    setIsMatching(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border-purple-500/30 relative shadow-2xl shadow-purple-950 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-b-full shadow-lg shadow-pink-500/50" />

        {!matchedUrl && !isMatching && (
          <div>
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-[11px] font-semibold text-pink-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Match Finder • Step {step} of 3</span>
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                {step === 1 && 'Who Are You Looking For?'}
                {step === 2 && 'Select Preferred Age Group'}
                {step === 3 && 'Choose Your Country'}
              </h3>
            </div>

            {/* Step 1: Gender */}
            {step === 1 && (
              <div className="space-y-3">
                {[
                  { id: 'women', label: 'Man looking for Women 💃' },
                  { id: 'men', label: 'Woman looking for Men 🕺' },
                  { id: 'everyone', label: 'Open to Everyone ✨' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setLookingFor(option.id);
                      setStep(2);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between cursor-pointer ${
                      lookingFor === option.id
                        ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 border-pink-500 text-white shadow-lg'
                        : 'bg-purple-950/40 border-purple-500/20 text-gray-200 hover:border-pink-500/50 hover:bg-white/5'
                    }`}
                  >
                    <span>{option.label}</span>
                    <ArrowRight className="w-4 h-4 text-pink-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Step 2: Age */}
            {step === 2 && (
              <div className="space-y-3">
                {['18-24', '24-35', '35-48', '48+'].map((age) => (
                  <button
                    key={age}
                    onClick={() => {
                      setAgeRange(age);
                      setStep(3);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left font-semibold text-sm transition-all flex items-center justify-between cursor-pointer ${
                      ageRange === age
                        ? 'bg-gradient-to-r from-pink-500/30 to-purple-600/30 border-pink-500 text-white shadow-lg'
                        : 'bg-purple-950/40 border-purple-500/20 text-gray-200 hover:border-pink-500/50 hover:bg-white/5'
                    }`}
                  >
                    <span>Singles Aged {age}</span>
                    <ArrowRight className="w-4 h-4 text-pink-400" />
                  </button>
                ))}
                <button
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-purple-300 hover:text-white pt-2"
                >
                  ← Back to Previous Step
                </button>
              </div>
            )}

            {/* Step 3: Country */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                  {COUNTRIES_DATA.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCountryId(c.id)}
                      className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex items-center space-x-2 cursor-pointer ${
                        selectedCountryId === c.id
                          ? 'bg-pink-500/30 border-pink-500 text-white'
                          : 'bg-purple-950/40 border-purple-500/20 text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span className="truncate">{c.name}</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleFinishQuiz}
                    className="w-full btn-gradient py-3.5 rounded-2xl font-bold text-white flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                    <span>Find My Match in {selectedCountry.name}</span>
                  </button>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="w-full text-center text-xs text-purple-300 hover:text-white"
                >
                  ← Back to Age Selection
                </button>
              </div>
            )}
          </div>
        )}

        {/* Loading / Matching State */}
        {isMatching && (
          <div className="py-12 text-center space-y-4">
            <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
            <h3 className="font-heading text-xl font-bold text-white">
              Scanning Verified Singles in {selectedCountry.name}...
            </h3>
            <p className="text-xs text-purple-200/70">
              Connecting you with top compatible profiles based on your criteria.
            </p>
          </div>
        )}

        {/* Success / Redirection Screen */}
        {matchedUrl && !isMatching && (
          <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border-2 border-pink-500 flex items-center justify-center mx-auto text-pink-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-heading text-2xl font-extrabold text-white">
              Matches Ready in {selectedCountry.name}! {selectedCountry.flag}
            </h3>

            <p className="text-sm text-purple-200/90 leading-relaxed max-w-sm mx-auto">
              We have opened the official dating portal in a new tab. If your browser blocked popups, click below to start matching now!
            </p>

            <a
              href={matchedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-8 py-4 rounded-2xl text-base font-bold text-white inline-flex items-center space-x-2 shadow-xl shadow-pink-500/30"
            >
              <span>Continue to Match Page</span>
              <ExternalLink className="w-5 h-5" />
            </a>

            <div>
              <button
                onClick={handleReset}
                className="text-xs text-purple-300 hover:text-white underline"
              >
                Search Another Country
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
