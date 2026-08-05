import React, { useState } from 'react';
import { COUNTRIES_DATA, REGIONS } from '../data/countries';
import { CountryCard } from './CountryCard';
import { Search, Globe, Filter, Sparkles } from 'lucide-react';

interface CountryGridProps {
  onSelectCountry?: (countryId: string) => void;
  selectedCountryId?: string | null;
}

export const CountryGrid: React.FC<CountryGridProps> = ({ onSelectCountry }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const filteredCountries = COUNTRIES_DATA.filter((c) => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.famousCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.landmark.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="countries-section" className="py-16 md:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-card border-pink-500/30 text-xs font-semibold uppercase tracking-wider text-pink-300 mb-4">
            <Globe className="w-4 h-4 text-pink-400" />
            <span>Select Your Destination</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Meet Verified Singles in <span className="text-gradient">Your Country</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg">
            Choose a location below to connect with real local singles looking for dating, romance, and serious relationships.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="glass-card rounded-2xl p-4 mb-10 border-purple-500/20 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or city..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-sm text-white placeholder-purple-300/50 focus:outline-none focus:border-pink-500 transition-colors"
            />
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <div className="text-xs font-semibold text-purple-300 flex items-center gap-1 pr-2 shrink-0 hidden sm:flex">
              <Filter className="w-3.5 h-3.5" />
              <span>Region:</span>
            </div>
            {REGIONS.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedRegion === region
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        {/* Country Cards Grid */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.id}
                country={country}
                onSelectCountry={onSelectCountry}
              />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center max-w-md mx-auto my-12 border-purple-500/20">
            <Sparkles className="w-10 h-10 text-pink-400 mx-auto mb-3 animate-spin" />
            <h3 className="text-lg font-bold text-white mb-1">No Countries Found</h3>
            <p className="text-sm text-purple-200/70 mb-4">
              Try adjusting your search terms or selecting a different region filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRegion('All');
              }}
              className="btn-gradient px-4 py-2 rounded-xl text-xs font-semibold text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
