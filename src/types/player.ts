
export interface Player {
  id: number;
  name: string;
  pseudo: string;
  icon: string;
  tag: string;
  idLol: string;
  twitch: string;
  opgg: string;
  tier: string;
  rank: string;
  lp: number;
  wins: number;
  losses: number;
  lpAdjustment: number;
  gamesPlayed?: number; // Added for tracking weekly progress
  isLoading?: boolean;
  error?: string;
  isDisqualified?: boolean; // Added for tracking disqualified players
}

export interface RankedData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
  isDisqualified: boolean; // Added for tracking disqualified players
}

export default Player;
