import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouters from "./components/AppRouters";
import Navbar from "./components/Navbar";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import AISupportButton from "./components/AISupportButton";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <Router>
      <div className="bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0] dark:from-gray-800 dark:to-gray-900">
        <ScrollToTop />
        <Navbar />
        <AppRouters />
        <AISupportButton /> 
        <Footer/>
      </div>
    </Router>
  );
};

export default App;
