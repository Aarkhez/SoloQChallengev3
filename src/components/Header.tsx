
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-6 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="text-2xl font-bold tracking-tight transition-all hover:opacity-80"
        >
          <span className="text-primary">SoloQ</span>Challenge
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-sm font-medium transition-all hover:text-primary"
          >
            Classement
          </Link>
          <a 
            href="https://www.leagueoflegends.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium transition-all hover:text-primary"
          >
            League of Legends
          </a>
          <a 
            href="https://developer.riotgames.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm font-medium transition-all hover:text-primary"
          >
            API Riot
          </a>
        </nav>
        
        <div className="flex md:hidden">
          <button 
            aria-label="Menu" 
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
