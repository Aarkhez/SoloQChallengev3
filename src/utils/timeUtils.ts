
const END_DATE = new Date('2025-05-07T23:59:59');
const START_DATE = new Date('2025-03-25T00:00:00'); // Updated to March 25, 2025
const WEEKS_TOTAL = 6;
const GAMES_PER_WEEK = 20;

export const getTimeRemaining = () => {
  const now = new Date();
  const timeRemaining = END_DATE.getTime() - now.getTime();
  
  // Convert to days, hours, minutes, seconds
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, totalMs: timeRemaining };
};

export const getCurrentWeek = () => {
  const now = new Date();
  const timeSinceStart = now.getTime() - START_DATE.getTime();
  const weeksPassed = Math.min(
    Math.floor(timeSinceStart / (7 * 24 * 60 * 60 * 1000)),
    WEEKS_TOTAL - 1
  );
  
  return Math.max(0, weeksPassed + 1); // +1 because we want week number (1-indexed)
};

export const getRequiredGames = (currentWeek: number) => {
  return currentWeek * GAMES_PER_WEEK;
};

export const getRemainingGames = (gamesPlayed: number) => {
  const currentWeek = getCurrentWeek();
  const requiredGames = getRequiredGames(currentWeek);
  return Math.max(0, requiredGames - gamesPlayed);
};
