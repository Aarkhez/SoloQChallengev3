
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../types/player';
import { 
  formatWinRate, 
  getTierClass, 
  translateTier, 
  translateRank,
  calculateAdjustedLP
} from '../services/api';

interface PlayerCardProps {
  player: Player;
  rank: number;
  animate?: boolean;
  delay?: number;
}

const PlayerCard = ({ player, rank, animate = true, delay = 0 }: PlayerCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id, 
    pseudo, 
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
  
  return (
    <Link
      to={`/player/${id}`}
      className={`glass-card relative flex flex-col md:flex-row items-start md:items-center p-4 rounded-lg overflow-hidden transition-all 
        ${animate ? 'animate-enter' : ''} 
        ${animate ? `animate-enter-delay-${delay}` : ''}
        ${isHovered ? 'transform scale-[1.02] shadow-xl' : 'shadow-lg'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={animate ? { animationDelay: `${delay * 0.1}s` } : {}}
    >
      {/* Indicateur de rang */}
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-primary text-white font-bold text-xl h-10 w-10 flex items-center justify-center rounded-full shadow-md">
        {rank}
      </div>
      
      {/* Contenu principal */}
      <div className="ml-8 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full">
          <div>
            <h3 className="text-xl font-bold tracking-tight">{pseudo}</h3>
            <div className="flex items-center mt-1 space-x-2">
              {tier && playerRank ? (
                <span className={`tier-badge ${tierClass} bg-opacity-10 border border-opacity-30 border-current`}>
                  {translateTier(tier)} {translateRank(playerRank)}
                </span>
              ) : (
                <span className="tier-badge bg-gray-100 text-gray-500">
                  Non classé
                </span>
              )}
              <span className="text-sm font-medium">
                {lp} LP
              </span>
              <span className="text-xs text-gray-500">
                ({wins}V {losses}D)
              </span>
              <span className="text-xs font-medium">
                {winRate}
              </span>
            </div>
          </div>
          
          <div className="mt-3 md:mt-0 flex flex-col items-end">
            <div className="text-xl font-bold text-primary">
              {adjustedLP} LP
            </div>
            <div className="text-xs text-gray-500">
              Coefficient: {lpAdjustment}
            </div>
          </div>
        </div>
      </div>
      
      {/* Liens externes */}
      <div className="absolute top-3 right-3 flex space-x-2">
        {twitch && (
          <a 
            href={twitch} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-purple-500 hover:text-purple-600 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.731v6.628h-2.149v-6.628h2.149zm-5.731 0v6.628h-2.149v-6.628h2.149z" />
            </svg>
          </a>
        )}
        {opgg && (
          <a 
            href={opgg} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-blue-500 hover:text-blue-600 transition-colors"
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
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </a>
        )}
      </div>
    </Link>
  );
};

export default PlayerCard;
