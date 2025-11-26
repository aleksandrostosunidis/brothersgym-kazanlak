import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Dumbbell, Target, Heart, Award, TrendingUp } from "lucide-react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

const guideCategories = [
  {
    title: "ММА за Начинаещи",
    description: "Пълно ръководство за стартиране в Mixed Martial Arts",
    icon: Target,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    level: "Начинаещо",
    duration: "8-12 седмици",
    comingSoon: true
  },
  {
    title: "Програма за Отслабване",
    description: "Комбинирана програма от тренировки и хранителен режим",
    icon: TrendingUp,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    level: "Всички нива",
    duration: "12 седмици",
    comingSoon: true
  },
  {
    title: "Силова Програма",
    description: "Изграждане на мускулна маса и сила",
    icon: Dumbbell,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    level: "Средно/Напреднало",
    duration: "16 седмици",
    comingSoon: true
  },
  {
    title: "Кондиционна Подготовка",
    description: "Изграждане на издръжливост и експлозивност",
    icon: Heart,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    level: "Напреднало",
    duration: "10 седмици",
    comingSoon: true
  },
  {
    title: "Техника в Бокса",
    description: "Усъвършенстване на боксова техника и комбинации",
    icon: Award,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    level: "Средно",
    duration: "8 седмици",
    comingSoon: true
  },
  {
    title: "Гъвкавост и Мобилност",
    description: "Подобряване на гъвкавостта и предотвратяване на травми",
    icon: Target,
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    level: "Всички нива",
    duration: "6 седмици",
    comingSoon: true
  }
];

export default function Guides() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Тренировъчни Програми", url: "/guides" }
  ]);

  return (
    <>
      <SEO
        title="Тренировъчни Програми и Ръководства"
        description="Професионални тренировъчни програми и ръководства от Brothers Gym Казанлък. ММА, Фитнес, Отслабване, Сила и Кондиция програми за всички нива."
        keywords="тренировъчни програми, ръководства мма, програма отслабване, силова програма казанлък, фитнес план"
        canonicalUrl="/guides"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <BookOpen className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Тренировъчни Програми
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Професионални програми и ръководства създадени от нашите треньори-шампиони
            </p>
          </div>

          {/* Coming Soon Notice */}
          <Card className="mb-12 p-8 bg-primary/10 border-primary/30 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
              Скоро Тук! 🚀
            </h2>
            <p className="text-muted-foreground text-lg">
              Работим по създаването на детайлни тренировъчни програми и ръководства за всички нива.
              <br />
              Следете тази страница за актуализации.
            </p>
          </Card>

          {/* Guide Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guideCategories.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <Card
                  key={idx}
                  className={`relative overflow-hidden ${guide.bgColor} ${guide.borderColor} border-2 hover:shadow-xl transition-all duration-300`}
                >
                  {guide.comingSoon && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary">Скоро</Badge>
                    </div>
                  )}
                  
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full ${guide.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`w-8 h-8 ${guide.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      {guide.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Ниво:</span>
                        <Badge variant="outline">{guide.level}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Продължителност:</span>
                        <span className="font-semibold text-foreground">{guide.duration}</span>
                      </div>
                    </div>

                    {guide.comingSoon && (
                      <div className="mt-6 p-4 bg-muted/30 rounded-md text-center">
                        <p className="text-sm text-muted-foreground">
                          Програмата се разработва
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Section */}
          <Card className="mt-16 p-8 bg-card/80 backdrop-blur border-border/50">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                Искате Персонализирана Програма?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Нашите треньори могат да създадат индивидуална програма, специално адаптирана към вашите цели, ниво и физическо състояние.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-semibold"
              >
                Свържете се с нас
              </a>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
