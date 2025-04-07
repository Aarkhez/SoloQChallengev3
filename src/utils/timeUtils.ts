const END_DATE = new Date('2025-05-06T23:59:59');
const START_DATE = new Date('2025-03-25T00:00:00');
const WEEKS_TOTAL = 6;
const TOTAL_GAMES = 120;

export const getTimeRemaining = () => {
  const now = new Date();
  const timeRemaining = END_DATE.getTime() - now.getTime();
  
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, totalMs: timeRemaining };
};

export const getCurrentWeek = () => {
  const now = new Date();
  const timeSinceStart = now.getTime() - START_DATE.getTime() + (1 * 60 * 60 * 1000);
  const weeksPassed = Math.min(
    Math.floor(timeSinceStart / (7 * 24 * 60 * 60 * 1000)),
    WEEKS_TOTAL - 1
  );
  
  return Math.max(0, weeksPassed + 1);
};

// Définit les games requis par semaine
const getGamesPerWeek = (week: number) => {
  switch(week) {
    case 1:
      return 20;
    case 2:
      return 20;
    case 5:
    case 3:
      return 40;
    case 4:
      return 40;
    case 6:
      return 0;
    default:
      return 0;
  }
};

export const getRequiredGames = (currentWeek: number) => {
  let totalRequired = 0;
  for (let i = 1; i <= currentWeek; i++) {
    totalRequired += getGamesPerWeek(i);
  }
  return Math.min(totalRequired, TOTAL_GAMES);
};

export const getRemainingGames = (gamesPlayed: number) => {
  const currentWeek = getCurrentWeek();
  const requiredGames = getRequiredGames(currentWeek);
  return Math.max(0, requiredGames - gamesPlayed);
};