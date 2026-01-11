import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/shared/SectionHeading";
import WhatsAppCTA from "@/components/shared/WhatsAppCTA";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      details: ["Bonamoussadi", "En face du lycée d'Akwa Nord", "Douala, Cameroun"],
    },
    {
      icon: Phone,
      title: "Téléphone",
      details: ["+237 657 302 129", "+237 653 207 472"],
      isPhone: true
    },
    {
      icon: Clock,
      title: "Horaires",
      details: ["Lundi - Vendredi : 8h - 18h", "Samedi : 9h - 15h", "Dimanche : Fermé"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@flashtrade.cm"],
      isEmail: true
    },
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
              Contact
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
              Parlons de votre <span className="text-gradient-gold">projet</span>
            </h1>
            <p className="text-lg text-cream/80 leading-relaxed">
              Notre équipe est à votre disposition pour répondre à toutes vos questions 
              et vous accompagner dans votre projet d'importation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-elevated text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-gold" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail) => (
                    <p key={detail} className="text-muted-foreground text-sm">
                      {info.isPhone ? (
                        <a href={`tel:${detail.replace(/\s/g, '')}`} className="hover:text-gold transition-colors">
                          {detail}
                        </a>
                      ) : info.isEmail ? (
                        <a href={`mailto:${detail}`} className="hover:text-gold transition-colors">
                          {detail}
                        </a>
                      ) : (
                        detail
                      )}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map & CTA Section */}
      <section className="section-padding bg-muted/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden h-[400px] bg-navy/10"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.711447891396!2d9.7456!3d4.0711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMDQnMTYuMCJOIDnCsDQ0JzQ0LjIiRQ!5e0!3m2!1sfr!2scm!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale"
              />
            </motion.div>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Le moyen le plus rapide de nous joindre
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Pour une réponse rapide, contactez-nous directement sur WhatsApp. 
                Notre équipe vous répond généralement en moins de 2 heures pendant les heures d'ouverture.
              </p>

              <div className="space-y-4">
                <WhatsAppCTA
                  message="Bonjour Flash Trade, j'ai une question concernant vos services."
                  label="Envoyer un message WhatsApp"
                  phone="237653207472"
                  variant="whatsapp"
                  size="lg"
                  fullWidth
                />
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span>Généralement en ligne</span>
                  </div>
                  <span>•</span>
                  <span>Réponse sous 2h</span>
                </div>
              </div>

              <div className="mt-8 p-6 bg-card rounded-xl border border-border">
                <h3 className="font-display font-bold text-foreground mb-4">
                  Vous préférez appeler ?
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+237657302129"
                    className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                  >
                    <Phone className="w-5 h-5 text-gold" />
                    <span>+237 657 302 129</span>
                  </a>
                  <a 
                    href="tel:+237653207472"
                    className="flex items-center gap-3 text-foreground hover:text-gold transition-colors"
                  >
                    <Phone className="w-5 h-5 text-gold" />
                    <span>+237 653 207 472</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="section-padding bg-navy">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <MessageCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Questions fréquentes
              </h2>
              <p className="text-cream/80 text-lg mb-8">
                Vous avez des questions sur nos services, tarifs ou processus ? 
                Consultez notre page "Pourquoi nous" ou contactez-nous directement.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <WhatsAppCTA
                  message="Bonjour Flash Trade, j'ai quelques questions avant de commencer mon projet d'importation."
                  label="Poser une question"
                  variant="gold"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
