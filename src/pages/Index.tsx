import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Team from "@/components/Team";
import BookingSystem from "@/components/BookingSystem";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Team />
        <BookingSystem />
        <Location />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
