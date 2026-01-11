import { motion } from "framer-motion";
import { 
  Search, 
  ShieldCheck, 
  Ship, 
  Plane, 
  Truck, 
  Headphones,
  FileCheck,
  Package,
  Calculator
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import ServiceCard from "@/components/shared/ServiceCard";
import warehouseImage from "@/assets/warehouse.jpg";

const Services = () => {
  const services = [
    {
      icon: <Search className="w-7 h-7" />,
      title: "Recherche de fournisseurs",
      description: "Nous identifions et vérifions les fournisseurs chinois fiables correspondant à vos besoins. Accès à notre réseau de partenaires de confiance dans différents secteurs.",
      whatsappMessage: "Bonjour Flash Trade, je recherche un fournisseur pour [votre produit]. Pouvez-vous m'aider ?"
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Vérification des fournisseurs",
      description: "Audit complet des usines, vérification des licences, historique de production et capacité. Nous garantissons la fiabilité de vos partenaires commerciaux.",
      whatsappMessage: "Bonjour Flash Trade, je souhaite faire vérifier un fournisseur chinois. Pouvez-vous m'aider ?"
    },
    {
      icon: <FileCheck className="w-7 h-7" />,
      title: "Contrôle qualité",
      description: "Inspection des produits avant expédition selon vos critères. Photos et rapports détaillés pour valider la conformité de votre commande.",
      whatsappMessage: "Bonjour Flash Trade, je souhaite un contrôle qualité pour ma commande. Pouvez-vous m'aider ?"
    },
    {
      icon: <Ship className="w-7 h-7" />,
      title: "Groupage maritime",
      description: "Solution économique pour vos importations. Consolidation de cargaisons pour optimiser les coûts. Délai moyen : 45 à 60 jours.",
      whatsappMessage: "Bonjour Flash Trade, je suis intéressé par le groupage maritime. Pouvez-vous me donner plus d'informations ?"
    },
    {
      icon: <Plane className="w-7 h-7" />,
      title: "Groupage aérien",
      description: "Livraison rapide pour vos marchandises urgentes ou légères. Idéal pour les échantillons et petites quantités. Délai : 7 à 15 jours.",
      whatsappMessage: "Bonjour Flash Trade, je suis intéressé par le groupage aérien. Pouvez-vous me donner plus d'informations ?"
    },
    {
      icon: <Truck className="w-7 h-7" />,
      title: "Logistique & Dédouanement",
      description: "Prise en charge complète des formalités douanières au Cameroun. Livraison sécurisée jusqu'à votre entrepôt ou point de vente.",
      whatsappMessage: "Bonjour Flash Trade, j'ai besoin d'aide pour le dédouanement de ma marchandise. Pouvez-vous m'aider ?"
    },
    {
      icon: <Calculator className="w-7 h-7" />,
      title: "Estimation des coûts",
      description: "Devis détaillé et transparent de tous les frais : achat, transport, douane, taxes. Aucune surprise à l'arrivée de votre marchandise.",
      whatsappMessage: "Bonjour Flash Trade, je souhaite une estimation des coûts pour importer [votre produit]. Pouvez-vous m'aider ?"
    },
    {
      icon: <Headphones className="w-7 h-7" />,
      title: "Conseils & Orientation",
      description: "Accompagnement personnalisé pour les débutants. Nous vous guidons dans le choix des produits rentables et les bonnes pratiques d'importation.",
      whatsappMessage: "Bonjour Flash Trade, je suis débutant et j'aimerais des conseils pour commencer à importer. Pouvez-vous m'aider ?"
    },
    {
      icon: <Package className="w-7 h-7" />,
      title: "Sourcing sur mesure",
      description: "Recherche de produits spécifiques selon vos critères : budget, quantité, spécifications techniques. Nous trouvons exactement ce que vous cherchez.",
      whatsappMessage: "Bonjour Flash Trade, je recherche un produit spécifique [décrire le produit]. Pouvez-vous m'aider ?"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={warehouseImage} 
            alt="Entrepôt" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/90" />
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6">
              Nos Services
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Un accompagnement <span className="text-gradient-gold">de A à Z</span>
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Flash Trade International vous propose une gamme complète de services 
              pour réussir vos importations depuis la Chine vers le Cameroun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Notre expertise"
            title="Des services adaptés à vos besoins"
            description="Que vous soyez débutant ou importateur confirmé, nous avons la solution qu'il vous faut."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                whatsappMessage={service.whatsappMessage}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Garanties Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading
            badge="Nos garanties"
            title="Pourquoi choisir Flash Trade ?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { title: "Transparence totale", desc: "Tous les coûts sont détaillés avant votre engagement. Pas de frais cachés." },
              { title: "Suivi en temps réel", desc: "Suivez l'avancement de votre commande à chaque étape du processus." },
              { title: "Expertise locale", desc: "Notre équipe au Cameroun maîtrise les procédures douanières locales." },
              { title: "Réseau vérifié", desc: "Nos fournisseurs chinois sont audités et approuvés par notre équipe." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4 p-6 bg-card rounded-xl border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
