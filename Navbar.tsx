
import React from 'react';
import { View } from '../types';

interface NavbarProps {
  currentView: View;
  setView: (view: View) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  return (
    <nav className="bg-emerald-800 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => setView('home')}
        >
          <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center border border-emerald-500">
            <span className="text-2xl font-bold">U</span>
          </div>
          <span className="text-xl font-bold tracking-tight">UBH AL QURAN</span>
        </div>

        <div className="hidden md:flex space-x-6 items-center">
          <button 
            onClick={() => setView('surah-list')}
            className={`hover:text-yellow-400 transition-colors ${currentView.includes('surah') ? 'text-yellow-400 font-semibold underline underline-offset-8' : ''}`}
          >
            কুরআন শরিফ
          </button>
          <button 
            onClick={() => setView('hadith')}
            className={`hover:text-yellow-400 transition-colors ${currentView === 'hadith' ? 'text-yellow-400 font-semibold underline underline-offset-8' : ''}`}
          >
            হাদিস ও ফজিলত
          </button>
          <button 
            onClick={() => setView('bot')}
            className={`hover:text-yellow-400 transition-colors ${currentView === 'bot' ? 'text-yellow-400 font-semibold underline underline-offset-8' : ''}`}
          >
            ইসলামিক বট
          </button>
          <button 
            onClick={() => setView('admin')}
            className={`hover:text-yellow-400 transition-colors ${currentView === 'admin' ? 'text-yellow-400 font-semibold underline underline-offset-8' : ''}`}
          >
            এডমিন
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
