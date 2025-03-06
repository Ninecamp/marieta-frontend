import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import OurStory from "./components/OurStory";
import HeroSection from "./components/HeroSection";
import OurPhilosophy from "./components/OurPhilosphy";
import ImageSlider from "./components/ImageSlider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Admin from "./components/Admin"; 
import PdfViewer from "./PdfViewer";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const Home = () => {
  return (
    <>
      <HeroSection />
      <OurStory />
      <OurPhilosophy />
      <ImageSlider />
    </>
  );
};

function App() {
  const location = useLocation();
  
  const hideHeaderFooter = location.pathname.startsWith("/pdf/") || location.pathname === "/admin";

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pdf/:type" element={<PdfViewer />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
