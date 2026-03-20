import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme-toggle";

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
          ? "bg-background/80 backdrop-blur-md shadow-sm border-b border-border/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight text-foreground transition-all hover:opacity-80"
        >
          <span className="text-primary">SoloQ</span>Challenge
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/90 transition-all hover:text-primary"
          >
            Classement
          </Link>
          <Link
            to="/rules"
            className="text-sm font-medium text-foreground/90 transition-all hover:text-primary"
          >
            Règles
          </Link>
          <a
            href="https://www.leagueoflegends.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/90 transition-all hover:text-primary"
          >
            League of Legends
          </a>
          <a
            href="https://developer.riotgames.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground/90 transition-all hover:text-primary"
          >
            API Riot
          </a>
          </nav>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            aria-label="Menu"
            className="p-2 rounded-md hover:bg-accent transition-colors text-foreground"
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
