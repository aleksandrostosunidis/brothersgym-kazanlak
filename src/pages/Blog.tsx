import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, User, ArrowRight, Star, PenSquare, Trash2, Flag } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structuredData";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import blogBanner from "@/assets/blog-banner.png";

const categories = ["Всички", "ММА", "Фитнес", "Съвети", "VIP Тренировки", "Тренировки"];
const availableTags = ["ММА", "Фитнес", "Тренировки", "Казанлък", "Отслабване", "Здраве", "Съвети", "Персонални", "Ефективност", "Кондиция", "Издръжливост", "Сила", "VIP", "Избор"];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Всички");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [reportPostId, setReportPostId] = useState<string | null>(null);
  const [reportData, setReportData] = useState({ reason: '', details: '' });
  
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

  const handleDelete = async (postId: string) => {
    if (!confirm("Сигурни ли сте, че искате да изтриете този пост?")) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/delete-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ post_id: postId })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка при изтриване');
      }

      toast.success('Постът е изтрит успешно!');
      setExpandedPost(null);
      fetchBlogPosts();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleReport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportPostId || !reportData.reason.trim()) {
      toast.error('Моля изберете причина');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/report-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          blog_post_id: reportPostId,
          reason: reportData.reason,
          details: reportData.details
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка при докладване');
      }

      toast.success('Благодарим! Докладът е подаден.');
      setShowReportDialog(false);
      setReportPostId(null);
      setReportData({ reason: '', details: '' });
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
    .sort((a, b) => (b.rating_count || 0) - (a.rating_count || 0));

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
        title="Блог Brothers Gym Казанлък - Статии за ММА, Фитнес и Тренировки"
        description="Професионални статии и съвети за ММА, фитнес, отслабване и здравословен начин на живот от Brothers Gym Казанлък. Експертни ръководства, техники и съвети от опитни треньори."
        keywords="блог brothers gym казанлък, статии фитнес, съвети мма, тренировки ръководства, здравословен живот, упражнения, спорт казанлък, фитнес съвети, мма техники"
        canonicalUrl="/blog"
        ogImage={blogBanner}
        structuredData={[breadcrumbSchema, ...articleSchemas]}
      />

      <div className="min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
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
                <Dialog key={post.id} open={expandedPost === post.id} onOpenChange={(open) => setExpandedPost(open ? post.id : null)}>
                  <DialogTrigger asChild>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 bg-card/80 backdrop-blur border-border/50 cursor-pointer">
                      <CardHeader className="p-0">
                        <div className="h-40 sm:h-48 bg-muted rounded-t-lg overflow-hidden">
                          <img 
                            src={blogBanner} 
                            alt="Brothers Gym Blog" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-3">
                          <Badge className="text-xs">{post.category}</Badge>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 sm:w-4 sm:h-4 transition-colors ${
                                  star <= (post.average_rating || 0)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-muted-foreground'
                                }`}
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
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
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
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-0">
                      {/* Compact Header with Title and Actions */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <DialogTitle className="text-xl sm:text-2xl text-white flex-1 leading-tight" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                          {post.title}
                        </DialogTitle>
                        <div className="flex gap-1 shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-500/10"
                            onClick={() => {
                              setReportPostId(post.id);
                              setShowReportDialog(true);
                            }}
                            title="Докладвай"
                          >
                            <Flag className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(post.id)}
                            title="Изтрий"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Compact Metadata Row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-muted-foreground pb-3 border-b border-border">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author_name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{new Date(post.created_at).toLocaleDateString('bg-BG')}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">{post.category}</Badge>
                        <div className="flex items-center gap-1 ml-auto">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 cursor-pointer transition-colors ${
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
                          <span className="text-xs ml-1">({post.rating_count || 0})</span>
                        </div>
                      </div>
                    </DialogHeader>

                    {/* Content Section - Compact Spacing */}
                    <div className="mt-4">
                      <div className="prose prose-sm prose-invert max-w-none">
                        <p className="text-sm sm:text-base text-foreground/90 whitespace-pre-wrap leading-relaxed">
                          {post.excerpt}
                        </p>
                        <p className="text-sm sm:text-base text-foreground/90 whitespace-pre-wrap leading-relaxed mt-4">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags - Inline at Bottom */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-border">
                          {post.tags.map((tag: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          )}
        </div>

        {/* Report Dialog */}
        <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Докладване на неуместно съдържание</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <Label htmlFor="reason">Причина *</Label>
                <select
                  id="reason"
                  value={reportData.reason}
                  onChange={(e) => setReportData({ ...reportData, reason: e.target.value })}
                  className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  required
                >
                  <option value="">Изберете причина</option>
                  <option value="Спам">Спам</option>
                  <option value="Оскърбително съдържание">Оскърбително съдържание</option>
                  <option value="Неприлична реклама">Неприлична реклама</option>
                  <option value="Неточна информация">Неточна информация</option>
                  <option value="Друго">Друго</option>
                </select>
              </div>
              <div>
                <Label htmlFor="details">Детайли (опционално)</Label>
                <Textarea
                  id="details"
                  value={reportData.details}
                  onChange={(e) => setReportData({ ...reportData, details: e.target.value })}
                  placeholder="Допълнителна информация..."
                  maxLength={500}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Изпрати доклад</Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setShowReportDialog(false);
                    setReportData({ reason: '', details: '' });
                  }}
                >
                  Отказ
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}