import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Package, 
  Ship, 
  Plane, 
  CheckCircle2, 
  ArrowRight,
  Search,
  FileCheck,
  Truck,
  Headphones
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import SearchBar from "@/components/shared/SearchBar";
import OpportunitiesPreview from "@/components/shared/OpportunitiesPreview";
import heroImage from "@/assets/hero-trade.jpg";
import warehouseImage from "@/assets/warehouse.jpg";
import teamImage from "@/assets/team-meeting.jpg";

const Index = () => {
  const trustPoints = [
    { icon: Shield, title: "Sécurité garantie", description: "Vérification rigoureuse de chaque fournisseur" },
    { icon: TrendingUp, title: "Expertise terrain", description: "Plus de 500 importations réussies" },
    { icon: Users, title: "Accompagnement", description: "Support personnalisé de A à Z" },
    { icon: Package, title: "Transparence", description: "Suivi en temps réel de vos commandes" },
  ];

  const services = [
    { icon: Search, title: "Recherche de fournisseurs", description: "Nous trouvons les meilleurs fournisseurs chinois pour votre activité" },
    { icon: FileCheck, title: "Vérification & qualité", description: "Contrôle qualité avant expédition de vos marchandises" },
    { icon: Ship, title: "Groupage maritime", description: "Expédition économique par voie maritime" },
    { icon: Plane, title: "Groupage aérien", description: "Livraison rapide par fret aérien" },
    { icon: Truck, title: "Logistique complète", description: "Dédouanement et livraison au Cameroun" },
    { icon: Headphones, title: "Formation", description: "Apprenez à importer par vous-même" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Commerce international" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-transparent" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6">
                🇨🇳 Chine → 🇨🇲 Cameroun
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight mb-6"
            >
              Importez depuis la Chine{" "}
              <span className="text-gradient-gold">en toute sécurité</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-cream/80 mb-8 leading-relaxed"
            >
              Flash Trade International SARL vous accompagne dans toutes vos opérations 
              d'importation, de la recherche de fournisseurs à la livraison au Cameroun.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                to="/importer" 
                className="btn-gold text-center flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                Importer un produit
              </Link>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je souhaite importer des produits depuis la Chine."
                label="Contacter sur WhatsApp"
                variant="whatsapp"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-cream/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-background -mt-8 relative z-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SearchBar />
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Pourquoi nous choisir"
            title="Votre partenaire de confiance"
            description="Depuis notre création, nous avons aidé des centaines d'entrepreneurs camerounais à réussir leurs importations."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {point.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading
            badge="Nos services"
            title="Un accompagnement complet"
            description="De la recherche de fournisseurs à la livraison, nous gérons tout pour vous."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated group hover:border-gold/30"
              >
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center mb-4 
                              group-hover:bg-gold transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-cream" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-navy font-semibold hover:text-gold transition-colors"
            >
              Découvrir tous nos services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={warehouseImage} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container-custom relative z-10">
          <SectionHeading
            badge="Comment ça marche"
            title="Un processus simple et efficace"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Contactez-nous", desc: "Décrivez votre projet d'importation" },
              { step: "02", title: "Recherche", desc: "Nous trouvons les meilleurs fournisseurs" },
              { step: "03", title: "Commande", desc: "Validation et suivi de votre commande" },
              { step: "04", title: "Livraison", desc: "Réception au Cameroun" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-navy">{item.step}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-cream mb-2">{item.title}</h3>
                <p className="text-cream/70 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/importer" className="btn-gold inline-flex items-center gap-2">
              Commencer maintenant
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Importations réussies" },
              { value: "200+", label: "Clients satisfaits" },
              { value: "5 ans", label: "D'expérience" },
              { value: "24/7", label: "Support disponible" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl md:text-5xl font-bold text-gold mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities Preview Section */}
      <OpportunitiesPreview />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gold/10 to-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à lancer votre importation ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Contactez-nous dès maintenant pour discuter de votre projet. 
                Nos experts sont à votre disposition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Bonjour Flash Trade, je souhaite discuter de mon projet d'importation."
                  label="Démarrer sur WhatsApp"
                  variant="whatsapp"
                  size="lg"
                />
                <Link 
                  to="/contact" 
                  className="btn-primary text-center"
                >
                  Voir nos coordonnées
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
