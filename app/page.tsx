import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowTo from "./components/HowTo";
import Testimonials from "./components/Testimonials";
import Pay from "./components/Pay";
import LastSection from "./components/LastSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowTo />
      <Testimonials />
      <Pay />
      <LastSection />
    </main>
  );
}
