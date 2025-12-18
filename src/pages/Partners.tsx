import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import damascenaLogo from '@/assets/partner-damascena.jpg';
import sesameLogo from '@/assets/partner-sesame.jpg';
import sdnLogo from '@/assets/partner-sdn.png';

const Partners = () => {
  const { language } = useLanguage();

  const partners = [
    { name: 'Damascena Complex', logo: damascenaLogo },
    { name: 'Sesame Casino Kazanlak', logo: sesameLogo },
    { name: 'SDN Estates LTD Bulgaria', logo: sdnLogo },
    { name: 'Motox Bulgaria', logo: null },
  ];

  return (
    <>
      <SEO 
        title="Партньори"
        description="Нашите партньори и спонсори: Damascena Complex, Sesame Casino Kazanlak, SDN Estates, Motox Bulgaria. Станете партньор на Brothers Gym."
        keywords="Brothers Gym партньори, спонсори фитнес Казанлък, сътрудничество, бизнес партньорство"
        canonicalUrl="/partners"
        structuredData={getBreadcrumbSchema([
          { name: 'Начало', url: '/' },
          { name: 'Партньори', url: '/partners' }
        ])}
      />
      <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
            {language === 'bg' ? 'Партньори и Спонсори' : 'Partners & Sponsors'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            {language === 'bg'
              ? 'Нашите партньори и спонсори'
              : 'Our partners and sponsors'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {partners.map((partner, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all group">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-full aspect-square mb-4 sm:mb-6 p-1 rounded-lg bg-gradient-to-br from-primary via-accent to-primary/50 animate-glow-pulse">
                    <div className="w-full h-full bg-background rounded-lg overflow-hidden flex items-center justify-center p-3 sm:p-4">
                      {partner.logo ? (
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/50 rounded-lg flex items-center justify-center">
                          <span className="text-3xl sm:text-4xl font-bold text-muted-foreground opacity-50">?</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold px-2">{partner.name}</h3>
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
    </>
  );
};

export default Partners;
