import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, ArrowRight, Star, PenSquare, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structuredData";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import heroImage from '@/assets/hero-banner.png';

const categories = ["Всички", "ММА", "Фитнес", "Съвети", "VIP Тренировки", "Тренировки"];
const availableTags = ["ММА", "Фитнес", "Тренировки", "Казанлък", "Отслабване", "Здраве", "Съвети", "Персонални", "Ефективност", "Кондиция", "Издръжливост", "Сила", "VIP", "Избор"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    author_name: "",
    category: "ММА",
    tags: [] as string[]
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Блог", url: "/blog" }
  ]);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('public_blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Грешка при зареждане на статиите');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.excerpt || !formData.author_name) {
      toast.error('Моля попълнете всички задължителни полета');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка при публикуване');
      }

      toast.success('Статията е публикувана успешно!');
      setShowSuccessBanner(true);
      setTimeout(() => setShowSuccessBanner(false), 5000);
      setShowForm(false);
      setFormData({
        title: "",
        content: "",
        excerpt: "",
        author_name: "",
        category: "ММА",
        tags: []
      });
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRating = async (postId: string, rating: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/rate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ blog_post_id: postId, rating })
      });

      if (!response.ok) {
        throw new Error('Грешка при оценяване');
      }

      toast.success('Благодарим за оценката!');
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const filteredPosts = (selectedCategory === "Всички" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory))
    .sort((a, b) => {
      // Sort by average rating (highest first)
      const avgA = a.rating_count > 0 ? (a.rating_sum / a.rating_count) : 0;
      const avgB = b.rating_count > 0 ? (b.rating_sum / b.rating_count) : 0;
      if (avgB !== avgA) return avgB - avgA;
      // If ratings are equal, sort by rating count
      if (b.rating_count !== a.rating_count) return b.rating_count - a.rating_count;
      // If both are equal, sort by date
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  const articleSchemas = filteredPosts.map(post => 
    getArticleSchema(
      post.title,
      post.excerpt,
      `/blog/${post.id}`
    )
  );

  return (
    <>
      <SEO
        title="Блог - Статии и Съвети за Тренировки"
        description="Професионални статии и съвети за ММА, фитнес, отслабване и здравословен начин на живот от Brothers Gym Казанлък. Експертни ръководства и техники."
        keywords="блог brothers gym, статии фитнес, съвети мма казанлък, тренировки ръководства, здравословен живот"
        canonicalUrl="/blog"
        structuredData={[breadcrumbSchema, ...articleSchemas]}
      />

      <div className="min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Success Banner with Background Image */}
          {showSuccessBanner && (
            <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in w-[90vw] max-w-2xl">
              <div 
                className="relative overflow-hidden rounded-xl border-4 border-green-500 shadow-2xl"
                style={{
                  backgroundImage: `url(${heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/95 via-green-800/90 to-primary/85 backdrop-blur-sm" />
                <div className="relative p-8 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      БЛАГОДАРИМ ЗА ОТЗИВА!
                    </h2>
                    <p className="text-green-100 text-lg font-semibold">Вашата статия беше публикувана успешно</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Блог и Статии
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 sm:mb-6 px-2">
              Професионални съвети, техники и ръководства от нашите треньори
            </p>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="gap-2 w-full sm:w-auto">
                  <PenSquare className="w-4 h-4" />
                  Публикувай Статия
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-xl">Публикувай Нова Статия</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-sm sm:text-base">Заглавие *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Напишете заглавие на статията"
                      maxLength={200}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt" className="text-sm sm:text-base">Кратко описание *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Кратко описание (до 300 символа)"
                      maxLength={300}
                      rows={3}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-sm sm:text-base">Съдържание *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Напишете пълното съдържание на статията"
                      rows={8}
                      required
                      className="text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <Label htmlFor="author" className="text-sm sm:text-base">Автор *</Label>
                      <Input
                        id="author"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="Вашето име"
                        maxLength={100}
                        required
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category" className="text-sm sm:text-base">Категория *</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm sm:text-base"
                        required
                      >
                        {categories.filter(c => c !== "Всички").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm sm:text-base">Тагове</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableTags.map(tag => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer text-xs sm:text-sm"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Публикуване...' : 'Публикувай'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                className="px-3 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-lg sm:text-xl text-muted-foreground">Зареждане на статии...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 sm:py-20">
              <p className="text-lg sm:text-xl text-muted-foreground px-4">Няма публикувани статии в тази категория</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur border-border/50">
                  <CardHeader className="p-0">
                    <div className="h-40 sm:h-48 bg-muted rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-5xl sm:text-6xl">
                          {post.category === "ММА" ? "🥊" : post.category === "Фитнес" ? "💪" : "📖"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className="text-xs">{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transition-colors ${
                              star <= (post.average_rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRating(post.id, star);
                            }}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({post.rating_count || 0})
                        </span>
                      </div>
                    </div>
                    
                    <CardTitle className="mb-2 sm:mb-3 text-lg sm:text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mb-3 sm:mb-4 text-muted-foreground text-sm sm:text-base line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="truncate max-w-[120px]">{post.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(post.created_at).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {post.tags.slice(0, 3).map((tag: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    <Button 
                      variant="outline" 
                      className="w-full gap-2 mt-2"
                      onClick={() => setSelectedPost(post)}
                    >
                      <Eye className="w-4 h-4" />
                      Прочети пълната статия
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Expandable Post Dialog */}
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
            {selectedPost && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{selectedPost.category}</Badge>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 cursor-pointer transition-colors ${
                            star <= (selectedPost.average_rating || 0)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          }`}
                          onClick={() => {
                            handleRating(selectedPost.id, star);
                            setSelectedPost(null);
                          }}
                        />
                      ))}
                      <span className="text-sm text-muted-foreground ml-1">
                        ({selectedPost.rating_count || 0})
                      </span>
                    </div>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                    {selectedPost.title}
                  </DialogTitle>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{selectedPost.author_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedPost.created_at).toLocaleDateString('bg-BG')}</span>
                    </div>
                  </div>
                </DialogHeader>
                
                <div className="mt-6 space-y-4">
                  <p className="text-lg text-muted-foreground italic border-l-4 border-primary pl-4">
                    {selectedPost.excerpt}
                  </p>
                  
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground leading-relaxed whitespace-pre-line text-base">
                      {selectedPost.content}
                    </p>
                  </div>

                  {selectedPost.tags && selectedPost.tags.length > 0 && (
                    <div className="pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Тагове:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPost.tags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}