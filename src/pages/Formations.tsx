import { motion } from "framer-motion";
import { 
  GraduationCap, 
  CheckCircle2, 
  BookOpen, 
  Users, 
  Award, 
  Clock,
  Target,
  TrendingUp,
  Shield
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import Countdown from "@/components/shared/Countdown";
import teamImage from "@/assets/team-meeting.jpg";

const Formations = () => {
  // Next session date - set to 2 weeks from now for demo
  const nextSessionDate = new Date();
  nextSessionDate.setDate(nextSessionDate.getDate() + 14);

  const modules = [
    {
      number: "01",
      title: "Introduction à l'import-export",
      topics: [
        "Comprendre le commerce international",
        "Le marché Chine-Cameroun",
        "Cadre légal et réglementaire",
        "Les acteurs de la chaîne d'importation"
      ]
    },
    {
      number: "02",
      title: "Trouver des fournisseurs fiables",
      topics: [
        "Plateformes de sourcing (Alibaba, 1688, Made-in-China)",
        "Évaluer la fiabilité d'un fournisseur",
        "Négociation des prix et conditions",
        "Demander des échantillons"
      ]
    },
    {
      number: "03",
      title: "Contrôle qualité & Inspection",
      topics: [
        "Standards de qualité internationaux",
        "Organiser une inspection avant expédition",
        "Gérer les non-conformités",
        "Documenter les produits"
      ]
    },
    {
      number: "04",
      title: "Logistique & Transport",
      topics: [
        "Incoterms et leur importance",
        "Groupage maritime vs aérien",
        "Calcul des coûts de transport",
        "Suivi des expéditions"
      ]
    },
    {
      number: "05",
      title: "Dédouanement au Cameroun",
      topics: [
        "Procédures douanières",
        "Documents requis",
        "Calcul des droits et taxes",
        "Éviter les erreurs courantes"
      ]
    },
    {
      number: "06",
      title: "Rentabilité & Business plan",
      topics: [
        "Calculer sa marge bénéficiaire",
        "Stratégie de prix de vente",
        "Gestion des risques",
        "Développer son activité"
      ]
    }
  ];

  const advantages = [
    { icon: Target, title: "Formation pratique", desc: "Des exemples concrets et des cas réels" },
    { icon: Users, title: "Groupe limité", desc: "Maximum 15 participants par session" },
    { icon: Award, title: "Certificat", desc: "Attestation de formation délivrée" },
    { icon: Shield, title: "Suivi post-formation", desc: "Accompagnement pendant 3 mois" },
  ];

  const testimonials = [
    {
      name: "Marie K.",
      role: "Commerçante, Douala",
      text: "Grâce à cette formation, j'ai lancé mon premier conteneur de vêtements. Je comprends maintenant tout le processus !"
    },
    {
      name: "Paul N.",
      role: "Entrepreneur, Yaoundé",
      text: "Les formateurs sont des professionnels avec une vraie expérience terrain. Je recommande vivement."
    },
    {
      name: "Sylvie M.",
      role: "Boutique électronique, Bafoussam",
      text: "J'importais déjà mais je faisais beaucoup d'erreurs. Cette formation m'a permis de réduire mes coûts de 30%."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={teamImage} 
            alt="Formation" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/90" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="inline-block px-4 py-2 bg-gold/20 text-gold rounded-full text-sm font-semibold mb-6">
                <GraduationCap className="w-4 h-4 inline mr-2" />
                Formation professionnelle
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Apprenez à <span className="text-gradient-gold">importer vous-même</span>
              </h1>
              <p className="text-lg text-cream/80 leading-relaxed mb-8">
                Notre formation complète vous donne toutes les compétences pour lancer 
                votre activité d'importation Chine-Cameroun en toute autonomie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <WhatsAppCTA
                  message="Bonjour Flash Trade, je suis intéressé par la formation import-export. Pouvez-vous me donner les détails et le tarif ?"
                  label="S'inscrire via WhatsApp"
                  variant="gold"
                  size="lg"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 shadow-xl"
            >
              <div className="text-center mb-6">
                <span className="badge-promo">Offre limitée</span>
                <h3 className="font-display text-2xl font-bold text-foreground mt-4">
                  Prochaine session
                </h3>
              </div>
              <Countdown 
                targetDate={nextSessionDate} 
                label="Inscriptions ouvertes encore"
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Durée</span>
                  <span className="font-semibold text-foreground">3 jours intensifs</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Format</span>
                  <span className="font-semibold text-foreground">Présentiel + Support digital</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-border">
                  <span className="text-muted-foreground">Lieu</span>
                  <span className="font-semibold text-foreground">Douala</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-muted-foreground">Tarif</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground line-through block">150 000 FCFA</span>
                    <span className="font-display text-xl font-bold text-gold">99 000 FCFA</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Programme complet"
            title="6 modules pour maîtriser l'import"
            description="Un programme structuré couvrant tous les aspects de l'importation"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div
                key={module.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
                    <span className="font-display font-bold text-gold">{module.number}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {module.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {module.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            badge="Pourquoi cette formation"
            title="Ce qui nous différencie"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, index) => (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-gold flex items-center justify-center mx-auto mb-4">
                  <adv.icon className="w-8 h-8 text-navy" />
                </div>
                <h3 className="font-display font-bold text-cream mb-2">{adv.title}</h3>
                <p className="text-cream/70 text-sm">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Témoignages"
            title="Ce que disent nos anciens participants"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated"
              >
                <div className="flex items-center gap-1 text-gold mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
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
              <GraduationCap className="w-16 h-16 text-navy mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-4">
                Prêt à devenir importateur ?
              </h2>
              <p className="text-navy/80 text-lg mb-8">
                Rejoignez notre prochaine session et lancez votre activité d'importation 
                avec toutes les compétences nécessaires.
              </p>
              <WhatsAppCTA
                message="Bonjour Flash Trade, je souhaite m'inscrire à la prochaine session de formation import-export. Merci de me confirmer les dates et modalités."
                label="Réserver ma place"
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

export default Formations;
