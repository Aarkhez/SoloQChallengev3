
import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-20 py-8 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-500">
              SoloQ Challenge {new Date().getFullYear()} — Un site non-officiel
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Ce site n'est pas affilié à Riot Games, Inc.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a 
              href="https://www.leagueoflegends.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              League of Legends
            </a>
            <a 
              href="https://developer.riotgames.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              API Riot
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
