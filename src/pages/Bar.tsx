import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Milk, Candy, Dumbbell, Pill } from 'lucide-react';

const Bar = () => {
  const { language } = useLanguage();

  const barCategories = [
    {
      icon: Milk,
      title: language === 'bg' ? 'Протеинови Шейкове' : 'Protein Shakes',
      items: language === 'bg' 
        ? ['Шоколад', 'Ванилия', 'Ягода', 'Банан']
        : ['Chocolate', 'Vanilla', 'Strawberry', 'Banana']
    },
    {
      icon: Coffee,
      title: language === 'bg' ? 'Напитки' : 'Drinks',
      items: language === 'bg'
        ? ['Енергийни напитки', 'Спортни напитки', 'Вода']
        : ['Energy drinks', 'Sports drinks', 'Water']
    },
    {
      icon: Candy,
      title: language === 'bg' ? 'Протеинови Барове' : 'Protein Bars',
      items: language === 'bg'
        ? ['Различни вкусове и марки']
        : ['Various flavors and brands']
    },
    {
      icon: Dumbbell,
      title: language === 'bg' ? 'Спортна Екипировка' : 'Training Gear',
      items: language === 'bg'
        ? ['Ръкавици', 'Бинтове', 'Протектори за уста', 'ММА/Бокс аксесоари']
        : ['Gloves', 'Wraps', 'Mouthguards', 'MMA/Boxing accessories']
    },
    {
      icon: Pill,
      title: language === 'bg' ? 'Добавки и Витамини' : 'Supplements & Vitamins',
      items: language === 'bg'
        ? ['Протеинови буркани (500г, 1кг, 2кг)', 'Витамини', 'BCAA', 'Креатин']
        : ['Protein jars (500g, 1kg, 2kg)', 'Vitamins', 'BCAA', 'Creatine']
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Бар' : 'Bar'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Протеинови шейкове, напитки и спортни добавки'
              : 'Protein shakes, drinks, and sports supplements'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {barCategories.map((category, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <category.icon className="h-6 w-6 text-primary" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-12 bg-secondary/30 border-primary/30">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground">
              {language === 'bg'
                ? 'Посетете бара в залата за повече информация и актуални цени.'
                : 'Visit the gym bar for more information and current prices.'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bar;
