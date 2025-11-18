import { Shield, Code, Dumbbell, Sparkles, Rocket, Target, Zap, Terminal, Lock, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import developerImage from '@/assets/developer-alex.png';

export default function Developer() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section with Cyber Effects */}
        <div className="relative mb-16 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-12 border-2 border-primary/50 shadow-glow">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow" />
              <img 
                src={developerImage} 
                alt="Александрос Тосунидис"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-4 border-background shadow-2xl"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent animate-fade-in tracking-wide white-text-outline">
                Александрос Тосунидис
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                <span className="px-4 py-2 bg-primary/20 border border-primary rounded-lg text-primary font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                  <Shield className="w-4 h-4" />
                  Cybersecurity Junior
                </span>
                <span className="px-4 py-2 bg-accent/20 border border-accent rounded-lg text-accent font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                  <Code className="w-4 h-4" />
                  Full Stack Developer
                </span>
                <span className="px-4 py-2 bg-secondary/20 border border-secondary rounded-lg text-secondary font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform">
                  <Dumbbell className="w-4 h-4" />
                  Fitness Enthusiast
                </span>
              </div>
              <p className="text-lg md:text-xl text-foreground font-semibold mb-2 white-text-outline">
                21-годишен киберсигурност ентусиаст, който комбинира{' '}
                <span className="text-primary font-bold">творческо кодиране</span> с{' '}
                <span className="text-accent font-bold">robust security практики</span>
              </p>
              <div className="text-muted-foreground font-medium">
                <Terminal className="inline w-5 h-5 mr-2 text-primary animate-pulse" />
                <span className="font-mono text-sm">
                  {">"} Защитавам дигитални активи | Създавам интерактивни преживявания | Подкрепям спортните таланти
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mb-16">
          <Card className="border-2 border-primary/50 bg-card/50 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-primary animate-pulse" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent white-text-outline tracking-wide">
                  Защо Създадох Този Сайт?
                </h2>
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p className="text-foreground font-medium white-text-outline">
                  Този уебсайт е създаден с <span className="text-primary font-bold">❤️ СТРАСТ</span> и{' '}
                  <span className="text-accent font-bold">💪 ОТДАДЕНОСТ</span> за да подкрепя{' '}
                  <span className="text-secondary font-bold text-xl">Brothers Gym</span> - 
                  залата, която не е просто място за тренировка, а е{' '}
                  <span className="text-primary font-bold">СЕМЕЙСТВО, ОБЩНОСТ и ДОМ</span> за всички бойци и атлети!
                </p>
                
                <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-l-4 border-primary p-6 rounded-lg">
                  <p className="text-foreground font-semibold italic white-text-outline">
                    "Вярвам, че <span className="text-primary font-bold">технологията</span> може да усили{' '}
                    <span className="text-accent font-bold">спортния дух</span>. 
                    Този проект е моят начин да дам обратно на общността, която ме вдъхновява, 
                    като създам <span className="text-secondary font-bold">модерна дигитална платформа</span>, 
                    която представя Brothers Gym пред света!"
                  </p>
                </div>

                <p className="text-foreground font-medium white-text-outline">
                  Моята <span className="text-primary font-bold text-xl">МИСИЯ</span>: 
                  Да изградя <span className="text-accent font-bold">сигурен, бърз и красив</span> уебсайт, 
                  който показва <span className="text-secondary font-bold">професионализма</span>, 
                  <span className="text-primary font-bold"> енергията</span> и{' '}
                  <span className="text-accent font-bold">постиженията</span> на залата и нейните спортисти!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-secondary via-primary to-accent bg-clip-text text-transparent white-text-outline tracking-wide">
            Технически Умения & Експертиза
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/50 hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-glow group">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-primary mb-3 white-text-outline tracking-wide">Cybersecurity</h3>
                <ul className="space-y-2 text-sm text-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="white-text-outline">ВВМУ Варна - Киберсигурност</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="white-text-outline">ThinkCyber Bulgaria - XE Program</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="white-text-outline">Penetration Testing & Security Audits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="white-text-outline">Secure Coding & Database Security</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/50 hover:border-accent transition-all duration-300 hover:scale-105 hover:shadow-glow group">
              <CardContent className="p-6">
                <Code className="w-12 h-12 text-accent mb-4 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-accent mb-3 white-text-outline tracking-wide">Development</h3>
                <ul className="space-y-2 text-sm text-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">React, TypeScript, Vite</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">Three.js & Interactive 3D</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">Supabase & Backend Development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">QA Testing & Automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/50 hover:border-secondary transition-all duration-300 hover:scale-105 hover:shadow-glow group">
              <CardContent className="p-6">
                <Brain className="w-12 h-12 text-secondary mb-4 group-hover:animate-pulse" />
                <h3 className="text-xl font-bold text-secondary mb-3 white-text-outline tracking-wide">AI & Innovation</h3>
                <ul className="space-y-2 text-sm text-foreground font-medium">
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">TU Sofia - Intelligent Systems & AI</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">Python Programming</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">Creative Problem Solving</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-primary" />
                    <span className="white-text-outline">Vibe Coding Philosophy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Future Plans */}
        <div className="mb-16">
          <Card className="border-2 border-accent/50 bg-gradient-to-br from-accent/5 via-primary/5 to-secondary/5 backdrop-blur-sm hover:shadow-glow transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Rocket className="w-8 h-8 text-accent animate-bounce" />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent white-text-outline tracking-wide">
                  Бъдещи Подобрения & Визия
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2 white-text-outline">
                    <Sparkles className="w-5 h-5" />
                    За Уебсайта
                  </h3>
                  <div className="space-y-2 text-foreground font-medium">
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-primary font-bold">Онлайн резервации</span> на тренировки с автоматизирана система</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-primary font-bold">Персонализирани потребителски профили</span> с прогрес-тракинг</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-primary font-bold">Live streaming</span> на събития и турнири</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-primary font-bold">Интегриран онлайн магазин</span> с екипировка и добавки</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-primary font-bold">AI чатбот</span> за автоматични отговори на въпроси</span>
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-secondary mb-4 flex items-center gap-2 white-text-outline">
                    <Dumbbell className="w-5 h-5" />
                    За Залата & Общността
                  </h3>
                  <div className="space-y-2 text-foreground font-medium">
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-secondary font-bold">Дигитализация</span> на всички процеси за по-добро преживяване</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-secondary font-bold">Мобилно приложение</span> за iOS и Android</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-secondary font-bold">Community платформа</span> за споделяне на постижения</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-secondary font-bold">Виртуални тренировки</span> и онлайн програми</span>
                    </p>
                    <p className="flex items-start gap-2 white-text-outline">
                      <span className="text-accent font-bold">▸</span>
                      <span><span className="text-secondary font-bold">Партньорства</span> с местни спортни организации</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vision Statement */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30 p-8 md:p-12 border-2 border-primary shadow-glow">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent animate-pulse" />
          <div className="relative z-10 text-center space-y-6">
            <div className="flex justify-center mb-4">
              <Sparkles className="w-16 h-16 text-accent animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent white-text-outline tracking-wide">
              Моята Визия
            </h2>
            <p className="text-xl md:text-2xl font-bold text-foreground max-w-4xl mx-auto leading-relaxed white-text-outline">
              Да <span className="text-primary text-2xl">ОБЕДИНЯ</span> креативната разработка с{' '}
              <span className="text-accent text-2xl">КИБЕРСИГУРНОСТ</span>, за да{' '}
              <span className="text-secondary text-2xl">ЗАЩИТЯ</span> иновативни проекти от уязвимости 
              и да създам <span className="text-primary text-2xl">ДИГИТАЛНИ ПРЕЖИВЯВАНИЯ</span>, 
              които вдъхновяват, защитават и <span className="text-accent text-2xl">ПРОМЕНЯТ ЖИВОТА</span> на хората!
            </p>
            <div className="pt-6">
              <p className="text-lg font-semibold text-muted-foreground italic white-text-outline">
                "Когато страстта към спорта среща технологията, магията се случва." 
                <span className="text-primary font-bold"> - Александрос Тосунидис</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <Card className="border-2 border-secondary/50 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <p className="text-lg text-foreground font-semibold mb-4 white-text-outline">
                Има идеи за подобрения или искаш да работим заедно?
              </p>
              <p className="text-muted-foreground font-medium white-text-outline">
                Свържи се с <span className="text-primary font-bold">Brothers Gym</span> екипа или посети{' '}
                <a 
                  href="https://a-tosunidis-cs.lovable.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent font-bold hover:text-primary transition-colors underline"
                >
                  моят портфолио сайт
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
