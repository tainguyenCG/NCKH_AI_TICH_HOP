// src/components/Preferences.jsx
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { FaEye, FaHeadphones, FaBook, FaHands } from "react-icons/fa";

const Preferences = ({ userData, setUserData, nextStep, prevStep }) => {
  const learningStyles = [
    { name: "Visual", icon: FaEye },
    { name: "Auditory", icon: FaHeadphones },
    { name: "Reading/Writing", icon: FaBook },
    { name: "Kinesthetic", icon: FaHands },
  ];
  const dailyTimes = ["30 mins", "1 hour", "2+ hours"];
  const resources = [
    "Video Courses",
    "Articles & Blogs",
    "Interactive Exercises",
    "Books",
    "Podcasts",
  ];

  const selectPreference = (type, value) => {
    if (type === "learningStyle" || type === "dailyTime") {
      setUserData({
        ...userData,
        preferences: { ...userData.preferences, [type]: value },
      });
    } else if (type === "resources") {
      setUserData({
        ...userData,
        preferences: {
          ...userData.preferences,
          resources: {
            ...userData.preferences.resources,
            [value.toLowerCase().replace(/ & /g, "")]: !userData
              .preferences.resources[value.toLowerCase().replace(/ & /g, "")],
          },
        },
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Your Learning Preferences
      </h2>
      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-3">
            Preferred Learning Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {learningStyles.map((style) => (
              <button
                key={style.name}
                onClick={() => selectPreference("learningStyle", style.name)}
                className={`py-2 px-4 border rounded-lg transition-all ${
                  userData.preferences.learningStyle === style.name
                    ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-500"
                    : "border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-400 dark:text-gray-400"
                }`}
              >
                <style.icon className="inline mr-2" /> {style.name}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-3">
            Daily Learning Time Availability
          </label>
          <div className="grid grid-cols-3 gap-3">
            {dailyTimes.map((time) => (
              <button
                key={time}
                onClick={() => selectPreference("dailyTime", time)}
                className={`py-2 px-4 border rounded-lg transition-all ${
                  userData.preferences.dailyTime === time
                    ? "bg-blue-100 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-400 dark:text-blue-500"
                    : "border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-gray-700 hover:border-blue-300 dark:hover:border-blue-400  dark:text-gray-400"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-3">
            Preferred Learning Resources
          </label>
          <div className="space-y-2">
            {resources.map((resource) => (
              <label key={resource} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    userData.preferences.resources[
                      resource.toLowerCase().replace(/ & /g, "")
                    ]
                  }
                  onChange={() => selectPreference("resources", resource)}
                  className="form-checkbox h-5 w-5 text-blue-500 rounded focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 "
                />
                <span className="ml-2 text-gray-700 dark:text-gray-300">
                  {resource}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label
            htmlFor="ai-prompt"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Custom AI Prompt Instructions
          </label>
          <textarea
            id="ai-prompt"
            value={userData.preferences.aiPrompt}
            onChange={(e) =>
              setUserData({
                ...userData,
                preferences: {
                  ...userData.preferences,
                  aiPrompt: e.target.value,
                },
              })
            }
            placeholder="Any specific instructions for how the AI should structure your learning plan?"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition"
        >
          <BsArrowLeft className="inline mr-2" /> Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition transform hover:scale-105"
        >
          Complete Setup <BsArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Preferences;