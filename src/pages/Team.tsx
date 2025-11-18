import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Trophy, Medal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import coachDorian from '@/assets/coach-dorian.jpg';
import coachTencho from '@/assets/coach-tencho.jpg';
import coachYordan from '@/assets/coach-yordan-new.jpg';

const Team = () => {
  const { language } = useLanguage();

  const teamMembers = [
    {
      name: 'Дориан Аниев Дерменджиев',
      nameEn: 'Dorian Aniev Dermendzhiev',
      gradientClass: 'text-gradient-dorian',
      photo: coachDorian,
      role: language === 'bg' ? 'Треньор по ММА и Фитнес' : 'MMA & Fitness Coach',
      experience: language === 'bg' ? '8+ години треньорски опит' : '8+ years coaching experience',
      quote: language === 'bg' 
        ? 'Когато дисциплината стане твой навик, успехът е само въпрос на време.'
        : 'When discipline becomes your habit, success is only a matter of time.',
      bio: language === 'bg'
        ? 'Посветен на бойните спортове от 13-годишен. Започнал с волейбол, преминал през фитнес и ММА. С над 22 години тренировъчен опит и 8 години професионална треньорска практика. В Brothers Gym води групи по ММА и индивидуални тренировки, специализиран във фитнес и кондиционна подготовка на спортисти.'
        : 'Dedicated to combat sports since age 13. Started with volleyball, progressed through fitness and MMA. With over 22 years of training experience and 8 years of professional coaching. At Brothers Gym, leads MMA groups and individual training sessions, specialized in fitness and athletic conditioning.',
      achievements: [
        { icon: Medal, text: language === 'bg' ? 'Вицеевропейска титла по ММА' : 'European Vice Champion in MMA', tier: 'european' },
        { icon: Trophy, text: language === 'bg' ? 'Балканска титла' : 'Balkan Champion', tier: 'balkan' },
        { icon: Award, text: language === 'bg' ? '8-кратен републикански шампион' : '8-time National Champion', tier: 'national-elite' },
        { icon: Award, text: language === 'bg' ? 'Майстор на спорта (2015)' : 'Master of Sport (2015)', tier: 'honor' },
        { icon: Award, text: language === 'bg' ? 'Заслужил треньор (2021)' : 'Honored Coach (2021)', tier: 'honor' },
      ],
      highlights: language === 'bg'
        ? ['ММА', 'Фитнес', 'Граплинг', 'Кондиция', 'Индивидуален подход']
        : ['MMA', 'Fitness', 'Grappling', 'Conditioning', 'Individual Approach']
    },
    {
      name: 'Тенчо Караенев',
      nameEn: 'Tencho Karaenev',
      gradientClass: 'text-gradient-tencho',
      photo: coachTencho,
      role: language === 'bg' ? 'Треньор по ММА' : 'MMA Coach',
      experience: language === 'bg' ? '23 години в спорта' : '23 years in sports',
      quote: language === 'bg'
        ? 'Дисциплината и постоянството са ключът към успеха.'
        : 'Discipline and consistency are the keys to success.',
      bio: language === 'bg'
        ? '31 години, родом от Стара Загора. Завършил НВУ през 2017 г. С 23 години опит в спорта - таекуондо, баскетбол, футбол, традиционен фитнес. Активен състезател по ММА (2013-2016) със златни медали от всички републикански първенства. Национален треньор и съдия по ММА.'
        : '31 years old, from Stara Zagora. Graduated from National Military University in 2017. With 23 years of sports experience - taekwondo, basketball, football, traditional fitness. Active MMA competitor (2013-2016) with gold medals from all national championships. National MMA coach and referee.',
      achievements: [
        { icon: Medal, text: language === 'bg' ? '2x Световен Вицешампион' : '2x World Vice Champion', tier: 'world' },
        { icon: Medal, text: language === 'bg' ? '2x Бронз от Европейско първенство' : '2x European Bronze Medalist', tier: 'european' },
        { icon: Trophy, text: language === 'bg' ? 'Само златни медали на национално ниво' : 'Only gold medals at national level', tier: 'national-elite' },
        { icon: Award, text: language === 'bg' ? 'Майстор на спорта (2015)' : 'Master of Sport (2015)', tier: 'honor' },
        { icon: Award, text: language === 'bg' ? 'Заслужил треньор (2021)' : 'Honored Coach (2021)', tier: 'honor' },
        { icon: Award, text: language === 'bg' ? 'Спортист на годината (2015)' : 'Athlete of the Year (2015)', tier: 'honor' },
      ],
      highlights: language === 'bg'
        ? ['ММА', 'Граплинг', 'Таекуондо', 'Състезателна подготовка', 'Национален треньор']
        : ['MMA', 'Grappling', 'Taekwondo', 'Competition Prep', 'National Coach']
    },
    {
      name: 'Йордан Кукушев',
      nameEn: 'Yordan Kukushev',
      gradientClass: 'text-gradient-yordan',
      photo: coachYordan,
      role: language === 'bg' ? 'Старши Треньор' : 'Senior Coach',
      experience: language === 'bg' ? '20 години треньорска практика' : '20 years coaching practice',
      quote: language === 'bg'
        ? 'Старай се да бъдеш винаги най-доброто проявление на себе си!'
        : 'Always strive to be the best version of yourself!',
      bio: language === 'bg'
        ? '51 години, с 40 години спортен опит и 20 години треньорска практика. Богато състезателно минало в борба, джудо, бокс, тай бокс, силов трибой, кикбокс и множество други дисциплини. В Brothers Gym се стараe да върне доброто усещане за живот в хората чрез тренировъчните практики.'
        : '51 years old, with 40 years of sports experience and 20 years of coaching practice. Rich competitive background in wrestling, judo, boxing, Thai boxing, powerlifting, kickboxing, and many other disciplines. At Brothers Gym, strives to restore people\'s good feeling for life through training practices.',
      achievements: [
        { icon: Trophy, text: language === 'bg' ? 'Многостранен спортен опит' : 'Versatile sports experience', tier: 'honor' },
        { icon: Award, text: language === 'bg' ? 'Успешна подготовка на състезатели' : 'Successful athlete preparation', tier: 'honor' },
        { icon: Medal, text: language === 'bg' ? 'Експерт в 10+ дисциплини' : 'Expert in 10+ disciplines', tier: 'honor' },
      ],
      highlights: language === 'bg'
        ? ['Борба', 'Джудо', 'Бокс', 'Тай Бокс', 'Кикбокс', 'Силов Трибой', 'Холистичен подход']
        : ['Wrestling', 'Judo', 'Boxing', 'Thai Boxing', 'Kickboxing', 'Powerlifting', 'Holistic Approach']
    },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gradient">
            {language === 'bg' ? 'Нашият Екип' : 'Our Team'}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            {language === 'bg'
              ? 'Запознайте се с нашите професионални треньори.'
              : 'Meet our professional coaches.'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] lg:grid-cols-[350px,1fr] gap-0">
                  {/* Coach Photo */}
                  <div className="relative bg-secondary/20 overflow-hidden h-[450px] md:h-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent z-10" />
                    <div className="absolute inset-0 border-4 border-primary/30 z-20" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-20" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-20" />
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent z-20" />
                    <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-transparent via-primary to-transparent z-20" />
                    <img 
                      src={member.photo} 
                      alt={language === 'bg' ? member.name : member.nameEn}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                  </div>

                  {/* Biography Content */}
                  <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${member.gradientClass}`}>
                        {language === 'bg' ? member.name : member.nameEn}
                      </h2>
                      <p className="text-lg sm:text-xl text-primary font-semibold">{member.role}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                        {member.experience}
                      </p>
                    </div>

                    {/* Skills/Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {member.highlights.map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>

                    {/* Biography */}
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-semibold">
                      {member.bio}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                        <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                        {language === 'bg' ? 'Постижения' : 'Achievements'}
                      </h3>
                      <div className="space-y-2 sm:space-y-3">
                        {member.achievements.map((achievement, idx) => {
                          const Icon = achievement.icon;
                          return (
                            <div key={idx} className={`achievement-${achievement.tier} flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg`}>
                              <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 mt-0.5" style={{
                                color: achievement.tier === 'world' ? 'hsl(45 100% 60%)' :
                                       achievement.tier === 'european' ? 'hsl(215 85% 65%)' :
                                       achievement.tier === 'balkan' ? 'hsl(145 65% 55%)' :
                                       achievement.tier === 'national-elite' ? 'hsl(280 60% 70%)' :
                                       achievement.tier === 'national' ? 'hsl(25 85% 60%)' :
                                       'hsl(280 60% 70%)'
                              }} />
                              <span className="font-medium text-foreground leading-relaxed text-sm sm:text-base">{achievement.text}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quote */}
                    <div className="pt-4 border-t border-border">
                      <blockquote className="italic text-sm sm:text-base text-muted-foreground">
                        "{member.quote}"
                      </blockquote>
                      <p className="text-xs sm:text-sm text-primary font-semibold mt-2">
                        — {language === 'bg' ? member.name : member.nameEn}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
