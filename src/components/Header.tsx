import { Button } from "@/components/ui/button";
import { Scissors } from "lucide-react";

const Header = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Scissors className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-foreground">Aydin Barber</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Leistungen
          </button>
          <button
            onClick={() => scrollToSection('team')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Team
          </button>
          <button
            onClick={() => scrollToSection('booking')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Termin buchen
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Kontakt
          </button>
        </nav>

        <Button 
          onClick={() => scrollToSection('booking')}
          className="hidden md:block"
        >
          Termin sichern
        </Button>
      </div>
    </header>
  );
};

export default Header;