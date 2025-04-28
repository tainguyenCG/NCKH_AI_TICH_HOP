import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCheckCircle, FaPlus, FaCircle } from "react-icons/fa";
import {
  getProfiles,
  getTasksByProfile,
  getTasksByWeek,
  getExerciseByTaskId,
  getExercisesSummary,
  submitExercise,
  updateTaskStatus,
  generateNext,
} from "../utils/api";
import WeekInfo from "../components/WeekInfo";
import ExerciseItem from "../components/ExerciseItem";

const LearningPlan = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileId, courseName } = location.state || {};

  const [course, setCourse] = useState(null);
  const [weekData, setWeekData] = useState(null);
  const [currentDay, setCurrentDay] = useState("Monday");
  const [completedTasks, setCompletedTasks] = useState({});
  const [exercises, setExercises] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [exerciseResults, setExerciseResults] = useState({});
  const [timers, setTimers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [weekSummary, setWeekSummary] = useState(null);
  const [hasFetchedSummary, setHasFetchedSummary] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        setIsLoading(true);
        setLoadingMessage("Fetching course profile...");

        const profileResponse = await getProfiles();
        const profile = profileResponse.data.find((p) => p.id === profileId);
        if (!profile) throw new Error("Profile not found");
        if (isMounted) setCourse(profile);

        const storedWeekId = localStorage.getItem(`weekId_${profileId}`);
        let weekResponse;

        console.log(`Stored weekId for profile ${profileId}:`, storedWeekId);

        if (storedWeekId) {
          setLoadingMessage(`Fetching tasks for week ${storedWeekId}...`);
          console.log(`Fetching tasks for week ${storedWeekId}`);
          try {
            weekResponse = await getTasksByWeek(storedWeekId);
            console.log("Tasks by week response:", weekResponse.data);
            if (isMounted) {
              toast.info("Loading existing week plan", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "bg-blue-600 text-white",
              });
            }
          } catch (error) {
            console.error(`Error fetching tasks for week ${storedWeekId}:`, error.message);
            setLoadingMessage(`Fetching tasks for profile ${profileId} (fallback)...`);
            weekResponse = await getTasksByProfile(profileId);
            console.log("Tasks by profile response (fallback):", weekResponse.data);
            if (!weekResponse.data || !weekResponse.data.week) {
              throw new Error("No tasks or week data available");
            }
            const fallbackWeekId = weekResponse.data.week.id;
            localStorage.setItem(`weekId_${profileId}`, fallbackWeekId);
            console.log(`Updated weekId in localStorage to: ${fallbackWeekId}`);
            if (isMounted) {
              toast.warn("Fetched tasks from profile as fallback", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                className: "bg-yellow-600 text-white",
              });
            }
          }
        } else {
          setLoadingMessage(`Fetching tasks for profile ${profileId}...`);
          console.log(`Fetching tasks by profile ${profileId}`);
          weekResponse = await getTasksByProfile(profileId);
          console.log("Tasks by profile response:", weekResponse.data);
          if (!weekResponse.data || !weekResponse.data.week) {
            throw new Error("No tasks or week data available");
          }
          const initialWeekId = weekResponse.data.week.id;
          localStorage.setItem(`weekId_${profileId}`, initialWeekId);
          console.log(`Set initial weekId in localStorage to: ${initialWeekId}`);
          if (isMounted) {
            toast.success("Tasks fetched successfully", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              className: "bg-blue-600 text-white",
            });
          }
        }

        if (isMounted) {
          setWeekData(weekResponse.data);
          setExercises({});
          setExerciseResults({});
          setUserAnswers({});
          setTimers({});
          setHasFetchedSummary(false);
        }
      } catch (error) {
        if (isMounted) {
          toast.error(error.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "bg-red-600 text-white",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setLoadingMessage("");
          setLoading(false);
        }
      }
    };

    if (profileId) fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [profileId]);

  useEffect(() => {
    let isMounted = true;

    const fetchCompletedTasksData = async () => {
      if (!weekData?.tasks_by_day || !weekData.week?.id) return;

      try {
        setIsLoading(true);
        setLoadingMessage("Fetching exercises for completed tasks...");

        const completedTasks = [];
        Object.values(weekData.tasks_by_day).forEach((tasks) => {
          tasks.forEach((task) => {
            if (task.is_done) completedTasks.push(task);
          });
        });

        for (const task of completedTasks) {
          try {
            setLoadingMessage(`Fetching exercises for task ${task.id}...`);
            const exerciseResponse = await getExerciseByTaskId(task.id);
            const exerciseData = Array.isArray(exerciseResponse.data)
              ? exerciseResponse.data
              : exerciseResponse.data.data || [];
            if (isMounted) {
              setExercises((prev) => ({ ...prev, [task.id]: exerciseData }));
            }
          } catch (error) {
            console.error(`Error fetching exercises for task ${task.id}:`, error.message);
          }
        }
      } catch (error) {
        console.error(`Error fetching completed tasks data:`, error.message);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setLoadingMessage("");
        }
      }
    };

    fetchCompletedTasksData();

    return () => {
      isMounted = false;
    };
  }, [weekData]);

  useEffect(() => {
    let isMounted = true;

    const fetchExercisesSummary = async () => {
      if (!weekData?.week?.id || hasFetchedSummary) return;

      try {
        setIsLoading(true);
        setLoadingMessage("Fetching exercises summary...");

        console.log(`Fetching exercises summary for weekId: ${weekData.week.id}`);
        const summaryResponse = await getExercisesSummary(weekData.week.id);
        console.log("Dữ liệu từ getExercisesSummary:", summaryResponse);

        const resultsData = summaryResponse.data.results || [];
        const resultsMap = {};
        resultsData.forEach((result) => {
          resultsMap[result.exercise_id] = result;
        });

        if (isMounted) {
          setExerciseResults((prev) => ({ ...prev, ...resultsMap }));
          setHasFetchedSummary(true);
          toast.success("Exercises summary loaded successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "bg-blue-600 text-white",
          });
        }
      } catch (error) {
        console.error("Error fetching exercises summary:", error.message);
        if (isMounted) {
          toast.error("Failed to load exercises summary", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "bg-red-600 text-white",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setLoadingMessage("");
        }
      }
    };

    if (currentDay === "Summary" && !hasFetchedSummary) {
      fetchExercisesSummary();
    }

    return () => {
      isMounted = false;
    };
  }, [currentDay, weekData, hasFetchedSummary]);

  const fetchExercises = async (taskId) => {
    setIsLoading(true);
    setLoadingMessage(`Loading exercises for task ${taskId}...`);

    try {
      const response = await getExerciseByTaskId(taskId);
      const exerciseData = Array.isArray(response.data) ? response.data : response.data.data || [];
      setExercises((prev) => ({ ...prev, [taskId]: exerciseData }));
      setTimers((prev) => ({ ...prev, [taskId]: { start: new Date() } }));
      toast.success("Exercises loaded successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-blue-600 text-white",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleSubmitExercise = async (taskId, exerciseId, answer) => {
    setIsLoading(true);
    setLoadingMessage("Submitting your exercise answer...");

    try {
      if (!answer || answer.trim() === "") {
        toast.error("Please provide an answer before submitting.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-red-600 text-white",
        });
        return;
      }

      const response = await submitExercise({ id: exerciseId, user_answer: answer });
      setTimers((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], end: new Date() },
      }));

      // Cập nhật exerciseResults với dữ liệu từ API
      const resultData = response.data; // Dữ liệu từ API: { date, score, answer, correct, your_answer, ai_feedback, ai_explanation }
      setExerciseResults((prev) => ({
        ...prev,
        [exerciseId]: {
          your_answer: resultData.your_answer,
          answer: resultData.answer,
          correct: resultData.correct,
          score: resultData.score,
          ai_feedback: resultData.ai_feedback,
          ai_explanation: resultData.ai_explanation,
          date: resultData.date,
        },
      }));

      setExercises((prev) => ({
        ...prev,
        [taskId]: prev[taskId].map((ex) =>
          ex.id === exerciseId ? { ...ex, is_submitted: 1 } : ex
        ),
      }));

      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-blue-600 text-white",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleMarkTaskCompleted = async (taskId) => {
    setIsLoading(true);
    setLoadingMessage(`Marking task ${taskId} as completed...`);

    try {
      await updateTaskStatus(taskId, true);
      setCompletedTasks((prev) => ({ ...prev, [taskId]: true }));
      setWeekData((prev) => ({
        ...prev,
        tasks_by_day: {
          ...prev.tasks_by_day,
          [currentDay]: prev.tasks_by_day[currentDay].map((task) =>
            task.id === taskId ? { ...task, is_done: true } : task
          ),
        },
      }));
      toast.success("Task marked as completed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-green-600 text-white",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      console.error(`Error marking task ${taskId} as completed:`, errorMessage);
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const canGenerateNextWeek = () => {
    if (!weekData?.tasks_by_day) return false;
    const allTasksDone = Object.values(weekData.tasks_by_day).every((tasks) =>
      tasks.every((task) => task.is_done)
    );
    return allTasksDone;
  };

  const canShowSummaryTab = () => {
    if (!weekData?.tasks_by_day) return false;
    return Object.values(weekData.tasks_by_day).every((tasks) =>
      tasks.every((task) => task.is_done)
    );
  };

  const handleGenerateNextWeek = async () => {
    setIsLoading(true);
    setLoadingMessage("Generating tasks for next week...");

    try {
      const response = await generateNext({ profile_id: profileId });
      const newWeek = response.data.week;
      const feedback = response.data.feedback;
      localStorage.setItem(`weekId_${profileId}`, newWeek.id);
      console.log(`Updated weekId in localStorage after generating next week: ${newWeek.id}`);

      setLoadingMessage("Fetching tasks for the new week...");
      const weekResponse = await getTasksByWeek(newWeek.id);

      setWeekData({ ...weekResponse.data, feedback });
      setWeekSummary(null);
      setExercises({});
      setExerciseResults({});
      setUserAnswers({});
      setTimers({});
      setHasFetchedSummary(false);
      setCurrentDay("Monday");
      toast.success("Tasks generated for next week", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-blue-600 text-white",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const calculateProgress = () => {
    if (!weekData?.tasks_by_day) return { completedCount: 0, totalTasks: 0, percentage: 0 };
    let totalTasks = 0;
    let completedCount = 0;
    Object.values(weekData.tasks_by_day).forEach((tasks) => {
      totalTasks += tasks.length;
      completedCount += tasks.filter((task) => task.is_done).length;
    });
    const percentage = totalTasks ? Math.round((completedCount / totalTasks) * 100) : 0;
    return { completedCount, totalTasks, percentage };
  };

  const calculateExercisesStats = () => {
    let totalExercises = 0;
    let submittedExercises = 0;

    Object.values(exercises).forEach((taskExercises) => {
      totalExercises += taskExercises.length;
      submittedExercises += taskExercises.filter((ex) => ex.is_submitted === 1).length;
    });

    const completionRate = totalExercises ? Math.round((submittedExercises / totalExercises) * 100) : 0;
    return { totalExercises, submittedExercises, completionRate };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const { completedCount, totalTasks, percentage } = calculateProgress();
  const { totalExercises, submittedExercises, completionRate } = calculateExercisesStats();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!course || !profileId) {
    return <div className="text-center py-8">No course selected.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-poppins relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
            <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
              {loadingMessage}
            </p>
          </div>
        </div>
      )}

      <header className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{course.course_name}</h1>
        <p className="text-gray-600 mt-2">{course.goals}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {course.secondary_skills.map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            Start: {formatDate(weekData?.week?.start_date)}
          </span>
          <button
            onClick={handleGenerateNextWeek}
            disabled={!canGenerateNextWeek() || isLoading}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              canGenerateNextWeek() && !isLoading
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid mr-2"></span>
                <span>Generating...</span>
              </>
            ) : (
              <>
                <FaPlus className="text-sm" />
                <span>Generate for Next Week</span>
              </>
            )}
          </button>
        </div>
      </header>

      <WeekInfo weekData={weekData} />

      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Progress</h2>
        <div className="flex items-center mb-2">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-600 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          <span className="ml-4 text-gray-700 font-medium">{percentage}%</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Completed: {completedCount}/{totalTasks} tasks</span>
        </div>
      </div>

      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
          (day) => (
            <button
              key={day}
              className={`px-6 py-3 text-gray-600 font-medium ${
                currentDay === day ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setCurrentDay(day)}
              disabled={isLoading}
            >
              {day}
            </button>
          )
        )}
        {canShowSummaryTab() && (
          <button
            className={`px-6 py-3 text-gray-600 font-medium ${
              currentDay === "Summary" ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
            }`}
            onClick={() => setCurrentDay("Summary")}
            disabled={isLoading}
          >
            Summary
          </button>
        )}
      </div>

      <div className="grid gap-4 mb-8">
        {currentDay === "Summary" ? (
          <div className="bg-white rounded-lg shadow p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Total Exercises of This Week</h2>
            <div className="bg-gray-50 p-3 rounded-lg mb-6">
              <h4 className="font-medium text-gray-800">Weekly Exercises Statistics</h4>
              <p className="text-sm text-gray-600 mt-1">
                Total Exercises: {totalExercises}
              </p>
              <p className="text-sm text-gray-600">
                Submitted Exercises: {submittedExercises}
              </p>
              <p className="text-sm text-gray-600">
                Completion Rate: {completionRate}%
              </p>
              {totalExercises > 0 && submittedExercises === totalExercises ? (
                <div className="mt-2 p-3 bg-green-100 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Status:</strong> All exercises have been submitted!
                  </p>
                </div>
              ) : totalExercises > 0 ? (
                <div className="mt-2 p-3 bg-yellow-100 rounded">
                  <p className="text-sm text-yellow-800">
                    <strong>Status:</strong> {totalExercises - submittedExercises} exercise(s) remaining to submit.
                  </p>
                </div>
              ) : (
                <div className="mt-2 p-3 bg-red-100 rounded">
                  <p className="text-sm text-red-800">
                    <strong>Status:</strong> No exercises available for this week.
                  </p>
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
            {Object.keys(exercises).length > 0 ? (
              Object.entries(exercises).map(([taskId, taskExercises]) => (
                <div key={taskId} className="mb-4">
                  <h3 className="text-lg font-medium text-gray-700">
                    Task {taskId}:{" "}
                    {Object.values(weekData.tasks_by_day)
                      .flat()
                      .find((task) => task.id === parseInt(taskId))?.task || "Unknown Task"}
                  </h3>
                  {taskExercises.map((exercise) => (
                    <div key={exercise.id} className="bg-gray-50 p-3 rounded-lg mt-2">
                      <p className="text-sm font-medium text-gray-800">{exercise.exercise || exercise.question}</p>
                      <p className="text-sm text-gray-600">Type: {exercise.type}</p>
                      <p className="text-sm text-gray-600">
                        Your Answer: {(exerciseResults[exercise.id]?.your_answer || userAnswers[exercise.id]) || "Not answered"}
                      </p>
                      {exerciseResults[exercise.id] && (
                        <>
                          <p className="text-sm text-gray-600">
                            Status: {exerciseResults[exercise.id].correct ? "Correct" : "Incorrect"}
                          </p>
                          <p className="text-sm text-gray-600">Score: {exerciseResults[exercise.id].score}</p>
                          {exerciseResults[exercise.id]?.ai_feedback && (
                            <p className="text-sm text-gray-600">
                              AI Feedback: {exerciseResults[exercise.id].ai_feedback}
                            </p>
                          )}
                          {exerciseResults[exercise.id]?.ai_explanation && (
                            <p className="text-sm text-gray-600">
                              AI Explanation: {exerciseResults[exercise.id].ai_explanation}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-600">No exercises completed this week.</p>
            )}
          </div>
        ) : weekData?.tasks_by_day?.[currentDay]?.length > 0 ? (
          weekData.tasks_by_day[currentDay].map((task) => (
            <div
              key={task.id}
              className={`bg-white rounded-lg shadow p-5 ${
                task.is_done ? "opacity-70 bg-green-50" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row items-start justify-between">
                <div className="flex-1">
                  <h3
                    className={`font-medium text-gray-800 ${task.is_done ? "line-through" : ""}`}
                  >
                    {task.task}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Type: {task.type}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Focus: {task.focus}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">
                      Duration: {task.duration}
                    </span>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2">
                    <p>Task ID: {task.id}</p>
                    <p>Week: {weekData?.week?.id || "N/A"}</p>
                    <p>Learning Week ID: {task.learning_week_id}</p>
                    <p>Day: {task.day}</p>
                    <p>User ID: {task.user_id}</p>
                    <p>Status: {task.is_done ? "Completed" : "Incomplete"}</p>
                    {task.theory && <p>Theory: {task.theory}</p>}
                    {task.resource && (
                      <p>
                        Resource:{" "}
                        <a
                          href={task.resource}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {task.resource}
                        </a>
                      </p>
                    )}
                    {task.expired_at && <p>Expires: {formatDate(task.expired_at)}</p>}
                    <p>Created: {formatDate(task.created_at)}</p>
                    <p>Updated: {formatDate(task.updated_at)}</p>
                  </div>
                  {!task.is_done && (
                    <button
                      onClick={() => handleMarkTaskCompleted(task.id)}
                      className={`mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
                        isLoading
                          ? "bg-blue-600/50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid mr-2"></span>
                          <span>Marking...</span>
                        </>
                      ) : (
                        <span>Mark as Completed</span>
                      )}
                    </button>
                  )}
                </div>
                <div className="flex flex-col items-end mt-4 md:mt-0">
                  <div className="flex items-center space-x-2">
                    <FaCircle className="text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Due {formatDate(task.created_at)}
                    </span>
                  </div>
                  {task.is_done && (
                    <span className="text-green-500 flex items-center mt-2">
                      <FaCheckCircle />
                      <span className="ml-1 text-xs">Completed</span>
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 border-t pt-4">
                {!task.is_done && (
                  <button
                    onClick={() => fetchExercises(task.id)}
                    className={`bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 flex items-center space-x-2 ${
                      isLoading
                        ? "bg-blue-600/50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid mr-2"></span>
                        <span>Loading...</span>
                      </>
                    ) : (
                      <span>Load Exercises</span>
                    )}
                  </button>
                )}
                {exercises[task.id]?.length > 0 ? (
                  exercises[task.id].map((exercise) => (
                    <ExerciseItem
                      key={exercise.id}
                      exercise={exercise}
                      taskId={task.id}
                      userAnswers={userAnswers}
                      setUserAnswers={setUserAnswers}
                      exerciseResults={exerciseResults}
                      timers={timers}
                      handleSubmitExercise={handleSubmitExercise}
                      isLoading={isLoading}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-600">
                    {task.is_done ? "Exercises loaded automatically." : "No exercises loaded."}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No tasks for this day.</p>
        )}
      </div>
    </div>
  );
};

export default LearningPlan;