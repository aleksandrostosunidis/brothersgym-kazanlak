import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Users, Trophy, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-banner.png';
import mmaImage from '@/assets/mma-athlete.jpg';
import fitnessImage from '@/assets/fitness-gym.jpg';

const Home = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: Dumbbell,
      title: language === 'bg' ? 'Професионално Оборудване' : 'Professional Equipment',
      description: language === 'bg' 
        ? 'Най-модерното оборудване за фитнес и ММА'
        : 'State-of-the-art fitness and MMA equipment'
    },
    {
      icon: Users,
      title: language === 'bg' ? 'Експертни Треньори' : 'Expert Coaches',
      description: language === 'bg'
        ? 'Тренирай с професионалисти в областта'
        : 'Train with industry professionals'
    },
    {
      icon: Trophy,
      title: language === 'bg' ? 'Резултати' : 'Results',
      description: language === 'bg'
        ? 'Доказана система за постигане на цели'
        : 'Proven system for achieving goals'
    },
    {
      icon: Zap,
      title: language === 'bg' ? 'Енергия' : 'Energy',
      description: language === 'bg'
        ? 'Мотивираща атмосфера и общност'
        : 'Motivating atmosphere and community'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-white hero-title-glow tracking-wider">
            {language === 'bg' ? 'BROTHERS GYM' : 'BROTHERS GYM'}
          </h1>
          <p className="text-xl md:text-3xl mb-6 text-foreground/90 drop-shadow-lg font-semibold">
            {language === 'bg' 
              ? 'Ставаш част от екип. Тренираш с професионалисти. Печелиш сила, характер и стил.'
              : 'You become part of a team. You train with professionals. You gain strength, character, and style.'}
          </p>
          <p className="text-2xl md:text-4xl mb-8 text-primary font-bold gym-glow-text tracking-wide">
            {language === 'bg' ? 'РАБОТИМ С МУЛТИСПОРТ КАРТИ' : 'WE ACCEPT MULTISPORT CARDS'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="text-xl px-10 py-7 gym-glow hover:scale-105 transition-all animate-glow-pulse font-bold">
              {language === 'bg' ? 'ЗАПИШИ ТРЕНИРОВКА' : 'BOOK TRAINING'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient gym-glow-text">
            {language === 'bg' ? 'Защо Brothers Gym?' : 'Why Brothers Gym?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all hover:gym-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient gym-glow-text">
            {language === 'bg' ? 'Нашите Услуги' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={fitnessImage} 
                  alt="Fitness" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold">
                  {language === 'bg' ? 'Фитнес' : 'Fitness'}
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {language === 'bg'
                    ? 'Модерна фитнес зала с пълно оборудване за всички нива на подготовка.'
                    : 'Modern gym with full equipment for all fitness levels.'}
                </p>
                <Link to="/services">
                  <Button variant="outline">
                    {language === 'bg' ? 'Виж Цени' : 'View Pricing'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group cursor-pointer hover:gym-glow transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={mmaImage} 
                  alt="MMA" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-3xl font-bold">
                  {language === 'bg' ? 'ММА' : 'MMA'}
                </h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  {language === 'bg'
                    ? 'Професионални тренировки по ММА с опитни инструктори.'
                    : 'Professional MMA training with experienced coaches.'}
                </p>
                <Link to="/services">
                  <Button variant="outline">
                    {language === 'bg' ? 'Виж Цени' : 'View Pricing'}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gradient gym-glow-text">
            {language === 'bg' ? 'Готов да започнеш?' : 'Ready to Start?'}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {language === 'bg'
              ? 'Стани част от Brothers Gym и започни своята трансформация днес.'
              : 'Become part of Brothers Gym and start your transformation today.'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="text-lg px-8 py-6 gym-glow animate-glow-pulse">
              {language === 'bg' ? 'Свържи се с нас' : 'Contact Us'}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
