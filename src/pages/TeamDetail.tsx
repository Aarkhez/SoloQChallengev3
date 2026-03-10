import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PlayerCard from '../components/PlayerCard';
import { PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';
import {
  fetchPlayerRankedData,
  updatePlayerWithRankedData,
  calculateAdjustedLP,
} from '../services/api';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Player } from '../types/player';

const TeamDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const teamId = id ? parseInt(id, 10) : NaN;
  const team = TEAMS.find((t) => t.id === teamId);
  const teamPlayers = PLAYERS.filter((p) => p.teamId === teamId);

  useEffect(() => {
    if (!team || teamPlayers.length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchAll = async () => {
      try {
        const updated = await Promise.all(
          teamPlayers.map(async (player) => {
            try {
              const rankedData = await fetchPlayerRankedData(player.idLol);
              return updatePlayerWithRankedData(player, rankedData);
            } catch {
              return { ...player, error: 'Impossible de récupérer les données', isLoading: false };
            }
          })
        );
        const sorted = [...updated].sort((a, b) => calculateAdjustedLP(b) - calculateAdjustedLP(a));
        setPlayers(sorted);
      } catch {
        toast.error('Erreur lors du chargement des joueurs.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [id]);

  if (!team) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 px-6">
          <div className="max-w-4xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold text-gray-700">Équipe introuvable</h1>
            <Link to="/teams" className="text-primary hover:underline mt-4 inline-block">
              Retour au classement des équipes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/teams"
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
            Retour au classement des équipes
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              {team.name}
            </h1>
            <p className="text-gray-600 mt-1">
              Classement des joueurs par LP ajustés
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {teamPlayers.map((_, index) => (
                <Skeleton key={index} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : players.length === 0 ? (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Aucun joueur dans cette équipe.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {players.map((player, index) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  rank={index + 1}
                  delay={index}
                  showRawLP={false}
                  teamName={undefined}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamDetail;
