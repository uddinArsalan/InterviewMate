import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import HowTo from "./components/HowTo";
import Testimonials from "./components/Testimonials";
import Pay from "./components/Pay";
import LastSection from "./components/LastSection";

export default async function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowTo />
      <Testimonials />
      <Pay />
      <LastSection />
    </main>
  );
}
