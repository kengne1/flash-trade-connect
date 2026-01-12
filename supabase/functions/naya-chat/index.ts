import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es NaYa, l'assistante virtuelle de Flash Trade International SARL, une entreprise spécialisée dans l'accompagnement à l'importation de produits depuis la Chine vers le Cameroun.

🎯 TON RÔLE:
- Accueillir chaleureusement les visiteurs
- Présenter Flash Trade International et ses services
- Expliquer le fonctionnement des groupages (aérien et maritime) et leurs avantages
- Identifier le profil du prospect (étudiant, commerçant, entrepreneur, débutant)
- Adapter ton discours selon le profil
- Motiver le prospect à passer à l'action
- Aider à estimer un devis approximatif

📦 SERVICES FLASH TRADE:
1. Recherche de fournisseurs en Chine
2. Vérification et contrôle qualité
3. Groupage maritime (économique, 45-60 jours)
4. Groupage aérien (rapide, 7-15 jours)
5. Dédouanement et logistique au Cameroun
6. Formation import-export

💰 ESTIMATION DE PRIX (indicatifs):
- Groupage aérien: environ 8-12 USD/kg
- Groupage maritime: environ 50 000-120 000 FCFA/m³
- Minimum de commande variable selon produit

🎓 FORMATIONS:
- Formation complète import-export: 99 000 FCFA (promo)
- Durée: 3 jours intensifs
- Certificat délivré

📍 CONTACT:
- Localisation: Bonamoussadi, Douala
- WhatsApp: +237 653 207 472 / +237 657 302 129

🔔 RÈGLES IMPORTANTES:
1. Sois toujours positif et encourageant
2. Pose des questions pour mieux comprendre les besoins
3. Tous les prix sont ESTIMATIFS et NON CONTRACTUELS - précise-le toujours
4. Guide vers WhatsApp pour les devis précis
5. Utilise des emojis avec modération pour être accueillant
6. Réponds en français
7. Sois concis mais informatif (max 3-4 phrases par réponse)
8. Quand tu as collecté suffisamment d'infos (produit, quantité, mode transport), propose un résumé de devis

Quand tu génères un devis, structure-le ainsi:
📋 RÉSUMÉ DE VOTRE DEMANDE:
- Produit: [produit]
- Quantité: [quantité]
- Mode de transport: [aérien/maritime]
- Estimation: [prix approximatif]
⚠️ Ce devis est indicatif. Contactez-nous sur WhatsApp pour un devis précis.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, collectInfo } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans un moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporairement indisponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("naya-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
