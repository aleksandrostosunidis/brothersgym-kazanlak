import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';

const Events = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Събития' : 'Events'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg' 
              ? 'Предстоящи събития, състезания и семинари'
              : 'Upcoming events, competitions, and seminars'}
          </p>
        </div>

        <Card className="bg-card border-border text-center p-12">
          <CardContent>
            <Calendar className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              {language === 'bg'
                ? 'Предстоящи събития ще бъдат обявени скоро. Следете ни в социалните мрежи за актуална информация.'
                : 'Upcoming events will be announced soon. Follow us on social media for updates.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Events;
