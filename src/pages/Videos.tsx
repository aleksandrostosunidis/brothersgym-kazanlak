import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook, Instagram, Play } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import videoThumb1 from "@/assets/video-thumb-1.jpg";
import videoThumb2 from "@/assets/video-thumb-2.jpg";
import videoThumb3 from "@/assets/video-thumb-3.jpg";
import videoThumb4 from "@/assets/video-thumb-4.jpg";
import videoThumb5 from "@/assets/video-thumb-5.jpg";
import videoThumb6 from "@/assets/video-thumb-6.jpg";

const videoContent = [
  {
    title: "Интензивна ММА Тренировка",
    description: "Мощни ММА техники и комбинации в действие",
    platform: "Facebook",
    type: "ММА",
    videoUrl: "/videos/video-1.mp4",
    thumbnail: videoThumb1,
    titleColor: "text-red-500"
  },
  {
    title: "Кикбокс Майсторски Клас",
    description: "Усъвършенствай техниката си с нашите професионални треньори",
    platform: "Facebook",
    type: "Кикбокс",
    videoUrl: "/videos/video-2.mp4",
    thumbnail: videoThumb2,
    titleColor: "text-orange-500"
  },
  {
    title: "Борба и Грапълинг",
    description: "Техники за контрол и доминация на земята",
    platform: "Facebook",
    type: "Грапълинг",
    videoUrl: "/videos/video-3.mp4",
    thumbnail: videoThumb3,
    titleColor: "text-blue-400"
  },
  {
    title: "Бокс - Скорост и Точност",
    description: "Перфектни удари и комбинации от нашите боксьори",
    platform: "Facebook",
    type: "Бокс",
    videoUrl: "/videos/video-4.mp4",
    thumbnail: videoThumb4,
    titleColor: "text-red-600"
  },
  {
    title: "Груповa Треньорскa Сесия",
    description: "Енергията на екипа и братството в залата",
    platform: "Facebook",
    type: "Група",
    videoUrl: "/videos/video-5.mp4",
    thumbnail: videoThumb5,
    titleColor: "text-amber-500"
  },
  {
    title: "Силова Подготовка",
    description: "Изгради сила и мускулна маса в Brothers Gym",
    platform: "Facebook",
    type: "Сила",
    videoUrl: "/videos/video-6.mp4",
    thumbnail: videoThumb6,
    titleColor: "text-cyan-400"
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
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
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
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
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
                          <CardTitle>
                            {social.name}
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

          {/* Video Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Популярни Видеа
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {videoContent.map((video, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedVideo(video.videoUrl)}
                  className="group cursor-pointer"
                >
                  <Card className="bg-card/80 backdrop-blur border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                    <CardHeader className="p-0">
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge>{video.type}</Badge>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Facebook className="w-3 h-3" />
                          Facebook
                        </Badge>
                      </div>
                      <CardTitle className={`mb-2 text-lg font-bold ${video.titleColor}`}>
                        {video.title}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {video.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Video Dialog */}
          <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
            <DialogContent className="max-w-5xl w-full p-0">
              {selectedVideo && (
                <video
                  controls
                  autoPlay
                  className="w-full h-auto"
                  src={selectedVideo}
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </DialogContent>
          </Dialog>

          {/* CTA */}
          <Card className="p-8 bg-primary/10 border-primary/30 text-center">
            <h3 className="text-2xl font-bold mb-4">
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