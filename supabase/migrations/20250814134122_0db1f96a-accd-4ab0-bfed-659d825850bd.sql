-- Create service types table
CREATE TABLE public.service_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  price_euros DECIMAL(8,2),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create barber profiles table
CREATE TABLE public.barber_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  specialty TEXT,
  bio TEXT,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create time slots table
CREATE TABLE public.time_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  barber_id UUID REFERENCES public.barber_profiles(id),
  is_available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(date, start_time, barber_id)
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  service_type TEXT NOT NULL,
  barber_name TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.barber_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (no auth required for booking system)
CREATE POLICY "Service types are publicly readable" ON public.service_types FOR SELECT USING (true);
CREATE POLICY "Barber profiles are publicly readable" ON public.barber_profiles FOR SELECT USING (true);
CREATE POLICY "Time slots are publicly readable" ON public.time_slots FOR SELECT USING (true);
CREATE POLICY "Anyone can create bookings" ON public.bookings FOR INSERT WITH CHECK (true);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bookings updated_at
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial service types
INSERT INTO public.service_types (name, duration_minutes, price_euros, description) VALUES
  ('Herrenschnitt', 30, 25.00, 'Klassischer Herrenhaarschnitt mit Styling'),
  ('Fade Cut', 45, 30.00, 'Moderner Fade-Schnitt mit präzisen Übergängen'),
  ('Bartpflege', 20, 15.00, 'Professionelle Bartpflege und -formung'),
  ('Styling', 15, 10.00, 'Haarstyling mit Gel oder Wachs'),
  ('Komplett-Service', 60, 40.00, 'Haarschnitt + Bartpflege + Styling');

-- Insert barber profiles
INSERT INTO public.barber_profiles (name, specialty, bio) VALUES
  ('Mesut', 'Fade Cuts & Moderne Schnitte', 'Spezialist für moderne Herrenschnitte'),
  ('Mustafa', 'Klassische Schnitte & Bartpflege', 'Traditionelle Barbierkunst'),
  ('Aymen', 'Styling & Trends', 'Experte für aktuelle Frisurtrends'),
  ('Bayram', 'Komplett-Service', 'Allround-Spezialist für alle Services');

-- Function to generate time slots for a date range
CREATE OR REPLACE FUNCTION generate_time_slots(start_date DATE, end_date DATE)
RETURNS void AS $$
DECLARE
  current_date DATE;
  current_time TIME;
  barber_record RECORD;
BEGIN
  current_date := start_date;
  
  WHILE current_date <= end_date LOOP
    -- Skip Sundays (0 = Sunday in PostgreSQL)
    IF EXTRACT(DOW FROM current_date) != 0 THEN
      -- Generate slots from 9:00 to 18:00 in 30-minute intervals
      current_time := '09:00'::TIME;
      
      WHILE current_time < '18:00'::TIME LOOP
        -- Insert slot for each active barber
        FOR barber_record IN SELECT id FROM public.barber_profiles WHERE is_active = true LOOP
          INSERT INTO public.time_slots (date, start_time, end_time, barber_id, is_available)
          VALUES (
            current_date,
            current_time,
            current_time + INTERVAL '30 minutes',
            barber_record.id,
            true
          )
          ON CONFLICT (date, start_time, barber_id) DO NOTHING;
        END LOOP;
        
        current_time := current_time + INTERVAL '30 minutes';
      END LOOP;
    END IF;
    
    current_date := current_date + INTERVAL '1 day';
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Generate slots for the next 14 days
SELECT generate_time_slots(CURRENT_DATE + INTERVAL '1 day', CURRENT_DATE + INTERVAL '14 days');