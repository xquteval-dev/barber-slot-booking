import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const Location = () => {
  return (
    <section id="location" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Unser Standort
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Besuchen Sie uns in Wiesbaden
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Aydin Barber Wiesbaden
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Adresse</h3>
                    <p className="text-muted-foreground">
                      Dotzheimer Str. 84<br />
                      65197 Wiesbaden<br />
                      Deutschland
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Anfahrt</h3>
                    <p className="text-muted-foreground">
                      Direkt an der Dotzheimer Straße gelegen, mit guter Anbindung an öffentliche Verkehrsmittel.
                      Parkplätze in der Nähe verfügbar.
                    </p>
                  </div>
                </div>
                
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2556.8234567891234!2d8.2245678901234567!3d50.0789012345678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd0b234567890a%3A0x1234567890abcdef!2sDotzheimer%20Str.%2084%2C%2065197%20Wiesbaden!5e0!3m2!1sde!2sde!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Location;