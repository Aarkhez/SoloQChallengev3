
export interface Player {
  id: number;
  name: string;
  pseudo: string;
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
  isLoading?: boolean;
  error?: string;
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
}

export default Player;
