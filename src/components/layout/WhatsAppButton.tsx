import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface WhatsAppButtonProps {
  message?: string;
  phone?: string;
}

const WhatsAppButton = ({ 
  message = "Bonjour Flash Trade, je souhaite avoir plus d'informations.",
  phone = "237653207472"
}: WhatsAppButtonProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-whatsapp 
                 flex items-center justify-center shadow-xl animate-pulse-glow
                 hover:scale-110 transition-transform duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      aria-label="Contacter sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-current" />
    </motion.a>
  );
};

export default WhatsAppButton;
