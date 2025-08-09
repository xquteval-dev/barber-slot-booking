import { Scissors } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Scissors className="h-6 w-6" />
              <span className="text-xl font-bold">Aydin Barber</span>
            </div>
            <p className="text-primary-foreground/80">
              Ihr professioneller Barbershop in Wiesbaden für klassische und moderne Herrenschnitte.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Dotzheimer Str. 84</p>
              <p>65197 Wiesbaden</p>
              <p>+49 611 234 5678</p>
              <p>info@aydin-barber.de</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Öffnungszeiten</h3>
            <div className="space-y-2 text-primary-foreground/80">
              <p>Montag - Freitag: 09:00 - 19:00</p>
              <p>Samstag: 09:00 - 18:00</p>
              <p>Sonntag: Geschlossen</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Aydin Barber Wiesbaden. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Impressum
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;