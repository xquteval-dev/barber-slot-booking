import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Kontakt
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Haben Sie Fragen? Kontaktieren Sie uns gerne
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Telefon</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <a href="tel:+496112345678" className="hover:text-primary transition-colors">
                  +49 611 234 5678
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">E-Mail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                <a href="mailto:info@aydin-barber.de" className="hover:text-primary transition-colors">
                  info@aydin-barber.de
                </a>
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Öffnungszeiten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground text-sm space-y-1">
                <p>Mo-Fr: 09:00 - 19:00</p>
                <p>Sa: 09:00 - 18:00</p>
                <p>So: Geschlossen</p>
              </div>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center space-x-4 mb-2">
                <Instagram className="h-6 w-6 text-primary" />
                <Facebook className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg">Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">
                    @aydinbarber
                  </a>
                </p>
                <p className="text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">
                    Facebook
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;