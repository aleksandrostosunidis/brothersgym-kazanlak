import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { getBreadcrumbSchema } from '@/lib/structuredData';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import gallery7 from '@/assets/gallery-7.jpg';
import gallery8 from '@/assets/gallery-8.jpg';
import gallery9 from '@/assets/gallery-9.jpg';
import gallery10 from '@/assets/gallery-10.jpg';
import gallery11 from '@/assets/gallery-11.jpg';
import gallery12 from '@/assets/gallery-12.jpg';
import gallery13 from '@/assets/gallery-13.jpg';
import gallery14 from '@/assets/gallery-14.jpg';
import gallery15 from '@/assets/gallery-15.jpg';
import gallery16 from '@/assets/gallery-16.jpg';
import gallery17 from '@/assets/gallery-17.jpg';
import gallery18 from '@/assets/gallery-18.jpg';
import gallery19 from '@/assets/gallery-19.jpg';
import gallery20 from '@/assets/gallery-20.jpg';
import gallery21 from '@/assets/gallery-21.jpg';
import gallery22 from '@/assets/gallery-22.jpg';

const Gallery = () => {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    { src: gallery7, alt: 'Екипно събитие на Brothers Gym Казанлък с участници от фитнес и ММА' },
    { src: gallery8, alt: 'Млад спортист по време на тренировка по ММА в Brothers Gym' },
    { src: gallery9, alt: 'Отборът на Brothers Gym по смесени бойни изкуства' },
    { src: gallery10, alt: 'Тренировка на открито край водопад с екипа на Brothers Gym' },
    { src: gallery11, alt: 'Спортист от Brothers Gym с медал от състезание по ММА' },
    { src: gallery12, alt: 'Дама спортистка по време на силова тренировка в Brothers Gym Казанлък' },
    { src: gallery13, alt: 'Млад шампион от детска група на Brothers Gym с награда' },
    { src: gallery14, alt: 'Юноша шампион с медал от турнир по кикбокс' },
    { src: gallery15, alt: 'Тренировка по ММА техники в спортна зала Brothers Gym' },
    { src: gallery16, alt: 'Победители от състезание с треньори на Brothers Gym Казанлък' },
    { src: gallery17, alt: 'Спортист с медал от национално състезание по бойни изкуства' },
    { src: gallery18, alt: 'Състезателен отбор на Brothers Gym на турнир по ММА' },
    { src: gallery19, alt: 'Двоен златен медалист от Brothers Gym на състезание' },
    { src: gallery20, alt: 'Демонстрация на традиционни тренировъчни техники' },
    { src: gallery21, alt: 'Културно събитие и представление организирано от Brothers Gym' },
    { src: gallery22, alt: 'Публична демонстрация на ММА техники в Казанлък' },
  ];

  return (
    <>
      <SEO 
        title="Галерия"
        description="Галерия със снимки от Brothers Gym Казанлък: тренировки по фитнес и ММА, състезания, събития, нашата зала и екип. Вижте как изглежда да си част от нашето семейство."
        keywords="Brothers Gym снимки, фитнес зала Казанлък снимки, ММА тренировки снимки, Brothers Gym галерия"
        canonicalUrl="/gallery"
        structuredData={getBreadcrumbSchema([
          { name: 'Начало', url: '/' },
          { name: 'Галерия', url: '/gallery' }
        ])}
      />
      <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 white-text-outline tracking-wider">
            {language === 'bg' ? 'ГАЛЕРИЯ' : 'GALLERY'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'bg'
              ? 'Снимки от нашата зала и тренировки'
              : 'Photos from our gym and training sessions'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card 
                  className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all border-2 border-border hover:border-primary"
                  onClick={() => setSelectedImage(image.src)}
                >
                  <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                    <img 
                      src={image.src} 
                      alt={image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-full p-0 border-0">
                <div className="relative w-full h-[90vh]">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            {language === 'bg'
              ? 'Следете ни в социалните мрежи за още снимки и видеа!'
              : 'Follow us on social media for more photos and videos!'}
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Gallery;
