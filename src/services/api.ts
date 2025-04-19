
import { Player, RankedData } from '../types/player';
import { toast } from "sonner";

// Clé API Riot Games - Remarque: cette clé expire après 24h
const API_KEY = import.meta.env.VITE_API_LOLKEY;
const BASE_URL = "https://euw1.api.riotgames.com/lol";

// Convertir une valeur de tier à un nombre pour le tri
export const tierValues: Record<string, number> = {
  "IRON": 0,
  "BRONZE": 1,
  "SILVER": 2,
  "GOLD": 3,
  "PLATINUM": 4,
  "EMERALD": 5,
  "DIAMOND": 6,
  "MASTER": 7,
  "GRANDMASTER": 8,
  "CHALLENGER": 9,
};

// Fonction pour récupérer les données de classement d'un joueur
export const fetchPlayerRankedData = async (playerId: string): Promise<RankedData | null> => {
  try {
    const response = await fetch(`${BASE_URL}/league/v4/entries/by-summoner/${playerId}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Erreur API: ${response.status}`, errorText);
      throw new Error(`Erreur API: ${response.status}`);
    }
    
    const data: RankedData[] = await response.json();
    
    // Filtrer pour ne garder que le mode RANKED_SOLO_5x5
    const soloQData = data.find(entry => entry.queueType === "RANKED_SOLO_5x5");
    
    return soloQData || null;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    toast.error("Impossible de récupérer les données du joueur. Veuillez réessayer plus tard.");
    return null;
  }
};

// Fonction pour mettre à jour les données d'un joueur
export const updatePlayerWithRankedData = (player: Player, rankedData: RankedData | null): Player => {
  if (!rankedData) {
    return {
      ...player,
      tier: "UNRANKED",
      rank: "",
      lp: 0,
      wins: 0,
      losses: 0,
      gamesPlayed: 0,
      isLoading: false
    };
  }

  const gamesPlayed = rankedData.wins + rankedData.losses;

  return {
    ...player,
    tier: rankedData.tier,
    rank: rankedData.rank,
    lp: rankedData.leaguePoints,
    wins: rankedData.wins,
    losses: rankedData.losses,
    gamesPlayed: gamesPlayed,
    isLoading: false
  };
};

// Fonction pour calculer les LP ajustés (avec le coefficient lpAdjustment)
export const calculateAdjustedLP = (player: Player): number => {
  if (player.tier === "UNRANKED") return 0;
  
  const baseTierValue = tierValues[player.tier] || 0;
  const rankValue = getRankValue(player.rank);
  
  if(player.isDisqualified) return 0;
  // Calcul des LP ajustés: (Tier * 400 + RankValue + LP) * lpAdjustment
  const rawLP = calculateRawLP(player);
  return Math.round(rawLP * player.lpAdjustment);
};

// Fonction pour calculer les LP bruts (sans coefficient) pour le tri par classement
export const calculateRawLP = (player: Player): number => {
  if (player.tier === "UNRANKED") return 0;
  
  const baseTierValue = tierValues[player.tier] || 0;
  
  // Correction de la valeur de rang: IV = 0, III = 100, II = 200, I = 300
  let rankValue = 0;
  if (player.tier !== "MASTER" && player.tier !== "GRANDMASTER" && player.tier !== "CHALLENGER") {
    switch (player.rank) {
      case "I": rankValue = 300; break;
      case "II": rankValue = 200; break;
      case "III": rankValue = 100; break;
      case "IV": rankValue = 0; break;
      default: rankValue = 0;
    }
  }
  // Calcul des LP bruts: Tier * 400 + RankValue + LP
  return (baseTierValue * 400) + rankValue + player.lp;
};

// Maintenue pour la compatibilité
const getRankValue = (rank: string): number => {
  switch (rank) {
    case "I": return 3;
    case "II": return 2;
    case "III": return 1;
    case "IV": return 0;
    default: return 0;
  }
};

// Fonction pour formater le pourcentage de victoires
export const formatWinRate = (wins: number, losses: number): string => {
  if (wins + losses === 0) return "0%";
  return Math.round((wins / (wins + losses)) * 100) + "%";
};

// Fonction pour obtenir la classe CSS correspondant au tier
export const getTierClass = (tier: string): string => {
  if (!tier || tier === "UNRANKED") return "";
  return tier.toLowerCase();
};

// Fonction pour traduire le tier en français
export const translateTier = (tier: string): string => {
  const translations: Record<string, string> = {
    "IRON": "Fer",
    "BRONZE": "Bronze",
    "SILVER": "Argent",
    "GOLD": "Or",
    "PLATINUM": "Platine",
    "EMERALD": "Émeraude",
    "DIAMOND": "Diamant",
    "MASTER": "Maître",
    "GRANDMASTER": "Grand Maître",
    "CHALLENGER": "Challenger",
    "UNRANKED": "Non classé"
  };
  
  return translations[tier] || tier;
};

// Fonction pour traduire le rang en français
export const translateRank = (rank: string): string => {
  if (!rank) return "";
  
  const translations: Record<string, string> = {
    "I": "I",
    "II": "II",
    "III": "III",
    "IV": "IV"
  };
  
  return translations[rank] || rank;
};
