import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, User, Calendar } from "lucide-react";
import { getBreadcrumbSchema, getEventSchema } from "@/lib/structuredData";

const schedule = {
  "Понеделник": [
    { time: "Soon", activity: "Functional Training", coach: "Soon", level: "Всички нива", type: "fitness" },
    { time: "Soon", activity: "Кикбокс - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "ММА - Юноши", coach: "Soon", level: "Юноши 13-18 год", type: "teens" },
    { time: "Soon", activity: "ММА - Възрастни", coach: "Soon", level: "Напреднали", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Вторник": [
    { time: "Soon", activity: "Силова тренировка", coach: "Soon", level: "Всички нива", type: "fitness" },
    { time: "Soon", activity: "ММА - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "Бокс - Юноши", coach: "Soon", level: "Юноши 13-18 год", type: "teens" },
    { time: "Soon", activity: "Кикбокс - Възрастни", coach: "Soon", level: "Напреднали", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Сряда": [
    { time: "Soon", activity: "Кондиционна тренировка", coach: "Soon", level: "Всички нива", type: "fitness" },
    { time: "Soon", activity: "Кикбокс - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "ММА - Юноши", coach: "Soon", level: "Юноши 13-18 год", type: "teens" },
    { time: "Soon", activity: "ММА - Възрастни", coach: "Soon", level: "Напреднали", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Четвъртък": [
    { time: "Soon", activity: "Functional Training", coach: "Soon", level: "Всички нива", type: "fitness" },
    { time: "Soon", activity: "ММА - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "Бокс - Юноши", coach: "Soon", level: "Юноши 13-18 год", type: "teens" },
    { time: "Soon", activity: "Кикбокс - Възрастни", coach: "Soon", level: "Напреднали", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Петък": [
    { time: "Soon", activity: "Силова тренировка", coach: "Soon", level: "Всички нива", type: "fitness" },
    { time: "Soon", activity: "Кикбокс - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "ММА - Юноши", coach: "Soon", level: "Юноши 13-18 год", type: "teens" },
    { time: "Soon", activity: "Смесени групи", coach: "Soon", level: "Всички", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Събота": [
    { time: "Soon", activity: "ММА - Деца", coach: "Soon", level: "Деца 6-12 год", type: "kids" },
    { time: "Soon", activity: "Спаринги", coach: "Soon", level: "Напреднали", type: "adults" },
    { time: "Soon", activity: "Свободна зала", coach: "Soon", level: "Всички", type: "open" }
  ],
  "Неделя": [
    { time: "Soon", activity: "Почивка / Персонални тренировки", coach: "Soon", level: "VIP", type: "vip" }
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "График", url: "/schedule" }
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
