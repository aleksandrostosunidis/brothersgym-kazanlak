import { SEO } from "@/components/SEO";
import { Card } from "@/components/ui/card";
import { Facebook, Instagram } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const videoContent = [
  { title: "Видео №1", videoUrl: "/videos/video-1.mp4" },
  { title: "Видео №2", videoUrl: "/videos/video-2.mp4" },
  { title: "Видео №3", videoUrl: "/videos/video-3.mp4" },
  { title: "Видео №4", videoUrl: "/videos/video-4.mp4" },
  { title: "Видео №5", videoUrl: "/videos/video-5.mp4" },
  { title: "Видео №6", videoUrl: "/videos/video-6.mp4" }
];

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://www.facebook.com/p/Brothers-GYM-100063529961850/?locale=bg_BG",
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

      <div className="min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Видео Галерия
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Разгледайте нашите тренировки, техники и моменти от залата
            </p>
          </div>

          {/* Social Media Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  variant="outline"
                  size="lg"
                  className="w-full h-auto py-4 sm:py-6"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 w-full">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold text-base sm:text-lg">{social.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">{social.description}</p>
                      </div>
                    </div>
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Video Grid */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Популярни Видеа
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {videoContent.map((video, idx) => (
                <Dialog key={idx}>
                  <DialogTrigger asChild>
                    <Card 
                      className="overflow-hidden group cursor-pointer hover:gym-shadow transition-all border-2 border-border hover:border-primary"
                    >
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <video 
                          src={video.videoUrl}
                          className="w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                          <p className="text-base sm:text-lg md:text-xl font-bold text-white" style={{ 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.9), -1px -1px 2px rgba(0,0,0,0.9)', 
                            letterSpacing: '0.1em' 
                          }}>
                            {video.title}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl w-[95vw] sm:w-full p-0 border-0">
                    <div className="relative w-full">
                      <video
                        controls
                        autoPlay
                        className="w-full h-auto max-h-[85vh]"
                        src={video.videoUrl}
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="p-6 sm:p-8 bg-primary/10 border-primary/30 text-center">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Искате да Видите Повече?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto px-2">
              Следете нашите профили във Facebook и Instagram за редовни актуализации, тренировъчни видеа, състезания и много повече!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button
                asChild
                className="w-full sm:w-auto"
              >
                <a
                  href={socialLinks[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <a
                  href={socialLinks[1].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="w-4 h-4 mr-2" />
                  Instagram
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}