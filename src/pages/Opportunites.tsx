import { motion } from "framer-motion";
import { Package, Info, TrendingUp } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

interface Product {
  id: string;
  name: string;
  image: string;
  moq: string;
  priceRange: string;
  groupageEstimate: string;
  category: string;
  description: string;
}

const Opportunites = () => {
  const products: Product[] = [
    {
      id: "1",
      name: "Téléphones Android",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      moq: "50 - 100 unités",
      priceRange: "25 000 - 80 000 FCFA/unité",
      groupageEstimate: "2 500 FCFA/unité (aérien)",
      category: "Électronique",
      description: "Smartphones Android de différentes gammes, marques populaires en Afrique."
    },
    {
      id: "2",
      name: "Accessoires téléphones",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400",
      moq: "100 - 500 pièces",
      priceRange: "500 - 5 000 FCFA/pièce",
      groupageEstimate: "500 FCFA/pièce (aérien)",
      category: "Électronique",
      description: "Coques, écouteurs, chargeurs, câbles, protections d'écran."
    },
    {
      id: "3",
      name: "Vêtements en gros",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400",
      moq: "100 - 500 pièces",
      priceRange: "1 500 - 8 000 FCFA/pièce",
      groupageEstimate: "50 000 FCFA/m³ (maritime)",
      category: "Textile",
      description: "T-shirts, chemises, robes, jeans - mode femme, homme et enfant."
    },
    {
      id: "4",
      name: "Chaussures",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      moq: "50 - 200 paires",
      priceRange: "3 000 - 15 000 FCFA/paire",
      groupageEstimate: "75 000 FCFA/m³ (maritime)",
      category: "Mode",
      description: "Sneakers, sandales, chaussures de ville - différentes tailles et modèles."
    },
    {
      id: "5",
      name: "Électroménager",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      moq: "20 - 50 unités",
      priceRange: "15 000 - 150 000 FCFA/unité",
      groupageEstimate: "120 000 FCFA/m³ (maritime)",
      category: "Maison",
      description: "Mixeurs, blenders, cuiseurs de riz, ventilateurs, climatiseurs."
    },
    {
      id: "6",
      name: "Sacs et maroquinerie",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
      moq: "50 - 200 pièces",
      priceRange: "2 000 - 20 000 FCFA/pièce",
      groupageEstimate: "60 000 FCFA/m³ (maritime)",
      category: "Mode",
      description: "Sacs à main, sacs à dos, portefeuilles, valises de voyage."
    },
    {
      id: "7",
      name: "Montres",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400",
      moq: "50 - 200 pièces",
      priceRange: "2 000 - 25 000 FCFA/pièce",
      groupageEstimate: "1 000 FCFA/pièce (aérien)",
      category: "Accessoires",
      description: "Montres fashion, smartwatches, montres sportives."
    },
    {
      id: "8",
      name: "Perruques & Extensions",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      moq: "20 - 100 pièces",
      priceRange: "10 000 - 100 000 FCFA/pièce",
      groupageEstimate: "3 000 FCFA/pièce (aérien)",
      category: "Beauté",
      description: "Perruques lace front, extensions naturelles et synthétiques."
    },
    {
      id: "9",
      name: "Cosmétiques",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
      moq: "100 - 500 pièces",
      priceRange: "500 - 8 000 FCFA/pièce",
      groupageEstimate: "80 000 FCFA/m³ (maritime)",
      category: "Beauté",
      description: "Maquillage, soins de la peau, produits capillaires."
    },
    {
      id: "10",
      name: "Jouets & Jeux",
      image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400",
      moq: "100 - 500 pièces",
      priceRange: "1 000 - 15 000 FCFA/pièce",
      groupageEstimate: "65 000 FCFA/m³ (maritime)",
      category: "Enfants",
      description: "Jouets éducatifs, poupées, jeux de société, jouets électroniques."
    },
    {
      id: "11",
      name: "Matériel informatique",
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
      moq: "20 - 100 unités",
      priceRange: "5 000 - 200 000 FCFA/unité",
      groupageEstimate: "4 000 FCFA/kg (aérien)",
      category: "Électronique",
      description: "Souris, claviers, écouteurs, webcams, disques durs."
    },
    {
      id: "12",
      name: "Luminaires LED",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
      moq: "50 - 200 pièces",
      priceRange: "2 000 - 30 000 FCFA/pièce",
      groupageEstimate: "70 000 FCFA/m³ (maritime)",
      category: "Maison",
      description: "Ampoules LED, rubans LED, lampes décoratives, projecteurs."
    },
  ];

  const categories = [...new Set(products.map(p => p.category))];

  const ProductCard = ({ product }: { product: Product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-elevated overflow-hidden group"
    >
      <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
          <span className="font-medium text-foreground">{product.priceRange}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-border">
          <span className="text-muted-foreground">Groupage estimé</span>
          <span className="font-medium text-gold">{product.groupageEstimate}</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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
