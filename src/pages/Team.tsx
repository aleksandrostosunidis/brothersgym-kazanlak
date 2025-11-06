import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

const Team = () => {
  const { language } = useLanguage();

  // Template for future team members
  const teamMembers = [
    {
      name: language === 'bg' ? 'Име на Треньор' : 'Coach Name',
      specialty: language === 'bg' ? 'Специалност' : 'Specialty',
      achievements: language === 'bg' ? 'Постижения' : 'Achievements',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            {language === 'bg' ? 'Нашият Екип' : 'Our Team'}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {language === 'bg'
              ? 'Запознайте се с нашите професионални треньори.'
              : 'Meet our professional coaches.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="bg-card border-border hover:gym-shadow transition-all">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                  <p className="text-primary font-semibold mb-4">{member.specialty}</p>
                  <p className="text-muted-foreground">{member.achievements}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            {language === 'bg'
              ? 'Информация за треньорите скоро ще бъде добавена.'
              : 'Coach information will be added soon.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
