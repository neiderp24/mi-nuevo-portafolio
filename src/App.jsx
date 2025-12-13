import './App.css';
import { Routes, Route } from 'react-router-dom'; // ⬅️ elimina BrowserRouter
import About from './components/About';
import AnimatedStars from './components/AnimatedStars';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import VetconnectDetail from './components/detailsProjects/VetconnectProject';
import CountriesAppDetail from './components/detailsProjects/CountriesAppDetail';
import DJWebDetail from './components/detailsProjects/DJWebDetail';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
  return (
    <div className="App">
      <AnimatedStars />
      <Navbar />
      <Routes>
        {/* Ruta principal (home) */}
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
            <Footer />
            <ScrollToTopButton />
          </>
        } />

        {/* Rutas de proyectos */}
        <Route path="/projects/vetconnect" element={<VetconnectDetail />} />
        <Route path="/projects/app-paises" element={<CountriesAppDetail />} />
        <Route path="/projects/web-dj" element={<DJWebDetail />} />
      </Routes>
    </div>
  );
}

export default App;
