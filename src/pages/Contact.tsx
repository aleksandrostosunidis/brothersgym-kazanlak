import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Clock, Phone, MapPin, Facebook, Instagram, Music } from 'lucide-react';

const Contact = () => {
  const { language } = useLanguage();

  const faqItems = [
    {
      question: language === 'bg' ? 'Кога са детските ММА тренировки?' : 'When are MMA kids\' classes?',
      answer: language === 'bg' 
        ? 'Детски групи: Понеделник/Сряда/Петък – 17:15–18:15. Юноши: Понеделник/Сряда/Петък – 18:00–19:30; Вторник/Четвъртък – 19:30–20:30'
        : 'Kids: Mon/Wed/Fri – 17:15–18:15. Teens: Mon/Wed/Fri – 18:00–19:30; Tue/Thu – 19:30–20:30'
    },
    {
      question: language === 'bg' ? 'Кога отваря залата?' : 'When does the gym open?',
      answer: language === 'bg'
        ? 'Понеделник–Петък: 07:30 – 21:30. Събота–Неделя: 09:00 – 20:00'
        : 'Monday–Friday: 07:30 – 21:30. Saturday–Sunday: 09:00 – 20:00'
    },
    {
      question: language === 'bg' ? 'Приемате ли Мултиспорт карти?' : 'Do you accept Multisport cards?',
      answer: language === 'bg' ? 'Да, приемаме Мултиспорт карти.' : 'Yes, we accept Multisport cards.'
    },
    {
      question: language === 'bg' ? 'Мога ли да получа персонален тренировъчен план?' : 'Can I get a custom fitness training plan?',
      answer: language === 'bg'
        ? 'Да, предлагаме персонални тренировъчни планове за 50 лв.'
        : 'Yes, we offer custom training plans for 50 BGN.'
    },
    {
      question: language === 'bg' ? 'Предлагате ли хранителни планове?' : 'Can I get a nutrition plan?',
      answer: language === 'bg'
        ? 'Да! Стандартен хранителен план – 50 лв. Детайлен план с грамаж на хранителни вещества – 100 лв.'
        : 'Yes! Standard nutrition plan – 50 BGN. Detailed plan with nutrient grams – 100 BGN.'
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient gym-glow-text tracking-wider">
            {language === 'bg' ? 'КОНТАКТИ' : 'CONTACT'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'bg' ? 'Свържете се с нас' : 'Get in touch with us'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Working Hours */}
          <Card className="bg-card border-border hover:gym-shadow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-primary" />
                {language === 'bg' ? 'Работно време' : 'Working Hours'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>{language === 'bg' ? 'Пон-Пет:' : 'Mon-Fri:'}</strong> 07:30 – 21:30</p>
                <p><strong>{language === 'bg' ? 'Съб-Нед:' : 'Sat-Sun:'}</strong> 09:00 – 20:00</p>
              </div>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="bg-card border-border hover:gym-shadow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Phone className="h-6 w-6 text-primary" />
                {language === 'bg' ? 'Телефон' : 'Phone'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <a 
                  href="tel:+359896780067" 
                  className="text-primary hover:text-accent transition-colors text-lg block"
                >
                  089 678 0067 (Дориан)
                </a>
                <a 
                  href="tel:+359894450256" 
                  className="text-primary hover:text-accent transition-colors text-lg block"
                >
                  089 445 0256 (Тенчо)
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Address */}
          <Card className="bg-card border-border hover:gym-shadow transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                {language === 'bg' ? 'Адрес' : 'Address'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {language === 'bg' 
                  ? 'Адрес: ул Искра 12 (до Club Noar), Казанлък, България'
                  : 'Address: ul. Iskra 12 (next to Club Noar), Kazanlak, Bulgaria'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        <Card className="bg-card border-border mb-16">
          <CardHeader>
            <CardTitle className="text-center">
              {language === 'bg' ? 'Последвайте ни' : 'Follow Us'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-8">
              <a 
                href="https://www.facebook.com/profile.php?id=100063529961850" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:text-primary transition-colors group"
              >
                <Facebook className="h-12 w-12 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Facebook</span>
              </a>
              <a 
                href="https://www.instagram.com/brothers_gym_kazanlak/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:text-primary transition-colors group"
              >
                <Instagram className="h-12 w-12 group-hover:scale-110 transition-transform" />
                <span className="text-sm">Instagram</span>
              </a>
              <a 
                href="https://www.tiktok.com/@brothersgymkz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:text-primary transition-colors group"
              >
                <Music className="h-12 w-12 group-hover:scale-110 transition-transform" />
                <span className="text-sm">TikTok</span>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
            {language === 'bg' ? 'Често Задавани Въпроси' : 'Frequently Asked Questions'}
          </h2>
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
