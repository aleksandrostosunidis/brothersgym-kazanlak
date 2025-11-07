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
            <p className="text-muted-foreground mb-4">
              {language === 'bg' 
                ? 'Тренираш с професионалисти. Печелиш сила, характер и стил.'
                : 'Train with professionals. Gain strength, character, and style.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{language === 'bg' ? 'Бързи Връзки' : 'Quick Links'}</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'За Нас' : 'About Us'}
              </Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Услуги' : 'Services'}
              </Link></li>
              <li><Link to="/events" className="text-muted-foreground hover:text-primary transition-colors">
                {language === 'bg' ? 'Събития' : 'Events'}
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
              <a href="tel:+359896780067" className="text-muted-foreground hover:text-primary transition-colors">
                089 678 0067 (Дориан)
              </a>
            </div>
            <div className="flex items-center space-x-2 mb-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+359894450256" className="text-muted-foreground hover:text-primary transition-colors">
                089 445 0256 (Тенчо)
              </a>
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              {language === 'bg' 
                ? 'Адрес: ул Искра 12 (до Club Noar), Казанлък, България'
                : 'Address: ul. Iskra 12 (next to Club Noar), Kazanlak, Bulgaria'}
            </p>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://www.facebook.com/p/Brothers-GYM-100063529961850/" 
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
