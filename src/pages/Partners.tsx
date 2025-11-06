import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake } from 'lucide-react';

const Partners = () => {
  const { language } = useLanguage();

  const partners = [
    'Damascena Complex',
    'Sesame Casino Kazanlak',
    'SDN Estates LTD Bulgaria',
    'Motox Bulgaria',
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Партньори и Спонсори' : 'Partners & Sponsors'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Нашите партньори и спонсори'
              : 'Our partners and sponsors'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {partners.map((partner, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Handshake className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold">{partner}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-secondary/30 border-primary/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">
              {language === 'bg' ? 'Станете наш партньор' : 'Become Our Partner'}
            </h3>
            <p className="text-lg text-muted-foreground">
              {language === 'bg'
                ? 'Интересувате ли се от партньорство? Свържете се с нас за повече информация.'
                : 'Interested in partnership? Contact us for more information.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Partners;
