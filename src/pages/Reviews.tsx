import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Reviews = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const tags = language === 'bg' 
    ? ['Отлично оборудване', 'Професионални треньори', 'Чиста зала', 'Добра атмосфера', 'ММА', 'Фитнес', 'Персонални тренировки']
    : ['Great Equipment', 'Professional Coaches', 'Clean Facility', 'Good Atmosphere', 'MMA', 'Fitness', 'Personal Training'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !comment || rating === 0) {
      toast({
        title: language === 'bg' ? 'Грешка' : 'Error',
        description: language === 'bg' 
          ? 'Моля попълнете всички полета и изберете рейтинг'
          : 'Please fill in all fields and select a rating',
        variant: 'destructive'
      });
      return;
    }

    // Here you would send the review to your backend
    toast({
      title: language === 'bg' ? 'Благодарим!' : 'Thank you!',
      description: language === 'bg' 
        ? 'Вашето мнение беше изпратено успешно!'
        : 'Your review has been submitted successfully!',
    });

    // Reset form
    setName('');
    setComment('');
    setRating(0);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gradient gym-glow-text tracking-wider">
            {language === 'bg' ? 'РЕВЮТА' : 'REVIEWS'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'bg'
              ? 'Споделете вашето мнение'
              : 'Share your experience'}
          </p>
        </div>

        <Card className="bg-card border-2 border-primary hover:gym-shadow transition-all">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center gym-glow-text">
              {language === 'bg' ? 'Напишете ревю' : 'Write a Review'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div className="flex flex-col items-center space-y-2">
                <label className="text-lg font-semibold">
                  {language === 'bg' ? 'Вашият рейтинг' : 'Your Rating'}
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-12 w-12 cursor-pointer transition-all ${
                        star <= (hoveredRating || rating)
                          ? 'text-primary fill-primary'
                          : 'text-muted-foreground'
                      }`}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label className="text-lg font-semibold">
                  {language === 'bg' ? 'Вашето име' : 'Your Name'}
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bg' ? 'Въведете вашето име' : 'Enter your name'}
                  className="text-lg p-6 border-2"
                />
              </div>

              {/* Tags */}
              <div className="space-y-3">
                <label className="text-lg font-semibold">
                  {language === 'bg' ? 'Изберете тагове (опционално)' : 'Select Tags (optional)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                      className="cursor-pointer text-base py-2 px-4 hover:scale-105 transition-transform"
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="text-lg font-semibold">
                  {language === 'bg' ? 'Вашият коментар' : 'Your Comment'}
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={language === 'bg' 
                    ? 'Споделете вашето мнение за Brothers Gym...'
                    : 'Share your experience at Brothers Gym...'}
                  className="min-h-[150px] text-lg p-4 border-2"
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-xl py-6 gym-glow hover:scale-105 transition-all font-bold"
              >
                {language === 'bg' ? 'ИЗПРАТИ РЕВЮ' : 'SUBMIT REVIEW'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Placeholder for existing reviews */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 gym-glow-text">
            {language === 'bg' ? 'СКОРО ЩЕ ПОКАЖЕМ ВАШИТЕ РЕВЮТА ТУК' : 'YOUR REVIEWS WILL APPEAR HERE SOON'}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
