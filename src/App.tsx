import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
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

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminOpportunities from "./pages/admin/AdminOpportunities";
import AdminPromotions from "./pages/admin/AdminPromotions";
import AdminFormations from "./pages/admin/AdminFormations";
import AdminAnnouncements from "./pages/admin/AdminAnnouncements";
import AdminChatbot from "./pages/admin/AdminChatbot";
import AdminContact from "./pages/admin/AdminContact";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminPages from "./pages/admin/AdminPages";
import ProtectedRoute from "./components/admin/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
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
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><AdminMedia /></ProtectedRoute>} />
            <Route path="/admin/opportunities" element={<ProtectedRoute><AdminOpportunities /></ProtectedRoute>} />
            <Route path="/admin/promotions" element={<ProtectedRoute><AdminPromotions /></ProtectedRoute>} />
            <Route path="/admin/formations" element={<ProtectedRoute><AdminFormations /></ProtectedRoute>} />
            <Route path="/admin/announcements" element={<ProtectedRoute><AdminAnnouncements /></ProtectedRoute>} />
            <Route path="/admin/chatbot" element={<ProtectedRoute><AdminChatbot /></ProtectedRoute>} />
            <Route path="/admin/contact" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute requireAdmin><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><AdminPages /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
