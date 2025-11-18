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
    'nav.home': 'Начало',
    'nav.about': 'За Нас',
    'nav.team': 'Екип',
    'nav.services': 'Услуги и Цени',
    'nav.events': 'Събития',
    'nav.contact': 'Контакти',
    'nav.shop': 'Магазин',
    'nav.gallery': 'Галерия',
    'nav.walloffame': 'Стена на славата',
    'nav.reviews': 'Ревюта',
    'nav.partners': 'Партньори',
    'nav.resources': 'Ресурси',
    'nav.bar': 'Бар',
    'nav.faq': 'Въпроси',
    'nav.developer': 'За Разработчика',
    
    // Hero
    'hero.title': 'Brothers Gym - Казанлък',
    'hero.subtitle': 'Ставаш част от екип. Тренираш с професионалисти. Печелиш сила, характер и стил.',
    'hero.cta': 'Запиши Тренировка',
    
    // About
    'about.title': 'За Brothers Gym',
    'about.description': 'Brothers Gym в Казанлък е място, където тренираш с професионалисти и ставаш част от семейство. Печелиш сила, характер и стил.',
    
    // Services
    'services.title': 'Услуги и Цени',
    'services.fitness': 'Фитнес',
    'services.mma': 'ММА',
    'services.combined': 'Комбинирано',
    'services.personal': 'Персонални Тренировки',
    
    // Contact
    'contact.title': 'Контакти',
    'contact.hours': 'Работно време',
    'contact.phone': 'Телефон',
    'contact.address': 'Адрес',
    
    // Common
    'common.learnmore': 'Научи повече',
    'common.viewall': 'Виж всички',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.team': 'Team',
    'nav.services': 'Services & Pricing',
    'nav.events': 'Events',
    'nav.contact': 'Contact',
    'nav.shop': 'Shop',
    'nav.gallery': 'Gallery',
    'nav.walloffame': 'Wall of Fame',
    'nav.reviews': 'Reviews',
    'nav.partners': 'Partners',
    'nav.resources': 'Resources',
    'nav.bar': 'Bar',
    'nav.faq': 'FAQ',
    'nav.developer': 'About Developer',
    
    // Hero
    'hero.title': 'Brothers Gym - Kazanlak',
    'hero.subtitle': 'You become part of a team. You train with professionals. You gain strength, character, and style.',
    'hero.cta': 'Book Training',
    
    // About
    'about.title': 'About Brothers Gym',
    'about.description': 'Brothers Gym in Kazanlak is where you train with professionals and become part of a family. You gain strength, character, and style.',
    
    // Services
    'services.title': 'Services & Pricing',
    'services.fitness': 'Fitness',
    'services.mma': 'MMA',
    'services.combined': 'Combined',
    'services.personal': 'Personal Training',
    
    // Contact
    'contact.title': 'Contact',
    'contact.hours': 'Working Hours',
    'contact.phone': 'Phone',
    'contact.address': 'Address',
    
    // Common
    'common.learnmore': 'Learn more',
    'common.viewall': 'View all',
  },
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
