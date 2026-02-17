
import React, { useState } from 'react';
import { HADITHS } from '../constants';

const HadithSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Quran' | 'Ramadan'>('All');

  const filteredHadiths = activeTab === 'All' 
    ? HADITHS 
    : HADITHS.filter(h => h.category === activeTab);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">হাদিস ও ফজিলত</h2>
        <p className="text-slate-600">কোরআন তেলাওয়াতের ফজিলত ও পবিত্র রমজান মাস নিয়ে গুরুত্বপূর্ণ হাদিসসমূহ।</p>
      </div>

      <div className="flex space-x-2 mb-8 bg-emerald-50 p-1 rounded-xl w-fit">
        {['All', 'Quran', 'Ramadan'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-md' : 'text-emerald-700 hover:bg-emerald-100'}`}
          >
            {tab === 'All' ? 'সবগুলো' : tab === 'Quran' ? 'কোরআন' : 'রমজান'}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filteredHadiths.map((hadith) => (
          <div 
            key={hadith.id} 
            className="bg-white p-6 rounded-2xl border-l-4 border-l-emerald-500 border border-slate-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-2 opacity-5 group-hover:opacity-10 transition-opacity">
                <svg className="w-20 h-20 text-emerald-900" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
            </div>
            
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider ${hadith.category === 'Quran' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
              {hadith.category === 'Quran' ? 'কোরআনের ফজিলত' : 'রমজানের গুরুত্ব'}
            </span>
            
            <p className="text-xl text-slate-800 mb-4 leading-relaxed font-medium">
              "{hadith.text}"
            </p>
            
            <div className="flex items-center text-slate-500 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                {hadith.source}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-emerald-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">রমজানের ফজিলত</h3>
          <p className="opacity-90 leading-relaxed mb-6">
              রমজান হলো সংযম, প্রার্থনা এবং আত্মশুদ্ধির মাস। এই মাসে একটি নফল ইবাদতের সওয়াব ফরজের সমান এবং একটি ফরজের সওয়াব ৭০ গুণ বৃদ্ধি পায়। কোরআন নাযিলের এই মাসটি মুমিনের জন্য শ্রেষ্ঠ নেয়ামত।
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 p-4 rounded-xl text-center">
                  <span className="text-3xl block mb-1">🌙</span>
                  <p className="text-sm font-bold">সহরি</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl text-center">
                  <span className="text-3xl block mb-1">🤲</span>
                  <p className="text-sm font-bold">ইফতার</p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl text-center">
                  <span className="text-3xl block mb-1">🕌</span>
                  <p className="text-sm font-bold">তারাবিহ</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default HadithSection;
