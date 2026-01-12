import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import bannerGroupage from "@/assets/banner-groupage.jpg";
import bannerFormation from "@/assets/banner-formation.jpg";
import bannerPromo from "@/assets/banner-promo.jpg";
import bannerNouveauClient from "@/assets/banner-nouveau-client.jpg";

interface Announcement {
  id: number;
  title: string;
  subtitle: string;
  link: string;
  linkText: string;
  image: string;
}

const announcements: Announcement[] = [
  {
    id: 1,
    title: "-15% sur le groupage maritime",
    subtitle: "Offre valable jusqu'au 31 janvier 2025",
    link: "/promotions",
    linkText: "Profiter de l'offre",
    image: bannerPromo,
  },
  {
    id: 2,
    title: "Formation Import-Export — 25 janvier",
    subtitle: "Inscriptions ouvertes • Places limitées",
    link: "/formations",
    linkText: "Réserver ma place",
    image: bannerFormation,
  },
  {
    id: 3,
    title: "Prochain départ groupage : 20 janvier",
    subtitle: "Réservez votre espace dès maintenant",
    link: "/groupages",
    linkText: "Réserver",
    image: bannerGroupage,
  },
  {
    id: 4,
    title: "Nouveau client ? Accompagnement gratuit",
    subtitle: "Bénéficiez d'un suivi personnalisé pour votre 1ère importation",
    link: "/services",
    linkText: "En savoir plus",
    image: bannerNouveauClient,
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

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
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
    setTimeout(() => setIsPaused(false), 2000);
  };

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  return (
    <div
      className="relative w-full h-[120px] md:h-[140px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${current.image})` }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-navy/70" />
          
          {/* Content */}
          <div className="relative h-full container-custom flex items-center justify-center">
            <div className="text-center text-cream max-w-3xl px-12 md:px-16">
              <motion.h3
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-2xl font-bold mb-1 md:mb-2 drop-shadow-lg"
              >
                {current.title}
              </motion.h3>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base text-cream/90 mb-2 md:mb-3 drop-shadow"
              >
                {current.subtitle}
              </motion.p>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to={current.link}
                  className="inline-block bg-gold hover:bg-gold/90 text-navy font-semibold px-4 py-1.5 md:px-6 md:py-2 rounded-full text-sm md:text-base transition-all hover:scale-105 shadow-lg"
                >
                  {current.linkText}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-cream/20 hover:bg-cream/30 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Annonce précédente"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-cream" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-10 md:right-12 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-cream/20 hover:bg-cream/30 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Annonce suivante"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-cream" />
      </button>

      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-1.5 md:p-2 bg-cream/20 hover:bg-cream/30 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Fermer"
      >
        <X className="w-4 h-4 md:w-5 md:h-5 text-cream" />
      </button>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-cream/20 w-full">
        <motion.div
          key={`${currentIndex}-${isPaused}`}
          className="h-full bg-gold"
          initial={{ width: "0%" }}
          animate={{ width: isPaused ? undefined : "100%" }}
          transition={{
            duration: isPaused ? 0 : INTERVAL_DURATION / 1000,
            ease: "linear",
          }}
        />
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-gold w-6"
                : "bg-cream/50 hover:bg-cream/70"
            }`}
            aria-label={`Aller à l'annonce ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
