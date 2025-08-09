import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const BookingSystem = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    barber: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const services = [
    "Herrenschnitt",
    "Fade Cut",
    "Bartpflege",
    "Styling",
    "Komplett-Service"
  ];

  const barbers = ["Mesut", "Mustafa", "Aymen", "Bayram"];

  // Generate next 14 days
  const getAvailableDates = () => {
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const loadAvailableSlots = async (date: string) => {
    try {
      const { data, error } = await supabase
        .from('time_slots')
        .select('*')
        .eq('date', date)
        .eq('is_available', true)
        .order('start_time');

      if (error) throw error;
      setAvailableSlots(data || []);
    } catch (error) {
      console.error('Error loading slots:', error);
      toast({
        title: "Fehler",
        description: "Zeitslots konnten nicht geladen werden.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (selectedDate) {
      loadAvailableSlots(selectedDate);
      setSelectedSlot("");
    }
  }, [selectedDate]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedSlot || !formData.name || !formData.phone || !formData.service || !formData.barber) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Felder aus.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Create booking
      const { error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_name: formData.name,
          customer_phone: formData.phone,
          service_type: formData.service,
          barber_name: formData.barber,
          appointment_date: selectedDate,
          appointment_time: selectedSlot,
          status: 'confirmed'
        });

      if (bookingError) throw bookingError;

      // Update slot availability
      const { error: slotError } = await supabase
        .from('time_slots')
        .update({ is_available: false })
        .eq('date', selectedDate)
        .eq('start_time', selectedSlot);

      if (slotError) throw slotError;

      toast({
        title: "Termin gebucht!",
        description: "Ihr Termin wurde erfolgreich gebucht. Sie erhalten eine Bestätigung per SMS."
      });

      // Reset form
      setFormData({ name: "", phone: "", service: "", barber: "" });
      setSelectedDate("");
      setSelectedSlot("");
      setAvailableSlots([]);

    } catch (error) {
      console.error('Booking error:', error);
      toast({
        title: "Fehler",
        description: "Termin konnte nicht gebucht werden. Bitte versuchen Sie es erneut.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Termin buchen
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Buchen Sie Ihren Termin schnell und einfach online
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Terminbuchung
            </CardTitle>
            <CardDescription>
              Wählen Sie Ihren gewünschten Termin und Service
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ihr vollständiger Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 123 456 789"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Gewünschte Leistung</Label>
                  <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Leistung wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gewünschter Barber</Label>
                  <Select value={formData.barber} onValueChange={(value) => setFormData({ ...formData, barber: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Barber wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {barbers.map((barber) => (
                        <SelectItem key={barber} value={barber}>
                          {barber}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Datum wählen</Label>
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Datum wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {getAvailableDates().map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('de-DE', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedDate && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Verfügbare Zeiten
                  </Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        type="button"
                        variant={selectedSlot === slot.start_time ? "default" : "outline"}
                        onClick={() => setSelectedSlot(slot.start_time)}
                        className="text-sm"
                      >
                        {slot.start_time.substring(0, 5)}
                      </Button>
                    ))}
                  </div>
                  {availableSlots.length === 0 && (
                    <p className="text-muted-foreground text-sm">
                      Keine verfügbaren Zeiten für diesen Tag.
                    </p>
                  )}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full" 
                disabled={loading}
              >
                {loading ? "Wird gebucht..." : "Termin buchen"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default BookingSystem;