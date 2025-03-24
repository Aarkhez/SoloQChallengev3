
import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import { Player } from '../types/player';
import { fetchPlayerRankedData, updatePlayerWithRankedData, calculateAdjustedLP } from '../services/api';
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard = ({ players: initialPlayers }: LeaderboardProps) => {
  const [players, setPlayers] = useState<Player[]>(
    initialPlayers.map(player => ({ ...player, isLoading: true }))
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlayersData = async () => {
      try {
        console.log("Début du chargement des données joueurs...");
        
        const updatedPlayers = await Promise.all(
          players.map(async (player) => {
            try {
              console.log(`Récupération des données pour ${player.pseudo}...`);
              const rankedData = await fetchPlayerRankedData(player.idLol);
              console.log(`Données récupérées pour ${player.pseudo}:`, rankedData);
              return updatePlayerWithRankedData(player, rankedData);
            } catch (error) {
              console.error(`Erreur lors de la récupération des données pour ${player.pseudo}:`, error);
              return { 
                ...player, 
                error: "Impossible de récupérer les données",
                isLoading: false 
              };
            }
          })
        );

        // Trier les joueurs par LP ajustés
        const sortedPlayers = [...updatedPlayers].sort(
          (a, b) => calculateAdjustedLP(b) - calculateAdjustedLP(a)
        );

        console.log("Joueurs triés:", sortedPlayers);
        setPlayers(sortedPlayers);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        toast.error("Une erreur est survenue lors du chargement des données. Veuillez réessayer plus tard.");
        setIsLoading(false);
      }
    };

    fetchAllPlayersData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 mt-8">
        {Array.from({ length: initialPlayers.length }).map((_, index) => (
          <Skeleton 
            key={index} 
            className="h-24 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-lg text-gray-600">Aucun joueur n'a été trouvé.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {players.map((player, index) => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          rank={index + 1}
          delay={index} 
        />
      ))}
    </div>
  );
};

export default Leaderboard;
