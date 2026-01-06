import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="404 - Страницата не е намерена"
        description="Страницата, която търсите, не съществува. Върнете се към началната страница на Brothers Gym Казанлък."
        noindex={true}
      />
      <div className="flex min-h-[80vh] items-center justify-center bg-background">
        <div className="text-center px-4">
          <h1 className="mb-4 text-8xl font-bold text-primary">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            Страницата не е намерена
          </h2>
          <p className="mb-8 text-lg text-muted-foreground max-w-md mx-auto">
            Страницата, която търсите, не съществува или е била преместена.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate(-1)} 
              variant="outline"
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              Начална страница
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
