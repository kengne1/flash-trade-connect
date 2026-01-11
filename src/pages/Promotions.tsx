import { motion } from "framer-motion";
import { Tag, Clock, Percent, Gift, Zap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import Countdown from "@/components/shared/Countdown";

interface Promotion {
  id: string;
  title: string;
  description: string;
  originalPrice?: string;
  promoPrice?: string;
  discount?: string;
  endDate: Date;
  icon: typeof Tag;
  features: string[];
  whatsappMessage: string;
}

const Promotions = () => {
  // Set promo dates for demo purposes
  const promo1End = new Date();
  promo1End.setDate(promo1End.getDate() + 5);

  const promo2End = new Date();
  promo2End.setDate(promo2End.getDate() + 10);

  const promo3End = new Date();
  promo3End.setDate(promo3End.getDate() + 3);

  const promotions: Promotion[] = [
    {
      id: "1",
      title: "Pack Lancement",
      description: "Première importation accompagnée avec réduction sur les frais de service",
      originalPrice: "50 000 FCFA",
      promoPrice: "25 000 FCFA",
      discount: "-50%",
      endDate: promo1End,
      icon: Zap,
      features: [
        "Recherche de fournisseur incluse",
        "Devis détaillé gratuit",
        "Suivi personnalisé",
        "Support WhatsApp prioritaire"
      ],
      whatsappMessage: "Bonjour Flash Trade, je suis intéressé par le Pack Lancement à 25 000 FCFA. Je souhaite profiter de cette offre."
    },
    {
      id: "2",
      title: "Formation + Groupage",
      description: "Inscrivez-vous à la formation et bénéficiez d'une réduction sur votre premier groupage",
      discount: "-30%",
      endDate: promo2End,
      icon: Gift,
      features: [
        "Formation complète (3 jours)",
        "30% de réduction sur le premier groupage",
        "Accompagnement personnalisé",
        "Certificat de formation",
        "Accès au groupe privé WhatsApp"
      ],
      whatsappMessage: "Bonjour Flash Trade, je suis intéressé par l'offre Formation + Groupage avec la réduction de 30%. Merci de me donner plus de détails."
    },
    {
      id: "3",
      title: "Parrainage",
      description: "Parrainez un ami et recevez tous les deux une réduction sur vos prochains groupages",
      discount: "15 000 FCFA offerts",
      endDate: promo3End,
      icon: Percent,
      features: [
        "15 000 FCFA de crédit pour vous",
        "15 000 FCFA de crédit pour votre filleul",
        "Applicable sur tous les services",
        "Cumulable avec d'autres offres"
      ],
      whatsappMessage: "Bonjour Flash Trade, je souhaite parrainer un ami pour bénéficier de l'offre parrainage. Comment ça fonctionne ?"
    }
  ];

  const PromotionCard = ({ promo }: { promo: Promotion }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card-elevated relative overflow-hidden"
    >
      {/* Badge */}
      <div className="absolute top-4 right-4">
        <span className="badge-promo flex items-center gap-1">
          <Tag className="w-3 h-3" />
          Offre limitée
        </span>
      </div>

      <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-6">
        <promo.icon className="w-7 h-7 text-gold" />
      </div>

      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
        {promo.title}
      </h3>
      
      <p className="text-muted-foreground mb-4">
        {promo.description}
      </p>

      {/* Pricing */}
      <div className="flex items-center gap-3 mb-6">
        {promo.originalPrice && (
          <span className="text-muted-foreground line-through text-sm">
            {promo.originalPrice}
          </span>
        )}
        {promo.promoPrice && (
          <span className="font-display text-2xl font-bold text-gold">
            {promo.promoPrice}
          </span>
        )}
        {promo.discount && !promo.promoPrice && (
          <span className="font-display text-2xl font-bold text-gold">
            {promo.discount}
          </span>
        )}
        {promo.discount && promo.promoPrice && (
          <span className="px-2 py-1 bg-destructive text-destructive-foreground text-xs font-semibold rounded">
            {promo.discount}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {promo.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            {feature}
          </li>
        ))}
      </ul>

      {/* Countdown */}
      <div className="bg-muted/50 rounded-xl p-4 mb-6">
        <Countdown targetDate={promo.endDate} label="Se termine dans" />
      </div>

      <WhatsAppCTA
        message={promo.whatsappMessage}
        label="Profiter de l'offre"
        variant="gold"
        fullWidth
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
            <span className="inline-block px-4 py-2 bg-destructive text-destructive-foreground rounded-full text-sm font-semibold mb-6 animate-pulse">
              🔥 Offres spéciales
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Promotions <span className="text-gradient-gold">exclusives</span>
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Profitez de nos offres limitées pour lancer ou développer votre activité 
              d'importation à moindre coût.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Promotions Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Offres en cours"
            title="Ne manquez pas ces opportunités"
            description="Ces offres sont valables pour une durée limitée. Agissez maintenant !"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo) => (
              <PromotionCard key={promo.id} promo={promo} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / Alert Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Clock className="w-12 h-12 text-gold mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                Soyez informé des prochaines promotions
              </h2>
              <p className="text-muted-foreground mb-8">
                Rejoignez notre liste WhatsApp pour recevoir nos offres en avant-première 
                et ne plus jamais manquer une bonne affaire.
              </p>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je souhaite être informé de vos prochaines promotions et offres spéciales."
                label="Recevoir les alertes promo"
                variant="primary"
                size="lg"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Promotions;
