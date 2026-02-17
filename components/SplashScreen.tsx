
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-emerald-900 flex flex-col items-center justify-center text-white z-[9999]">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 arabic-text">UBH AL QURAN</h1>
        <div className="h-20 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-medium animate-splash text-yellow-400">
            পড়ো তোমার প্রভুর নামে
          </p>
        </div>
        <div className="mt-12 opacity-80">
          <p className="text-lg tracking-widest uppercase">Created By</p>
          <p className="text-xl font-semibold text-emerald-200">Muhammad Saifullah Bin Intaz Ali</p>
        </div>
      </div>
      
      <div className="absolute bottom-10">
        <div className="flex space-x-2">
           <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
           <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
           <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
