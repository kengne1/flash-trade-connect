import { ReactNode } from "react";
import { motion } from "framer-motion";
import WhatsAppCTA from "./WhatsAppCTA";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  whatsappMessage: string;
  delay?: number;
}

const ServiceCard = ({ icon, title, description, whatsappMessage, delay = 0 }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="card-elevated group hover:border-gold/50"
    >
      <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 
                      group-hover:bg-gold/20 transition-colors duration-300">
        <div className="text-gold">
          {icon}
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-foreground mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        {description}
      </p>
      <WhatsAppCTA
        message={whatsappMessage}
        label="Demander via WhatsApp"
        variant="primary"
        size="sm"
        fullWidth
      />
    </motion.div>
  );
};

export default ServiceCard;
