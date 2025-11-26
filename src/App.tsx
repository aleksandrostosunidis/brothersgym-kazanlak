import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Services from "./pages/Services";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import WallOfFame from "./pages/WallOfFame";
import Reviews from "./pages/Reviews";
import Partners from "./pages/Partners";
import Bar from "./pages/Bar";
import Developer from "./pages/Developer";
import Blog from "./pages/Blog";
import Schedule from "./pages/Schedule";
import FAQ from "./pages/FAQ";
import Guides from "./pages/Guides";
import Videos from "./pages/Videos";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <div className="min-h-screen flex flex-col">
              <Navigation />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/wall-of-fame" element={<WallOfFame />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/developer" element={<Developer />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/guides" element={<Guides />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
