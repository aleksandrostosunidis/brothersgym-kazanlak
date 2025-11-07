import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import heroImage from '@/assets/hero-gym.jpg';
import trainingImage from '@/assets/training-session.jpg';
import fitnessImage from '@/assets/fitness-area.jpg';
import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';
import gallery4 from '@/assets/gallery-4.jpg';
import gallery5 from '@/assets/gallery-5.jpg';
import gallery6 from '@/assets/gallery-6.jpg';

const Gallery = () => {
  const { language } = useLanguage();

  const images = [
    { src: heroImage, alt: 'Training Session' },
    { src: trainingImage, alt: 'MMA Training' },
    { src: fitnessImage, alt: 'Fitness Area' },
    { src: gallery1, alt: 'Gym Training 1' },
    { src: gallery2, alt: 'Gym Training 2' },
    { src: gallery3, alt: 'Gym Training 3' },
    { src: gallery4, alt: 'Gym Training 4' },
    { src: gallery5, alt: 'Gym Training 5' },
    { src: gallery6, alt: 'Gym Training 6' },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient gym-glow-text tracking-wider">
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
            <Card 
              key={index} 
              className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all border-2 border-border hover:border-primary"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Card>
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
  );
};

export default Gallery;
