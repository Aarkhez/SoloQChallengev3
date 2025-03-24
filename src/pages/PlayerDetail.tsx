
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PLAYERS } from '../data/players';
import { 
  fetchPlayerRankedData, 
  updatePlayerWithRankedData, 
  formatWinRate, 
  getTierClass, 
  translateTier, 
  translateRank, 
  calculateAdjustedLP 
} from '../services/api';
import { Player } from '../types/player';
import { toast } from '@/components/ui/sonner';

const PlayerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Trouver le joueur par son ID
        const foundPlayer = PLAYERS.find(p => p.id === Number(id));
        
        if (!foundPlayer) {
          setError("Joueur non trouvé");
          setIsLoading(false);
          return;
        }
        
        // Récupérer les données de classement du joueur
        const rankedData = await fetchPlayerRankedData(foundPlayer.idLol);
        const updatedPlayer = updatePlayerWithRankedData(foundPlayer, rankedData);
        
        setPlayer(updatedPlayer);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données du joueur:", error);
        toast.error("Impossible de récupérer les données du joueur. Veuillez réessayer plus tard.");
        setError("Une erreur est survenue lors du chargement des données du joueur");
        setIsLoading(false);
      }
    };
    
    fetchPlayerData();
  }, [id]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 rounded-full skeleton mb-6"></div>
              <div className="w-48 h-8 skeleton mb-4"></div>
              <div className="w-32 h-6 skeleton"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="h-48 rounded-lg skeleton"></div>
              <div className="h-48 rounded-lg skeleton"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error || !player) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">
                {error || "Joueur non trouvé"}
              </h1>
              <Link 
                to="/" 
                className="text-primary hover:underline"
              >
                Retour au classement
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const {
    pseudo,
    name,
    tier,
    rank: playerRank,
    lp,
    wins,
    losses,
    opgg,
    twitch,
    lpAdjustment
  } = player;
  
  const winRate = formatWinRate(wins, losses);
  const tierClass = getTierClass(tier);
  const adjustedLP = calculateAdjustedLP(player);
  const totalGames = wins + losses;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mr-1"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Retour au classement
          </Link>
          
          {/* En-tête du profil */}
          <div className="glass-card rounded-lg p-8 mb-8 animate-enter">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="mr-0 md:mr-8 mb-6 md:mb-0 text-center md:text-left">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/10 mb-4 mx-auto md:mx-0">
                  <span className="text-4xl font-bold text-primary">
                    {pseudo.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex-grow">
                <h1 className="text-3xl font-bold tracking-tight text-center md:text-left">
                  {pseudo}
                </h1>
                <p className="text-gray-500 mb-4 text-center md:text-left">
                  {name}
                </p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                  {tier && playerRank ? (
                    <div className={`text-lg font-semibold ${tierClass}`}>
                      {translateTier(tier)} {translateRank(playerRank)}
                    </div>
                  ) : (
                    <div className="text-lg font-semibold text-gray-500">
                      Non classé
                    </div>
                  )}
                  <div className="text-lg">
                    {lp} LP
                  </div>
                  <div className="text-sm flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <span className="text-green-600 font-medium mr-1">{wins}V</span>
                    <span className="text-red-600 font-medium">{losses}D</span>
                    <span className="mx-2 text-gray-400">|</span>
                    <span className="font-medium">{winRate}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {opgg && (
                    <a 
                      href={opgg} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className="mr-1"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      OP.GG
                    </a>
                  )}
                  
                  {twitch && (
                    <a 
                      href={twitch} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="mr-1"
                      >
                        <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.731v6.628h-2.149v-6.628h2.149zm-5.731 0v6.628h-2.149v-6.628h2.149z" />
                      </svg>
                      Twitch
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mt-6 md:mt-0 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {adjustedLP}
                </div>
                <div className="text-sm text-gray-500">
                  LP ajustés
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Coefficient: {lpAdjustment}
                </div>
              </div>
            </div>
          </div>
          
          {/* Statistiques détaillées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-lg p-6 animate-enter animate-enter-delay-1">
              <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Parties jouées</span>
                  <span className="font-medium">{totalGames}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Victoires</span>
                  <span className="font-medium text-green-600">{wins}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Défaites</span>
                  <span className="font-medium text-red-600">{losses}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Winrate</span>
                  <span className="font-medium">{winRate}</span>
                </div>
              </div>
              
              {/* Barre de progression pour le winrate */}
              {totalGames > 0 && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${(wins / totalGames) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="glass-card rounded-lg p-6 animate-enter animate-enter-delay-2">
              <h2 className="text-xl font-semibold mb-4">Progression</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Division</span>
                  <span className={`font-medium ${tierClass}`}>
                    {translateTier(tier)} {translateRank(playerRank)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">LP</span>
                  <span className="font-medium">{lp}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">LP ajustés</span>
                  <span className="font-medium text-primary">{adjustedLP}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Coefficient</span>
                  <span className="font-medium">{lpAdjustment}</span>
                </div>
              </div>
              
              {/* Barre de progression pour les LP */}
              {tier !== "UNRANKED" && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${tierClass}`} 
                      style={{ width: `${Math.min(lp / 100, 1) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0 LP</span>
                    <span>100 LP</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PlayerDetail;
