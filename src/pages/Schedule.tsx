import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, Calendar } from "lucide-react";
import { getBreadcrumbSchema, getEventSchema } from "@/lib/structuredData";
import { useLanguage } from '@/contexts/LanguageContext';

const schedule = {
  "Понеделник": [
    { time: "07:00 - 08:00", activity: "Functional Training", coach: "Йордан Кукушев", level: "Всички нива", type: "fitness" },
    { time: "09:00 - 10:00", activity: "Кикбокс - Деца", coach: "Тенчо Караенев", level: "Деца 6-12 год", type: "kids" },
    { time: "17:00 - 18:00", activity: "ММА - Юноши", coach: "Дориан Анев", level: "Юноши 13-18 год", type: "teens" },
    { time: "18:30 - 20:00", activity: "ММА - Възрастни", coach: "Дориан Анев", level: "Напреднали", type: "adults" },
    { time: "20:00 - 21:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Вторник": [
    { time: "07:00 - 08:00", activity: "Силова тренировка", coach: "Йордан Кукушев", level: "Всички нива", type: "fitness" },
    { time: "09:00 - 10:00", activity: "ММА - Деца", coach: "Дориан Анев", level: "Деца 6-12 год", type: "kids" },
    { time: "17:00 - 18:00", activity: "Бокс - Юноши", coach: "Тенчо Караенев", level: "Юноши 13-18 год", type: "teens" },
    { time: "18:30 - 20:00", activity: "Кикбокс - Възрастни", coach: "Тенчо Караенев", level: "Напреднали", type: "adults" },
    { time: "20:00 - 21:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Сряда": [
    { time: "07:00 - 08:00", activity: "Кондиционна тренировка", coach: "Йордан Кукушев", level: "Всички нива", type: "fitness" },
    { time: "09:00 - 10:00", activity: "Кикбокс - Деца", coach: "Тенчо Караенев", level: "Деца 6-12 год", type: "kids" },
    { time: "17:00 - 18:00", activity: "ММА - Юноши", coach: "Дориан Анев", level: "Юноши 13-18 год", type: "teens" },
    { time: "18:30 - 20:00", activity: "ММА - Възрастни", coach: "Дориан Анев", level: "Напреднали", type: "adults" },
    { time: "20:00 - 21:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Четвъртък": [
    { time: "07:00 - 08:00", activity: "Functional Training", coach: "Йордан Кукушев", level: "Всички нива", type: "fitness" },
    { time: "09:00 - 10:00", activity: "ММА - Деца", coach: "Дориан Анев", level: "Деца 6-12 год", type: "kids" },
    { time: "17:00 - 18:00", activity: "Бокс - Юноши", coach: "Тенчо Караенев", level: "Юноши 13-18 год", type: "teens" },
    { time: "18:30 - 20:00", activity: "Кикбокс - Възрастни", coach: "Тенчо Караенев", level: "Напреднали", type: "adults" },
    { time: "20:00 - 21:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Петък": [
    { time: "07:00 - 08:00", activity: "Силова тренировка", coach: "Йордан Кукушев", level: "Всички нива", type: "fitness" },
    { time: "09:00 - 10:00", activity: "Кикбокс - Деца", coach: "Тенчо Караенев", level: "Деца 6-12 год", type: "kids" },
    { time: "17:00 - 18:00", activity: "ММА - Юноши", coach: "Дориан Анев", level: "Юноши 13-18 год", type: "teens" },
    { time: "18:30 - 20:00", activity: "Смесени групи", coach: "Всички треньори", level: "Всички", type: "adults" },
    { time: "20:00 - 21:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Събота": [
    { time: "09:00 - 10:30", activity: "ММА - Деца", coach: "Дориан Анев", level: "Деца 6-12 год", type: "kids" },
    { time: "11:00 - 12:30", activity: "Спаринги", coach: "Всички треньори", level: "Напреднали", type: "adults" },
    { time: "17:00 - 19:00", activity: "Свободна зала", coach: "-", level: "Всички", type: "open" }
  ],
  "Неделя": [
    { time: "10:00 - 12:00", activity: "Почивка / Персонални тренировки", coach: "По договаряне", level: "VIP", type: "vip" }
  ]
};

const typeColors = {
  kids: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  teens: "bg-green-500/20 text-green-400 border-green-500/50",
  adults: "bg-red-500/20 text-red-400 border-red-500/50",
  fitness: "bg-purple-500/20 text-purple-400 border-purple-500/50",
  vip: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  open: "bg-gray-500/20 text-gray-400 border-gray-500/50"
};

export default function Schedule() {
  const { language } = useLanguage();
  
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: language === 'bg' ? "Начало" : "Home", url: "/" },
    { name: language === 'bg' ? "График" : "Schedule", url: "/schedule" }
  ]);

  const eventSchemas = Object.entries(schedule).flatMap(([day, sessions]) =>
    sessions.map(session => 
      getEventSchema(
        `${session.activity} - ${day}`,
        "2025-02-03T" + session.time.split(" - ")[0],
        "2025-02-03T" + session.time.split(" - ")[1],
        `${session.activity} с треньор ${session.coach}. Ниво: ${session.level}`
      )
    )
  );

  return (
    <>
      <SEO
        title="График на Тренировките"
        description="Седмичен график на групови и персонални тренировки в Brothers Gym Казанлък. ММА, Кикбокс, Бокс, Фитнес за деца, юноши и възрастни."
        keywords="график тренировки казанлък, часове мма, график бокс, тренировки деца, brothers gym часове"
        canonicalUrl="/schedule"
        structuredData={[breadcrumbSchema, ...eventSchemas]}
      />

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Седмичен График
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Планирайте вашите тренировки с нашия актуален график
            </p>
            
            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Badge className={typeColors.kids}>Деца 6-12 год</Badge>
              <Badge className={typeColors.teens}>Юноши 13-18 год</Badge>
              <Badge className={typeColors.adults}>Възрастни</Badge>
              <Badge className={typeColors.fitness}>Фитнес</Badge>
              <Badge className={typeColors.vip}>VIP Тренировки</Badge>
              <Badge className={typeColors.open}>Свободна зала</Badge>
            </div>
          </div>

          {/* Schedule Tabs */}
          <Tabs defaultValue="Понеделник" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-8">
              {Object.keys(schedule).map((day) => (
                <TabsTrigger key={day} value={day} className="text-xs md:text-sm">
                  {day.substring(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(schedule).map(([day, sessions]) => (
              <TabsContent key={day} value={day} className="space-y-4">
                <h2 className="text-3xl font-bold mb-6 text-center text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                  {day}
                </h2>
                
                {sessions.map((session, idx) => (
                  <Card key={idx} className="bg-card/80 backdrop-blur border-border/50 hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                            {session.activity}
                          </CardTitle>
                          <CardDescription>
                            <Badge className={typeColors[session.type as keyof typeof typeColors]}>
                              {session.level}
                            </Badge>
                          </CardDescription>
                        </div>
                        
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2 text-primary">
                            <Clock className="w-4 h-4" />
                            <span className="font-semibold">{session.time}</span>
                          </div>
                          {session.coach !== "-" && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <User className="w-4 h-4" />
                              <span>{session.coach}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </TabsContent>
            ))}
          </Tabs>

          {/* Important Notes */}
          <Card className="mt-12 bg-primary/10 border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                <Calendar className="w-5 h-5" />
                Важна Информация
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-muted-foreground">
              <p>• VIP персонални тренировки са достъпни по всяко време по предварително договаряне</p>
              <p>• За резервации и въпроси: 089 678 0067 (Дориан) или 089 445 0256 (Тенчо)</p>
              <p>• Графикът може да бъде променян при официални празници или специални събития</p>
              <p>• Свободната зала е достъпна за всички членове извън груповите часове</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
