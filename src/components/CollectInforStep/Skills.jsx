
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

const Skills = ({ userData, setUserData, nextStep, prevStep }) => {
  const handleSkillLevelChange = (e) => {
    setUserData({
      ...userData,
      skills: { ...userData.skills, level: parseInt(e.target.value) },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData.skills.primary) {
      alert("Please specify your primary skill area");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Your Skills & Expertise
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Tell us about your current skill levels to help create a personalized learning path
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="primary-skill"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Primary Skill Area
          </label>
          <input
            type="text"
            id="primary-skill"
            value={userData.skills.primary}
            onChange={(e) =>
              setUserData({
                ...userData,
                skills: { ...userData.skills, primary: e.target.value },
              })
            }
            placeholder="e.g. Web Development, Data Analysis, Graphic Design"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-3">
            Skill Level in Primary Area
          </label>
          <div className="flex items-center mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3 w-16">
              Beginner
            </span>
            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${userData.skills.level}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-3 w-16">
              Expert
            </span>
          </div>
          <input
            type="range"
            id="skill-level"
            min="0"
            max="100"
            value={userData.skills.level}
            onChange={handleSkillLevelChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        <div>
          <label
            htmlFor="secondary-skills"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Secondary Skills (comma separated)
          </label>
          <textarea
            id="secondary-skills"
            value={userData.skills.secondary.join(", ")}
            onChange={(e) =>
              setUserData({
                ...userData,
                skills: {
                  ...userData.skills,
                  secondary: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s),
                },
              })
            }
            placeholder="e.g. Photography, Public Speaking, Copywriting"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            rows="3"
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="learning-goals"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Specific Learning Goals
          </label>
          <textarea
            id="learning-goals"
            value={userData.skills.goals}
            onChange={(e) =>
              setUserData({
                ...userData,
                skills: { ...userData.skills, goals: e.target.value },
              })
            }
            placeholder="What specific knowledge or skills do you want to acquire?"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
            rows="3"
          ></textarea>
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition"
          >
            <BsArrowLeft className="inline mr-2" /> Back
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition transform hover:scale-105"
          >
            Continue to Preferences <BsArrowRight className="inline ml-2" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Skills;