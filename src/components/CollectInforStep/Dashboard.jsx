import { useEffect, useState } from "react";
import { FaUser, FaHeart, FaTrophy, FaCog, FaRobot } from "react-icons/fa";
import { callOpenAI } from "../../models/gptModel";
import { callPhi } from "../../models/phiModel";
import { callJamba } from "../../models/jambaModel";
import { callDeepSeek } from "../../models/deepSeekModel";
import { callLlama } from "../../models/llamaModel";
import AIModelSelector from "../AIModelSelector";

const Dashboard = ({ userData, setUserData, restartSetup }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [isGenerated, setIsGenerated] = useState(false);

  const getSkillLevelDescription = (level) => {
    if (level < 20) return "Beginner";
    if (level < 40) return "Novice";
    if (level < 60) return "Intermediate";
    if (level < 80) return "Advanced";
    return "Expert";
  };

  const createAIPrompt = () => {
    let prompt = `Create a personalized weekly learning plan for a user based on the following information. The plan must be structured as a JSON object with a schedule for each day from Monday to Sunday, detailing specific tasks, their duration, and resources to use. Each task must align with the user's interests, skills, goals, learning style, available time, and preferred resources. Ensure the response is consistent, machine-parsable, and suitable for direct UI rendering. Follow these constraints:

1. **User Data**:
   - Name: ${userData.name}
   - Age: ${userData.age}
   - Occupation: ${userData.occupation}
   - Interests: ${userData.interests.join(", ")}
   - Primary Skill: ${userData.skills.primary}
   - Skill Level: ${getSkillLevelDescription(
     userData.skills.level
   )} (value: ${userData.skills.level}/100)
   - Secondary Skills: ${
     userData.skills.secondary.join(", ") || "None"
   }
   - Learning Goals: ${userData.skills.goals || "Not specified"}
   - Preferred Learning Style: ${
     userData.preferences.learningStyle || "Not specified"
   }
   - Daily Learning Time: ${
     userData.preferences.dailyTime || "Not specified"
   }
   - Preferred Resources: ${[
     userData.preferences.resources.videos ? "Video Courses" : "",
     userData.preferences.resources.articles ? "Articles" : "",
     userData.preferences.resources.exercises
       ? "Interactive Exercises"
       : "",
     userData.preferences.resources.books ? "Books" : "",
     userData.preferences.resources.podcasts ? "Podcasts" : "",
   ]
     .filter(Boolean)
     .join(", ") || "None selected"}
   - Custom AI Instructions: ${userData.preferences.aiPrompt || "None"}

2. **Output Requirements**:
   - Return a JSON object with the following structure:
     \`\`\`json
     {
       "user": {
         "name": string,
         "summary": string
       },
       "weeklyPlan": {
         "Monday": [
           {
             "task": string,
             "duration": string,
             "resource": string,
             "type": string,
             "focus": string
           },
           ...
         ],
         "Tuesday": [...],
         "Wednesday": [...],
         "Thursday": [...],
         "Friday": [...],
         "Saturday": [...],
         "Sunday": [...]
       },
       "notes": string
     }
     \`\`\`
   - Each day must have at least 1 task if daily learning time is specified; otherwise, include a rest day with a note.
   - Task durations must sum to the user's daily learning time.
   - Resources must match the user's preferred resource types.
   - Tasks must align with the user's learning style.
   - Tasks must support the user's primary skill, interests, or learning goals, with at least 50% focusing on the primary skill.
   - If custom AI instructions are provided, incorporate them into task design or notes.

3. **Constraints**:
   - Do not include tasks unrelated to the user's interests, skills, or goals.
   - Ensure tasks are specific, actionable, and include a resource link or reference.
   - Distribute tasks evenly across the week.
   - If daily learning time is "2+ hours," assume 2 hours for scheduling.
   - If no learning style or resources are specified, default to a mix of videos and articles.
   - Avoid generic tasks like "Study"; specify what and how.

Generate the JSON response based on the provided user data, adhering strictly to the structure and constraints above.`;
    return prompt;
  };

  const generateLearningPlan = async () => {
    const planContainer = document.getElementById("ai-learning-plan");
    planContainer.innerHTML = `
      <div className="animate-pulse flex space-x-4">
        <div className="flex-1 space-y-4 py-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
        </div>
      </div>
    `;

    try {
      const prompt = localStorage.getItem("learningPlanPrompt");
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
      console.log("Raw AI Response:", response);
      localStorage.setItem("learningPlanResponse", response);
      setIsGenerated(true);
      planContainer.innerHTML = `
        <div className="prose max-w-none text-gray-800 dark:text-gray-200">
          <h3 className="text-lg font-semibold">Your Personalized Learning Plan</h3>
          <p>Generated successfully! Check the console for the raw response.</p>
          <p>Awaiting response display UI...</p>
        </div>
      `;
    } catch (error) {
      console.error("Error generating learning plan:", error);
      planContainer.innerHTML = `
        <p className="text-red-600 dark:text-red-400">Failed to generate learning plan. Please try again.</p>
      `;
    }
  };

  useEffect(() => {
    if (!isGenerated) {
      document.getElementById("dashboard-name").textContent = userData.name;
      document.getElementById("dashboard-age").textContent = userData.age;
      document.getElementById("dashboard-occupation").textContent =
        userData.occupation;

      const interestsContainer = document.getElementById("dashboard-interests");
      interestsContainer.innerHTML = "";
      userData.interests.forEach((interest) => {
        const badge = document.createElement("div");
        badge.className =
          "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm";
        badge.textContent = interest;
        interestsContainer.appendChild(badge);
      });

      const skillsContainer = document.getElementById("dashboard-skills");
      skillsContainer.innerHTML = `
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Primary Skill:</span> <span className="text-gray-600 dark:text-gray-400">${
          userData.skills.primary
        }</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Skill Level:</span> <span className="text-gray-600 dark:text-gray-400">${getSkillLevelDescription(
          userData.skills.level
        )}</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Secondary Skills:</span> <span className="text-gray-600 dark:text-gray-400">${
          userData.skills.secondary.join(", ") || "None specified"
        }</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Learning Goals:</span> <span className="text-gray-600 dark:text-gray-400">${
          userData.skills.goals || "Not specified"
        }</span></p>
      `;

      const preferencesContainer = document.getElementById(
        "dashboard-preferences"
      );
      preferencesContainer.innerHTML = `
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Learning Style:</span> <span className="text-gray-600 dark:text-gray-400">${
          userData.preferences.learningStyle || "Not selected"
        }</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Daily Time:</span> <span className="text-gray-600 dark:text-gray-400">${
          userData.preferences.dailyTime || "Not selected"
        }</span></p>
        <p><span className="font-medium text-gray-700 dark:text-gray-300">Preferred Resources:</span> <span className="text-gray-600 dark:text-gray-400">
          ${userData.preferences.resources.videos ? "Video Courses, " : ""}
          ${userData.preferences.resources.articles ? "Articles, " : ""}
          ${userData.preferences.resources.exercises ? "Interactive Exercises, " : ""}
          ${userData.preferences.resources.books ? "Books, " : ""}
          ${userData.preferences.resources.podcasts ? "Podcasts" : ""}
          ${
            !userData.preferences.resources.videos &&
            !userData.preferences.resources.articles &&
            !userData.preferences.resources.exercises &&
            !userData.preferences.resources.books &&
            !userData.preferences.resources.podcasts
              ? "None selected"
              : ""
          }
        </span></p>
      `;
    }
  }, [userData, isGenerated]);

  if (isGenerated) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div id="ai-learning-plan" className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-600 dark:text-gray-400">
          <p>Awaiting response display UI...</p>
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
  }

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
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Name:
              </span>{" "}
              <span id="dashboard-name" className="text-gray-600 dark:text-gray-400">
                John Doe
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Age:
              </span>{" "}
              <span id="dashboard-age" className="text-gray-600 dark:text-gray-400">
                30
              </span>
            </p>
            <p>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Occupation:
              </span>{" "}
              <span
                id="dashboard-occupation"
                className="text-gray-600 dark:text-gray-400"
              >
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
          <div
            id="ai-learning-plan"
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg text-gray-600 dark:text-gray-400"
          >
            <p>
              Your personalized learning plan will be generated here based on all the information you've provided.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <AIModelSelector
              selectedModel={selectedModel}
              setSelectedModel={setSelectedModel}
            />
            <button
              onClick={generateLearningPlan}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              <FaRobot className="inline mr-2" /> Generate Learning Plan
            </button>
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