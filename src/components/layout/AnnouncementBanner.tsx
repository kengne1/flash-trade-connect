import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, GraduationCap, Sparkles, Ship, X } from "lucide-react";
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
    text: "🎁 Offre spéciale : -15% sur le groupage maritime jusqu'au 31 janvier !",
    link: "/promotions",
    linkText: "Profiter de l'offre →",
    bgColor: "bg-gold",
  },
  {
    id: 2,
    icon: GraduationCap,
    text: "📚 Formation Import-Export : Session du 25 janvier — Inscriptions ouvertes, places limitées !",
    link: "/formations",
    linkText: "Réserver ma place →",
    bgColor: "bg-navy",
  },
  {
    id: 3,
    icon: Ship,
    text: "🚢 Prochain départ groupage maritime : 20 janvier — Réservez votre espace maintenant",
    link: "/groupages",
    linkText: "Réserver →",
    bgColor: "bg-emerald-600",
  },
  {
    id: 4,
    icon: Sparkles,
    text: "✨ Nouveau client ? Bénéficiez d'un accompagnement personnalisé gratuit pour votre 1ère importation",
    link: "/services",
    linkText: "En savoir plus →",
    bgColor: "bg-navy",
  },
];

const INTERVAL_DURATION = 8000; // 8 seconds

const AnnouncementBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(goToNext, INTERVAL_DURATION);
    return () => clearInterval(interval);
  }, [isPaused, goToNext]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    // Small delay before resuming to allow reading
    setTimeout(() => setIsPaused(false), 1000);
  };

  if (!isVisible) return null;

  const current = announcements[currentIndex];
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className={`${current.bgColor} text-cream relative overflow-hidden transition-colors duration-500`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="container-custom py-2.5">
        <div className="flex items-center justify-center gap-3 text-sm md:text-base pr-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 flex-wrap justify-center"
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-center leading-relaxed">{current.text}</span>
              <Link 
                to={current.link}
                className="underline font-semibold hover:no-underline whitespace-nowrap bg-white/10 px-3 py-1 rounded-full transition-all hover:bg-white/20"
              >
                {current.linkText}
              </Link>
            </motion.div>
          </AnimatePresence>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Progress bar - pauses when hovered */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-white/30 w-full">
        <motion.div
          key={`${currentIndex}-${isPaused}`}
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{ 
            duration: isPaused ? 0 : INTERVAL_DURATION / 1000, 
            ease: "linear" 
          }}
          style={isPaused ? { width: "var(--paused-width)" } : undefined}
        />
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentIndex ? "bg-white w-3" : "bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Aller à l'annonce ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AnnouncementBanner;
