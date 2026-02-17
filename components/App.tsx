
import React, { useState, useEffect } from 'react';
import { View, Surah } from './types';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import SurahList from './components/SurahList';
import SurahReader from './components/SurahReader';
import HadithSection from './components/HadithSection';
import IslamicBot from './components/IslamicBot';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('splash');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setCurrentView('home'), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'splash': return <SplashScreen />;
      case 'home':
      case 'surah-list': return <SurahList onSelectSurah={(s) => { setSelectedSurah(s); setCurrentView('surah-reader'); }} />;
      case 'surah-reader': return selectedSurah ? <SurahReader surah={selectedSurah} onBack={() => setCurrentView('surah-list')} /> : null;
      case 'hadith': return <HadithSection />;
      case 'bot': return <IslamicBot />;
      case 'admin': return <AdminPanel />;
      default: return <SurahList onSelectSurah={setSelectedSurah} />;
    }
  };

  if (currentView === 'splash') return <SplashScreen />;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar currentView={currentView} setView={setCurrentView} />
      <main className="flex-1 container mx-auto px-4 py-6 pb-24 md:pb-6">
        {renderContent()}
      </main>
      
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-emerald-800 text-white flex justify-around py-3 shadow-lg z-50">
        <button onClick={() => setCurrentView('surah-list')} className="flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13" strokeWidth="2" /></svg>
          <span className="text-[10px]">কুরআন</span>
        </button>
        <button onClick={() => setCurrentView('hadith')} className="flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6" strokeWidth="2" /></svg>
          <span className="text-[10px]">হাদিস</span>
        </button>
        <button onClick={() => setCurrentView('bot')} className="flex flex-col items-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01" strokeWidth="2" /></svg>
          <span className="text-[10px]">বট</span>
        </button>
      </div>
    </div>
  );
};

export default App;
