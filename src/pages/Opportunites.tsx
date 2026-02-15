import { motion } from "framer-motion";
import { Package, Info, TrendingUp, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import { supabase } from "@/integrations/supabase/client";

const Opportunites = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const categories = [...new Set(products.map((p) => p.category))];

  const ProductCard = ({ product }: { product: (typeof products)[0] }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-elevated overflow-hidden group"
    >
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img
          src={product.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-navy text-cream text-xs font-semibold rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      <h3 className="font-display text-lg font-bold text-foreground mb-2">
        {product.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {product.description}
      </p>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">MOQ estimatif</span>
          <span className="font-medium text-foreground">{product.moq}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Prix indicatif</span>
          <span className="font-medium text-foreground">{product.price_range}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Groupage estimé</span>
          <span className="font-medium text-gold">{product.groupage_estimate}</span>
        </div>
      </div>

      <WhatsAppCTA
        message={`Bonjour Flash Trade, je suis intéressé par l'importation de "${product.name}". Pouvez-vous me donner plus de détails sur les prix et conditions ?`}
        label="Importer ce produit"
        variant="gold"
        fullWidth
        size="sm"
      />
    </motion.div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy py-20 md:py-32">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6">
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Opportunités d'importation
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Produits <span className="text-gradient-gold">rentables</span> à importer
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Découvrez notre sélection de produits populaires au Cameroun.
              Ces idées peuvent vous inspirer pour votre prochaine importation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gold/10 py-4">
        <div className="container-custom">
          <div className="flex items-center justify-center gap-3 text-sm text-navy">
            <Info className="w-5 h-5 shrink-0" />
            <p>
              <strong>Important :</strong> Les prix et MOQ sont indicatifs et peuvent varier selon les fournisseurs et la période.
              Contactez-nous pour un devis personnalisé.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Catalogue"
            title="Explorez nos idées d'importation"
            description="Ces produits se vendent bien au Cameroun et peuvent représenter de bonnes opportunités commerciales."
          />

          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Request CTA */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Package className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Vous cherchez un autre produit ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Notre équipe peut rechercher n'importe quel produit en Chine.
                Décrivez-nous ce que vous cherchez et nous vous trouverons les meilleurs fournisseurs.
              </p>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je recherche un produit spécifique à importer : [décrivez votre produit]"
                label="Demander un produit personnalisé"
                variant="gold"
                size="lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Opportunites;
