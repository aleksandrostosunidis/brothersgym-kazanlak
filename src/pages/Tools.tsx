import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Activity, Heart, TrendingUp, Zap, Target } from "lucide-react";
import { useState } from "react";
import { getBreadcrumbSchema } from "@/lib/structuredData";

export default function Tools() {
  const [bmi, setBmi] = useState<{ weight: string; height: string; result: number | null }>({
    weight: "",
    height: "",
    result: null
  });

  const [calories, setCalories] = useState<{
    age: string;
    weight: string;
    height: string;
    gender: string;
    activity: string;
    goal: string;
    result: { maintenance: number; goal: number } | null;
  }>({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "sedentary",
    goal: "maintain",
    result: null
  });

  const [heartRate, setHeartRate] = useState<{ 
    age: string; 
    restingHR: string;
    result: { 
      fatBurn: { min: number; max: number };
      cardio: { min: number; max: number };
      peak: { min: number; max: number };
    } | null 
  }>({
    age: "",
    restingHR: "",
    result: null
  });

  const [bodyFat, setBodyFat] = useState<{
    weight: string;
    height: string;
    age: string;
    gender: string;
    neck: string;
    waist: string;
    hip: string;
    result: number | null;
  }>({
    weight: "",
    height: "",
    age: "",
    gender: "male",
    neck: "",
    waist: "",
    hip: "",
    result: null
  });

  const [oneRM, setOneRM] = useState<{
    weight: string;
    reps: string;
    result: { oneRM: number; percentages: { [key: number]: number } } | null;
  }>({
    weight: "",
    reps: "",
    result: null
  });

  const [protein, setProtein] = useState<{
    weight: string;
    activity: string;
    goal: string;
    result: { min: number; max: number } | null;
  }>({
    weight: "",
    activity: "moderate",
    goal: "maintain",
    result: null
  });

  const calculateBMI = () => {
    const w = parseFloat(bmi.weight);
    const h = parseFloat(bmi.height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi({ ...bmi, result: Math.round(result * 10) / 10 });
    }
  };

  const calculateCalories = () => {
    const w = parseFloat(calories.weight);
    const h = parseFloat(calories.height);
    const a = parseFloat(calories.age);

    if (w > 0 && h > 0 && a > 0) {
      let bmr;
      if (calories.gender === "male") {
        bmr = 10 * w + 6.25 * h - 5 * a + 5;
      } else {
        bmr = 10 * w + 6.25 * h - 5 * a - 161;
      }

      const activityMultipliers: { [key: string]: number } = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
      };

      const maintenance = Math.round(bmr * activityMultipliers[calories.activity]);
      
      let goalCalories = maintenance;
      if (calories.goal === "lose") {
        goalCalories = Math.round(maintenance - 500);
      } else if (calories.goal === "gain") {
        goalCalories = Math.round(maintenance + 300);
      }

      setCalories({ ...calories, result: { maintenance, goal: goalCalories } });
    }
  };

  const calculateHeartRate = () => {
    const age = parseFloat(heartRate.age);
    const resting = parseFloat(heartRate.restingHR) || 70;
    
    if (age > 0) {
      const maxHR = 220 - age;
      const reserve = maxHR - resting;
      
      const fatBurn = {
        min: Math.round(resting + (reserve * 0.5)),
        max: Math.round(resting + (reserve * 0.6))
      };
      const cardio = {
        min: Math.round(resting + (reserve * 0.7)),
        max: Math.round(resting + (reserve * 0.85))
      };
      const peak = {
        min: Math.round(resting + (reserve * 0.85)),
        max: Math.round(maxHR)
      };
      
      setHeartRate({ ...heartRate, result: { fatBurn, cardio, peak } });
    }
  };

  const calculateBodyFat = () => {
    const w = parseFloat(bodyFat.weight);
    const h = parseFloat(bodyFat.height);
    const neck = parseFloat(bodyFat.neck);
    const waist = parseFloat(bodyFat.waist);
    const hip = parseFloat(bodyFat.hip);

    if (w > 0 && h > 0 && neck > 0 && waist > 0) {
      let result;
      if (bodyFat.gender === "male") {
        result = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(h)) - 450;
      } else {
        if (hip > 0) {
          result = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(h)) - 450;
        } else {
          return;
        }
      }
      setBodyFat({ ...bodyFat, result: Math.round(result * 10) / 10 });
    }
  };

  const calculateOneRM = () => {
    const weight = parseFloat(oneRM.weight);
    const reps = parseFloat(oneRM.reps);

    if (weight > 0 && reps > 0 && reps <= 10) {
      const oneRMValue = weight * (1 + reps / 30);
      const percentages: { [key: number]: number } = {};
      [95, 90, 85, 80, 75, 70, 65, 60].forEach(percent => {
        percentages[percent] = Math.round(oneRMValue * (percent / 100));
      });
      
      setOneRM({ ...oneRM, result: { oneRM: Math.round(oneRMValue), percentages } });
    }
  };

  const calculateProtein = () => {
    const weight = parseFloat(protein.weight);
    
    if (weight > 0) {
      let multiplier = { min: 1.6, max: 2.2 };
      
      if (protein.goal === "lose") {
        multiplier = { min: 2.0, max: 2.5 };
      } else if (protein.goal === "gain") {
        multiplier = { min: 1.8, max: 2.4 };
      }
      
      if (protein.activity === "light") {
        multiplier.min -= 0.2;
        multiplier.max -= 0.2;
      } else if (protein.activity === "high") {
        multiplier.min += 0.2;
        multiplier.max += 0.2;
      }
      
      setProtein({ 
        ...protein, 
        result: { 
          min: Math.round(weight * multiplier.min), 
          max: Math.round(weight * multiplier.max) 
        } 
      });
    }
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { text: "Поднормено тегло", color: "text-blue-400" };
    if (bmiValue < 25) return { text: "Нормално тегло", color: "text-green-400" };
    if (bmiValue < 30) return { text: "Наднормено тегло", color: "text-yellow-400" };
    return { text: "Затлъстяване", color: "text-red-400" };
  };

  const getBodyFatCategory = (bf: number, gender: string) => {
    if (gender === "male") {
      if (bf < 6) return { text: "Есенциални мазнини", color: "text-blue-400" };
      if (bf < 14) return { text: "Атлети", color: "text-green-400" };
      if (bf < 18) return { text: "Фитнес", color: "text-green-400" };
      if (bf < 25) return { text: "Средно", color: "text-yellow-400" };
      return { text: "Наднормено", color: "text-red-400" };
    } else {
      if (bf < 14) return { text: "Есенциални мазнини", color: "text-blue-400" };
      if (bf < 21) return { text: "Атлети", color: "text-green-400" };
      if (bf < 25) return { text: "Фитнес", color: "text-green-400" };
      if (bf < 32) return { text: "Средно", color: "text-yellow-400" };
      return { text: "Наднормено", color: "text-red-400" };
    }
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Калкулатори", url: "/tools" }
  ]);

  return (
    <>
      <SEO
        title="Фитнес Калкулатори и Инструменти"
        description="Безплатни фитнес калкулатори от Brothers Gym Казанлък - BMI, калории, пулс зони, телесни мазнини, 1RM, протеин и други."
        keywords="bmi калкулатор, калории калкулатор, фитнес инструменти, пулс зона, 1rm калкулатор, телесни мазнини"
        canonicalUrl="/tools"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen bg-background py-12 sm:py-16 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-4 sm:mb-6">
              <Calculator className="w-16 h-16 sm:w-20 sm:h-20 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Фитнес Калкулатори
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
              Професионални инструменти за проследяване на напредък и планиране на тренировки
            </p>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* BMI Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      BMI Калкулатор
                    </CardTitle>
                    <CardDescription>Индекс на телесна маса</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weight">Тегло (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={bmi.weight}
                      onChange={(e) => setBmi({ ...bmi, weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Ръст (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={bmi.height}
                      onChange={(e) => setBmi({ ...bmi, height: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={calculateBMI} className="w-full">
                  Изчисли BMI
                </Button>
                {bmi.result && (
                  <div className="p-4 bg-muted/30 rounded-md text-center">
                    <p className="text-3xl font-bold mb-2">{bmi.result}</p>
                    <p className={`text-lg font-semibold ${getBMICategory(bmi.result).color}`}>
                      {getBMICategory(bmi.result).text}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Calorie Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Калкулатор на Калории
                    </CardTitle>
                    <CardDescription>С цели за тегло</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cal-age">Възраст</Label>
                    <Input
                      id="cal-age"
                      type="number"
                      placeholder="30"
                      value={calories.age}
                      onChange={(e) => setCalories({ ...calories, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cal-weight">Тегло (кг)</Label>
                    <Input
                      id="cal-weight"
                      type="number"
                      placeholder="70"
                      value={calories.weight}
                      onChange={(e) => setCalories({ ...calories, weight: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cal-height">Ръст (см)</Label>
                  <Input
                    id="cal-height"
                    type="number"
                    placeholder="175"
                    value={calories.height}
                    onChange={(e) => setCalories({ ...calories, height: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Пол</Label>
                  <select
                    id="gender"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={calories.gender}
                    onChange={(e) => setCalories({ ...calories, gender: e.target.value })}
                  >
                    <option value="male">Мъж</option>
                    <option value="female">Жена</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="activity">Активност</Label>
                  <select
                    id="activity"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={calories.activity}
                    onChange={(e) => setCalories({ ...calories, activity: e.target.value })}
                  >
                    <option value="sedentary">Заседнал (без упражнения)</option>
                    <option value="light">Лека (1-3 дни/седмица)</option>
                    <option value="moderate">Умерена (3-5 дни/седмица)</option>
                    <option value="active">Активна (6-7 дни/седмица)</option>
                    <option value="veryActive">Много активна (2x дневно)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="goal">Цел</Label>
                  <select
                    id="goal"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={calories.goal}
                    onChange={(e) => setCalories({ ...calories, goal: e.target.value })}
                  >
                    <option value="lose">Отслабване (-500 cal)</option>
                    <option value="maintain">Поддържане</option>
                    <option value="gain">Покачване (+300 cal)</option>
                  </select>
                </div>
                <Button onClick={calculateCalories} className="w-full">
                  Изчисли Калории
                </Button>
                {calories.result && (
                  <div className="p-4 bg-muted/30 rounded-md space-y-2">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-1">Поддържане</p>
                      <p className="text-2xl font-bold text-green-400">{calories.result.maintenance} cal</p>
                    </div>
                    <div className="text-center border-t border-border pt-2">
                      <p className="text-sm text-muted-foreground mb-1">За вашата цел</p>
                      <p className="text-3xl font-bold text-primary">{calories.result.goal} cal</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Heart Rate Zone Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Зони на Пулс
                    </CardTitle>
                    <CardDescription>Целеви зони за различни тренировки</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="hr-age">Възраст</Label>
                    <Input
                      id="hr-age"
                      type="number"
                      placeholder="30"
                      value={heartRate.age}
                      onChange={(e) => setHeartRate({ ...heartRate, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="resting-hr">Пулс в покой</Label>
                    <Input
                      id="resting-hr"
                      type="number"
                      placeholder="70"
                      value={heartRate.restingHR}
                      onChange={(e) => setHeartRate({ ...heartRate, restingHR: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={calculateHeartRate} className="w-full">
                  Изчисли Зони
                </Button>
                {heartRate.result && (
                  <div className="space-y-3">
                    <div className="p-3 bg-orange-500/10 rounded-md">
                      <p className="text-sm text-orange-400 mb-1 font-semibold">Горене на мазнини (50-60%)</p>
                      <p className="text-lg font-bold">{heartRate.result.fatBurn.min} - {heartRate.result.fatBurn.max} bpm</p>
                    </div>
                    <div className="p-3 bg-red-500/10 rounded-md">
                      <p className="text-sm text-red-400 mb-1 font-semibold">Кардио (70-85%)</p>
                      <p className="text-lg font-bold">{heartRate.result.cardio.min} - {heartRate.result.cardio.max} bpm</p>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-md">
                      <p className="text-sm text-purple-400 mb-1 font-semibold">Пик (85-100%)</p>
                      <p className="text-lg font-bold">{heartRate.result.peak.min} - {heartRate.result.peak.max} bpm</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Body Fat Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Телесни Мазнини
                    </CardTitle>
                    <CardDescription>US Navy метод</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bf-weight">Тегло (кг)</Label>
                    <Input
                      id="bf-weight"
                      type="number"
                      placeholder="70"
                      value={bodyFat.weight}
                      onChange={(e) => setBodyFat({ ...bodyFat, weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bf-height">Ръст (см)</Label>
                    <Input
                      id="bf-height"
                      type="number"
                      placeholder="175"
                      value={bodyFat.height}
                      onChange={(e) => setBodyFat({ ...bodyFat, height: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bf-gender">Пол</Label>
                  <select
                    id="bf-gender"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={bodyFat.gender}
                    onChange={(e) => setBodyFat({ ...bodyFat, gender: e.target.value })}
                  >
                    <option value="male">Мъж</option>
                    <option value="female">Жена</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="neck">Шия (см)</Label>
                    <Input
                      id="neck"
                      type="number"
                      placeholder="38"
                      value={bodyFat.neck}
                      onChange={(e) => setBodyFat({ ...bodyFat, neck: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="waist">Талия (см)</Label>
                    <Input
                      id="waist"
                      type="number"
                      placeholder="85"
                      value={bodyFat.waist}
                      onChange={(e) => setBodyFat({ ...bodyFat, waist: e.target.value })}
                    />
                  </div>
                </div>
                {bodyFat.gender === "female" && (
                  <div>
                    <Label htmlFor="hip">Ханш (см)</Label>
                    <Input
                      id="hip"
                      type="number"
                      placeholder="95"
                      value={bodyFat.hip}
                      onChange={(e) => setBodyFat({ ...bodyFat, hip: e.target.value })}
                    />
                  </div>
                )}
                <Button onClick={calculateBodyFat} className="w-full">
                  Изчисли
                </Button>
                {bodyFat.result && (
                  <div className="p-4 bg-muted/30 rounded-md text-center">
                    <p className="text-3xl font-bold mb-2">{bodyFat.result}%</p>
                    <p className={`text-lg font-semibold ${getBodyFatCategory(bodyFat.result, bodyFat.gender).color}`}>
                      {getBodyFatCategory(bodyFat.result, bodyFat.gender).text}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* One Rep Max Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      1RM Калкулатор
                    </CardTitle>
                    <CardDescription>Едно повторение максимум</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="1rm-weight">Тегло (кг)</Label>
                    <Input
                      id="1rm-weight"
                      type="number"
                      placeholder="100"
                      value={oneRM.weight}
                      onChange={(e) => setOneRM({ ...oneRM, weight: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="1rm-reps">Повторения</Label>
                    <Input
                      id="1rm-reps"
                      type="number"
                      placeholder="5"
                      max="10"
                      value={oneRM.reps}
                      onChange={(e) => setOneRM({ ...oneRM, reps: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={calculateOneRM} className="w-full">
                  Изчисли 1RM
                </Button>
                {oneRM.result && (
                  <div className="space-y-3">
                    <div className="p-4 bg-muted/30 rounded-md text-center">
                      <p className="text-sm text-muted-foreground mb-1">Твоят 1RM</p>
                      <p className="text-3xl font-bold text-yellow-400">{oneRM.result.oneRM} кг</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-sm">
                      {Object.entries(oneRM.result.percentages).map(([percent, weight]) => (
                        <div key={percent} className="p-2 bg-muted/20 rounded text-center">
                          <p className="text-xs text-muted-foreground">{percent}%</p>
                          <p className="font-bold">{weight}кг</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Protein Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Протеин Калкулатор
                    </CardTitle>
                    <CardDescription>Дневна нужда от протеин</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="protein-weight">Тегло (кг)</Label>
                  <Input
                    id="protein-weight"
                    type="number"
                    placeholder="70"
                    value={protein.weight}
                    onChange={(e) => setProtein({ ...protein, weight: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="protein-activity">Активност</Label>
                  <select
                    id="protein-activity"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={protein.activity}
                    onChange={(e) => setProtein({ ...protein, activity: e.target.value })}
                  >
                    <option value="light">Лека</option>
                    <option value="moderate">Умерена</option>
                    <option value="high">Висока</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="protein-goal">Цел</Label>
                  <select
                    id="protein-goal"
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                    value={protein.goal}
                    onChange={(e) => setProtein({ ...protein, goal: e.target.value })}
                  >
                    <option value="lose">Отслабване</option>
                    <option value="maintain">Поддържане</option>
                    <option value="gain">Мускулна маса</option>
                  </select>
                </div>
                <Button onClick={calculateProtein} className="w-full">
                  Изчисли Протеин
                </Button>
                {protein.result && (
                  <div className="p-4 bg-muted/30 rounded-md text-center">
                    <p className="text-sm text-muted-foreground mb-2">Дневна нужда</p>
                    <p className="text-3xl font-bold text-cyan-400">
                      {protein.result.min} - {protein.result.max}г
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Разпределете в 4-5 хранения
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-8 sm:mt-12 p-4 sm:p-6 bg-muted/30 border-border/50">
            <p className="text-xs sm:text-sm text-muted-foreground text-center px-2">
              <strong>Забележка:</strong> Тези калкулатори са за информационни цели. За професионални съвети относно вашето здраве и фитнес програма, моля консултирайте се с нашите треньори или медицински специалист.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}