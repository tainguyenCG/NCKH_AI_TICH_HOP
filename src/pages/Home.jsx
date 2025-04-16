import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularCoursesSection from '../components/PopularCoursesSection';
import CTASection from '../components/CTASection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PopularCoursesSection />
      <CTASection />
    </div>
  );
};

export default Home;