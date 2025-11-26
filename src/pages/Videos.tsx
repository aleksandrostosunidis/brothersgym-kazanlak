import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, ExternalLink, Facebook, Instagram } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const videoContent = [
  {
    title: "Треньорска Демонстрация - ММА Техники",
    description: "Дориан Анев демонстрира основни ММА техники и комбинации",
    platform: "Facebook",
    type: "Техника",
    duration: "12:34",
    thumbnail: "🥋"
  },
  {
    title: "Груповa Тренировка - Кикбокс",
    description: "Интензивна кикбокс тренировка с нашата юношеска група",
    platform: "Instagram",
    type: "Тренировка",
    duration: "8:15",
    thumbnail: "🥊"
  },
  {
    title: "Спаринг Сесия",
    description: "Професионални спаринг сесии от нашите възрастни групи",
    platform: "Facebook",
    type: "Спаринг",
    duration: "15:42",
    thumbnail: "⚔️"
  },
  {
    title: "Conditioning Training",
    description: "Кондиционна тренировка за издръжливост и сила",
    platform: "Instagram",
    type: "Кондиция",
    duration: "10:20",
    thumbnail: "💪"
  },
  {
    title: "Детска Група в Действие",
    description: "Нашите най-малки състезатели на тренировка",
    platform: "Facebook",
    type: "Деца",
    duration: "6:45",
    thumbnail: "👦"
  },
  {
    title: "Зад Кулисите на Brothers Gym",
    description: "Екскурзия из нашата зала и оборудване",
    platform: "Instagram",
    type: "Зала",
    duration: "4:30",
    thumbnail: "🏋️"
  }
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/p/Brothers-GYM-100063529961850/",
    description: "Вижте всички наши видеа и актуализации във Facebook"
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/brothers_gym_kazanlak/",
    description: "Следете ни в Instagram за ежедневни клипове и истории"
  }
];

export default function Videos() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Видео Галерия", url: "/videos" }
  ]);

  return (
    <>
      <SEO
        title="Видео Галерия - Тренировки и Техники"
        description="Гледайте видеа от тренировки, техники и състезания в Brothers Gym Казанлък. ММА, Кикбокс, Бокс демонстрации и груповите ни сесии."
        keywords="видео brothers gym, мма видеа казанлък, тренировки видео, бокс техники, спаринг видео"
        canonicalUrl="/videos"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Play className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Видео Галерия
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Разгледайте нашите тренировки, техники и моменти от залата
            </p>
          </div>

          {/* Social Media Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="bg-card/80 backdrop-blur border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                            {social.name}
                            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </CardTitle>
                          <CardDescription>{social.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </a>
              );
            })}
          </div>

          {/* Video Grid (Placeholders) */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Популярни Видеа
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoContent.map((video, idx) => (
                <Card key={idx} className="bg-card/80 backdrop-blur border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <CardHeader className="p-0">
                    <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative rounded-t-lg group cursor-pointer">
                      <span className="text-6xl">{video.thumbnail}</span>
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play className="w-16 h-16 text-white" />
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary">{video.duration}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge>{video.type}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {video.platform === "Facebook" ? <Facebook className="w-3 h-3" /> : <Instagram className="w-3 h-3" />}
                      </Badge>
                    </div>
                    <CardTitle className="mb-2 text-lg text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {video.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {video.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="p-8 bg-primary/10 border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Искате да Видите Повече?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Следете нашите профили във Facebook и Instagram за редовни актуализации, тренировъчни видеа, състезания и много повече!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/p/Brothers-GYM-100063529961850/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
              <a
                href="https://www.instagram.com/brothers_gym_kazanlak/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
