import { Link } from 'react-router-dom';
import { TeamWithScore } from '../services/api';
import { Users, ChevronRight } from 'lucide-react';

interface TeamCardProps {
  team: TeamWithScore;
  rank: number;
  delay?: number;
  animate?: boolean;
}

const TeamCard = ({ team, rank, delay = 0, animate = true }: TeamCardProps) => {
  const rankClass = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'default';
  const cardRankClass = rank <= 3 ? `team-card--rank-${rank}` : '';

  return (
    <Link
      to={`/team/${team.id}`}
      className={`team-card relative flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-5 overflow-hidden cursor-pointer
        ${cardRankClass}
        ${animate ? 'animate-enter' : ''}
        ${animate ? `animate-enter-delay-${Math.min(delay, 5)}` : ''}`}
      style={animate ? { animationDelay: `${delay * 0.1}s` } : {}}
    >
      {/* Badge rang circulaire */}
      <div className="flex items-center sm:flex-shrink-0">
        <div
          className={`team-card-rank-badge ${rankClass}`}
          aria-label={`Rang ${rank}`}
        >
          {rank}
        </div>
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              {team.name}
            </h3>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Users className="h-4 w-4 mr-1.5 text-primary/70" />
              {team.memberCount} joueur{team.memberCount > 1 ? 's' : ''}
            </div>
          </div>

          <div className="flex flex-col items-start md:items-end">
            <span className="text-2xl font-bold text-primary tabular-nums">
              {team.totalAdjustedLP} LP
            </span>
            <span className="text-xs text-gray-500">total LP ajustés</span>
          </div>
        </div>

        {team.players.length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap gap-x-3 gap-y-1">
            {team.players.slice(0, 5).map((p) => (
              <Link
                key={p.id}
                to={`/player/${p.id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-medium text-gray-500 hover:text-primary transition-colors"
              >
                {p.pseudo}
                {p.isDisqualified && ' (DQ)'}
              </Link>
            ))}
            {team.players.length > 5 && (
              <span className="text-xs text-gray-400">+{team.players.length - 5}</span>
            )}
          </div>
        )}
      </div>
      <ChevronRight className="hidden sm:block w-5 h-5 text-gray-300 flex-shrink-0" aria-hidden />
    </Link>
  );
};

export default TeamCard;
