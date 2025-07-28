import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import PortfolioPage from './pages/PortfolioPage';
import ContactPage from './pages/ContactPage';
import CareersPage from './pages/CareersPage';
import Preloader from './components/Preloader';
import SocialBot from './components/SocialBot';
import JobApplicationForm from './pages/JobApplicationForm';
import ScrollToTopButton from './components/ScrollToTopButton';


function App() {
  return (
    <Preloader>
      <Router>
        <div className="min-h-screen bg-white relative">
          {/* Watermark */}
          <div className="fixed bottom-4 right-4 z-50 opacity-20 pointer-events-none">
            <div className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-sm font-medium">
              SYNNECTIFY
            </div>
          </div>
          <SocialBot />
           <ScrollToTopButton />
          <Header />
         
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/apply" element={<JobApplicationForm />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Preloader>
  );
}

export default App;