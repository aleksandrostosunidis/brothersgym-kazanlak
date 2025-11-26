import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Users, Trophy, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { 
  getLocalBusinessSchema, 
  getGymPageSchema, 
  getOrganizationSchema, 
  getWebSiteSchema,
  getFAQSchema 
} from '@/lib/structuredData';
import heroImage from '@/assets/hero-banner.png';
import mmaImage from '@/assets/mma-athlete.jpg';
import fitnessImage from '@/assets/fitness-gym.jpg';

const Home = () => {
  const { language } = useLanguage();

  // FAQ Schema for SEO
  const faqData = language === 'bg' ? [
    {
      question: "Какви услуги предлага Brothers Gym Казанлък?",
      answer: "Brothers Gym Казанлък предлага фитнес тренировки, ММА (Mixed Martial Arts), персонални тренировки, групови тренировки, кикбокс, бокс, кросфит, хранителни планове и VIP треньорски сесии."
    },
    {
      question: "Приемате ли Мултиспорт карти?",
      answer: "Да, приемаме Мултиспорт карти за всички наши услуги."
    },
    {
      question: "Какви са работните часове на залата?",
      answer: "Работим понеделник до петък от 07:30 до 21:30 часа, и събота-неделя от 09:00 до 20:00 часа."
    },
    {
      question: "Има ли възможност за персонални тренировки?",
      answer: "Да, предлагаме персонални тренировки с нашите експертни треньори в различни дисциплини включително ММА, бокс, фитнес и кросфит."
    }
  ] : [
    {
      question: "What services does Brothers Gym Kazanlak offer?",
      answer: "Brothers Gym Kazanlak offers fitness training, MMA (Mixed Martial Arts), personal training, group training, kickboxing, boxing, CrossFit, nutrition plans, and VIP training sessions."
    },
    {
      question: "Do you accept Multisport cards?",
      answer: "Yes, we accept Multisport cards for all our services."
    },
    {
      question: "What are the gym's opening hours?",
      answer: "We are open Monday to Friday from 07:30 to 21:30, and Saturday-Sunday from 09:00 to 20:00."
    },
    {
      question: "Are personal training sessions available?",
      answer: "Yes, we offer personal training sessions with our expert coaches in various disciplines including MMA, boxing, fitness, and CrossFit."
    }
  ];

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
    <>
      <SEO 
        title={language === 'bg' ? 'Фитнес зала и ММА център в Казанлък' : 'Fitness Gym and MMA Center in Kazanlak'}
        description={language === 'bg' 
          ? 'Brothers Gym Казанлък - №1 професионална фитнес зала и ММА център в региона. Модерно оборудване, шампионски треньори, персонални тренировки. Приемаме Мултиспорт карти. ☎ 089 678 0067, 089 445 0256. Адрес: ул. Искра 12, Казанлък'
          : 'Brothers Gym Kazanlak - #1 professional fitness gym and MMA center in the region. Modern equipment, champion coaches, personal training. We accept Multisport cards. ☎ 089 678 0067, 089 445 0256. Address: ul. Iskra 12, Kazanlak'}
        keywords="Brothers Gym Казанлък, фитнес зала Казанлък, ММА Казанлък, спортна зала Казанлък, фитнес Казанлък, мултиспорт Казанлък, персонални тренировки Казанлък, кикбокс Казанлък, бокс Казанлък, кросфит Казанлък, gym kazanlak, mma kazanlak, fitness kazanlak, Brothers GYM, спортна зала Стара Загора, тренировки Казанлък"
        canonicalUrl="/"
        structuredData={[
          getOrganizationSchema(),
          getLocalBusinessSchema(), 
          getGymPageSchema(),
          getWebSiteSchema(),
          getFAQSchema(faqData)
        ]}
        alternateLanguages={[
          { lang: 'bg', url: '/' },
          { lang: 'en', url: '/' },
          { lang: 'x-default', url: '/' }
        ]}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative min-h-[100svh] h-screen flex items-center justify-center overflow-hidden">
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

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 sm:mb-6 text-white hero-title-glow tracking-wider">
            {language === 'bg' ? 'BROTHERS GYM' : 'BROTHERS GYM'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-4 sm:mb-6 text-foreground/90 drop-shadow-lg font-semibold px-2 sm:px-4 max-w-3xl mx-auto">
            {language === 'bg' 
              ? 'Ставаш част от екип. Тренираш с професионалисти. Печелиш сила, характер и стил.'
              : 'You become part of a team. You train with professionals. You gain strength, character, and style.'}
          </p>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl mb-6 sm:mb-8 text-primary font-bold gym-glow-text tracking-wide px-2 sm:px-4">
            {language === 'bg' ? 'РАБОТИМ С МУЛТИСПОРТ КАРТИ' : 'WE ACCEPT MULTISPORT CARDS'}
          </p>
          <Link to="/contact">
            <Button size="lg" className="text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-10 py-4 sm:py-6 md:py-7 gym-glow hover:scale-105 transition-all animate-glow-pulse font-bold">
              {language === 'bg' ? 'ЗАПИШИ ТРЕНИРОВКА' : 'BOOK TRAINING'}
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient gym-glow-text">
            {language === 'bg' ? 'Защо Brothers Gym?' : 'Why Brothers Gym?'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary transition-all hover:gym-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary mb-4 mx-auto" />
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 md:py-20 px-4 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-gradient gym-glow-text">
            {language === 'bg' ? 'Нашите Услуги' : 'Our Services'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all">
              <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src={fitnessImage} 
                  alt="Fitness" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <h3 className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-2xl sm:text-3xl font-bold">
                  {language === 'bg' ? 'Фитнес' : 'Fitness'}
                </h3>
              </div>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {language === 'bg'
                    ? 'Модерна фитнес зала с пълно оборудване за всички нива на подготовка.'
                    : 'Modern gym with full equipment for all fitness levels.'}
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full sm:w-auto">
                    {language === 'bg' ? 'Виж Цени' : 'View Pricing'}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="overflow-hidden group cursor-pointer hover:gym-glow transition-all">
              <div className="relative h-40 xs:h-48 sm:h-56 md:h-64 overflow-hidden">
                <img 
                  src={mmaImage} 
                  alt="MMA" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <h3 className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-2xl sm:text-3xl font-bold">
                  {language === 'bg' ? 'ММА' : 'MMA'}
                </h3>
              </div>
              <CardContent className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  {language === 'bg'
                    ? 'Професионални тренировки по ММА с опитни инструктори.'
                    : 'Professional MMA training with experienced coaches.'}
                </p>
                <Link to="/services">
                  <Button variant="outline" className="w-full sm:w-auto">
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
    </>
  );
};

export default Home;
