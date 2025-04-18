// src/components/AiAssistant.jsx
import React, { useState, useEffect } from "react";
import PersonalInfo from "../components/CollectInforStep/PersonalInfo";
import Interests from "../components/CollectInforStep/Interests";
import Skills from "../components/CollectInforStep/Skills";
import Preferences from "../components/CollectInforStep/Preferences";
import Dashboard from "../components/CollectInforStep/Dashboard";
import ProgressSteps from "../components/CollectInforStep/ProgressSteps";

const AiAssistant = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    occupation: "",
    interests: [],
    skills: {
      primary: "",
      level: 50,
      secondary: [],
      goals: "",
    },
    preferences: {
      learningStyle: "",
      dailyTime: "",
      resources: {
        videos: true,
        articles: true,
        exercises: false,
        books: false,
        podcasts: false,
      },
      aiPrompt: "",
    },
  });

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
        level: 50,
        secondary: [],
        goals: "",
      },
      preferences: {
        learningStyle: "",
        dailyTime: "",
        resources: {
          videos: true,
          articles: true,
          exercises: false,
          books: false,
          podcasts: false,
        },
        aiPrompt: "",
      },
    });
    setCurrentStep(1);
  };

  // Create prompt (same as in Dashboard)
  const createAIPrompt = () => {
    const getSkillLevelDescription = (level) => {
      if (level < 20) return "Beginner";
      if (level < 40) return "Novice";
      if (level < 60) return "Intermediate";
      if (level < 80) return "Advanced";
      return "Expert";
    };

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

  // Log and save prompt when moving to Step 5
  useEffect(() => {
    if (currentStep === 5) {
      const prompt = createAIPrompt();
      console.log("Generated Prompt after Step 4:", prompt);
      localStorage.setItem("learningPlanPrompt", prompt);
    }
  }, [currentStep]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">
            <span className="block">EduMind AI Assistant</span>
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
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