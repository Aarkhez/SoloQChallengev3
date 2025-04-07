
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Leaderboard from '../components/Leaderboard';
import Timer from '../components/Timer';
import { PLAYERS } from '../data/players';
import { getCurrentWeek, getRequiredGames } from '../utils/timeUtils';

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
          <div className={`text-center mb-8 transform transition-all duration-700 ${isReady ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              SoloQ Challenge
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Suivez en temps réel le classement des joueurs de League of Legends dans leur SoloQ Challenge
            </p>
          </div>
          
          {/* Timer Component */}
          <Timer />

          <div className={`transition-all duration-700 delay-300 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
            <Leaderboard players={PLAYERS} />
          </div>
          
          <div className="mt-12 bg-gray-50 rounded-lg p-6 shadow-inner animate-enter animate-enter-delay-5">
            <h2 className="text-2xl font-bold mb-4">Comment fonctionne le SoloQ Challenge ?</h2>
            <p className="text-gray-700 mb-4">
              Le SoloQ Challenge est une compétition amicale entre joueurs de League of Legends. Chaque joueur tente de grimper le plus haut possible en classement solo.
            </p>
            <p className="text-gray-700 mb-4">
              Les scores sont ajustés selon un coefficient personnalisé pour chaque joueur, afin d'équilibrer les différences de niveau initial.
            </p>
            <p className="text-gray-700 mb-4">
              Vous pouvez trier le classement de deux façons:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Par classement</strong>: affiche les LP brut (non ajusté) basé uniquement sur le rang et les LP des joueurs</li>
              <li><strong>Par LP ajustés</strong>: affiche les LP multipliés par le coefficient personnalisé de chaque joueur</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-6 mb-3">Cash Prize</h3>
            <p className="text-gray-700 mb-4">
              À la fin du challenge, les trois meilleurs joueurs du classement par LP ajustés remporteront:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>1er prix</strong>: 50€</li>
              <li><strong>2ème prix</strong>: 25€</li>
              <li><strong>3ème prix</strong>: 15€</li>
            </ul>
            <h3 className="text-xl font-bold mt-6 mb-3">Objectif hebdomadaire</h3>
            <p className="text-gray-700 mb-4">
              Chaque joueur doit jouer <strong>40 parties maximum par semaine</strong> pendant les 6 semaines du challenge.
            </p>
            <p className="text-gray-700">
              Le nombre de parties manquantes est affiché dans le classement pour chaque joueur.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
