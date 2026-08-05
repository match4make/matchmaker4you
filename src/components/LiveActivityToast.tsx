import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, X } from 'lucide-react';

const ACTIVITIES = [
  { name: 'Chloe (24)', city: 'Paris 🇫🇷', action: 'just matched with someone!', time: '1m ago' },
  { name: 'Jessica (26)', city: 'New York 🇺🇸', action: 'started a video call', time: '3m ago' },
  { name: 'Gemma (25)', city: 'London 🇬🇧', action: 'joined verified singles', time: '4m ago' },
  { name: 'Sofia (24)', city: 'Rome 🇮🇹', action: 'sent a romantic wink 💕', time: '2m ago' },
  { name: 'Mia (25)', city: 'Sydney 🇦🇺', action: 'found a 98% match rate', time: '5m ago' },
  { name: 'Hannah (26)', city: 'Vancouver 🇨🇦', action: 'created a free profile', time: '2m ago' },
];

export const LiveActivityToast: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, [dismissed]);

  if (dismissed) return null;

  const current = ACTIVITIES[index];

  return (
    <div
      className={`fixed bottom-4 left-4 z-40 max-w-xs transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="glass-card rounded-2xl p-3 border border-pink-500/30 shadow-xl shadow-purple-950/80 flex items-center space-x-3 relative pr-8">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shrink-0">
          <div className="w-full h-full bg-[#090510] rounded-[10px] flex items-center justify-center">
            <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" />
          </div>
        </div>

        <div className="text-xs">
          <div className="font-semibold text-white flex items-center gap-1">
            <span>{current.name}</span>
            <span className="text-[10px] text-pink-300 font-mono">({current.city})</span>
          </div>
          <div className="text-[11px] text-purple-200/80">{current.action}</div>
          <div className="text-[9px] text-pink-400/80">{current.time}</div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-purple-400 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
