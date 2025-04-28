import React from "react";
import { FaBook, FaCode, FaClock, FaLanguage, FaList, FaRocket, FaTasks, FaVideo } from "react-icons/fa";

const Dashboard = ({ courseData, handleSubmit, prevStep, isLoading }) => {
  const dataFields = [
    {
      label: "Course Name",
      value: courseData.course_name,
      icon: <FaBook className="text-accent text-2xl" />,
    },
    {
      label: "Primary Skill",
      value: courseData.primary_skill,
      icon: <FaCode className="text-accent text-2xl" />,
    },
    {
      label: "Skill Level",
      value: courseData.skill_level,
      icon: <FaTasks className="text-accent text-2xl" />,
    },
    {
      label: "Interests",
      value: courseData.interests.join(", "),
      icon: <FaRocket className="text-accent text-2xl" />,
    },
    {
      label: "Secondary Skills",
      value: courseData.secondary_skills.join(", "),
      icon: <FaList className="text-accent text-2xl" />,
    },
    {
      label: "Goals",
      value: courseData.goals,
      icon: <FaTasks className="text-accent text-2xl" />,
    },
    {
      label: "Learning Style",
      value: courseData.learning_style,
      icon: <FaVideo className="text-accent text-2xl" />,
    },
    {
      label: "Daily Learning Time",
      value: courseData.daily_learning_time,
      icon: <FaClock className="text-accent text-2xl" />,
    },
    {
      label: "Preferred Resources",
      value: courseData.preferred_resources.join(", "),
      icon: <FaList className="text-accent text-2xl" />,
    },
    {
      label: "Language",
      value: courseData.language,
      icon: <FaLanguage className="text-accent text-2xl" />,
    },
    {
      label: "Custom AI Prompt",
      value: courseData.custom_ai_prompt || "None",
      icon: <FaTasks className="text-accent text-2xl" />,
    },
  ];

  return (
    <div className="max-w-3xl mx-auto bg-light dark:bg-dark rounded-lg shadow-lg p-8 relative">
      <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6 font-sans">
        Review Your Course Preferences
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {dataFields.map((field, index) => (
          <div
            key={index}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="flex items-center">
              {field.icon}
              <div className="ml-4">
                <h3 className="text-sm font-medium text-secondary dark:text-gray-300 font-sans">
                  {field.label}
                </h3>
                <p className="text-primary dark:text-white font-sans">
                  {field.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className={`bg-gray-200 dark:bg-gray-600 text-primary dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition font-sans ${
            isLoading
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-300 dark:hover:bg-gray-500"
          }`}
          disabled={isLoading}
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className={`flex items-center justify-center font-medium py-3 px-6 rounded-lg transition transform font-sans ${
            isLoading
              ? "bg-accent/50 text-white cursor-not-allowed"
              : "bg-accent hover:bg-accent/80 text-white hover:scale-105"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid mr-2"></span>
              <span>Creating...</span>
            </>
          ) : (
            <span>Create course</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;