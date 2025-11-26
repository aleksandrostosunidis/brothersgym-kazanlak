import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-4xl font-bold mb-4 white-text-outline tracking-wider">
          {t('pageNotFound')}
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          {t('pageNotFoundDesc')}
        </p>
        <Link to="/">
          <Button size="lg" className="gym-glow">
            <Home className="mr-2 h-5 w-5" />
            {t('backToHome')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
