
export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean | any;
}

export interface Hadith {
  id: number;
  category: 'Quran' | 'Ramadan';
  text: string;
  source: string;
}

export type View = 'home' | 'surah-list' | 'surah-reader' | 'hadith' | 'bot' | 'admin' | 'splash';
