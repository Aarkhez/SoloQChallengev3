
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Leaderboard from '../components/Leaderboard';
import { PLAYERS } from '../data/players';

const Index = () => {
  const [isReady, setIsReady] = useState(false);

  // Animation à l'entrée
  useEffect(() => {
    setIsReady(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transform transition-all duration-700 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              SoloQ Challenge
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez en temps réel le classement des joueurs de League of Legends dans leur SoloQ Challenge
            </p>
          </div>

          <div className={`transition-all duration-700 delay-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            <Leaderboard players={PLAYERS} />
          </div>
          
          <div className="mt-12 bg-gray-50 rounded-lg p-6 shadow-inner animate-enter animate-enter-delay-5">
            <h2 className="text-2xl font-bold mb-4">Comment fonctionne le SoloQ Challenge ?</h2>
            <p className="text-gray-700 mb-4">
              Le SoloQ Challenge est une compétition amicale entre 9 joueurs de League of Legends. Chaque joueur tente de grimper le plus haut possible en classement solo.
            </p>
            <p className="text-gray-700 mb-4">
              Les scores sont ajustés selon un coefficient personnalisé pour chaque joueur, afin d'équilibrer les différences de niveau initial.
            </p>
            <p className="text-gray-700">
              Le classement est mis à jour automatiquement grâce à l'API Riot Games.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
