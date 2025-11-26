import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'bg' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  bg: {
    // Navigation
    home: 'Начало',
    about: 'За нас',
    services: 'Услуги',
    team: 'Екип',
    gallery: 'Галерия',
    contact: 'Контакти',
    schedule: 'График',
    reviews: 'Ревюта',
    faq: 'FAQ',
    videos: 'Видеа',
    events: 'Събития',
    partners: 'Партньори',
    shop: 'Магазин',
    bar: 'Бар',
    guides: 'Ръководства',
    tools: 'Инструменти',
    wallOfFame: 'Стена на славата',
    developer: 'Създател',
    blog: 'Блог',
    more: 'Още',
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    team: 'Team',
    gallery: 'Gallery',
    contact: 'Contact',
    schedule: 'Schedule',
    reviews: 'Reviews',
    faq: 'FAQ',
    videos: 'Videos',
    events: 'Events',
    partners: 'Partners',
    shop: 'Shop',
    bar: 'Bar',
    guides: 'Guides',
    tools: 'Tools',
    wallOfFame: 'Wall of Fame',
    developer: 'Developer',
    blog: 'Blog',
    more: 'More',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('bg');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.bg] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
