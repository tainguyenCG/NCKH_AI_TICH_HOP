import { useEffect, useState } from "react";
import { FaUser, FaHeart, FaTrophy, FaCog, FaRobot, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Added for navigation
import { callOpenAI } from "../../models/gptModel";
import { callPhi } from "../../models/phiModel";
import { callJamba } from "../../models/jambaModel";
import { callDeepSeek } from "../../models/deepSeekModel";
import { callLlama } from "../../models/llamaModel";
import AIModelSelector from "../AIModelSelector";
import { createAIPrompt } from "../../utils/promptUtils";

const Dashboard = ({ userData, setUserData, restartSetup }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [isGenerated, setIsGenerated] = useState(false);
  const [learningPlan, setLearningPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [error, setError] = useState(null); // New state for errors
  const navigate = useNavigate(); // Added for navigation

  const getSkillLevelDescription = (level) => {
    if (level < 20) return "Beginner";
    if (level < 40) return "Novice";
    if (level < 60) return "Intermediate";
    if (level < 80) return "Advanced";
    return "Expert";
  };

  const generateLearningPlan = async () => {
    setIsLoading(true); // Show loading state
    setError(null); // Clear previous errors
    setLearningPlan(null); // Clear previous plan

    try {
      // Use prompt from localStorage or create new
      const prompt = localStorage.getItem("learningPlanPrompt") || createAIPrompt(userData, getSkillLevelDescription);
      let response;
      if (selectedModel === "gpt-4o") {
        response = await callOpenAI(prompt);
      } else if (selectedModel === "phi") {
        response = await callPhi(prompt);
      } else if (selectedModel === "jamba") {
        response = await callJamba(prompt);
      } else if (selectedModel === "deepseek") {
        response = await callDeepSeek(prompt);
      } else if (selectedModel === "llama") {
        response = await callLlama(prompt);
      }

      // Clean response by removing ```json and ```
      const cleanedResponse = response
        .replace(/```json\n/, '')
        .replace(/\n```/, '');
      console.log("Raw AI Response:", cleanedResponse);

      localStorage.setItem("learningPlanResponse", cleanedResponse);
      const parsedResponse = JSON.parse(cleanedResponse);
      setLearningPlan(parsedResponse);
      setIsGenerated(true);
    } catch (error) {
      console.error("Error generating learning plan:", error);
      setError("Failed to generate learning plan. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const handleAcceptLearningPlan = () => {
    if (learningPlan) {
      // Save learningPlan to localStorage
      localStorage.setItem("learningPlan", JSON.stringify(learningPlan));
      // Navigate to LearningPlanPage
      navigate("/learning-plan");
    }
  };

  useEffect(() => {
    if (!isGenerated) {
      // Update profile summary
      document.getElementById("dashboard-name").textContent = userData.name;
      document.getElementById("dashboard-age").textContent = userData.age;
      document.getElementById("dashboard-occupation").textContent = userData.occupation;

      // Update interests
      const interestsContainer = document.getElementById("dashboard-interests");
      interestsContainer.innerHTML = "";
      userData.interests.forEach((interest) => {
        const badge = document.createElement("div");
        badge.className = "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm";
        badge.textContent = interest;
        interestsContainer.appendChild(badge);
      });

      // Update skills
      const skillsContainer = document.getElementById("dashboard-skills");
      skillsContainer.innerHTML = `
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Primary Skill:</span> <span className="text-gray-600 dark:text-gray-400">${userData.skills.primary}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Skill Level:</span> <span className="text-gray-600 dark:text-gray-400">${getSkillLevelDescription(userData.skills.level)}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Secondary Skills:</span> <span className="text-gray-600 dark:text-gray-400">${userData.skills.secondary.join(", ") || "None specified"}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Learning Goals:</span> <span className="text-gray-600 dark:text-gray-400">${userData.skills.goals || "Not specified"}</span></p>
      `;

      // Update preferences
      const preferencesContainer = document.getElementById("dashboard-preferences");
      preferencesContainer.innerHTML = `
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Learning Style:</span> <span className="text-gray-600 dark:text-gray-400">${userData.preferences.learningStyle || "Not selected"}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Daily Time:</span> <span className="text-gray-600 dark:text-gray-400">${userData.preferences.dailyTime || "Not selected"}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Preferred Resources:</span> <span className="text-gray-600 dark:text-gray-400">${[
          userData.preferences.resources.videocourses ? "Video Courses" : "",
          userData.preferences.resources.articlesblogs ? "Articles" : "",
          userData.preferences.resources.interactiveexercises ? "Interactive Exercises" : "",
          userData.preferences.resources.books ? "Books" : "",
          userData.preferences.resources.podcasts ? "Podcasts" : "",
        ].filter(Boolean).join(", ") || "None selected"}</span></p>
      `;
    }
  }, [userData, isGenerated]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Your Personalized Learning Dashboard
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Here's your customized learning plan based on your preferences
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-[fadeIn_0.6s_ease_forwards]">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4">
              <FaUser className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Profile Summary
            </h3>
          </div>
          <div className="space-y-3">
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">Name:</span>{" "}
              <span id="dashboard-name" className="text-gray-600 dark:text-gray-400">
                John Doe
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">Age:</span>{" "}
              <span id="dashboard-age" className="text-gray-600 dark:text-gray-400">
                30
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">Occupation:</span>{" "}
              <span id="dashboard-occupation" className="text-gray-600 dark:text-gray-400">
                Software Engineer
              </span>
            </p>
          </div>
        </div>
        <div className="dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-[fadeIn_0.6s_ease_forwards_0.2s]">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
              <FaHeart className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Your Interests
            </h3>
          </div>
          <div id="dashboard-interests" className="flex flex-wrap gap-2"></div>
        </div>
        <div className="dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-[fadeIn_0.6s_ease_forwards_0.4s]">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
              <FaTrophy className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Skills & Goals
            </h3>
          </div>
          <div id="dashboard-skills" className="space-y-3"></div>
        </div>
        <div className="dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-[fadeIn_0.6s_ease_forwards_0.6s]">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center mr-4">
              <FaCog className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Learning Preferences
            </h3>
          </div>
          <div id="dashboard-preferences" className="space-y-3"></div>
        </div>
        <div className="dashboard-card bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 col-span-1 md:col-span-2 animate-[fadeIn_0.6s_ease_forwards_0.8s]">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-4">
              <FaRobot className="text-xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              AI Learning Plan
            </h3>
          </div>
          <div className="mt-4 flex justify-end gap-4 flex-nowrap">
            <AIModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <button
              onClick={generateLearningPlan}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg transition whitespace-nowrap"
              disabled={isLoading}
            >
              <FaRobot className="inline mr-2" /> {isLoading ? "Generating..." : "Generate Learning Plan"}
            </button>
            {learningPlan && (
              <button
                onClick={handleAcceptLearningPlan}
                className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition whitespace-nowrap"
              >
                <FaCheck className="inline mr-2" /> Accept Learning Plan
              </button>
            )}
          </div>
          <div
            id="ai-learning-plan"
            className="bg-gray-50 dark:bg-gray-700 p-4 mt-4 rounded-lg text-gray-600 dark:text-gray-400"
          >
            {isLoading ? (
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            ) : error ? (
              <p className="text-red-600 dark:text-red-400">{error}</p>
            ) : learningPlan ? (
              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  Learning Plan for {learningPlan.user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {learningPlan.user.summary}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  Weekly Schedule
                </h3>
                {Object.entries(learningPlan.weeklyPlan).map(([day, tasks]) => (
                  <div key={day} className="mb-6">
                    <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                      {day}
                    </h4>
                    {tasks.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {tasks.map((task, index) => (
                          <li key={index} className="mb-4">
                            <span className="font-medium">{task.task}</span> ({task.duration}) -{" "}
                            <span className="text-gray-500">{task.focus}</span>
                            <br />
                            <span className="text-sm text-gray-400">
                              Resource: <a href={task.resource} className="text-indigo-500 hover:underline">{task.resource}</a> ({task.type})
                            </span>
                            <div className="mt-2">
                              <strong>Theory:</strong> {task.theory}
                            </div>
                            <div className="mt-2">
                              <strong>Exercises:</strong>
                              <ul className="list-decimal pl-6">
                                {task.exercises.map((ex, exIndex) => (
                                  <li key={exIndex} className="mb-2">
                                    <p><strong>Exercise:</strong> {ex.exercise}</p>
                                    <p><strong>Instructions:</strong> {ex.instructions}</p>
                                    <p><strong>Answer:</strong> <pre>{ex.answer}</pre></p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">Rest day - No tasks scheduled.</p>
                    )}
                  </div>
                ))}
                {learningPlan.notes && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      Notes
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{learningPlan.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <p>
                Your personalized learning plan will be generated here based on all the information you've provided.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-12 text-center">
        <button
          onClick={restartSetup}
          className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition inline-flex items-center"
        >
          <FaRobot className="inline mr-2" /> Start Over
        </button>
      </div>
    </div>
  );
};

export default Dashboard;