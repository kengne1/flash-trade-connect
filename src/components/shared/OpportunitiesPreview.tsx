import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import WhatsAppCTA from "./WhatsAppCTA";

interface Product {
  id: string;
  name: string;
  image: string;
  moq: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Téléphones Android",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    moq: "50 - 100 unités",
  },
  {
    id: "2",
    name: "Accessoires téléphones",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
    moq: "100 - 500 pièces",
  },
  {
    id: "3",
    name: "Vêtements en gros",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400",
    moq: "100 - 500 pièces",
  },
  {
    id: "4",
    name: "Chaussures",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    moq: "50 - 200 paires",
  },
  {
    id: "5",
    name: "Électroménager",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    moq: "20 - 50 unités",
  },
  {
    id: "6",
    name: "Perruques & Extensions",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    moq: "20 - 100 pièces",
  },
];

const OpportunitiesPreview = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-2 bg-gold/10 text-gold rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Opportunités d'importation
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Produits rentables à importer
            </h2>
          </div>
          <Link 
            to="/opportunites" 
            className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
          >
            Voir toutes les opportunités
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl hover:border-gold/30 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-display text-lg font-bold text-cream">
                    {product.name}
                  </h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">MOQ estimatif</span>
                  <span className="text-sm font-semibold text-foreground">{product.moq}</span>
                </div>
                <Link 
                  to="/opportunites"
                  className="block w-full text-center py-2.5 px-4 bg-navy text-cream rounded-lg font-semibold 
                           hover:bg-gold hover:text-navy transition-colors duration-300"
                >
                  Voir l'opportunité
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesPreview;
