import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
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

  const mainNavItems = [
    { label: 'Начало', path: '/' },
    { label: 'За нас', path: '/about' },
    { label: 'Екип', path: '/team' },
    { label: 'Услуги', path: '/services' },
    { label: 'Събития', path: '/events' },
    { label: 'Контакти', path: '/contact' },
  ];

  const dropdownItems = [
    { label: 'Блог', path: '/blog' },
    { label: 'График', path: '/schedule' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Програми', path: '/guides' },
    { label: 'Видеа', path: '/videos' },
    { label: 'Калкулатори', path: '/tools' },
    { label: 'Магазин', path: '/shop' },
    { label: 'Галерия', path: '/gallery' },
    { label: 'Стена на славата', path: '/wall-of-fame' },
    { label: 'Ревюта', path: '/reviews' },
    { label: 'Партньори', path: '/partners' },
    { label: 'Бар', path: '/bar' },
    { label: 'Създател', path: '/developer' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
            <img 
              src={logo} 
              alt="Brothers Gym Logo" 
              className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 object-contain transition-transform group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.4))' }}
            />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white nav-title-glow tracking-wider hidden xs:inline">
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
                Още
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

          {/* Mobile Menu */}
          <div className="flex items-center">
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
