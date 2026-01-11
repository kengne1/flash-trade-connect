import { motion } from "framer-motion";
import { 
  Shield, 
  Eye, 
  Users, 
  Heart, 
  Award, 
  Globe,
  CheckCircle2,
  TrendingUp,
  Clock
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";
import teamImage from "@/assets/team-meeting.jpg";

const PourquoiNous = () => {
  const values = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "Chaque fournisseur est vérifié. Chaque transaction est sécurisée. Votre investissement est protégé."
    },
    {
      icon: Eye,
      title: "Transparence",
      description: "Tous les coûts sont détaillés à l'avance. Aucun frais caché. Vous savez exactement où va votre argent."
    },
    {
      icon: Users,
      title: "Accompagnement",
      description: "Un interlocuteur dédié vous suit de A à Z. Vous n'êtes jamais seul dans votre projet d'importation."
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Votre réussite est notre priorité. Nous ne nous contentons pas de livrer, nous vous aidons à prospérer."
    }
  ];

  const expertise = [
    { number: "500+", label: "Importations réalisées" },
    { number: "200+", label: "Clients satisfaits" },
    { number: "5 ans", label: "D'expérience" },
    { number: "50+", label: "Fournisseurs vérifiés" }
  ];

  const whyUs = [
    {
      title: "Expertise locale et internationale",
      description: "Notre équipe combine une connaissance approfondie du marché camerounais et des relations solides avec les fournisseurs chinois."
    },
    {
      title: "Réseau de fournisseurs vérifiés",
      description: "Nous avons personnellement audité nos partenaires en Chine pour vous garantir qualité et fiabilité."
    },
    {
      title: "Support 24/7 via WhatsApp",
      description: "Une question ? Un doute ? Notre équipe est disponible à tout moment pour vous répondre."
    },
    {
      title: "Tarifs compétitifs",
      description: "Grâce à notre volume d'importation, nous négocions les meilleurs tarifs pour vous."
    },
    {
      title: "Processus simplifié",
      description: "Nous gérons toute la complexité administrative et logistique. Vous vous concentrez sur votre business."
    },
    {
      title: "Formation continue",
      description: "Nous partageons nos connaissances pour que vous puissiez, à terme, gérer vos importations en autonomie."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={teamImage} 
            alt="Notre équipe" 
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
              Qui sommes-nous
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Pourquoi choisir <span className="text-gradient-gold">Flash Trade</span> ?
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Depuis notre création, nous avons accompagné des centaines d'entrepreneurs 
              camerounais dans leurs projets d'importation. Notre mission : rendre l'import 
              accessible, sécurisé et rentable pour tous.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gold">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {expertise.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-navy mb-1">
                  {stat.number}
                </p>
                <p className="text-navy/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Nos valeurs"
            title="Ce qui nous guide au quotidien"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <SectionHeading
            badge="Nos atouts"
            title="6 raisons de nous faire confiance"
            light
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-cream/5 border border-cream/10"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-navy" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-cream mb-2">
                      {item.title}
                    </h3>
                    <p className="text-cream/70 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Notre mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                "Démocratiser l'accès à l'importation depuis la Chine pour les entrepreneurs 
                camerounais. Nous croyons que chaque commerçant, qu'il soit débutant ou confirmé, 
                mérite un accompagnement professionnel et des tarifs justes."
              </p>
              <p className="text-lg text-foreground font-semibold">
                — L'équipe Flash Trade International
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-gold/10 to-secondary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Prêt à travailler avec nous ?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Contactez-nous dès maintenant pour discuter de votre projet. 
                Premier échange gratuit et sans engagement.
              </p>
              <WhatsAppCTA
                message="Bonjour Flash Trade, j'aimerais en savoir plus sur vos services et discuter de mon projet d'importation."
                label="Discutons de votre projet"
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

export default PourquoiNous;
