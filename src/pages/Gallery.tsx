import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Image as ImageIcon } from 'lucide-react';
import heroImage from '@/assets/hero-gym.jpg';
import trainingImage from '@/assets/training-session.jpg';
import fitnessImage from '@/assets/fitness-area.jpg';

const Gallery = () => {
  const { language } = useLanguage();

  const images = [
    { src: heroImage, alt: 'Training Session' },
    { src: trainingImage, alt: 'MMA Training' },
    { src: fitnessImage, alt: 'Fitness Area' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Галерия' : 'Gallery'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {language === 'bg'
              ? 'Снимки от нашата зала и тренировки'
              : 'Photos from our gym and training sessions'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image, index) => (
            <Card key={index} className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border text-center p-8">
          <CardContent>
            <ImageIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              {language === 'bg'
                ? 'Още снимки ще бъдат добавени скоро!'
                : 'More photos coming soon!'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Gallery;
