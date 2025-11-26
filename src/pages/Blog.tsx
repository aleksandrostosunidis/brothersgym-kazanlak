import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, ArrowRight, Star, PenSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structuredData";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const categories = ["Всички", "ММА", "Фитнес", "Съвети", "VIP Тренировки", "Тренировки"];
const availableTags = ["ММА", "Фитнес", "Тренировки", "Казанлък", "Отслабване", "Здраве", "Съвети", "Персонални", "Ефективност", "Кондиция", "Издръжливост", "Сила", "VIP", "Избор"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  
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

  const filteredPosts = selectedCategory === "Всички" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

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

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Блог и Статии
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Професионални съвети, техники и ръководства от нашите треньори
            </p>
            
            <Dialog open={showForm} onOpenChange={setShowForm}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <PenSquare className="w-4 h-4" />
                  Публикувай Статия
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Публикувай Нова Статия</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Заглавие *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Напишете заглавие на статията"
                      maxLength={200}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="excerpt">Кратко описание *</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      placeholder="Кратко описание (до 300 символа)"
                      maxLength={300}
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Съдържание *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Напишете пълното съдържание на статията"
                      rows={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author">Автор *</Label>
                      <Input
                        id="author"
                        value={formData.author_name}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        placeholder="Вашето име"
                        maxLength={100}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Категория *</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        required
                      >
                        {categories.filter(c => c !== "Всички").map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <Label>Тагове</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableTags.map(tag => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
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
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? "default" : "outline"}
                className="px-6 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Зареждане на статии...</p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">Няма публикувани статии в тази категория</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur border-border/50">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-6xl">
                          {post.category === "ММА" ? "🥊" : post.category === "Фитнес" ? "💪" : "📖"}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge>{post.category}</Badge>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 cursor-pointer transition-colors ${
                              star <= (post.average_rating || 0)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                            onClick={() => handleRating(post.id, star)}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({post.rating_count || 0})
                        </span>
                      </div>
                    </div>
                    
                    <CardTitle className="mb-3 text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mb-4 text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author_name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.created_at).toLocaleDateString('bg-BG')}</span>
                      </div>
                    </div>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag: string, idx: number) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}