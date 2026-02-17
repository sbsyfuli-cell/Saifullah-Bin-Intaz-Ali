
import React, { useState, useEffect } from 'react';
import { Surah } from '../types';

interface SurahListProps {
  onSelectSurah: (surah: Surah) => void;
}

const SurahList: React.FC<SurahListProps> = ({ onSelectSurah }) => {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch('https://api.alquran.cloud/v1/surah');
        const data = await response.json();
        setSurahs(data.data);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  const filteredSurahs = surahs.filter(s => 
    s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.number.toString().includes(searchQuery)
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-emerald-800 font-medium">সুরা তালিকা লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-emerald-900 mb-2">কুরআন শরিফ</h2>
        <p className="text-slate-600">সবগুলো সুরা এখানে আলাদা আলাদা ভাবে পাওয়া যাবে।</p>
      </div>

      <div className="mb-6 sticky top-20 z-10 bg-slate-50 py-2">
        <div className="relative">
          <input 
            type="text" 
            placeholder="সুরা খুঁজুন (যেমন: Fatiha, 1...)" 
            className="w-full pl-12 pr-4 py-3 bg-white border border-emerald-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <svg className="w-6 h-6 absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <button 
            key={surah.number}
            onClick={() => onSelectSurah(surah)}
            className="group flex items-center p-4 bg-white rounded-xl border border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all text-left"
          >
            <div className="w-10 h-10 bg-emerald-50 text-emerald-700 rounded-lg flex items-center justify-center font-bold text-lg mr-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {surah.number}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-emerald-700">{surah.englishName}</h3>
              <p className="text-sm text-slate-500">{surah.englishNameTranslation} • {surah.numberOfAyahs} আয়াত</p>
            </div>
            <div className="text-2xl arabic-text font-bold text-emerald-900">
              {surah.name.split(' ').pop()}
            </div>
          </button>
        ))}
      </div>
      
      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-500">কোনো সুরা খুঁজে পাওয়া যায়নি।</p>
        </div>
      )}
    </div>
  );
};

export default SurahList;
