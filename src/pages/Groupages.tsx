import { motion } from "framer-motion";
import { Ship, Plane, Clock, Package, DollarSign, Shield, CheckCircle2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

const Groupages = () => {
  const maritimeDetails = {
    title: "Groupage Maritime",
    icon: Ship,
    description: "Solution économique idéale pour les grandes quantités et les marchandises non urgentes.",
    delay: "45 à 60 jours",
    price: "À partir de 150 000 FCFA/m³",
    advantages: [
      "Tarifs les plus compétitifs",
      "Idéal pour les grandes quantités",
      "Conteneurs partagés = économies",
      "Suivi GPS de votre container"
    ],
    idealFor: "Électroménager, meubles, textile en grande quantité, matériaux de construction"
  };

  const aerienDetails = {
    title: "Groupage Aérien",
    icon: Plane,
    description: "Livraison rapide pour vos marchandises urgentes, échantillons ou produits légers.",
    delay: "7 à 15 jours",
    price: "À partir de 6 000 FCFA/kg",
    advantages: [
      "Livraison ultra-rapide",
      "Parfait pour les échantillons",
      "Suivi en temps réel",
      "Formalités simplifiées"
    ],
    idealFor: "Téléphones, accessoires électroniques, pièces détachées urgentes, échantillons"
  };

  const GroupageCard = ({ data, isGold = false }: { data: typeof maritimeDetails; isGold?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-2xl p-8 ${isGold ? "bg-gold text-navy" : "bg-navy text-cream"}`}
    >
      <div className={`w-16 h-16 rounded-2xl ${isGold ? "bg-navy" : "bg-gold"} flex items-center justify-center mb-6`}>
        <data.icon className={`w-8 h-8 ${isGold ? "text-gold" : "text-navy"}`} />
      </div>
      
      <h3 className="font-display text-2xl font-bold mb-3">{data.title}</h3>
      <p className={`mb-6 ${isGold ? "text-navy/80" : "text-cream/80"}`}>{data.description}</p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium opacity-70">Délai estimatif</p>
            <p className="font-semibold">{data.delay}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <DollarSign className="w-5 h-5" />
          <div>
            <p className="text-sm font-medium opacity-70">Tarif indicatif</p>
            <p className="font-semibold">{data.price}</p>
          </div>
        </div>
      </div>

      <h4 className="font-semibold mb-3">Avantages :</h4>
      <ul className="space-y-2 mb-6">
        {data.advantages.map((adv) => (
          <li key={adv} className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {adv}
          </li>
        ))}
      </ul>

      <div className={`p-4 rounded-xl ${isGold ? "bg-navy/10" : "bg-cream/10"} mb-6`}>
        <p className="text-sm font-medium opacity-70 mb-1">Idéal pour :</p>
        <p className="text-sm">{data.idealFor}</p>
      </div>

      <WhatsAppCTA
        message={`Bonjour Flash Trade, je suis intéressé par le ${data.title.toLowerCase()}. Pouvez-vous me donner plus d'informations ?`}
        label="Demander un devis"
        variant={isGold ? "primary" : "gold"}
        fullWidth
      />
    </motion.div>
  );

  const comparisonData = [
    { feature: "Délai de livraison", maritime: "45-60 jours", aerien: "7-15 jours" },
    { feature: "Coût (estimation)", maritime: "150 000 FCFA/m³", aerien: "6 000 FCFA/kg" },
    { feature: "Poids maximum", maritime: "Illimité", aerien: "Limité" },
    { feature: "Suivi", maritime: "GPS Container", aerien: "Temps réel" },
    { feature: "Idéal pour", maritime: "Grandes quantités", aerien: "Urgences, léger" },
  ];

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
              Groupages Chine - Cameroun
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Expédiez vos marchandises <span className="text-gradient-gold">au meilleur coût</span>
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Choisissez entre le groupage maritime économique ou le fret aérien rapide 
              selon vos besoins et votre budget.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Groupage Options */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Nos solutions"
            title="Maritime ou Aérien ?"
            description="Deux options adaptées à vos besoins d'importation"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <GroupageCard data={maritimeDetails} />
            <GroupageCard data={aerienDetails} isGold />
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <SectionHeading
            badge="Comparatif"
            title="Quelle option choisir ?"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl overflow-hidden border border-border">
              <div className="grid grid-cols-3 gap-4 p-4 bg-navy text-cream font-semibold">
                <div>Caractéristique</div>
                <div className="text-center">
                  <Ship className="w-5 h-5 mx-auto mb-1" />
                  Maritime
                </div>
                <div className="text-center">
                  <Plane className="w-5 h-5 mx-auto mb-1" />
                  Aérien
                </div>
              </div>
              {comparisonData.map((row, index) => (
                <div 
                  key={row.feature}
                  className={`grid grid-cols-3 gap-4 p-4 ${index % 2 === 0 ? "bg-card" : "bg-muted/30"}`}
                >
                  <div className="font-medium text-foreground">{row.feature}</div>
                  <div className="text-center text-muted-foreground">{row.maritime}</div>
                  <div className="text-center text-muted-foreground">{row.aerien}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              * Les tarifs sont indicatifs et peuvent varier selon le volume, le poids et la nature des marchandises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Fonctionnement"
            title="Comment fonctionne le groupage ?"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Consolidation", desc: "Vos marchandises sont regroupées avec celles d'autres clients" },
              { step: "2", title: "Expédition", desc: "Le container part de Chine vers le port de Douala" },
              { step: "3", title: "Dédouanement", desc: "Nous gérons toutes les formalités à l'arrivée" },
              { step: "4", title: "Livraison", desc: "Vous récupérez votre marchandise" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                  <span className="font-display text-xl font-bold text-gold">{item.step}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gold">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
                Besoin d'un devis personnalisé ?
              </h2>
              <p className="text-navy/80 text-lg mb-8">
                Contactez-nous avec les détails de votre marchandise pour recevoir une estimation précise.
              </p>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je souhaite un devis pour un groupage. Voici les détails : [type de produit, poids/volume estimé]"
                label="Demander un devis groupage"
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

export default Groupages;
