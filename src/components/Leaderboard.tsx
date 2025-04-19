
import { useState, useEffect } from 'react';
import PlayerCard from './PlayerCard';
import { Player } from '../types/player';
import { 
  fetchPlayerRankedData, 
  updatePlayerWithRankedData, 
  calculateAdjustedLP,
  calculateRawLP
} from '../services/api';
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardProps {
  players: Player[];
}

const Leaderboard = ({ players: initialPlayers }: LeaderboardProps) => {
  const [players, setPlayers] = useState<Player[]>(
    initialPlayers.map(player => ({ ...player, isLoading: true }))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [sortMethod, setSortMethod] = useState<'adjusted' | 'rank'>('rank');

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

        // Tri initial par rang (LP bruts)
        const sortedPlayers = sortPlayersByMethod(updatedPlayers, 'rank');

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

  // Fonction pour trier les joueurs selon la méthode choisie
  const sortPlayersByMethod = (playersList: Player[], method: 'adjusted' | 'rank'): Player[] => {
    if (method === 'adjusted') {
      return [...playersList].sort((a, b) => calculateAdjustedLP(b) - calculateAdjustedLP(a)).filter(player => !player.isDisqualified);
    } else {
      return [...playersList].sort((a, b) => calculateRawLP(b) - calculateRawLP(a));
    }
  };

  // Gestionnaire de changement de méthode de tri
  const handleSortMethodChange = (value: 'adjusted' | 'rank') => {
    setSortMethod(value);
    const sortedPlayers = sortPlayersByMethod(players, value);
    setPlayers(sortedPlayers);
  };

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
      <div className="flex justify-end mb-4">
        <Select 
          value={sortMethod}
          onValueChange={(value) => handleSortMethodChange(value as 'adjusted' | 'rank')}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Méthode de tri" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rank">Par classement</SelectItem>
            <SelectItem value="adjusted">Par LP ajustés</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {players.map((player, index) => (
        <PlayerCard 
          key={player.id} 
          player={player} 
          rank={index + 1}
          delay={index} 
          showRawLP={sortMethod === 'rank'}
        />
      ))}
    </div>
  );
};

export default Leaderboard;
