import { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  title: string;
  type: "opportunité" | "formation" | "service";
  link: string;
  description: string;
}

const searchData: SearchResult[] = [
  // Opportunités
  { title: "Téléphones Android", type: "opportunité", link: "/opportunites", description: "Smartphones Android de différentes gammes" },
  { title: "Accessoires téléphones", type: "opportunité", link: "/opportunites", description: "Coques, écouteurs, chargeurs, câbles" },
  { title: "Vêtements en gros", type: "opportunité", link: "/opportunites", description: "T-shirts, chemises, robes, jeans" },
  { title: "Chaussures", type: "opportunité", link: "/opportunites", description: "Sneakers, sandales, chaussures de ville" },
  { title: "Électroménager", type: "opportunité", link: "/opportunites", description: "Mixeurs, blenders, ventilateurs" },
  { title: "Sacs et maroquinerie", type: "opportunité", link: "/opportunites", description: "Sacs à main, sacs à dos, portefeuilles" },
  { title: "Montres", type: "opportunité", link: "/opportunites", description: "Montres fashion, smartwatches" },
  { title: "Perruques & Extensions", type: "opportunité", link: "/opportunites", description: "Perruques lace front, extensions" },
  { title: "Cosmétiques", type: "opportunité", link: "/opportunites", description: "Maquillage, soins de la peau" },
  { title: "Jouets & Jeux", type: "opportunité", link: "/opportunites", description: "Jouets éducatifs, poupées" },
  { title: "Matériel informatique", type: "opportunité", link: "/opportunites", description: "Souris, claviers, écouteurs" },
  { title: "Luminaires LED", type: "opportunité", link: "/opportunites", description: "Ampoules LED, lampes décoratives" },
  // Formations
  { title: "Formation Import-Export", type: "formation", link: "/formations", description: "Apprenez à importer depuis la Chine" },
  { title: "Module Sourcing", type: "formation", link: "/formations", description: "Trouver des fournisseurs fiables" },
  { title: "Module Logistique", type: "formation", link: "/formations", description: "Transport et dédouanement" },
  // Services
  { title: "Recherche de fournisseurs", type: "service", link: "/services", description: "Nous trouvons les meilleurs fournisseurs" },
  { title: "Groupage maritime", type: "service", link: "/groupages", description: "Expédition économique par mer" },
  { title: "Groupage aérien", type: "service", link: "/groupages", description: "Livraison rapide par avion" },
  { title: "Contrôle qualité", type: "service", link: "/services", description: "Vérification avant expédition" },
  { title: "Accompagnement import", type: "service", link: "/importer", description: "Support de A à Z" },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const filteredResults = query.length > 1
    ? searchData.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleResultClick = (link: string) => {
    navigate(link);
    setQuery("");
    setIsFocused(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "opportunité":
        return "bg-gold/20 text-gold";
      case "formation":
        return "bg-navy/20 text-navy";
      case "service":
        return "bg-emerald-500/20 text-emerald-700";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className={`relative flex items-center bg-card border-2 rounded-xl transition-all duration-300 ${
        isFocused ? "border-gold shadow-lg" : "border-border"
      }`}>
        <Search className="w-5 h-5 text-muted-foreground ml-4" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Rechercher un produit, une opportunité ou une formation…"
          className="w-full py-4 px-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="p-2 mr-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isFocused && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
          >
            {filteredResults.map((result, index) => (
              <button
                key={`${result.title}-${index}`}
                onClick={() => handleResultClick(result.link)}
                className="w-full flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors text-left border-b border-border last:border-b-0"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(result.type)}`}>
                      {result.type}
                    </span>
                  </div>
                  <p className="font-semibold text-foreground">{result.title}</p>
                  <p className="text-sm text-muted-foreground">{result.description}</p>
                </div>
                <Search className="w-4 h-4 text-muted-foreground" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {isFocused && query.length > 1 && filteredResults.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-xl p-6 text-center z-50"
        >
          <p className="text-muted-foreground">Aucun résultat pour "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Essayez avec d'autres mots-clés</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
