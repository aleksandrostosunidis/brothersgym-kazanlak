import { Facebook, Instagram, Music, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export const Footer = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-gym-darker border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-gradient">Brothers Gym</h3>
            <p className="text-muted-foreground mb-4 font-semibold">
              {language === 'bg' 
                ? 'Тренираш с професионалисти. Печелиш сила, характер и стил.'
                : 'Train with professionals. Gain strength, character, and style.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{language === 'bg' ? 'Бързи Връзки' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Услуги и Цени' : 'Services & Pricing'}
              </Link></li>
              <li><Link to="/schedule" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'График' : 'Schedule'}
              </Link></li>
              <li><Link to="/team" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Екип' : 'Team'}
              </Link></li>
              <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Блог' : 'Blog'}
              </Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Въпроси' : 'FAQ'}
              </Link></li>
              <li><Link to="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Програми' : 'Guides'}
              </Link></li>
              <li><Link to="/videos" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Видео' : 'Videos'}
              </Link></li>
              <li><Link to="/tools" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Инструменти' : 'Tools'}
              </Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Галерия' : 'Gallery'}
              </Link></li>
              <li><Link to="/reviews" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Ревюта' : 'Reviews'}
              </Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Контакти' : 'Contact'}
              </Link></li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{language === 'bg' ? 'Свържете се с нас' : 'Connect With Us'}</h4>
            <div className="flex items-center space-x-2 mb-2">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+359896780067" className="text-muted-foreground hover:text-primary transition-colors font-semibold">
                089 678 0067 (Дориан)
              </a>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+359894450256" className="text-muted-foreground hover:text-primary transition-colors font-semibold">
                089 445 0256 (Тенчо)
              </a>
            </div>
            <p className="text-muted-foreground text-sm mb-3 font-semibold">
              {language === 'bg' 
                ? 'Адрес: ул Искра 12 (до Club Noir), Казанлък, България'
                : 'Address: ul. Iskra 12 (next to Club Noir), Kazanlak, Bulgaria'}
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/p/Brothers-GYM-100063529961850/?locale=bg_BG" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/brothers_gym_kazanlak/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://www.tiktok.com/@brothersgymkz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Music className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Brothers Gym - Kazanlak. {language === 'bg' ? 'Всички права запазени.' : 'All rights reserved.'}
        </div>
      </div>
    </footer>
  );
};
