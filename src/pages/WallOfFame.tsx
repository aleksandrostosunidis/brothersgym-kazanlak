import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';

const WallOfFame = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO 
        title="Стена на славата"
        description="Постижения, медали и успехи на нашите спортисти от Brothers Gym Казанлък. Вижте нашите шампиони и техните победи."
        keywords="Brothers Gym шампиони, ММА медалисти Казанлък, постижения, победи, спортни успехи"
        canonicalUrl="/wall-of-fame"
        structuredData={getBreadcrumbSchema([
          { name: 'Начало', url: '/' },
          { name: 'Стена на славата', url: '/wall-of-fame' }
        ])}
      />
      <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Стена на славата' : 'Wall of Fame'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Постижения, медали и успехи на нашите спортисти'
              : 'Achievements, medals, and successes of our athletes'}
          </p>
        </div>

        <Card className="bg-card border-border text-center p-12">
          <CardContent>
            <Trophy className="h-20 w-20 text-primary mx-auto mb-6" />
            <p className="text-xl text-muted-foreground">
              {language === 'bg'
                ? 'Постиженията на нашите спортисти ще бъдат представени скоро.'
                : 'Our athletes\' achievements will be displayed soon.'}
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default WallOfFame;
