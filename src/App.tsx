import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CountryGrid } from './components/CountryGrid';
import { SinglesCarousel } from './components/SinglesCarousel';
import { TestimonialsSection } from './components/TestimonialsSection';
import { TrustBadges } from './components/TrustBadges';
import { LiveActivityToast } from './components/LiveActivityToast';
import { MatchQuizModal } from './components/MatchQuizModal';
import { LegalModal } from './components/LegalModal';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { Footer } from './components/Footer';
import { ActiveTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDriveOpen, setIsDriveOpen] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);

  const handleOpenQuiz = (countryId?: string) => {
    if (countryId) {
      setSelectedCountryId(countryId);
    }
    setIsQuizOpen(true);
  };

  const handleSelectCountry = (countryId: string) => {
    setSelectedCountryId(countryId);
  };

  return (
    <div className="min-h-screen bg-[#090510] text-gray-100 flex flex-col justify-between selection:bg-pink-500 selection:text-white relative">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuiz={() => handleOpenQuiz()}
        onSelectCountry={handleSelectCountry}
        onOpenDrive={() => setIsDriveOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1">
        {/* Hero Section with Headline, Subheadline & Primary CTA */}
        <HeroSection
          onStartNow={() => handleOpenQuiz()}
          onSelectCountry={handleSelectCountry}
        />

        {/* Security & Trust Badges */}
        <TrustBadges />

        {/* Country Cards Grid (Global, USA, Denmark, Canada, NZ, UK, Germany, Australia, France, Italy) */}
        <CountryGrid
          onSelectCountry={handleSelectCountry}
          selectedCountryId={selectedCountryId}
        />

        {/* Featured Singles Preview Section */}
        <SinglesCarousel />

        {/* Real Love Success Stories */}
        <TestimonialsSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onSelectCountry={handleSelectCountry}
      />

      {/* Live Activity Notification Toast */}
      <LiveActivityToast />

      {/* Match Quiz Stepper Modal */}
      <MatchQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        initialCountryId={selectedCountryId}
      />

      {/* Google Drive Integration Modal */}
      <GoogleDriveModal
        isOpen={isDriveOpen}
        onClose={() => setIsDriveOpen(false)}
        savedCountry={selectedCountryId}
      />

      {/* Privacy Policy & Terms Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
    </div>
  );
}
