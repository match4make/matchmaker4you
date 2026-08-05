import React, { useState, useEffect } from 'react';
import { Heart, Globe, Menu, X, Sparkles, ChevronDown, HardDrive } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countries';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuiz: () => void;
  onSelectCountry: (countryId: string) => void;
  onOpenDrive?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuiz,
  onSelectCountry,
  onOpenDrive,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#090510]/85 backdrop-blur-xl border-b border-purple-900/30 shadow-2xl shadow-purple-950/40 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center space-x-2.5 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#090510] rounded-[10px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500 fill-pink-500 group-hover:scale-110 transition-transform duration-300 animate-pulse" />
              </div>
            </div>
            <div className="glass-brand-badge px-3 py-1 rounded-2xl flex items-center gap-2 border border-white/10">
              <div>
                <span className="glass-morph-brand text-xl sm:text-2xl font-century-gothic tracking-tight flex items-center gap-1">
                  Match Maker.Pro
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-0.5" title="System Live"></span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-purple-200/70 font-century-gothic block -mt-1 font-semibold">
                  Global Romance
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-purple-950/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/20">
            <button
              onClick={() => {
                setActiveTab('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Home
            </button>

            <a
              href="#countries-section"
              onClick={() => setActiveTab('countries')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'countries'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Countries & Links
            </a>

            <a
              href="#singles-preview"
              onClick={() => setActiveTab('singles')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'singles'
                  ? 'bg-pink-500 text-white shadow-md shadow-pink-500/30'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Featured Singles
            </a>

            {/* Country Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Globe className="w-4 h-4 text-pink-400" />
                <span>Select Country</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${countryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {countryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl p-2 shadow-2xl shadow-purple-950/80 border border-purple-500/30 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="px-3 py-2 text-xs font-semibold text-purple-300 uppercase tracking-wider border-b border-purple-500/20 mb-1">
                    Select Your Region
                  </div>
                  <div className="max-h-64 overflow-y-auto space-y-0.5">
                    {COUNTRIES_DATA.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCountry(c.id);
                          setCountryDropdownOpen(false);
                          const el = document.getElementById('countries-section');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:bg-pink-500/20 hover:text-white transition-all text-left"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <span>{c.name}</span>
                        </span>
                        <span className="text-[10px] text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full font-mono">
                          {c.activeSingles}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {onOpenDrive && (
              <button
                onClick={onOpenDrive}
                className="px-3.5 py-2 rounded-full text-xs font-semibold text-purple-200 bg-indigo-950/40 hover:bg-indigo-900/60 border border-indigo-500/30 flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm hover:shadow-indigo-500/20"
                title="Google Drive Backup & Storage"
              >
                <HardDrive className="w-4 h-4 text-indigo-400" />
                <span>Google Drive</span>
              </button>
            )}
            <button
              onClick={onOpenQuiz}
              className="btn-gradient px-5 py-2 rounded-full text-sm font-semibold text-white flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Quiz</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-purple-950/40 border border-purple-500/30 text-gray-200 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card border-b border-purple-800/40 px-4 pt-3 pb-6 mt-2 space-y-3 animate-in fade-in slide-in-from-top-4">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:bg-pink-500/20 hover:text-white"
          >
            Home
          </button>
          <a
            href="#countries-section"
            onClick={() => {
              setActiveTab('countries');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:bg-pink-500/20 hover:text-white"
          >
            🌍 Select Country & Offers
          </a>
          <a
            href="#singles-preview"
            onClick={() => {
              setActiveTab('singles');
              setMobileMenuOpen(false);
            }}
            className="block px-4 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:bg-pink-500/20 hover:text-white"
          >
            💕 Featured Singles
          </a>

          {onOpenDrive && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDrive();
              }}
              className="w-full text-left px-4 py-2.5 rounded-xl text-base font-medium text-indigo-300 hover:bg-indigo-500/20 flex items-center gap-2"
            >
              <HardDrive className="w-4 h-4 text-indigo-400" />
              <span>Google Drive Backup</span>
            </button>
          )}

          <div className="pt-2 border-t border-purple-900/40">
            <div className="text-xs font-semibold text-purple-300 uppercase tracking-wider px-4 mb-2">
              Quick Country Links
            </div>
            <div className="grid grid-cols-2 gap-2 px-2">
              {COUNTRIES_DATA.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    onSelectCountry(c.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('countries-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-pink-500/20 text-xs text-gray-200"
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full btn-gradient py-3 rounded-xl font-semibold text-white flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Start Match Quiz Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
