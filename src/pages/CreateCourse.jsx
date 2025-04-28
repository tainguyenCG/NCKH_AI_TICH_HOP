import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseSetup from "../components/CollectInforStep/CourseSetup";
import Interests from "../components/CollectInforStep/Interests";
import Skills from "../components/CollectInforStep/Skills";
import Preferences from "../components/CollectInforStep/Preferences";
import Dashboard from "../components/CollectInforStep/Dashboard";
import ProgressSteps from "../components/CollectInforStep/ProgressSteps";
import { storeProfile } from "../utils/api";

const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_content: [],
    primary_skill: "",
    skill_level: 0,
    interests: [],
    secondary_skills: [],
    goals: "",
    learning_style: "",
    daily_learning_time: "",
    preferred_resources: [],
    language: "",
    custom_ai_prompt: "",
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    console.log("Submitting courseData:", courseData);
    try {
      const response = await storeProfile(courseData);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.log("API Response:", response);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error storing profile:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-white sm:text-5xl">
            Course Setup Assistant
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary dark:text-gray-400">
            Configure your personalized learning journey by providing course details and preferences.
          </p>
        </div>
        <ProgressSteps currentStep={currentStep} />
        {currentStep === 1 && (
          <CourseSetup
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Interests
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Skills
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Preferences
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Dashboard
            courseData={courseData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
          />
        )}
      </div>
    </div>
  );
};

export default CreateCourse;