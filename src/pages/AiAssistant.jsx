import React, { useState, useEffect } from "react";
import PersonalInfo from "../components/CollectInforStep/PersonalInfo";
import Interests from "../components/CollectInforStep/Interests";
import Skills from "../components/CollectInforStep/Skills";
import Preferences from "../components/CollectInforStep/Preferences";
import Dashboard from "../components/CollectInforStep/Dashboard";
import ProgressSteps from "../components/CollectInforStep/ProgressSteps";
import { createAIPrompt } from "../utils/promptUtils";

const AiAssistant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    occupation: "",
    interests: [],
    skills: {
      primary: "",
      level: 0,
      secondary: [],
      goals: "",
    },
    preferences: {
      learningStyle: "",
      dailyTime: "",
      resources: {
        videocourses: false,
        articlesblogs: false,
        interactiveexercises: true,
        books: false,
        podcasts: false,
      },
      aiPrompt: "",
    },
  });

  const getSkillLevelDescription = (level) => {
    if (level < 20) return "Beginner";
    if (level < 40) return "Novice";
    if (level < 60) return "Intermediate";
    if (level < 80) return "Advanced";
    return "Expert";
  };

  useEffect(() => {
    if (currentStep === 5) {
      const prompt = createAIPrompt(userData, getSkillLevelDescription);
      console.log("Generated Prompt after Step 4:", prompt);
      localStorage.setItem("learningPlanPrompt", prompt);
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [currentStep, userData]);

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const restartSetup = () => {
    setUserData({
      name: "",
      age: "",
      occupation: "",
      interests: [],
      skills: {
        primary: "",
        level: 0,
        secondary: [],
        goals: "",
      },
      preferences: {
        learningStyle: "",
        dailyTime: "",
        resources: {
          videocourses: true,
          articlesblogs: true,
          interactiveexercises: false,
          books: false,
          podcasts: false,
        },
        aiPrompt: "",
      },
    });
    setCurrentStep(1);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">
            <span className="block">EduMind AI Assistant</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400">
            Capture Interests, Skills, and Aspirations for AI-Optimized Educational Learning Journeys.
          </p>
        </div>
        <ProgressSteps currentStep={currentStep} />
        {currentStep === 1 && (
          <PersonalInfo
            userData={userData}
            setUserData={setUserData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Interests
            userData={userData}
            setUserData={setUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Skills
            userData={userData}
            setUserData={setUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Preferences
            userData={userData}
            setUserData={setUserData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Dashboard
            userData={userData}
            setUserData={setUserData}
            restartSetup={restartSetup}
          />
        )}
      </div>
    </div>
  );
};

export default AiAssistant;