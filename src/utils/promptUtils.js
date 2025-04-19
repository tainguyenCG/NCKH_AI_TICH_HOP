export const createAIPrompt = (userData, getSkillLevelDescription) => {
  return `Create a personalized weekly learning plan for a user as a JSON object, with a schedule for Monday to Sunday, detailing tasks, duration, resources, theory, and exercises. Tasks must align with the user's interests, skills, goals, learning style, time, and resources. Ensure the response is machine-parsable for UI rendering.
  
  **User Data**:
  - Name: ${userData.name}
  - Age: ${userData.age}
  - Occupation: ${userData.occupation}
  - Interests: ${userData.interests.join(", ")}
  - Primary Skill: ${userData.skills.primary}
  - Skill Level: ${getSkillLevelDescription(userData.skills.level)} (${
    userData.skills.level
  }/100)
  - Secondary Skills: ${userData.skills.secondary.join(", ") || "None"}
  - Goals: ${userData.skills.goals || "Not specified"}
  - Learning Style: ${userData.preferences.learningStyle || "Not specified"}
  - Daily Time: ${userData.preferences.dailyTime || "Not specified"}
  - Resources: ${
    [
      userData.preferences.resources.videocourses ? "Video Courses" : "",
      userData.preferences.resources.articlesblogs ? "Articles" : "",
      userData.preferences.resources.interactiveexercises
        ? "Interactive Exercises"
        : "",
      userData.preferences.resources.books ? "Books" : "",
      userData.preferences.resources.podcasts ? "Podcasts" : "",
    ]
      .filter(Boolean)
      .join(", ") || "None"
  }
  - AI Instructions: ${
    userData.preferences.aiPrompt ||
    "Include exercises with instructions and solutions, formatted for the subject (e.g., code for programming, equations for math)."
  }
  
  **Output Structure**:
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
          "focus": string,
          "theory": string,
          "exercises": [
            {
              "exercise": string,
              "instructions": string,
              "answer": string
            }
          ]
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
  
  **Constraints**:
  - Include 1-2 tasks per day, summing to daily time (assume 2 hours for "2+ hours").
  - Match tasks to user's goals, interests, and primary skill (at least 50% focus).
  - Use specific, actionable tasks (e.g., "Practice Python Loops", not "Study").
  - Align resources with preferred types (e.g., Khan Academy for exercises).
  - Match learning style (e.g., visual learners get simulations).
  - Each task must have theory (key concepts) and exercises (with solutions).
  - Solutions format: code for coding, equations/text for non-coding.
  - Distribute tasks evenly, avoiding unrelated topics.
  - If no time specified, include rest days with notes.
  
  Generate the plan based on user data, ensuring varied tasks with clear theory and exercises tailored to the learning goal.`;
};


export const createOptimizedPrompt = (learningPlan, completedTasks, progress) => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const initialPrompt = localStorage.getItem("learningPlanPrompt") || "";
  const initialResponse = JSON.parse(localStorage.getItem("learningPlanResponse") || "{}");

  const completedTasksSummary = Object.keys(completedTasks).map((taskId) => {
    const [day, index] = taskId.split("-");
    const task = learningPlan.weeklyPlan[day][parseInt(index)];
    return {
      day,
      task: task.task,
      focus: task.focus,
      duration: task.duration,
      completedTime: completedTasks[taskId].time,
    };
  });

  const incompleteTasks = [];
  for (const day in learningPlan.weeklyPlan) {
    learningPlan.weeklyPlan[day].forEach((task, index) => {
      if (!completedTasks[`${day}-${index}`]) {
        incompleteTasks.push({
          day,
          task: task.task,
          focus: task.focus,
          duration: task.duration,
        });
      }
    });
  }

  const interests = Array.isArray(userData.interests)
    ? userData.interests.join(", ")
    : initialResponse.user?.interests?.join(", ") || "Not specified";
  const primarySkill = userData.skills?.primary || initialResponse.user?.skills?.primary || "core skills";
  const summary = userData.summary || initialResponse.user?.summary || "No summary";
  const learningStyle = userData.preferences?.learningStyle || "Not specified";
  const dailyTime = userData.preferences?.dailyTime || "2 hours";
  const resources = userData.preferences?.resources
    ? [
        userData.preferences.resources.videocourses ? "Video Courses" : "",
        userData.preferences.resources.articlesblogs ? "Articles" : "",
        userData.preferences.resources.interactiveexercises ? "Interactive Exercises" : "",
        userData.preferences.resources.books ? "Books" : "",
        userData.preferences.resources.podcasts ? "Podcasts" : "",
      ]
        .filter(Boolean)
        .join(", ")
    : "None";

  return `
    Based on the user's previous learning plan, their progress, and initial user data, generate an optimized weekly learning plan in JSON format. The user is ${userData.name || initialResponse.user?.name || "Unknown"}, with summary: "${summary}". Their interests are ${interests}.

    **Initial Prompt**:
    ${initialPrompt}

    **Initial Response**:
    ${JSON.stringify(initialResponse, null, 2)}

    **Progress**:
    - Completed ${progress.completedCount}/${progress.totalTasks} tasks (${progress.percentage}%).
    - Total remaining time: ${progress.totalMinutes} minutes.
    - Completed tasks: ${JSON.stringify(completedTasksSummary, null, 2)}.
    - Incomplete tasks: ${JSON.stringify(incompleteTasks, null, 2)}.

    **User Data**:
    - Primary Skill: ${primarySkill}
    - Learning Style: ${learningStyle}
    - Daily Time: ${dailyTime}
    - Resources: ${resources}

    **Output Structure**:
    \`\`\`json
    {
      "user": {
        "name": string,
        "summary": string,
        "interests": array
      },
      "weeklyPlan": {
        "Monday": [
          {
            "task": string,
            "duration": string,
            "resource": string,
            "type": string,
            "focus": string,
            "theory": string,
            "exercises": [
              {
                "exercise": string,
                "instructions": string,
                "answer": string
              }
            ]
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

    **Constraints**:
    - Optimize the schedule to focus on incomplete tasks and reinforce completed tasks based on completion times.
    - Include 1-2 tasks per day, summing to daily time (assume 2 hours for "2+ hours").
    - Match tasks to user's goals, interests, and primary skill (at least 50% focus).
    - Use specific, actionable tasks (e.g., "Practice Python Loops", not "Study").
    - Align resources with preferred types (e.g., Khan Academy for exercises).
    - Match learning style (e.g., visual learners get simulations).
    - Each task must have theory (key concepts) and exercises (with solutions).
    - Solutions format: code for coding, equations/text for non-coding.
    - Distribute tasks evenly, avoiding unrelated topics.
    - Ensure all fields in the output structure are populated, including 'interests' in user.
    - Ensure each task has a valid 'resource' field (e.g., a URL or "None").
    - Maintain constraints of the initial prompt: detailed theory, relevant exercises, and clear notes.

    Generate the optimized plan, ensuring the JSON structure is complete and consistent with the initial response.`;
};