import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, CreditCard, Dumbbell, Clock, Phone } from "lucide-react";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/structuredData";

const faqCategories = [
  {
    title: "Членство и Цени",
    icon: CreditCard,
    color: "text-green-400",
    questions: [
      {
        q: "Какви са цените за месечен абонамент?",
        a: "Месечен абонамент за ММА е 100 лв (деца 6-12 год), 120 лв (юноши 13-18 год) и 150 лв (възрастни 18+ год). Фитнес месечен абонамент е 70 лв. За VIP персонални тренировки цените варират от 40-60 лв на час в зависимост от типа тренировка."
      },
      {
        q: "Предлагате ли карти за повече тренировки?",
        a: "Да, предлагаме карти за 8 тренировки (ММА: 70/90/110 лв, Фитнес: 50 лв) и 12 тренировки (ММА: 95/125/155 лв, Фитнес: 70 лв) в зависимост от възрастовата група."
      },
      {
        q: "Има ли такса за записване?",
        a: "Не, нямаме такса за записване. Плащате само за избрания от вас абонамент или карта за тренировки."
      },
      {
        q: "Мога ли да спра членството си временно?",
        a: "Да, можете да замразите членството си при определени условия. Свържете се с нашата рецепция за повече информация."
      },
      {
        q: "Приемате ли кредитни карти?",
        a: "Да, приемаме както кеш, така и банкови карти за улеснение на нашите членове."
      }
    ]
  },
  {
    title: "Тренировки и Услуги",
    icon: Dumbbell,
    color: "text-red-400",
    questions: [
      {
        q: "Какви видове тренировки предлагате?",
        a: "Предлагаме ММА, Кикбокс, Бокс, Борба и Грепълинг, Фитнес тренировки, Кондиционни тренировки, CrossFit и VIP персонални тренировки. Имаме групи за деца, юноши и възрастни."
      },
      {
        q: "Подходящи ли сте за начинаещи?",
        a: "Абсолютно! Работим с хора на всички нива - от пълни начинаещи до професионални спортисти. Нашите треньори ще адаптират тренировките според вашето ниво."
      },
      {
        q: "Колко често трябва да тренирам?",
        a: "Препоръчваме минимум 2-3 тренировки седмично за добри резултати. За напреднали спортисти - 4-6 тренировки седмично."
      },
      {
        q: "Какво включват VIP персоналните тренировки?",
        a: "VIP тренировките включват индивидуален подход към всеки клиент, персонализирана програма, работа с професионални треньори-шампиони, както и специализирани програми за възстановяване след травми и операции."
      },
      {
        q: "Мога ли да пробвам преди да се запиша?",
        a: "Да, предлагаме безплатна пробна тренировка за нови клиенти. Свържете се с нас за да си уговорите час."
      },
      {
        q: "Има ли тренировки за деца?",
        a: "Да, имаме специални групи за деца от 6 до 12 години и юноши от 13 до 18 години с адаптирани тренировъчни методи."
      }
    ]
  },
  {
    title: "Оборудване и Условия",
    icon: Dumbbell,
    color: "text-blue-400",
    questions: [
      {
        q: "Какво оборудване имате?",
        a: "Разполагаме с професионален октагон, боксови ринг, кардио машини, свободни тежести, функционални зони, бойни чували, лапи, шлемове и пълна екипировка за всички бойни спортове."
      },
      {
        q: "Трябва ли да нося собствена екипировка?",
        a: "За начало може да използвате нашата екипировка. С времето препоръчваме да си закупите собствени ръкавици, протектори и спортно облекло."
      },
      {
        q: "Имате ли съблекални и душове?",
        a: "Да, разполагаме със съвременни съблекални, душове и WC за мъже и жени."
      },
      {
        q: "Има ли паркинг?",
        a: "Да, има безплатен паркинг в близост до залата."
      },
      {
        q: "Има ли климатик в залата?",
        a: "Да, залата е климатизирана за вашия комфорт през всички сезони."
      }
    ]
  },
  {
    title: "Часове и График",
    icon: Clock,
    color: "text-purple-400",
    questions: [
      {
        q: "Какви са работните ви часове?",
        a: "Работим всеки ден от Понеделник до Неделя. Груповите тренировки започват от 07:00 сутринта. Свободната зала е достъпна до 21:00 часа."
      },
      {
        q: "Мога ли да дойда извън груповите часове?",
        a: "Да, членовете имат достъп до свободната зала извън груповите часове за индивидуални тренировки."
      },
      {
        q: "Как мога да видя актуалния график?",
        a: "Актуалният график е достъпен в секция 'График' на нашия сайт, както и на място в залата."
      },
      {
        q: "Може ли да се запиша за конкретен час?",
        a: "За групови тренировки не е необходима предварителна резервация. За VIP персонални тренировки моля резервирайте час предварително."
      }
    ]
  },
  {
    title: "Контакти и Локация",
    icon: Phone,
    color: "text-yellow-400",
    questions: [
      {
        q: "Къде се намирате?",
        a: "Намираме се на ул. Искра 12 (до Club Noar), Казанлък, България."
      },
      {
        q: "Как мога да се свържа с вас?",
        a: "Можете да ни се обадите на: 089 678 0067 (Дориан) или 089 445 0256 (Тенчо). Също така сме активни във Facebook, Instagram и TikTok."
      },
      {
        q: "Има ли онлайн консултации?",
        a: "За VIP тренировки и програми можем да организираме онлайн консултация за обсъждане на вашите цели."
      },
      {
        q: "Мога ли да ви изпратя съобщение през социалните мрежи?",
        a: "Да, отговаряме на съобщения в Facebook, Instagram и TikTok. Намерете ни като @brothers_gym_kazanlak."
      }
    ]
  }
];

export default function FAQ() {
  const allQuestions = faqCategories.flatMap(cat => 
    cat.questions.map(q => ({ question: q.q, answer: q.a }))
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Често Задавани Въпроси", url: "/faq" }
  ]);

  const faqSchema = getFAQSchema(allQuestions);

  return (
    <>
      <SEO
        title="Често Задавани Въпроси (FAQ)"
        description="Отговори на най-често задаваните въпроси за Brothers Gym Казанлък - цени, тренировки, график, оборудване и условия. Всичко което трябва да знаете."
        keywords="faq brothers gym, въпроси мма казанлък, цени фитнес, тренировки въпроси, информация зала"
        canonicalUrl="/faq"
        structuredData={[breadcrumbSchema, faqSchema]}
      />

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <HelpCircle className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Често Задавани Въпроси
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Намерете отговори на най-често задаваните въпроси за нашата зала, услуги и условия
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx} className="p-8 bg-card/80 backdrop-blur border-border/50">
                  <div className="flex items-center gap-3 mb-6">
                    <Icon className={`w-8 h-8 ${category.color}`} />
                    <h2 className="text-3xl font-bold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {category.title}
                    </h2>
                    <Badge variant="outline" className="ml-auto">
                      {category.questions.length} въпроса
                    </Badge>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`} className="border-border/30">
                        <AccordionTrigger className="text-left hover:text-primary text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.02em' }}>
                          {item.q}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed">
                          {item.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              );
            })}
          </div>

          {/* Contact CTA */}
          <Card className="mt-12 p-8 bg-primary/10 border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Не намерихте отговор на вашия въпрос?
            </h3>
            <p className="text-muted-foreground mb-6">
              Свържете се с нас директно и ще отговорим на всички ваши въпроси
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:0896780067" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                <Phone className="w-4 h-4" />
                089 678 0067
              </a>
              <a href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors">
                Контакти
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
