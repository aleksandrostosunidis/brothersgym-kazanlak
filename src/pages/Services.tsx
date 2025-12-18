import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { 
  getLocalBusinessSchema, 
  getBreadcrumbSchema,
  getServiceSchema,
  getFAQSchema 
} from '@/lib/structuredData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dumbbell, Swords, Zap, User, Info } from 'lucide-react';

const Services = () => {
  const { language } = useLanguage();

  const faqData = language === 'bg' ? [
    {
      question: "Колко струват фитнес картите?",
      answer: "Фитнес карти: Еднократно - 7 лв, 12 посещения - 50 лв, 16 посещения - 55 лв, Безлимитна - 60 лв, Ученическа карта - 50 лв."
    },
    {
      question: "Какви видове ММА тренировки предлагате?",
      answer: "Предлагаме детски ММА групи, юношески тренировки и възрастни ММА тренировки с различни графици и цени."
    },
    {
      question: "Има ли отстъпки за студенти?",
      answer: "Да, имаме специални цени за лица под 18 години за всички наши услуги."
    },
    {
      question: "Какво включват VIP треньорските сесии?",
      answer: "VIP сесиите включват бокс, кикбокс, ММА, борба и грепълинг, кондиционни тренировки, силови тренировки, кросфит, рехабилитация след травми и NFC за гръбначен стълб."
    }
  ] : [
    {
      question: "How much does a monthly fitness card cost?",
      answer: "Monthly fitness card is 50 BGN for adults over 18 and 40 BGN for youth under 18."
    },
    {
      question: "What types of MMA training do you offer?",
      answer: "We offer kids MMA groups, youth training, and adult MMA training with different schedules and prices."
    },
    {
      question: "Are there student discounts?",
      answer: "Yes, we have special prices for people under 18 years old for all our services."
    },
    {
      question: "What do VIP training sessions include?",
      answer: "VIP sessions include boxing, kickboxing, MMA, wrestling and grappling, conditioning training, strength training, CrossFit, post-injury rehabilitation, and NFC for spine health."
    }
  ];

  return (
    <>
      <SEO 
        title="Услуги и Цени - Фитнес и ММА"
        description="Пълна ценова листа на Brothers Gym Казанлък: Фитнес карти от 50 лв, ММА тренировки от 80 лв, персонални тренировки, VIP сесии, хранителни планове. Приемаме Мултиспорт карти. ☎ 089 678 0067, 089 445 0256"
        keywords="цени фитнес Казанлък, ММА цени Казанлък, абонамент фитнес Казанлък, персонални тренировки цени, мултиспорт Казанлък, Brothers Gym цени, фитнес карта Казанлък, спортна зала цени, кикбокс цени Казанлък, бокс тренировки цени, vip тренировки Казанлък"
        canonicalUrl="/services"
        structuredData={[
          getLocalBusinessSchema(),
          getBreadcrumbSchema([
            { name: 'Начало', url: '/' },
            { name: 'Услуги и Цени', url: '/services' }
          ]),
          getServiceSchema(
            'Фитнес Тренировки',
            'Професионални фитнес тренировки с модерно оборудване',
            '50'
          ),
          getServiceSchema(
            'ММА Тренировки',
            'Mixed Martial Arts тренировки с шампионски треньори',
            '80'
          ),
          getServiceSchema(
            'Персонални Тренировки',
            'Индивидуални тренировки със специализиран треньор',
            '20'
          ),
          getFAQSchema(faqData)
        ]}
      />
      <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 white-text-outline tracking-[0.2em] sm:tracking-[0.3em]">
            {language === 'bg' ? 'УСЛУГИ И ЦЕНИ' : 'SERVICES & PRICING'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4 font-semibold">
            {language === 'bg'
              ? 'Изберете най-подходящия за вас план'
              : 'Choose the plan that suits you best'}
          </p>
        </div>

        {/* Fitness Section */}
        <div className="mb-8 sm:mb-12">
          <Card className="bg-card border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-2 sm:gap-3">
                <Dumbbell className="h-6 w-6 sm:h-8 sm:w-8 text-primary flex-shrink-0" />
                <CardTitle className="text-xl sm:text-2xl md:text-3xl">{language === 'bg' ? 'Фитнес' : 'Fitness'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto -mx-6 sm:mx-0">
                <table className="w-full min-w-[500px] sm:min-w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2 sm:p-3 text-sm sm:text-base">{language === 'bg' ? 'Услуга' : 'Service'}</th>
                      <th className="text-center p-2 sm:p-3 text-sm sm:text-base">{language === 'bg' ? 'Цена' : 'Price'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-2 sm:p-3 text-sm sm:text-base font-semibold">{language === 'bg' ? 'Еднократно' : 'Single Visit'}</td>
                      <td className="text-center p-2 sm:p-3 text-sm sm:text-base font-semibold">7 лв</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">{language === 'bg' ? '12 посещения' : '12 Visits'}</td>
                      <td className="text-center p-3 font-semibold">50 лв (~25.51 €)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">{language === 'bg' ? '16 посещения' : '16 Visits'}</td>
                      <td className="text-center p-3 font-semibold">55 лв (~28.06 €)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">{language === 'bg' ? 'Безлимитна' : 'Unlimited'}</td>
                      <td className="text-center p-3 font-semibold">60 лв (~30.61 €)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3 font-semibold">{language === 'bg' ? 'Ученическа карта' : 'Student Card'}</td>
                      <td className="text-center p-3 font-semibold">50 лв (~25.51 €)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MMA Section */}
        <div className="mb-12">
          <Card className="bg-card border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Swords className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl">{language === 'bg' ? 'ММА' : 'MMA'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">{language === 'bg' ? 'Услуга' : 'Service'}</th>
                      <th className="text-center p-3">{language === 'bg' ? 'До 18 години' : 'Under 18'}</th>
                      <th className="text-center p-3">{language === 'bg' ? 'Над 18 години' : 'Over 18'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3">{language === 'bg' ? 'Еднократна тренировка' : 'Single Training'}</td>
                      <td className="text-center p-3">10 лв (~5.10 €)</td>
                      <td className="text-center p-3">12 лв (~6.12 €)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="p-3">{language === 'bg' ? 'Месечна карта' : 'Monthly Card'}</td>
                      <td className="text-center p-3">80 лв (~40.82 €)</td>
                      <td className="text-center p-3">90 лв (~45.92 €)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>{language === 'bg' ? 'Детски групи' : 'Kids Groups'}:</strong> {language === 'bg' ? 'Пон/Ср/Пет' : 'Mon/Wed/Fri'} – 17:15–18:15
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>{language === 'bg' ? 'Юноши/Възрастни' : 'Teens/Adults'}:</strong> {language === 'bg' ? 'Пон/Ср/Пет' : 'Mon/Wed/Fri'} – 18:00–19:30; {language === 'bg' ? 'Вт/Чет' : 'Tue/Thu'} – 19:30–20:30
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Combined Section */}
        <div className="mb-12">
          <Card className="bg-card border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl">{language === 'bg' ? 'Комбинирано' : 'Combined'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3">{language === 'bg' ? 'Услуга' : 'Service'}</th>
                      <th className="text-center p-3">{language === 'bg' ? 'До 18 години' : 'Under 18'}</th>
                      <th className="text-center p-3">{language === 'bg' ? 'Над 18 години' : 'Over 18'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50">
                      <td className="p-3">{language === 'bg' ? 'ММА + Фитнес' : 'MMA + Fitness Card'}</td>
                      <td className="text-center p-3">95 лв (~48.47 €)</td>
                      <td className="text-center p-3">110 лв (~56.12 €)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Training Section */}
        <div className="mb-12">
          <Card className="bg-card border-primary/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-primary" />
                <CardTitle className="text-3xl">{language === 'bg' ? 'Персонални Тренировки' : 'Personal Training'}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border-b border-border/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{language === 'bg' ? 'VIP Треньорска сесия' : 'VIP Coaching Session'}</span>
                    <span className="font-semibold text-primary">15 лв (~7.65 €)</span>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="vip-details" className="border-none">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Info className="h-4 w-4" />
                          <span>{language === 'bg' ? 'Какво включва?' : 'What\'s included?'}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2 text-sm text-muted-foreground pl-6 list-disc marker:text-primary">
                          <li>{language === 'bg' ? 'Бокс' : 'Boxing'}</li>
                          <li>{language === 'bg' ? 'Кикбокс' : 'Kickboxing'}</li>
                          <li>{language === 'bg' ? 'ММА' : 'MMA'}</li>
                          <li>{language === 'bg' ? 'Борба и Граплинг' : 'Wrestling and Grappling'}</li>
                          <li>{language === 'bg' ? 'Кондиционна подготовка за различни спортове' : 'Conditioning for various sports'}</li>
                          <li>{language === 'bg' ? 'Силова подготовка' : 'Strength training'}</li>
                          <li>{language === 'bg' ? 'Кросфит' : 'CrossFit'}</li>
                          <li>{language === 'bg' ? 'Възстановяване след различни видове операции' : 'Recovery after various types of surgeries'}</li>
                          <li>{language === 'bg' ? 'Възстановяване след различни травми по опорно-двигателната система' : 'Recovery after musculoskeletal injuries'}</li>
                          <li className="font-medium">
                            {language === 'bg' 
                              ? 'НФК (Невро-физически комплекс) за изграждане и поддържане на фината мускулатура на гръбначния стълб и в близост до него. Препоръчва се за хора с проблеми в кръста, във врата или въобще по гръбначния стълб.'
                              : 'NPC (Neuro-Physical Complex) for building and maintaining the fine musculature of the spinal column and surrounding areas. Recommended for people with lower back, neck, or general spinal problems.'}
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-border/50">
                  <span>{language === 'bg' ? 'Индивидуална тренировка' : 'Individual Training'}</span>
                  <span className="font-semibold text-primary">30 лв (~15.31 €)</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-border/50">
                  <span>{language === 'bg' ? 'Тренировъчен план' : 'Training Plan'}</span>
                  <span className="font-semibold text-primary">50 лв (~25.51 €)</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b border-border/50">
                  <span>{language === 'bg' ? 'Хранителен план (стандартен)' : 'Nutrition Plan (Standard)'}</span>
                  <span className="font-semibold text-primary">50 лв (~25.51 €)</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <span>{language === 'bg' ? 'Хранителен план (детайлен)' : 'Nutrition Plan (Detailed)'}</span>
                  <span className="font-semibold text-primary">100 лв (~51.02 €)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Multisport Note */}
        <div className="text-center">
          <Card className="bg-secondary/30 border-primary/30 inline-block">
            <CardContent className="p-6">
              <p className="text-3xl font-extrabold text-primary">
                ✓ {language === 'bg' ? 'ПРИЕМАМЕ МУЛТИСПОРТ КАРТИ' : 'WE ACCEPT MULTISPORT CARDS'}
              </p>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </>
  );
};

export default Services;
