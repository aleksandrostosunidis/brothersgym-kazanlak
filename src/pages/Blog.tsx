import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getArticleSchema, getBreadcrumbSchema } from "@/lib/structuredData";

const blogPosts = [
  {
    id: 1,
    slug: "mma-training-kazanlak",
    title: "ММА Тренировки в Казанлък - Пълно Ръководство",
    excerpt: "Научете всичко за ММА тренировките в Brothers Gym - от начинаещи до професионалисти. Техники, методи и резултати.",
    content: "Пълна статия за ММА тренировките...",
    author: "Дориан Анев",
    date: "2025-01-15",
    readTime: "5 мин",
    category: "ММА",
    image: "/placeholder.svg",
    tags: ["ММА", "Тренировки", "Казанлък"]
  },
  {
    id: 2,
    slug: "fitness-weight-loss-guide",
    title: "Как да Отслабнем Ефективно с Фитнес Тренировки",
    excerpt: "Професионални съвети за отслабване чрез комбинация от силови и кардио тренировки. План за успех.",
    content: "Пълна статия за отслабване...",
    author: "Тенчо Караенев",
    date: "2025-01-10",
    readTime: "6 мин",
    category: "Фитнес",
    image: "/placeholder.svg",
    tags: ["Фитнес", "Отслабване", "Здраве"]
  },
  {
    id: 3,
    slug: "choosing-right-gym",
    title: "Как да Изберем Правилната Фитнес Зала",
    excerpt: "Основни критерии за избор на зала - оборудване, треньори, атмосфера и условия. Професионални съвети.",
    content: "Пълна статия за избор на зала...",
    author: "Йордан Кукушев",
    date: "2025-01-05",
    readTime: "4 мин",
    category: "Съвети",
    image: "/placeholder.svg",
    tags: ["Съвети", "Фитнес", "Избор"]
  },
  {
    id: 4,
    slug: "personal-training-benefits",
    title: "Ползите от Персоналните Тренировки",
    excerpt: "Защо персоналните тренировки са по-ефективни? Индивидуален подход, бързи резултати и професионализъм.",
    content: "Пълна статия за персонални тренировки...",
    author: "Дориан Анев",
    date: "2024-12-28",
    readTime: "5 мин",
    category: "VIP Тренировки",
    image: "/placeholder.svg",
    tags: ["VIP", "Персонални", "Ефективност"]
  },
  {
    id: 5,
    slug: "conditioning-training-guide",
    title: "Кондиционни Тренировки - Основи и Техники",
    excerpt: "Изграждане на издръжливост, сила и експлозивност чрез специализирани кондиционни тренировки.",
    content: "Пълна статия за кондиция...",
    author: "Тенчо Караенев",
    date: "2024-12-20",
    readTime: "7 мин",
    category: "Тренировки",
    image: "/placeholder.svg",
    tags: ["Кондиция", "Издръжливост", "Сила"]
  }
];

const categories = ["Всички", "ММА", "Фитнес", "Съвети", "VIP Тренировки", "Тренировки"];

export default function Blog() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Блог", url: "/blog" }
  ]);

  const articleSchemas = blogPosts.map(post => 
    getArticleSchema(
      post.title,
      post.excerpt,
      `/blog/${post.slug}`
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Професионални съвети, техники и ръководства от нашите треньори
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "Всички" ? "default" : "outline"}
                className="px-6 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer bg-card/80 backdrop-blur border-border/50">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-muted rounded-t-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-6xl">{post.category === "ММА" ? "🥊" : post.category === "Фитнес" ? "💪" : "📖"}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <Badge className="mb-3">{post.category}</Badge>
                    <CardTitle className="mb-3 text-xl text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {post.title}
                    </CardTitle>
                    <CardDescription className="mb-4 text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-primary font-semibold group">
                      <span>Прочети повече</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
