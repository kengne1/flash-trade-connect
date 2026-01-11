import { motion } from "framer-motion";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

const SectionHeading = ({ 
  badge, 
  title, 
  description, 
  centered = true,
  light = false 
}: SectionHeadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-12`}
    >
      {badge && (
        <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
          light 
            ? "bg-cream/20 text-cream" 
            : "bg-gold/10 text-gold"
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        light ? "text-cream" : "text-foreground"
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg ${
          light ? "text-cream/80" : "text-muted-foreground"
        }`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
