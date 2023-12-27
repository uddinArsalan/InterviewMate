import Hero from './components/Hero'
import Navbar from './components/Navbar'
import HowTo from './components/HowTo'
import Testimonials from './components/Testimonials'
import Pay from "./components/Pay";
import LastSection from './components/LastSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowTo />
      <Testimonials />
      <Pay />
      <LastSection />
    </main>
  )
}
