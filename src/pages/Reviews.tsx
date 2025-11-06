import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Reviews = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Ревюта' : 'Reviews'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Какво казват нашите членове'
              : 'What our members say'}
          </p>
        </div>

        <Card className="bg-card border-border text-center p-12">
          <CardContent>
            <Star className="h-20 w-20 text-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              {language === 'bg'
                ? 'Ревюта от нашите клиенти ще бъдат добавени скоро.'
                : 'Client reviews will be added soon.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reviews;
