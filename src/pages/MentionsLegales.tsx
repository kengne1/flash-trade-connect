import { motion } from "framer-motion";
import { FileText, AlertCircle, Building, Scale } from "lucide-react";
import Layout from "@/components/layout/Layout";

const MentionsLegales = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-navy py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <FileText className="w-12 h-12 text-gold mx-auto mb-6" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
              Mentions légales
            </h1>
            <p className="text-cream/80">
              Informations légales concernant Flash Trade International SARL
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Éditeur du site */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
                  <Building className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Éditeur du site
                </h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Raison sociale :</strong> Flash Trade International SARL</p>
                <p><strong className="text-foreground">Forme juridique :</strong> Société à Responsabilité Limitée</p>
                <p><strong className="text-foreground">Siège social :</strong> Bonamoussadi, en face du lycée d'Akwa Nord – Douala, Cameroun</p>
                <p><strong className="text-foreground">Téléphone :</strong> +237 657 302 129 / +237 653 207 472</p>
                <p><strong className="text-foreground">Email :</strong> contact@flashtrade.cm</p>
                <p><strong className="text-foreground">Activité :</strong> Accompagnement à l'importation de produits depuis la Chine vers le Cameroun</p>
              </div>
            </motion.div>

            {/* Conditions d'utilisation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-navy flex items-center justify-center">
                  <Scale className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Conditions d'utilisation
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  L'utilisation de ce site implique l'acceptation pleine et entière des conditions générales 
                  d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées 
                  ou complétées à tout moment.
                </p>
                <p>
                  Ce site est proposé en langages HTML5 et JavaScript. Pour un meilleur confort d'utilisation 
                  et un graphisme plus agréable, nous vous recommandons de recourir à des navigateurs modernes 
                  comme Chrome, Firefox, Safari ou Edge.
                </p>
              </div>
            </motion.div>

            {/* Prix indicatifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated border-gold/30"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-navy" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Avertissement - Prix indicatifs
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p className="font-medium text-foreground">
                  Tous les prix mentionnés sur ce site sont donnés à titre indicatif uniquement.
                </p>
                <p>
                  Les tarifs affichés (prix des produits, coûts de groupage, frais de service, etc.) 
                  peuvent varier en fonction de nombreux facteurs :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Les fluctuations du taux de change</li>
                  <li>Les conditions du fournisseur au moment de la commande</li>
                  <li>Le volume et le poids réels des marchandises</li>
                  <li>Les conditions de transport et de logistique</li>
                  <li>Les droits de douane et taxes en vigueur</li>
                </ul>
                <p>
                  Pour obtenir un devis précis et personnalisé, veuillez nous contacter directement. 
                  Seul un devis écrit et signé par nos services engage Flash Trade International SARL.
                </p>
              </div>
            </motion.div>

            {/* Services informatifs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Utilisation des services
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Les informations présentées sur ce site le sont à titre informatif et ne constituent 
                  pas une offre contractuelle. Les images des produits sont fournies à titre illustratif 
                  et ne sont pas contractuelles.
                </p>
                <p>
                  Flash Trade International SARL se réserve le droit de modifier à tout moment 
                  les informations présentées sur ce site, notamment les descriptions de services, 
                  les tarifs indicatifs et les conditions générales.
                </p>
                <p>
                  L'engagement contractuel de Flash Trade International SARL ne débute qu'à partir 
                  de la signature d'un devis ou d'un contrat de service spécifique.
                </p>
              </div>
            </motion.div>

            {/* Propriété intellectuelle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Propriété intellectuelle
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  L'ensemble de ce site relève de la législation camerounaise et internationale 
                  sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction 
                  sont réservés, y compris pour les documents téléchargeables et les représentations 
                  iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit 
                  est formellement interdite sauf autorisation expresse de Flash Trade International SARL.
                </p>
              </div>
            </motion.div>

            {/* Données personnelles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Protection des données personnelles
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Les informations recueillies via WhatsApp ou tout autre moyen de contact 
                  sont utilisées uniquement dans le cadre de notre relation commerciale.
                </p>
                <p>
                  Conformément à la réglementation en vigueur, vous disposez d'un droit d'accès, 
                  de rectification et de suppression des données vous concernant. Pour exercer 
                  ce droit, vous pouvez nous contacter par email ou WhatsApp.
                </p>
              </div>
            </motion.div>

            {/* Limitation de responsabilité */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card-elevated"
            >
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Limitation de responsabilité
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Flash Trade International SARL s'efforce d'assurer l'exactitude et la mise à jour 
                  des informations diffusées sur ce site. Toutefois, elle ne peut garantir l'exactitude, 
                  la précision ou l'exhaustivité des informations mises à disposition sur ce site.
                </p>
                <p>
                  En conséquence, Flash Trade International SARL décline toute responsabilité :
                </p>
                <ul className="list-disc list-inside space-y-2 pl-4">
                  <li>Pour toute imprécision, inexactitude ou omission portant sur des informations 
                    disponibles sur ce site</li>
                  <li>Pour tous dommages résultant d'une intrusion frauduleuse d'un tiers</li>
                  <li>Pour tous dommages, directs ou indirects, quelles qu'en soient les causes, 
                    origines, nature ou conséquences</li>
                </ul>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MentionsLegales;
