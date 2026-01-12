import { motion } from "framer-motion";

interface GalleryItem {
  image: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  {
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600",
    caption: "Session de formation pratique avec nos experts",
  },
  {
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600",
    caption: "Travail en groupe sur des cas réels d'importation",
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600",
    caption: "Échange et networking entre participants",
  },
  {
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=600",
    caption: "Remise d'attestations de formation",
  },
  {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600",
    caption: "Atelier pratique sur la négociation avec les fournisseurs",
  },
  {
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600",
    caption: "Présentation des stratégies de sourcing en Chine",
  },
];

const TrainingGallery = () => {
  return (
    <section className="section-padding bg-muted/50">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
            📸 En images
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos sessions de formation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'ambiance de nos formations et la satisfaction de nos participants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-cream text-sm font-medium">{item.caption}</p>
                </div>
              </div>
              {/* Always visible caption on mobile */}
              <div className="md:hidden absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/90 to-transparent">
                <p className="text-cream text-sm font-medium">{item.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingGallery;
