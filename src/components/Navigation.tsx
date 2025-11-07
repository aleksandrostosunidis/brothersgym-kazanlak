import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import logo from '@/assets/brothers-gym-logo.jpg';

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const mainNavItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.team'), path: '/team' },
    { label: t('nav.services'), path: '/services' },
    { label: t('nav.events'), path: '/events' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const dropdownItems = [
    { label: t('nav.shop'), path: '/shop' },
    { label: t('nav.gallery'), path: '/gallery' },
    { label: t('nav.walloffame'), path: '/wall-of-fame' },
    { label: t('nav.reviews'), path: '/reviews' },
    { label: t('nav.partners'), path: '/partners' },
    { label: t('nav.bar'), path: '/bar' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src={logo} 
              alt="Brothers Gym Logo" 
              className="h-16 w-16 object-contain transition-transform group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
            />
            <span className="text-3xl font-bold text-white nav-title-glow tracking-wider hidden sm:inline">
              BROTHERS GYM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* More Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="px-4 py-2 text-foreground hover:text-primary transition-colors font-medium flex items-center">
                {language === 'bg' ? 'Още' : 'More'}
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {dropdownItems.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link to={item.path} className="w-full">
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'bg' ? 'en' : 'bg')}
              className="hidden sm:flex items-center"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language.toUpperCase()}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border my-2" />
              {dropdownItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-3 text-foreground hover:bg-secondary rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setLanguage(language === 'bg' ? 'en' : 'bg');
                  setMobileMenuOpen(false);
                }}
                className="mx-4 mt-4"
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'bg' ? 'Switch to English' : 'Превключи на Български'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
