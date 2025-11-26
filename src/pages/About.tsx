import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Award } from 'lucide-react';
import aboutTeamImage from '@/assets/team-parade.jpg';

const About = () => {
  const { language } = useLanguage();

  const values = [
    {
      icon: Target,
      title: language === 'bg' ? 'Нашата Мисия' : 'Our Mission',
      description: language === 'bg'
        ? 'Да създадем място, където всеки може да развие своя потенциал и да стане по-силна версия на себе си.'
        : 'To create a place where everyone can develop their potential and become a stronger version of themselves.'
    },
    {
      icon: Heart,
      title: language === 'bg' ? 'Нашите Ценности' : 'Our Values',
      description: language === 'bg'
        ? 'Професионализъм, отдаденост, общност и постоянно развитие.'
        : 'Professionalism, dedication, community, and constant development.'
    },
    {
      icon: Award,
      title: language === 'bg' ? 'Нашата Визия' : 'Our Vision',
      description: language === 'bg'
        ? 'Да бъдем водещата фитнес и ММА дестинация в региона.'
        : 'To be the leading fitness and MMA destination in the region.'
    },
  ];

  return (
    <>
      <SEO 
        title={language === 'bg' ? 'За нас - Brothers Gym Казанлък' : 'About Us - Brothers Gym Kazanlak'}
        description={language === 'bg'
          ? 'Brothers Gym Казанлък е професионална фитнес зала и ММА център. Тренирай с професионалисти, стани част от семейство. Модерно оборудване, опитни треньори, мотивираща атмосфера.'
          : 'Brothers Gym Kazanlak is a professional fitness gym and MMA center. Train with professionals, become part of a family. Modern equipment, experienced coaches, motivating atmosphere.'}
        keywords="Brothers Gym история, за нас Brothers Gym, фитнес екип Казанлък, ММА треньори Казанлък, спортна общност Казанлък"
        canonicalUrl="/about"
        structuredData={getBreadcrumbSchema([
          { name: language === 'bg' ? 'Начало' : 'Home', url: '/' },
          { name: language === 'bg' ? 'За нас' : 'About', url: '/about' }
        ])}
        alternateLanguages={[
          { lang: 'bg', url: '/about' },
          { lang: 'en', url: '/about' },
          { lang: 'x-default', url: '/about' }
        ]}
      />
      <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 white-text-outline tracking-wider">
            {language === 'bg' ? 'ЗА BROTHERS GYM' : 'ABOUT BROTHERS GYM'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-semibold">
            {language === 'bg'
              ? 'Brothers Gym в Казанлък е място, където тренираш с професионалисти и ставаш част от семейство. Печелиш сила, характер и стил.'
              : 'Brothers Gym in Kazanlak is where you train with professionals and become part of a family. You gain strength, character, and style.'}
          </p>
        </div>

        {/* Image */}
        <div className="mb-16 rounded-lg overflow-hidden gym-shadow">
          <img 
            src={aboutTeamImage} 
            alt="Brothers Gym Team" 
            className="w-full h-[500px] md:h-[700px] object-cover"
          />
        </div>

        {/* Story */}
        <div className="mb-16">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 white-text-outline">
                {language === 'bg' ? 'НАШАТА ИСТОРИЯ' : 'OUR STORY'}
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg font-semibold">
                <p>
                  {language === 'bg'
                    ? 'Brothers Gym започна като мечта на група приятели, обединени от страстта към спорта и желанието да създадат нещо специално в Казанлък.'
                    : 'Brothers Gym started as a dream of a group of friends, united by their passion for sports and the desire to create something special in Kazanlak.'}
                </p>
                <p>
                  {language === 'bg'
                    ? 'Днес сме повече от фитнес зала - ние сме общност от хора, които се подкрепят взаимно в постигането на техните цели.'
                    : 'Today we are more than a gym - we are a community of people who support each other in achieving their goals.'}
                </p>
                <p>
                  {language === 'bg'
                    ? 'Нашите треньори са професионалисти с богат опит, а нашите членове са нашето най-голямо постижение.'
                    : 'Our coaches are professionals with extensive experience, and our members are our greatest achievement.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary transition-all hover:gym-shadow">
              <CardContent className="pt-8 text-center">
                <value.icon className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default About;
