import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

const Shop = () => {
  const { language } = useLanguage();

  const shopItems = [
    {
      name: language === 'bg' ? 'Brothers Gym Тениска' : 'Brothers Gym T-Shirt',
      description: language === 'bg' ? 'Висококачествена памучна тениска' : 'High-quality cotton t-shirt',
      price: language === 'bg' ? 'Цена: В залата' : 'Price: In-gym purchase',
    },
    {
      name: language === 'bg' ? 'Brothers Gym Суичър' : 'Brothers Gym Hoodie',
      description: language === 'bg' ? 'Удобен суичър с качулка' : 'Comfortable hoodie',
      price: language === 'bg' ? 'Цена: В залата' : 'Price: In-gym purchase',
    },
    {
      name: language === 'bg' ? 'Brothers Gym Шапка' : 'Brothers Gym Cap',
      description: language === 'bg' ? 'Стилна шапка с лого' : 'Stylish cap with logo',
      price: language === 'bg' ? 'Цена: В залата' : 'Price: In-gym purchase',
    },
  ];

  return (
    <>
      <SEO 
        title={language === 'bg' ? 'Магазин - Brothers Gym Казанлък' : 'Shop - Brothers Gym Kazanlak'}
        description={language === 'bg'
          ? 'Официални Brothers Gym продукти: тениски, суичъри, шапки и други. Закупете в залата или се свържете с нас.'
          : 'Official Brothers Gym merchandise: t-shirts, hoodies, caps, and more. Purchase in-gym or contact us.'}
        keywords="Brothers Gym магазин, мърчандайз, тениски, суичъри, Brothers Gym продукти"
        canonicalUrl="/shop"
        structuredData={getBreadcrumbSchema([
          { name: 'Начало', url: '/' },
          { name: 'Магазин', url: '/shop' }
        ])}
      />
      <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Магазин' : 'Shop'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Официални продукти на Brothers Gym'
              : 'Official Brothers Gym merchandise'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {shopItems.map((item, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-full h-48 bg-secondary rounded-lg flex items-center justify-center mb-4">
                    <ShoppingBag className="h-20 w-20 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  <p className="text-primary font-semibold">{item.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-secondary/30 border-primary/30">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-muted-foreground">
              {language === 'bg'
                ? 'Всички продукти са налични за закупуване в залата. Посетете ни за повече информация.'
                : 'All products are available for in-gym purchase. Visit us for more information.'}
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
};

export default Shop;
