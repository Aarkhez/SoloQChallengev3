
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Leaderboard from '../components/Leaderboard';
import TeamLeaderboard from '../components/TeamLeaderboard';
import Timer from '../components/Timer';
import { Link } from 'react-router-dom';
import { PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';
import { getCurrentWeek, getRequiredGames } from '../utils/timeUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen } from 'lucide-react';

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const currentWeek = getCurrentWeek();
  const requiredGames = getRequiredGames(currentWeek);

  // Animation à l'entrée
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
        <div className={`text-center mb-6 transform transition-all duration-700 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              SoloQ Challenge
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez en temps réel le classement des joueurs de League of Legends dans leur SoloQ Challenge
            </p>
          </div>
          <Link
            to="/rules"
            className={`mb-8 flex items-center gap-4 p-5 rounded-xl border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all duration-200 group animate-enter ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left flex-grow">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                Règles du challenge
              </h2>
              <p className="text-sm text-gray-600 mt-0.5">
                Comment ça marche, format, cash prize…
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>

          {/* Timer Component */}
          <Timer />

          <div className={`transition-all duration-700 delay-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            <Tabs defaultValue="players" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="players">Classement joueurs</TabsTrigger>
                <TabsTrigger value="teams">Classement équipes</TabsTrigger>
              </TabsList>
              <TabsContent value="players">
                <Leaderboard players={PLAYERS} />
              </TabsContent>
              <TabsContent value="teams">
                <TeamLeaderboard players={PLAYERS} teams={TEAMS} />
              </TabsContent>
            </Tabs>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
