import { MessageCircle } from "lucide-react";

interface WhatsAppCTAProps {
  message: string;
  label?: string;
  phone?: string;
  variant?: "primary" | "gold" | "whatsapp";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const WhatsAppCTA = ({ 
  message, 
  label = "Contacter sur WhatsApp",
  phone = "237653207472",
  variant = "whatsapp",
  fullWidth = false,
  size = "md"
}: WhatsAppCTAProps) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const variantClasses = {
    primary: "bg-navy text-cream hover:bg-navy-light",
    gold: "gradient-gold text-navy hover:shadow-gold",
    whatsapp: "bg-whatsapp text-white hover:bg-opacity-90"
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold 
                  transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] 
                  ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>{label}</span>
    </a>
  );
};

export default WhatsAppCTA;
