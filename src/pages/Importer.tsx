import { motion } from "framer-motion";
import { 
  MessageCircle, 
  Search, 
  FileCheck, 
  CreditCard, 
  Ship, 
  Package,
  CheckCircle2,
  ArrowRight,
  Shield,
  Clock,
  Users
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import factoryImage from "@/assets/factory-china.jpg";

const Importer = () => {
  const steps = [
    {
      icon: MessageCircle,
      step: "01",
      title: "Contactez-nous",
      description: "Décrivez le produit que vous souhaitez importer : type, quantité souhaitée, budget estimé. Notre équipe vous répond sous 24h.",
      color: "bg-gold"
    },
    {
      icon: Search,
      step: "02",
      title: "Recherche fournisseurs",
      description: "Nous identifions les meilleurs fournisseurs chinois pour votre produit. Comparaison des prix, de la qualité et des conditions.",
      color: "bg-navy"
    },
    {
      icon: FileCheck,
      step: "03",
      title: "Validation & devis",
      description: "Vous recevez un devis détaillé incluant : prix produit, frais de transport, douane, taxes et notre commission.",
      color: "bg-gold"
    },
    {
      icon: CreditCard,
      step: "04",
      title: "Paiement sécurisé",
      description: "Après validation, vous effectuez le paiement. Nous gérons la commande auprès du fournisseur en votre nom.",
      color: "bg-navy"
    },
    {
      icon: Ship,
      step: "05",
      title: "Expédition",
      description: "Votre marchandise est consolidée avec d'autres cargaisons et expédiée par voie maritime ou aérienne selon votre choix.",
      color: "bg-gold"
    },
    {
      icon: Package,
      step: "06",
      title: "Réception",
      description: "Nous gérons le dédouanement et vous livrons votre marchandise à Douala. Vous pouvez commencer à vendre !",
      color: "bg-navy"
    }
  ];

  const advantages = [
    { icon: Shield, title: "Zéro risque", desc: "Vérification des fournisseurs avant toute commande" },
    { icon: Clock, title: "Gain de temps", desc: "Nous gérons tout, vous vous concentrez sur votre business" },
    { icon: Users, title: "Expertise", desc: "Profitez de notre expérience en import-export" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={factoryImage} 
            alt="Usine en Chine" 
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
              Importer un produit
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Lancez votre importation <span className="text-gradient-gold">en toute confiance</span>
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed mb-8">
              Nous vous accompagnons étape par étape pour importer vos produits depuis la Chine. 
              Un processus simple, transparent et sécurisé.
            </p>
            <WhatsAppCTA
              message="Bonjour Flash Trade, je souhaite importer un produit depuis la Chine. Voici ce que je recherche : [décrivez votre produit]"
              label="Démarrer mon importation"
              variant="gold"
              size="lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Le processus"
            title="Comment importer avec Flash Trade ?"
            description="Un processus en 6 étapes simples pour recevoir votre marchandise au Cameroun"
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

            <div className="space-y-12 lg:space-y-0">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`lg:flex lg:items-center lg:gap-8 ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`lg:w-5/12 ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                    <div className={`card-elevated ${index % 2 === 0 ? "lg:ml-auto" : "lg:mr-auto"} max-w-md`}>
                      <div className={`w-12 h-12 rounded-xl ${step.color} flex items-center justify-center mb-4 ${
                        index % 2 === 0 ? "lg:ml-auto" : ""
                      }`}>
                        <step.icon className="w-6 h-6 text-cream" />
                      </div>
                      <span className="text-sm font-semibold text-gold">Étape {step.step}</span>
                      <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden lg:flex lg:w-2/12 justify-center">
                    <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center z-10`}>
                      <span className="font-display font-bold text-cream">{step.step}</span>
                    </div>
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block lg:w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            badge="Vos avantages"
            title="Pourquoi passer par Flash Trade ?"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-cream/5 border border-cream/10"
              >
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-6">
                  <adv.icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="font-display text-xl font-bold text-cream mb-3">{adv.title}</h3>
                <p className="text-cream/70">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ce que nos clients apprécient
              </h2>
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                {[
                  "✓ Devis gratuit et sans engagement",
                  "✓ Suivi en temps réel",
                  "✓ Support WhatsApp 24/7",
                  "✓ Pas de minimum de commande",
                  "✓ Tarifs transparents",
                  "✓ Fournisseurs vérifiés"
                ].map((item) => (
                  <span key={item} className="px-4 py-2 bg-gold/10 text-navy rounded-full text-sm font-medium">
                    {item}
                  </span>
                ))}
              </div>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je souhaite importer un produit depuis la Chine. Voici ce que je recherche : [décrivez votre produit]"
                label="Demander un devis gratuit"
                variant="whatsapp"
                size="lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Importer;
