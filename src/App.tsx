import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Importer from "./pages/Importer";
import Groupages from "./pages/Groupages";
import Opportunites from "./pages/Opportunites";
import Formations from "./pages/Formations";
import Promotions from "./pages/Promotions";
import PourquoiNous from "./pages/PourquoiNous";
import Contact from "./pages/Contact";
import MentionsLegales from "./pages/MentionsLegales";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/importer" element={<Importer />} />
          <Route path="/groupages" element={<Groupages />} />
          <Route path="/opportunites" element={<Opportunites />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/pourquoi-nous" element={<PourquoiNous />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
