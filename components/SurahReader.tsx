
import React, { useState, useEffect, useRef } from 'react';
import { Surah, Ayah } from '../types';
import { RECITERS } from '../constants';

interface SurahReaderProps {
  surah: Surah;
  onBack: () => void;
}

const SurahReader: React.FC<SurahReaderProps> = ({ surah, onBack }) => {
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchAyahs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${surah.number}`);
        const data = await response.json();
        setAyahs(data.data.ayats || data.data.ayahs);
      } catch (error) {
        console.error("Error fetching ayahs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAyahs();
  }, [surah.number]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(`https://cdn.islamic.network/quran/audio-surah/128/${selectedReciter}/${surah.number}.mp3`);
      
      audioRef.current.onloadedmetadata = () => {
        if (audioRef.current) setDuration(formatTime(audioRef.current.duration));
      };

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const current = audioRef.current.currentTime;
          const total = audioRef.current.duration;
          setProgress((current / total) * 100);
          setCurrentTime(formatTime(current));
        }
      };

      audioRef.current.onended = () => setIsPlaying(false);
    }
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const seekTo = (val / 100) * (audioRef.current?.duration || 0);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTo;
      setProgress(val);
    }
  };

  const handleStopAudio = () => {
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setIsPlaying(false);
          setProgress(0);
      }
  };

  useEffect(() => {
      return () => {
          if (audioRef.current) {
              audioRef.current.pause();
              audioRef.current = null;
          }
      };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-emerald-800 font-bold">সুরা লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center text-emerald-700 hover:text-emerald-900 font-bold transition-colors bg-emerald-50 px-4 py-2 rounded-full w-fit"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        পিছনে যান
      </button>

      <div className="bg-emerald-900 rounded-3xl p-6 md:p-10 text-white mb-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')] pointer-events-none"></div>
        
        <div className="text-center relative z-10">
            <h2 className="text-5xl font-bold arabic-text mb-4 text-yellow-400">{surah.name}</h2>
            <h3 className="text-2xl font-bold mb-1">{surah.englishName}</h3>
            <p className="text-emerald-200 mb-8">{surah.englishNameTranslation} • {surah.numberOfAyahs} আয়াত</p>
            
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 w-full max-w-lg mx-auto shadow-inner">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                    <div className="flex flex-col items-start">
                        <span className="text-[10px] uppercase tracking-widest text-emerald-300 mb-1 font-bold">কারী নির্বাচন করুন</span>
                        <select 
                            value={selectedReciter} 
                            onChange={(e) => {
                                handleStopAudio();
                                setSelectedReciter(e.target.value);
                                audioRef.current = null;
                            }}
                            className="bg-emerald-800 border border-emerald-600 text-white rounded-xl px-3 py-2 text-sm focus:outline-none outline-none"
                        >
                            {RECITERS.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
                        </select>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={handlePlayAudio}
                            className="w-16 h-16 bg-yellow-500 hover:bg-yellow-400 text-emerald-900 rounded-full flex items-center justify-center transition-all shadow-xl transform active:scale-90"
                        >
                            {isPlaying ? (
                                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                            ) : (
                                <svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            )}
                        </button>
                        
                        <button onClick={handleStopAudio} className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-emerald-200 hover:bg-white/20 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                        </button>
                    </div>
                </div>

                <div className="space-y-3">
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        step="0.1"
                        value={progress} 
                        onChange={handleSeek}
                        className="w-full h-1.5 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-yellow-400"
                    />
                    <div className="flex justify-between text-xs font-bold text-emerald-300 tabular-nums">
                        <span>{currentTime}</span>
                        <span className="text-white/60">কুরআন তেলাওয়াত</span>
                        <span>{duration}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="space-y-6 px-2">
        {surah.number !== 1 && surah.number !== 9 && (
            <div className="text-center py-12">
                <span className="arabic-text text-5xl text-emerald-900 drop-shadow-sm leading-relaxed">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            </div>
        )}

        {ayahs.map((ayah) => (
          <div 
            key={ayah.number} 
            className="p-8 bg-white rounded-3xl border border-emerald-50 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group"
          >
            <div className="flex flex-col items-end space-y-6">
              <div className="w-full flex justify-between items-center border-b border-emerald-50 pb-4">
                 <div className="w-10 h-10 rounded-xl border-2 border-emerald-100 flex items-center justify-center text-sm font-black text-emerald-600 bg-emerald-50/50">
                    {ayah.numberInSurah}
                 </div>
                 <div className="flex gap-2">
                    {/* Placeholder for bookmark/share icons if needed */}
                 </div>
              </div>
              <div className="text-4xl md:text-5xl text-right arabic-text leading-[2.2] text-slate-800 tracking-wide font-medium w-full">
                {ayah.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahReader;
