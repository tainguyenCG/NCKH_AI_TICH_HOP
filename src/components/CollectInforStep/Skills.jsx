import React from "react";
import { FaCode, FaList, FaTasks } from "react-icons/fa";

const Skills = ({ courseData, setCourseData, nextStep, prevStep }) => {
  const handleSecondarySkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setCourseData({
      ...courseData,
      secondary_skills: skills,
    });
  };

  const handleSkillLevelChange = (e) => {
    setCourseData({
      ...courseData,
      skill_level: Number(e.target.value),
    });
  };

  const handleSubmit = () => {
    const { primary_skill, skill_level, goals } = courseData;
    if (!primary_skill || skill_level <= 0 || !goals) {
      alert("Please fill in all required fields.");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-light dark:bg-dark rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-primary dark:text-white mb-6 font-sans">
        Skills and Goals
      </h2>
      <div className="space-y-6">
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-300 font-medium mb-2 font-sans">
            <FaCode className="mr-2 text-accent" />
            Primary Skill
          </label>
          <input
            type="text"
            value={courseData.primary_skill}
            onChange={(e) =>
              setCourseData({ ...courseData, primary_skill: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none dark:bg-gray-800 dark:text-white font-sans"
            placeholder="e.g. React.JS"
          />
        </div>
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-300 font-medium mb-2 font-sans">
            <FaTasks className="mr-2 text-accent" />
            Skill Level (0-100)
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={courseData.skill_level}
              onChange={handleSkillLevelChange}
              className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-accent"
            />
            <div className="absolute top-[-30px] right-0 text-primary dark:text-white font-medium font-sans">
              {courseData.skill_level}
            </div>
          </div>
        </div>
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-300 font-medium mb-2 font-sans">
            <FaList className="mr-2 text-accent" />
            Secondary Skills
          </label>
          <input
            type="text"
            value={courseData.secondary_skills.join(", ")}
            onChange={handleSecondarySkillsChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none dark:bg-gray-800 dark:text-white font-sans"
            placeholder="e.g. Javascript, HTML/CSS"
          />
        </div>
        <div>
          <label className="flex items-center text-gray-700 dark:text-gray-300 font-medium mb-2 font-sans">
            <FaTasks className="mr-2 text-accent" />
            Goals
          </label>
          <textarea
            value={courseData.goals}
            onChange={(e) =>
              setCourseData({ ...courseData, goals: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none dark:bg-gray-800 dark:text-white font-sans"
            placeholder="e.g. Tôi cần nâng cao trình độ, cần thêm kiến thức sâu hơn"
            rows="4"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
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
          Continue to Preferences
        </button>
      </div>
    </div>
  );
};

export default Skills;