import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import { Player } from '../types/player';
import { fetchPlayerRankedData, updatePlayerWithRankedData, calculateAdjustedLP } from '../services/api';
import { toast } from "sonner";

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
        const updatedPlayers = await Promise.all(
          players.map(async (player) => {
            try {
              const rankedData = await fetchPlayerRankedData(player.idLol);
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
          <div 
            key={index} 
            className="h-24 rounded-lg skeleton"
          />
        ))}
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
