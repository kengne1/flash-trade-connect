import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-cream">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                <span className="text-navy font-display font-bold text-lg">FT</span>
              </div>
              <div>
                <p className="font-display font-bold text-lg">Flash Trade</p>
                <p className="text-sm opacity-80">International SARL</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Votre partenaire de confiance pour l'importation de produits depuis la Chine vers le Cameroun.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-cream/10 hover:bg-cream/20 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Navigation</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/services" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Nos Services
              </Link>
              <Link to="/importer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Importer un produit
              </Link>
              <Link to="/groupages" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Groupages
              </Link>
              <Link to="/opportunites" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Opportunités
              </Link>
              <Link to="/formations" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Formations
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Nos Services</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-sm opacity-80">Accompagnement à l'import</span>
              <span className="text-sm opacity-80">Recherche de fournisseurs</span>
              <span className="text-sm opacity-80">Groupage maritime</span>
              <span className="text-sm opacity-80">Groupage aérien</span>
              <span className="text-sm opacity-80">Formation import-export</span>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-lg">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <p className="text-sm opacity-80">
                  Bonamoussadi, en face du lycée d'Akwa Nord – Douala, Cameroun
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <div className="text-sm opacity-80">
                  <a href="tel:+237657302129" className="block hover:opacity-100">+237 657 302 129</a>
                  <a href="tel:+237653207472" className="block hover:opacity-100">+237 653 207 472</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <a href="mailto:contact@flashtrade.cm" className="text-sm opacity-80 hover:opacity-100">
                  contact@flashtrade.cm
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm opacity-60">
              © {currentYear} Flash Trade International SARL. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/mentions-legales" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                Mentions légales
              </Link>
              <Link to="/contact" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
