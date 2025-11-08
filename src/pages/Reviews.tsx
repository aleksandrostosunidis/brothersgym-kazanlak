import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Reviews = () => {
  const { language } = useLanguage();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const availableTags = language === 'bg' 
    ? ['Отлично оборудване', 'Професионални треньори', 'Чиста зала', 'Добра атмосфера', 'Удобно местоположение']
    : ['Great Equipment', 'Professional Coaches', 'Clean Gym', 'Good Atmosphere', 'Convenient Location'];

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('reviews-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'reviews'
        },
        () => {
          fetchReviews();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchReviews = async () => {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching reviews:', error);
    } else {
      setReviews(data || []);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !name.trim() || !comment.trim()) {
      toast.error(
        language === 'bg'
          ? 'Моля, попълнете всички полета и изберете рейтинг.'
          : 'Please fill all fields and select a rating.'
      );
      return;
    }

    setLoading(true);

    // Get user's IP for rate limiting
    let ipAddress = 'unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ipAddress = ipData.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
    }

    // Check if user already submitted in the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentReviews, error: checkError } = await supabase
      .from('reviews')
      .select('created_at')
      .eq('ip_address', ipAddress)
      .gte('created_at', sevenDaysAgo.toISOString())
      .limit(1);

    if (checkError) {
      console.error('Error checking recent reviews:', checkError);
    }

    if (recentReviews && recentReviews.length > 0) {
      toast.error(
        language === 'bg'
          ? 'Можете да оставите само едно ревю на седмица.'
          : 'You can only submit one review per week.'
      );
      setLoading(false);
      return;
    }

    // Submit review
    const { error } = await supabase
      .from('reviews')
      .insert({
        name: name.trim(),
        rating,
        comment: comment.trim(),
        tags: selectedTags,
        ip_address: ipAddress
      });

    setLoading(false);

    if (error) {
      toast.error(
        language === 'bg'
          ? 'Грешка при изпращане на ревюто. Моля, опитайте отново.'
          : 'Error submitting review. Please try again.'
      );
      console.error('Error submitting review:', error);
    } else {
      toast.success(
        language === 'bg'
          ? 'Благодарим ви за ревюто!'
          : 'Thank you for your review!'
      );
      setRating(0);
      setName('');
      setComment('');
      setSelectedTags([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'bg' ? 'bg-BG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 white-text-outline tracking-[0.3em]">
            {language === 'bg' ? 'РЕВЮТА' : 'REVIEWS'}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {language === 'bg'
              ? 'Споделете вашето мнение'
              : 'Share your feedback'}
          </p>
        </div>

        {/* Review Form */}
        <Card className="bg-card border-border mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              {language === 'bg' ? 'Оставете ревю' : 'Leave a Review'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Star Rating */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  {language === 'bg' ? 'Рейтинг' : 'Rating'}
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`h-10 w-10 ${
                          star <= rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'bg' ? 'Име' : 'Name'}
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'bg' ? 'Вашето име' : 'Your name'}
                  className="bg-input border-border"
                  maxLength={100}
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {language === 'bg' ? 'Коментар' : 'Comment'}
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={language === 'bg' ? 'Вашият коментар...' : 'Your comment...'}
                  className="bg-input border-border min-h-[120px]"
                  maxLength={1000}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  {language === 'bg' ? 'Тагове (опционално)' : 'Tags (optional)'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading 
                  ? (language === 'bg' ? 'Изпраща се...' : 'Submitting...') 
                  : (language === 'bg' ? 'Изпрати ревю' : 'Submit Review')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Display Reviews */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold white-text-outline tracking-[0.2em]">
            {language === 'bg' ? 'ВСИЧКИ РЕВЮТА' : 'ALL REVIEWS'}
          </h2>
          
          {reviews.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center text-muted-foreground">
                {language === 'bg' 
                  ? 'Все още няма ревюта. Бъдете първи!' 
                  : 'No reviews yet. Be the first!'}
              </CardContent>
            </Card>
          ) : (
            reviews.map((review) => (
              <Card key={review.id} className="bg-card border-border hover:gym-shadow transition-all">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">{formatDate(review.created_at)}</p>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= review.rating
                              ? 'fill-primary text-primary'
                              : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-foreground mb-3">{review.comment}</p>
                  {review.tags && review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
