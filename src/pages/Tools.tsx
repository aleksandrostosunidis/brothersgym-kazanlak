import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Activity, Heart, TrendingUp } from "lucide-react";
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
    result: number | null;
  }>({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "sedentary",
    result: null
  });

  const [heartRate, setHeartRate] = useState<{ age: string; result: { min: number; max: number } | null }>({
    age: "",
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

      const result = Math.round(bmr * activityMultipliers[calories.activity]);
      setCalories({ ...calories, result });
    }
  };

  const calculateHeartRate = () => {
    const age = parseFloat(heartRate.age);
    if (age > 0) {
      const maxHR = 220 - age;
      const min = Math.round(maxHR * 0.5);
      const max = Math.round(maxHR * 0.85);
      setHeartRate({ ...heartRate, result: { min, max } });
    }
  };

  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { text: "Поднормено тегло", color: "text-blue-400" };
    if (bmiValue < 25) return { text: "Нормално тегло", color: "text-green-400" };
    if (bmiValue < 30) return { text: "Наднормено тегло", color: "text-yellow-400" };
    return { text: "Затлъстяване", color: "text-red-400" };
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Начало", url: "/" },
    { name: "Калкулатори", url: "/tools" }
  ]);

  return (
    <>
      <SEO
        title="Фитнес Калкулатори и Инструменти"
        description="Безплатни фитнес калкулатори от Brothers Gym Казанлък - BMI калкулатор, калкулатор на калории, зона на пулс и други полезни инструменти."
        keywords="bmi калкулатор, калории калкулатор, фитнес инструменти, пулс зона, brothers gym калкулатор"
        canonicalUrl="/tools"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Calculator className="w-20 h-20 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
              Фитнес Калкулатори
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Безплатни инструменти за проследяване на вашия напредък и планиране на тренировките
            </p>
          </div>

          {/* Calculators Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* BMI Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50">
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

            {/* Calorie Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Калкулатор на Калории
                    </CardTitle>
                    <CardDescription>Дневна нужда от калории</CardDescription>
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
                <Button onClick={calculateCalories} className="w-full">
                  Изчисли Калории
                </Button>
                {calories.result && (
                  <div className="p-4 bg-muted/30 rounded-md text-center">
                    <p className="text-3xl font-bold text-green-400 mb-2">{calories.result}</p>
                    <p className="text-sm text-muted-foreground">калории на ден</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Heart Rate Zone Calculator */}
            <Card className="bg-card/80 backdrop-blur border-border/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)', letterSpacing: '0.03em' }}>
                      Зона на Пулс
                    </CardTitle>
                    <CardDescription>Целева зона за тренировки</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <Button onClick={calculateHeartRate} className="w-full">
                  Изчисли Пулс
                </Button>
                {heartRate.result && (
                  <div className="p-4 bg-muted/30 rounded-md">
                    <p className="text-center mb-3 text-muted-foreground">Целева зона (50-85%)</p>
                    <div className="flex justify-around">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-400">{heartRate.result.min}</p>
                        <p className="text-xs text-muted-foreground">Минимум</p>
                      </div>
                      <div className="text-2xl text-muted-foreground">-</div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-red-400">{heartRate.result.max}</p>
                        <p className="text-xs text-muted-foreground">Максимум</p>
                      </div>
                    </div>
                    <p className="text-xs text-center mt-3 text-muted-foreground">удара в минута</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Disclaimer */}
          <Card className="mt-12 p-6 bg-muted/30 border-border/50">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Забележка:</strong> Тези калкулатори са за информационни цели. За професионални съвети относно вашето здраве и фитнес програма, моля консултирайте се с нашите треньори или медицински специалист.
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}
