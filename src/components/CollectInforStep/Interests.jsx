import React from "react";
import { FaLaptopCode } from "react-icons/fa";

const Interests = ({ courseData, setCourseData, nextStep, prevStep }) => {
  const toggleInterest = () => {
    setCourseData({
      ...courseData,
      interests: courseData.interests.includes("Technology")
        ? []
        : ["Technology"],
    });
  };

  const handleSubmit = () => {
    if (!courseData.interests.includes("Technology")) {
      alert("Please select Technology as your interest.");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-light dark:bg-dark rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6 font-sans">
        Select Your Interest
      </h2>
      <p className="text-secondary dark:text-gray-400 mb-6 font-sans">
        Choose Technology to personalize your learning journey.
      </p>
      <div className="mb-8">
        <div
          className={`p-6 rounded-xl cursor-pointer border-2 transition-all transform hover:-translate-y-1 hover:shadow-xl ${
            courseData.interests.includes("Technology")
              ? "border-accent bg-accent/10"
              : "border-gray-300 dark:border-gray-600 hover:border-accent"
          }`}
          onClick={toggleInterest}
        >
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-accent/20 text-accent flex items-center justify-center mr-4">
              <FaLaptopCode className="text-2xl" />
            </div>
            <span className="font-medium text-primary dark:text-white font-sans">
              Technology
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-primary dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition font-sans"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-accent hover:bg-accent/80 text-white font-medium py-3 px-6 rounded-lg transition transform hover:scale-105 font-sans"
        >
          Continue to Skills
        </button>
      </div>
    </div>
  );
};

export default Interests;