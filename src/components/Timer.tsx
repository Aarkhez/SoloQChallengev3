
import { useState, useEffect } from 'react';
import { getTimeRemaining, getCurrentWeek } from '../utils/timeUtils';
import { CalendarDays, Timer as TimerIcon } from 'lucide-react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = getTimeRemaining();
      setTimeLeft(newTimeLeft);
      setCurrentWeek(getCurrentWeek());
      
      // Clear interval when countdown is over
      if (newTimeLeft.totalMs <= 0) {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (timeLeft.totalMs <= 0) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Le SoloQ Challenge est terminé !
        </h2>
      </div>
    );
  }
  
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6 animate-enter">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <TimerIcon className="mr-2 text-blue-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-800">
            Fin du challenge dans
          </h2>
        </div>
        
        <div className="flex items-center space-x-3 text-center">
          <div className="bg-white px-3 py-2 rounded-md shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.days}</div>
            <div className="text-xs text-gray-500">Jours</div>
          </div>
          <div className="bg-white px-3 py-2 rounded-md shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.hours}</div>
            <div className="text-xs text-gray-500">Heures</div>
          </div>
          <div className="bg-white px-3 py-2 rounded-md shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-500">Minutes</div>
          </div>
          <div className="bg-white px-3 py-2 rounded-md shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-500">Secondes</div>
          </div>
        </div>
        
        <div className="flex items-center">
          <CalendarDays className="mr-2 text-blue-500" size={20} />
          <span className="text-lg font-semibold">Semaine {currentWeek}/6</span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
