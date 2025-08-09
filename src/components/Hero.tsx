import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-muted to-background">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3')] bg-cover bg-center opacity-20"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
          Aydin Barber
          <span className="block text-3xl md:text-4xl font-normal text-muted-foreground mt-2">
            Wiesbaden
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Präzision. Stil. Charakter.
        </p>
        
        <Button 
          size="lg" 
          onClick={scrollToBooking}
          className="text-lg px-8 py-6 rounded-full"
        >
          Jetzt Termin sichern
        </Button>
      </div>
    </section>
  );
};

export default Hero;