import { useState, useEffect } from 'react';
import { Player } from '../types/player';
import { Team } from '../types/team';
import TeamCard from './TeamCard';
import {
  fetchPlayerRankedData,
  updatePlayerWithRankedData,
  computeTeamRanking,
  TeamWithScore,
} from '../services/api';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

interface TeamLeaderboardProps {
  players: Player[];
  teams: Team[];
}

const TeamLeaderboard = ({ players: initialPlayers, teams }: TeamLeaderboardProps) => {
  const [players, setPlayers] = useState<Player[]>(
    initialPlayers.map((p) => ({ ...p, isLoading: true }))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [teamRanking, setTeamRanking] = useState<TeamWithScore[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const updatedPlayers = await Promise.all(
          players.map(async (player) => {
            try {
              const rankedData = await fetchPlayerRankedData(player.idLol);
              return updatePlayerWithRankedData(player, rankedData);
            } catch {
              return {
                ...player,
                error: 'Impossible de récupérer les données',
                isLoading: false,
              };
            }
          })
        );
        setPlayers(updatedPlayers);
        const ranking = computeTeamRanking(updatedPlayers, teams);
        setTeamRanking(ranking);
      } catch {
        toast.error('Erreur lors du chargement des données.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4 mt-8">
        {teams.slice(0, 5).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-lg" />
        ))}
      </div>
    );
  }

  if (teamRanking.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-lg text-gray-600">Aucune équipe à afficher.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-8">
      {teamRanking.map((team, index) => (
        <TeamCard
          key={team.id}
          team={team}
          rank={index + 1}
          delay={index}
          animate
        />
      ))}
    </div>
  );
};

export default TeamLeaderboard;
