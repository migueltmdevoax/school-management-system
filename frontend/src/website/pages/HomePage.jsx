import WebsiteLayout from "../layouts/WebsiteLayout";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HeroSection from "../sections/HeroSection";
import StatsSection from "../sections/StatsSection";
import FeaturesSection from "../sections/FeaturesSection";
import RolesSection from "../sections/RolesSection";
import ScreenshotsSection from "../sections/ScreenshotsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import CTASection from "../sections/CTASection";
import AboutSection from "../sections/AboutSection";

const HomePage = () => {
  return (
    <WebsiteLayout>
      <Navbar />

      <HeroSection />

      <AboutSection />

      <StatsSection />

      <FeaturesSection />

      <RolesSection />

      <ScreenshotsSection />

      <TestimonialsSection />

      <CTASection />

      <Footer />
    </WebsiteLayout>
  );
};

export default HomePage;