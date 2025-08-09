import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Users, Sparkles } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Scissors className="h-12 w-12 text-primary" />,
      title: "Fades & klassische Schnitte",
      description: "Moderne Fades und zeitlose klassische Herrenschnitte, perfekt auf Ihren Typ abgestimmt."
    },
    {
      icon: <Users className="h-12 w-12 text-primary" />,
      title: "Bartpflege & Konturen",
      description: "Professionelle Bartpflege mit präzisen Konturen für den perfekten Look."
    },
    {
      icon: <Sparkles className="h-12 w-12 text-primary" />,
      title: "Styling & Finish",
      description: "Das perfekte Finish mit hochwertigen Produkten für einen makellosen Auftritt."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erleben Sie erstklassige Barbershop-Services in modernem Ambiente
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;