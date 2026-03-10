import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TeamLeaderboard from '../components/TeamLeaderboard';
import { PLAYERS } from '../data/players';
import { TEAMS } from '../data/teams';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TeamRanking = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-8 transform transition-all duration-700 ${
              isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Classement des équipes
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Le score d&apos;une équipe est la somme des LP ajustés de ses joueurs (hors disqualifiés).
            </p>
          </div>

          <div
            className={`transition-all duration-700 delay-300 ${
              isReady ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Tabs value="teams" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
                <TabsTrigger value="players" asChild>
                  <Link to="/">Classement joueurs</Link>
                </TabsTrigger>
                <TabsTrigger value="teams">Classement équipes</TabsTrigger>
              </TabsList>
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

export default TeamRanking;
