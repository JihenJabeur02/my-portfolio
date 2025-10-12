import Navbar from './components/Navbar/Navbar';
import Hero from './features/hero/Hero';
import Resume from './features/resume/Resume';
import Technologies from './features/technologies/Technologies';
import Projects from './features/projects/Projects';
import Study from './features/study/Study';
import Contact from './features/contact/Contact';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Resume />
      <Technologies />
      <Projects />
      <Study />
      <Contact />
    </div>
  );
}
