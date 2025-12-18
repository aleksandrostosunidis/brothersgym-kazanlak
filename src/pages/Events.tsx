import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';
import christmasEvent from '@/assets/christmas-event.jpg';

const Events = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO 
        title="Събития"
        description="Предстоящи събития, състезания и семинари в Brothers Gym Казанлък. Присъединете се към нашите тренировки, демонстрации и спортни събития."
        keywords="Brothers Gym събития, ММА състезания Казанлък, фитнес събития, спортни семинари Казанлък"
        canonicalUrl="/events"
        structuredData={getBreadcrumbSchema([
          { name: 'Начало', url: '/' },
          { name: 'Събития', url: '/events' }
        ])}
      />
      <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient gym-glow-text tracking-wider">
            {language === 'bg' ? 'СЪБИТИЯ' : 'EVENTS'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'bg' 
              ? 'Предстоящи събития, състезания и семинари'
              : 'Upcoming events, competitions, and seminars'}
          </p>
        </div>

        {/* Christmas Event */}
        <Card className="bg-card border-2 border-primary hover:gym-shadow transition-all mb-8 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img 
                src={christmasEvent} 
                alt="Christmas Party" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-8 flex flex-col justify-center">
              <h2 className="text-4xl font-bold mb-4 text-primary gym-glow-text tracking-wide">
                {language === 'bg' ? 'КОЛЕДНО ПАРТИ НА BROTHERS GYM!' : 'BROTHERS GYM CHRISTMAS PARTY!'}
              </h2>
              <p className="text-lg mb-6 text-foreground/90 leading-relaxed">
                {language === 'bg'
                  ? 'Остават броени дни до крайния срок за записване за Коледния банкет на Brothers Gym! Не чакайте последния момент — местата са ограничени! Ще има настроение, музика, изненади и много спомени, които си струват!'
                  : 'Only a few days left until the deadline for registration for the Brothers Gym Christmas banquet! Don\'t wait until the last moment - places are limited! There will be atmosphere, music, surprises and many memories worth it!'}
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">
                    {language === 'bg' ? 'Място: Ресторант Зорница' : 'Venue: Restaurant Zornitsa'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">
                    {language === 'bg' ? 'Дата: 21.12' : 'Date: 21.12'}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <span className="text-lg font-semibold">
                    {language === 'bg' ? 'Час: 19:00' : 'Time: 19:00'}
                  </span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Future Events Placeholder */}
        <Card className="bg-card border-border text-center p-12">
          <CardContent>
            <Calendar className="h-20 w-20 text-muted-foreground mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              {language === 'bg'
                ? 'Повече събития ще бъдат обявени скоро. Следете ни в социалните мрежи за актуална информация.'
                : 'More events will be announced soon. Follow us on social media for updates.'}
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default Events;
