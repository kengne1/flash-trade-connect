import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, GraduationCap, Sparkles, X } from "lucide-react";
import { Link } from "react-router-dom";

interface Announcement {
  id: number;
  icon: React.ElementType;
  text: string;
  link: string;
  linkText: string;
  bgColor: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    icon: Gift,
    text: "🎉 Promotion en cours : Groupage maritime à tarif réduit !",
    link: "/promotions",
    linkText: "Voir l'offre",
    bgColor: "bg-gold",
  },
  {
    id: 2,
    icon: GraduationCap,
    text: "📚 Prochaine formation Import-Export : Places limitées !",
    link: "/formations",
    linkText: "S'inscrire",
    bgColor: "bg-navy",
  },
  {
    id: 3,
    icon: Sparkles,
    text: "✨ Nouveau : Accompagnement personnalisé pour débutants",
    link: "/services",
    linkText: "En savoir plus",
    bgColor: "bg-emerald-600",
  },
];

const AnnouncementBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`${current.bgColor} text-cream relative overflow-hidden transition-colors duration-500`}
    >
      <div className="container-custom py-2">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="font-medium">{current.text}</span>
              <Link 
                to={current.link}
                className="underline font-semibold hover:no-underline whitespace-nowrap"
              >
                {current.linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-full">
        <motion.div
          key={currentIndex}
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default AnnouncementBanner;
