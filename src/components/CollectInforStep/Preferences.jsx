import React from "react";

const Preferences = ({ courseData, setCourseData, nextStep, prevStep }) => {
  const learningStyles = ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"];
  const dailyTimes = ["30 mins", "1 hour", "2+ hours"];
  const resources = ["Videos", "Articles", "Exercises", "Books", "Podcasts"];
  const languages = ["English", "Vietnamese", "Chinese", "Japanese", "German"];

  const selectPreference = (type, value) => {
    if (
      type === "learning_style" ||
      type === "daily_learning_time" ||
      type === "language"
    ) {
      setCourseData({
        ...courseData,
        [type]: value,
      });
    } else if (type === "preferred_resources") {
      const resourceKey = value.toLowerCase();
      setCourseData({
        ...courseData,
        preferred_resources: courseData.preferred_resources.includes(resourceKey)
          ? courseData.preferred_resources.filter((r) => r !== resourceKey)
          : [...courseData.preferred_resources, resourceKey],
      });
    }
  };

  const handleSubmit = () => {
    const { learning_style, daily_learning_time, language } = courseData;
    if (!learning_style || !daily_learning_time || !language) {
      alert("Please fill in all required fields (Learning Style, Daily Learning Time, Language).");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Learning Preferences
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Preferred Learning Style
          </label>
          <div className="grid grid-cols-2 gap-3">
            {learningStyles.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => selectPreference("learning_style", style)}
                className={`py-2 px-4 border rounded-lg transition-all ${
                  courseData.learning_style === style
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Daily Learning Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            {dailyTimes.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => selectPreference("daily_learning_time", time)}
                className={`py-2 px-4 border rounded-lg transition-all ${
                  courseData.daily_learning_time === time
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Preferred Learning Resources
          </label>
          <div className="space-y-2">
            {resources.map((resource) => (
              <label key={resource} className="flex items-center">
                <input
                  type="checkbox"
                  checked={courseData.preferred_resources.includes(
                    resource.toLowerCase()
                  )}
                  onChange={() =>
                    selectPreference("preferred_resources", resource)
                  }
                  className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400"
                />
                <span className="ml-2 text-gray-700">{resource}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Language
          </label>
          <div className="grid grid-cols-3 gap-3">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => selectPreference("language", lang)}
                className={`py-2 px-4 border rounded-lg transition-all ${
                  courseData.language === lang
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Custom AI Prompt Instructions
          </label>
          <textarea
            value={courseData.custom_ai_prompt}
            onChange={(e) =>
              setCourseData({
                ...courseData,
                custom_ai_prompt: e.target.value,
              })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Any specific instructions for the AI?"
            rows="4"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          Review in Dashboard
        </button>
      </div>
    </div>
  );
};

export default Preferences;