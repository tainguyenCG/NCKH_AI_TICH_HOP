// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaLightbulb, FaCheckCircle } from "react-icons/fa";

// const LearningPlanPage = () => {
//   // Lấy learningPlan từ localStorage
//   const [learningPlan, setLearningPlan] = useState(() => {
//     const savedPlan = localStorage.getItem("learningPlanResponse");
//     return savedPlan ? JSON.parse(savedPlan) : null;
//   });
//   const navigate = useNavigate();

//   // State
//   const [currentDay, setCurrentDay] = useState("Monday");
//   const [completedTasks, setCompletedTasks] = useState(
//     JSON.parse(localStorage.getItem("completedTasks")) || {}
//   );
//   const [showAnswers, setShowAnswers] = useState({});

//   // Effect để lưu completedTasks vào localStorage
//   useEffect(() => {
//     localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
//   }, [completedTasks]);

//   if (!learningPlan) {
//     return <div className="text-center py-8">No learning plan available.</div>;
//   }

//   // Hàm xử lý chọn ngày
//   const handleDayChange = (day) => {
//     setCurrentDay(day);
//   };

//   // Hàm xử lý check task
//   const toggleTaskCompletion = (taskId, isChecked) => {
//     setCompletedTasks((prev) => {
//       if (isChecked) {
//         const now = new Date();
//         const timeString = now.toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         return { ...prev, [taskId]: { time: timeString } };
//       } else {
//         const newState = { ...prev };
//         delete newState[taskId];
//         return newState;
//       }
//     });
//   };

//   // Hàm xử lý check show answer
//   const toggleShowAnswer = (exerciseId, isChecked) => {
//     setShowAnswers((prev) => ({
//       ...prev,
//       [exerciseId]: isChecked,
//     }));
//   };

//   // Tính tiến độ
//   const calculateProgress = () => {
//     let totalTasks = 0;
//     let completedCount = 0;
//     let totalMinutes = 0;

//     for (const day in learningPlan.weeklyPlan) {
//       learningPlan.weeklyPlan[day].forEach((task, index) => {
//         const taskId = `${day}-${index}`;
//         totalTasks++;

//         if (completedTasks[taskId]) {
//           completedCount++;
//         }

//         if (!completedTasks[taskId] && task.duration !== "0 minutes") {
//           const minutes = parseInt(task.duration.split(" ")[0]) || 0;
//           totalMinutes += minutes;
//         }
//       });
//     }

//     const percentage = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
//     return { completedCount, totalTasks, totalMinutes, percentage };
//   };

//   // Lấy danh sách task đã hoàn thành cho timeline
//   const getCompletedTasks = () => {
//     const completedList = [];
//     for (const taskId in completedTasks) {
//       const [day, index] = taskId.split("-");
//       const task = learningPlan.weeklyPlan[day]?.[parseInt(index)];
//       if (task) {
//         completedList.push({
//           day,
//           task: task.task,
//           time: completedTasks[taskId].time,
//           type: task.type,
//           duration: task.duration,
//         });
//       }
//     }
//     completedList.sort((a, b) => {
//       const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//       return days.indexOf(a.day) - days.indexOf(b.day);
//     });
//     return completedList;
//   };

//   // Helper để lấy màu cho type và focus
//   const getTypeColor = (type) => {
//     switch (type) {
//       case "Reading/Writing":
//         return "bg-blue-100 text-blue-800";
//       case "Video":
//         return "bg-green-100 text-green-800";
//       case "Interactive":
//         return "bg-purple-100 text-purple-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getFocusColor = (focus) => {
//     switch (focus) {
//       case "Python Fundamentals":
//         return "bg-indigo-100 text-indigo-800";
//       case "Control Structures":
//         return "bg-blue-100 text-blue-800";
//       case "Data Structures":
//         return "bg-green-100 text-green-800";
//       case "Error Handling":
//         return "bg-yellow-100 text-yellow-800";
//       case "File Handling":
//         return "bg-purple-100 text-purple-800";
//       case "Review":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getResourceName = (resource) => {
//     if (resource.startsWith("http")) {
//       try {
//         const url = new URL(resource);
//         return url.hostname.replace("www.", "");
//       } catch {
//         return resource;
//       }
//     }
//     return resource;
//   };

//   const { completedCount, totalTasks, totalMinutes, percentage } = calculateProgress();
//   const completedList = getCompletedTasks();

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-20">
//       {/* Header Section */}
//       <header className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">
//               Welcome, <span className="text-blue-600">{learningPlan.user.name}</span>
//             </h1>
//             <p className="text-gray-600 mt-2">{learningPlan.user.summary.split(",")[0]}</p>
//             <div className="flex flex-wrap gap-2 mt-3">
//               <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">Technology</span>
//               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Science</span>
//               <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
//                 Reading/Writing
//               </span>
//             </div>
//           </div>
//           <div className="mt-4 md:mt-0 bg-gray-100 p-4 rounded-lg">
//             <h3 className="font-semibold text-gray-700">Current Focus</h3>
//             <p className="text-blue-600 font-medium">{learningPlan.weeklyPlan.Monday[0]?.focus}</p>
//             <p className="text-sm text-gray-600 mt-1">
//               Goal: {learningPlan.user.summary.match(/focused on (.*?)(?:\.|$)/)?.[1] || "Not specified"}
//             </p>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={() => navigate("/AiAssistant")}
//             className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </header>

//       {/* Progress Summary */}
//       <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h2>
//         <div className="flex items-center mb-2">
//           <div className="w-full bg-gray-200 rounded-full h-4">
//             <div
//               className="progress-bar bg-blue-600 h-4 rounded-full transition-all duration-500"
//               style={{ width: `${percentage}%` }}
//             ></div>
//           </div>
//           <span className="ml-4 text-gray-700 font-medium">{percentage}%</span>
//         </div>
//         <div className="flex justify-between text-sm text-gray-600">
//           <span>
//             Completed: <span>{completedCount}</span>/<span>{totalTasks}</span> tasks
//           </span>
//           <span>Total time: {totalMinutes} minutes</span>
//         </div>
//       </div>

//       {/* Notes Section */}
//       <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <FaLightbulb className="text-yellow-500 mt-1" />
//           </div>
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-yellow-800">Learning Plan Notes</h3>
//             <div className="mt-2 text-sm text-yellow-700">
//               {learningPlan.notes.split(". ").map((note, index) => (
//                 <p key={index}>• {note}</p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Weekly Plan Navigation */}
//       <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm">
//         {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
//           <button
//             key={day}
//             className={`px-6 py-3 text-gray-600 font-medium ${
//               currentDay === day ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
//             }`}
//             onClick={() => handleDayChange(day)}
//           >
//             {day}
//           </button>
//         ))}
//       </div>

//       {/* Tasks Display */}
//       <div className="grid gap-4 mb-8">
//         {learningPlan.weeklyPlan[currentDay]?.map((task, index) => {
//           const taskId = `${currentDay}-${index}`;
//           const isCompleted = !!completedTasks[taskId];

//           return (
//             <div
//               key={taskId}
//               className={`task-card bg-white rounded-lg shadow p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
//                 isCompleted ? "opacity-70 bg-green-50" : ""
//               }`}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start">
//                   <input
//                     type="checkbox"
//                     id={taskId}
//                     className="mt-1"
//                     checked={isCompleted}
//                     onChange={(e) => toggleTaskCompletion(taskId, e.target.checked)}
//                   />
//                   <div className="ml-3">
//                     <h3 className={`font-medium text-gray-800 ${isCompleted ? "line-through" : ""}`}>
//                       {task.task}
//                     </h3>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(task.type)}`}>
//                         {task.type}
//                       </span>
//                       <span className={`px-2 py-1 rounded-full text-xs ${getFocusColor(task.focus)}`}>
//                         {task.focus}
//                       </span>
//                       <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
//                         {task.duration}
//                       </span>
//                     </div>
//                     {task.resource !== "None" && (
//                       <div className="mt-3 text-sm">
//                         <span className="text-gray-600">Resource:</span>
//                         <a
//                           href={task.resource}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-blue-600 ml-1 hover:underline"
//                         >
//                           {getResourceName(task.resource)}
//                         </a>
//                       </div>
//                     )}
//                     {task.theory && (
//                       <div className="mt-3 text-sm bg-blue-50 p-3 rounded">
//                         <div className="font-medium text-blue-800">Theory:</div>
//                         <div className="text-blue-700 mt-1">{task.theory}</div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 {isCompleted && (
//                   <div className="text-green-500 flex items-center">
//                     <FaCheckCircle />
//                     <span className="ml-1 text-xs">Completed at {completedTasks[taskId].time}</span>
//                   </div>
//                 )}
//               </div>
//               {task.exercises?.length > 0 && (
//                 <div className="mt-4 border-t pt-4">
//                   <h4 className="font-medium text-gray-700 mb-2">Exercises:</h4>
//                   <div className="space-y-4">
//                     {task.exercises.map((exercise, exIndex) => {
//                       const exerciseId = `${taskId}-${exIndex}`;
//                       const isAnswerShown = !!showAnswers[exerciseId];

//                       return (
//                         <div key={exerciseId} className="bg-gray-50 p-3 rounded-lg">
//                           <div className="font-medium text-gray-800">{exercise.exercise}</div>
//                           <div className="text-sm text-gray-600 mt-1">{exercise.instructions}</div>
//                           <div className="flex items-center mt-2">
//                             <input
//                               type="checkbox"
//                               id={`show-${exerciseId}`}
//                               className="mr-2"
//                               checked={isAnswerShown}
//                               onChange={(e) => toggleShowAnswer(exerciseId, e.target.checked)}
//                             />
//                             <label htmlFor={`show-${exerciseId}`} className="text-sm">
//                               Show Answer
//                             </label>
//                           </div>
//                           <div
//                             className={`exercise-answer mt-2 overflow-hidden transition-all duration-300 ${
//                               isAnswerShown ? "max-h-[500px]" : "max-h-0"
//                             }`}
//                           >
//                             <div className="code-block bg-gray-100 rounded p-3 font-mono text-sm border-l-3 border-blue-500">
//                               {exercise.answer}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>

//       {/* Completed Tasks Timeline */}
//       <div className="bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Tasks Timeline</h2>
//         <div className="border-l-2 border-gray-200 pl-4 space-y-4">
//           {completedList.length === 0 ? (
//             <p className="text-gray-500 italic">No completed tasks yet</p>
//           ) : (
//             completedList.map((item, index) => (
//               <div key={index} className="relative pb-4">
//                 <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1 left-[-1.4rem] border border-white"></div>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h3 className="font-medium text-gray-800">{item.task}</h3>
//                     <div className="flex items-center mt-1">
//                       <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)} mr-2`}>
//                         {item.type}
//                       </span>
//                       <span className="text-xs text-gray-500">{item.duration}</span>
//                     </div>
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     <span className="font-medium">{item.day}</span>
//                     <span className="mx-1">•</span>
//                     <span>{item.time}</span>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LearningPlanPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLightbulb, FaCheckCircle, FaRobot } from "react-icons/fa";
import AIModelSelector from "../components/AIModelSelector";
import { callOpenAI } from "../models/gptModel";
import { callPhi } from "../models/phiModel";
import { callJamba } from "../models/jambaModel";
import { callDeepSeek } from "../models/deepSeekModel";
import { callLlama } from "../models/llamaModel";
import { createOptimizedPrompt } from "../utils/promptUtils";

const LearningPlanPage = () => {
  const [learningPlan, setLearningPlan] = useState(() => {
    const savedPlan = localStorage.getItem("learningPlanResponse");
    return savedPlan ? JSON.parse(savedPlan) : null;
  });
  const navigate = useNavigate();
  const [currentDay, setCurrentDay] = useState("Monday");
  const [completedTasks, setCompletedTasks] = useState(
    JSON.parse(localStorage.getItem("completedTasks")) || {}
  );
  const [showAnswers, setShowAnswers] = useState({});
  const [showFeedbackOptions, setShowFeedbackOptions] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-4o");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
  }, [completedTasks]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedPlan = localStorage.getItem("learningPlanResponse");
      if (savedPlan) {
        try {
          setLearningPlan(JSON.parse(savedPlan));
        } catch (error) {
          console.error("Error parsing learningPlanResponse:", error);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (!learningPlan) {
    return <div className="text-center py-8">No learning plan available.</div>;
  }

  const isAllTasksCompleted = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let allTasksCompleted = true;
    for (const day of days) {
      const tasks = learningPlan.weeklyPlan[day] || [];
      if (tasks.length === 0) continue;
      const dayCompleted = tasks.some((_, index) => completedTasks[`${day}-${index}`]);
      if (!dayCompleted) {
        allTasksCompleted = false;
        break;
      }
    }
    return allTasksCompleted;
  };

  const handleDayChange = (day) => {
    setCurrentDay(day);
  };

  const toggleTaskCompletion = (taskId, isChecked) => {
    setCompletedTasks((prev) => {
      if (isChecked) {
        const now = new Date();
        const timeString = now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return { ...prev, [taskId]: { time: timeString } };
      } else {
        const newState = { ...prev };
        delete newState[taskId];
        return newState;
      }
    });
  };

  const toggleShowAnswer = (exerciseId, isChecked) => {
    setShowAnswers((prev) => ({
      ...prev,
      [exerciseId]: isChecked,
    }));
  };

  const handleNotSatisfied = async () => {
    setIsLoading(true);
    setError(null);
    const progress = calculateProgress();
    const prompt = createOptimizedPrompt(learningPlan, completedTasks, progress);
    try {
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

      const cleanedResponse = response
        .replace(/```json\n/, '')
        .replace(/\n```/, '');
      console.log("New learningPlanResponse:", cleanedResponse);
      const parsedResponse = JSON.parse(cleanedResponse);
      if (!parsedResponse.user || !parsedResponse.weeklyPlan || !parsedResponse.notes) {
        throw new Error("Invalid learning plan structure");
      }
      localStorage.setItem("learningPlanResponse", cleanedResponse);
      setLearningPlan(parsedResponse);
      setCompletedTasks({});
      localStorage.setItem("completedTasks", JSON.stringify({}));
      setShowFeedbackOptions(false);
    } catch (error) {
      console.error("Error generating optimized plan:", error);
      setError("Failed to generate optimized plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateProgress = () => {
    let totalTasks = 0;
    let completedCount = 0;
    let totalMinutes = 0;
    for (const day in learningPlan.weeklyPlan) {
      learningPlan.weeklyPlan[day].forEach((task, index) => {
        const taskId = `${day}-${index}`;
        totalTasks++;
        if (completedTasks[taskId]) {
          completedCount++;
        }
        if (!completedTasks[taskId] && task.duration !== "0 minutes") {
          const minutes = parseInt(task.duration.split(" ")[0]) || 0;
          totalMinutes += minutes;
        }
      });
    }
    const percentage = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
    return { completedCount, totalTasks, totalMinutes, percentage };
  };

  const getCompletedTasks = () => {
    const completedList = [];
    for (const taskId in completedTasks) {
      const [day, index] = taskId.split("-");
      const task = learningPlan.weeklyPlan[day]?.[parseInt(index)];
      if (task) {
        completedList.push({
          day,
          task: task.task,
          time: completedTasks[taskId].time,
          type: task.type,
          duration: task.duration,
        });
      }
    }
    completedList.sort((a, b) => {
      const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return days.indexOf(a.day) - days.indexOf(b.day);
    });
    return completedList;
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Reading/Writing":
        return "bg-blue-100 text-blue-800";
      case "Video":
        return "bg-green-100 text-green-800";
      case "Interactive":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFocusColor = (focus) => {
    switch (focus) {
      case "Python Fundamentals":
        return "bg-indigo-100 text-indigo-800";
      case "Control Structures":
        return "bg-blue-100 text-blue-800";
      case "Data Structures":
        return "bg-green-100 text-green-800";
      case "Error Handling":
        return "bg-yellow-100 text-yellow-800";
      case "File Handling":
        return "bg-purple-100 text-purple-800";
      case "Review":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getResourceName = (resource) => {
    if (!resource || typeof resource !== "string") {
      return "None";
    }
    if (resource.startsWith("http")) {
      try {
        const url = new URL(resource);
        return url.hostname.replace("www.", "");
      } catch {
        return resource;
      }
    }
    return resource;
  };

  const { completedCount, totalTasks, totalMinutes, percentage } = calculateProgress();
  const completedList = getCompletedTasks();
  const showFeedbackButtons = isAllTasksCompleted();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-20">
      {/* Header Section */}
      <header className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome, <span className="text-blue-600">{learningPlan.user?.name || "User"}</span>
            </h1>
            <p className="text-gray-600 mt-2">{learningPlan.user?.summary?.split(",")[0] || "No summary"}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {Array.isArray(learningPlan.user?.interests) ? (
                learningPlan.user.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  No interests
                </span>
              )}
            </div>
          </div>
          <div className="mt-4 md:mt-0 bg-gray-100 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-700">Current Focus</h3>
            <p className="text-blue-600 font-medium">
              {learningPlan.weeklyPlan.Monday[0]?.focus || "Not specified"}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Goal: {learningPlan.user?.summary?.match(/focused on (.*?)(?:\.|$)/)?.[1] || "Not specified"}
            </p>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={() => navigate("/AiAssistant")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
          >
            Back to Dashboard
          </button>
        </div>
      </header>

      {/* Progress Summary */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h2>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="progress-bar bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="ml-4 text-gray-700 font-medium">{percentage}%</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Completed: <span>{completedCount}</span>/<span>{totalTasks}</span> tasks
          </span>
          <span>Total time: {totalMinutes} minutes</span>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
        <div className="flex">
          <div className="flex-shrink-0">
            <FaLightbulb className="text-yellow-500 mt-1" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Learning Plan Notes</h3>
            <div className="mt-2 text-sm text-yellow-700">
              {learningPlan.notes?.split(". ").map((note, index) => (
                <p key={index}>• {note}</p>
              )) || <p>• No notes available</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Plan Navigation */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
          <button
            key={day}
            className={`px-6 py-3 text-gray-600 font-medium ${
              currentDay === day ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
            }`}
            onClick={() => handleDayChange(day)}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Tasks Display */}
      <div className="grid gap-4 mb-8">
        {learningPlan.weeklyPlan[currentDay]?.map((task, index) => {
          const taskId = `${currentDay}-${index}`;
          const isCompleted = !!completedTasks[taskId];
          return (
            <div
              key={taskId}
              className={`task-card bg-white rounded-lg shadow p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                isCompleted ? "opacity-70 bg-green-50" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={taskId}
                    className="mt-1"
                    checked={isCompleted}
                    onChange={(e) => toggleTaskCompletion(taskId, e.target.checked)}
                  />
                  <div className="ml-3">
                    <h3 className={`font-medium text-gray-800 ${isCompleted ? "line-through" : ""}`}>
                      {task.task}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(task.type)}`}>
                        {task.type}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${getFocusColor(task.focus)}`}>
                        {task.focus}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                        {task.duration}
                      </span>
                    </div>
                    {task.resource !== "None" && (
                      <div className="mt-3 text-sm">
                        <span className="text-gray-600">Resource:</span>
                        <a
                          href={task.resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 ml-1 hover:underline"
                        >
                          {getResourceName(task.resource)}
                        </a>
                      </div>
                    )}
                    {task.theory && (
                      <div className="mt-3 text-sm bg-blue-50 p-3 rounded">
                        <div className="font-medium text-blue-800">Theory:</div>
                        <div className="text-blue-700 mt-1">{task.theory}</div>
                      </div>
                    )}
                  </div>
                </div>
                {isCompleted && (
                  <div className="text-green-500 flex items-center">
                    <FaCheckCircle />
                    <span className="ml-1 text-xs">Completed at {completedTasks[taskId].time}</span>
                  </div>
                )}
              </div>
              {task.exercises?.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Exercises:</h4>
                  <div className="space-y-4">
                    {task.exercises.map((exercise, exIndex) => {
                      const exerciseId = `${taskId}-${exIndex}`;
                      const isAnswerShown = !!showAnswers[exerciseId];
                      return (
                        <div key={exerciseId} className="bg-gray-50 p-3 rounded-lg">
                          <div className="font-medium text-gray-800">{exercise.exercise}</div>
                          <div className="text-sm text-gray-600 mt-1">{exercise.instructions}</div>
                          <div className="flex items-center mt-2">
                            <input
                              type="checkbox"
                              id={`show-${exerciseId}`}
                              className="mr-2"
                              checked={isAnswerShown}
                              onChange={(e) => toggleShowAnswer(exerciseId, e.target.checked)}
                            />
                            <label htmlFor={`show-${exerciseId}`} className="text-sm">
                              Show Answer
                            </label>
                          </div>
                          <div
                            className={`exercise-answer mt-2 overflow-hidden transition-all duration-300 ${
                              isAnswerShown ? "max-h-[500px]" : "max-h-0"
                            }`}
                          >
                            <div className="code-block bg-gray-100 rounded p-3 font-mono text-sm border-l-3 border-blue-500">
                              {exercise.answer}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completed Tasks Timeline */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Completed Tasks Timeline</h2>
        <div className="border-l-2 border-gray-200 pl-4 space-y-4">
          {completedList.length === 0 ? (
            <p className="text-gray-500 italic">No completed tasks yet</p>
          ) : (
            completedList.map((item, index) => (
              <div key={index} className="relative pb-4">
                <div className="absolute w-3 h-3 bg-blue-500 rounded-full mt-1 left-[-1.4rem] border border-white"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{item.task}</h3>
                    <div className="flex items-center mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(item.type)} mr-2`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">{item.duration}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    <span className="font-medium">{item.day}</span>
                    <span className="mx-1">•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Feedback Section */}
      {showFeedbackButtons && (
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h2>
          <div className="flex flex-col items-center">
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/AiAssistant")}
                className="text-blue-600 hover:underline font-medium"
              >
                Satisfied
              </button>
              <button
                onClick={() => setShowFeedbackOptions(!showFeedbackOptions)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-6 rounded-lg transition"
              >
                Not Satisfied?
              </button>
            </div>
            {showFeedbackOptions && (
              <div className="mt-4 flex flex-col items-center gap-4">
                <AIModelSelector selectedModel={selectedModel} setSelectedModel={setSelectedModel} />
                <button
                  onClick={handleNotSatisfied}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition"
                  disabled={isLoading}
                >
                  <FaRobot className="inline mr-2" /> {isLoading ? "Generating..." : "ReGenerate"}
                </button>
                {error && <p className="text-red-600 text-sm">{error}</p>}
              </div>
            )}
            {isLoading && (
              <div className="mt-4 animate-pulse flex space-x-4">
                <div className="flex-1 space-y-4 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPlanPage;