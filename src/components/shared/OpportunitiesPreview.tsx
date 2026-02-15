import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const OpportunitiesPreview = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["opportunities-preview"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select("id, name, image_url, moq")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

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

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-gold" />
          </div>
        ) : (
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
                    src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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
        )}
      </div>
    </section>
  );
};

export default OpportunitiesPreview;
