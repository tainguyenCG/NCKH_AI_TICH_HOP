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
  getExercisesByWeekId,
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
  const [weekSummary, setWeekSummary] = useState(null);
  const [finalExercise, setFinalExercise] = useState(null);

  // Lấy thông tin khóa học và tuần hiện tại khi component mount
  useEffect(() => {
    let isMounted = true;

    const fetchInitialData = async () => {
      try {
        const profileResponse = await getProfiles();
        const profile = profileResponse.data.find((p) => p.id === profileId);
        if (!profile) throw new Error("Profile not found");
        if (isMounted) setCourse(profile);

        const storedWeekId = localStorage.getItem(`weekId_${profileId}`);
        let weekResponse;

        try {
          if (storedWeekId) {
            weekResponse = await getTasksByWeek(storedWeekId);
          } else {
            weekResponse = await getTasksByProfile(profileId);
            const initialWeekId = weekResponse.data.week.id;
            localStorage.setItem(`weekId_${profileId}`, initialWeekId);
          }
        } catch (error) {
          console.error(`Error fetching tasks for week ${storedWeekId}:`, error.message);
          weekResponse = await getTasksByProfile(profileId);
          const fallbackWeekId = weekResponse.data.week.id;
          localStorage.setItem(`weekId_${profileId}`, fallbackWeekId);
        }

        if (isMounted) {
          setWeekData(weekResponse.data);
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
        if (isMounted) setLoading(false);
      }
    };

    if (profileId) fetchInitialData();

    return () => {
      isMounted = false;
    };
  }, [profileId]);

  // Tự động tải bài tập và kết quả cho task hoàn thành, đồng thời lấy summary nếu tuần hoàn thành
  useEffect(() => {
    let isMounted = true;

    const fetchCompletedTasksData = async () => {
      if (!weekData?.tasks_by_day || !weekData.week?.id) return;

      try {
        const summaryResponse = await getExercisesSummary(weekData.week.id);
        const resultsData = summaryResponse.data.results || [];
        const resultsMap = {};
        resultsData.forEach((result) => {
          resultsMap[result.exercise_id] = result;
        });
        if (isMounted) {
          setExerciseResults((prev) => ({ ...prev, ...resultsMap }));
        }

        const completedTasks = [];
        const allTasks = [];
        Object.values(weekData.tasks_by_day).forEach((tasks) => {
          tasks.forEach((task) => {
            allTasks.push(task);
            if (task.is_done) completedTasks.push(task);
          });
        });

        for (const task of completedTasks) {
          try {
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

        const allTasksCompleted = allTasks.every((task) => task.is_done);
        if (allTasksCompleted) {
          try {
            const summaryResponse = await getExercisesSummary(weekData.week.id);
            if (summaryResponse.status === 200) {
              if (isMounted) setWeekSummary(summaryResponse.data);
            }
          } catch (error) {
            console.error("Error fetching week summary:", error.message);
          }
        }
      } catch (error) {
        console.error(`Error fetching exercises summary:`, error.message);
      }
    };

    fetchCompletedTasksData();

    return () => {
      isMounted = false;
    };
  }, [weekData]);

  // Lấy bài tập cuối tuần khi nhấn vào tab Exam
  const fetchFinalExercise = async () => {
    try {
      const finalExerciseResponse = await getExercisesByWeekId(weekData.week.id);
      const finalExerciseData = finalExerciseResponse.data && finalExerciseResponse.data.length > 0 ? finalExerciseResponse.data[0] : null;
      setFinalExercise(finalExerciseData);
      if (finalExerciseData) {
        setTimers((prev) => ({ ...prev, "final_exercise": { start: new Date() } }));
        toast.info("Weekly Final Exercise is now available!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-yellow-600 text-white",
        });
      } else {
        toast.error("No final exercise available for this week.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-red-600 text-white",
        });
      }
    } catch (error) {
      console.error("Error fetching final exercise:", error.message);
      toast.error("Failed to load Weekly Final Exercise.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    }
  };

  // Lấy bài tập theo task (cho task chưa hoàn thành)
  const fetchExercises = async (taskId) => {
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
    }
  };

  // Submit bài tập
  const handleSubmitExercise = async (taskId, exerciseId, answer) => {
    try {
      const response = await submitExercise({ id: exerciseId, user_answer: answer });
      setExerciseResults((prev) => ({
        ...prev,
        [exerciseId]: response.data,
      }));
      setTimers((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], end: new Date() },
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
      // Cập nhật trạng thái submit của finalExercise nếu là bài tập cuối tuần
      if (taskId === "final_exercise" && finalExercise) {
        setFinalExercise((prev) => ({ ...prev, is_submitted: 1 }));
      }
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
    }
  };

  // Đánh dấu task hoàn thành
  const handleMarkTaskCompleted = async (taskId) => {
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
    }
  };

  // Kiểm tra điều kiện để bật nút Generate for Next Week
  const canGenerateNextWeek = () => {
    if (!weekData?.tasks_by_day) return false;
    const allTasksDone = Object.values(weekData.tasks_by_day).every((tasks) =>
      tasks.every((task) => task.is_done)
    );
    const isFinalExerciseSubmitted = finalExercise ? finalExercise.is_submitted === 1 : false;
    return allTasksDone && isFinalExerciseSubmitted;
  };

  // Kiểm tra điều kiện để hiển thị tab Exam
  const canShowExamTab = () => {
    if (!weekData?.tasks_by_day) return false;
    return Object.values(weekData.tasks_by_day).every((tasks) =>
      tasks.every((task) => task.is_done)
    );
  };

  // Tạo task cho tuần tiếp theo
  const handleGenerateNextWeek = async () => {
    try {
      const response = await generateNext({ profile_id: profileId });
      const newWeek = response.data.week;
      const feedback = response.data.feedback;
      localStorage.setItem(`weekId_${profileId}`, newWeek.id);
      const weekResponse = await getTasksByWeek(newWeek.id);
      setWeekData({ ...weekResponse.data, feedback });
      setWeekSummary(null);
      setExercises({});
      setExerciseResults({});
      setUserAnswers({});
      setTimers({});
      setFinalExercise(null);
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
    }
  };

  // Tính tiến độ
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

  // Format ngày
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const { completedCount, totalTasks, percentage } = calculateProgress();

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!course || !profileId) {
    return <div className="text-center py-8">No course selected.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 font-poppins">
      {/* Course Info Section */}
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
            Current Week: {weekData?.week?.id || "N/A"} (Start: {formatDate(weekData?.week?.start_date)})
          </span>
          <button
            onClick={handleGenerateNextWeek}
            disabled={!canGenerateNextWeek()}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
              canGenerateNextWeek()
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaPlus className="text-sm" />
            <span>Generate for Next Week</span>
          </button>
        </div>
      </header>

      {/* Week Info Section */}
      <WeekInfo weekData={weekData} />

      {/* Progress Summary */}
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

      {/* Weekly Plan Navigation */}
      <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
          (day) => (
            <button
              key={day}
              className={`px-6 py-3 text-gray-600 font-medium ${
                currentDay === day ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
              }`}
              onClick={() => setCurrentDay(day)}
            >
              {day}
            </button>
          )
        )}
        {canShowExamTab() && (
          <button
            className={`px-6 py-3 text-gray-600 font-medium ${
              currentDay === "Exam" ? "border-b-3 border-blue-500 text-blue-600 font-semibold" : ""
            }`}
            onClick={() => {
              setCurrentDay("Exam");
              if (!finalExercise) {
                fetchFinalExercise();
              }
            }}
          >
            Exam
          </button>
        )}
      </div>

      {/* Tasks Display hoặc Final Exercise */}
      <div className="grid gap-4 mb-8">
        {currentDay !== "Exam" ? (
          weekData?.tasks_by_day?.[currentDay]?.length > 0 ? (
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
                        className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Mark as Completed
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
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg mb-4"
                    >
                      Load Exercises
                    </button>
                  )}
                  {exercises[task.id]?.length > 0 ? (
                    exercises[task.id].map((exercise) => (
                      <ExerciseItem
                        key={exercise.id}
                        exercise={exercise}
                        taskId={task.id}
                        isTaskDone={task.is_done}
                        userAnswers={userAnswers}
                        setUserAnswers={setUserAnswers}
                        exerciseResults={exerciseResults}
                        timers={timers}
                        handleSubmitExercise={handleSubmitExercise}
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
          )
        ) : (
          finalExercise ? (
            <div className="bg-white rounded-lg shadow p-5">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Final Exam</h2>
              <ExerciseItem
                exercise={finalExercise}
                taskId="final_exercise"
                isTaskDone={finalExercise.is_submitted}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
                exerciseResults={exerciseResults}
                timers={timers}
                handleSubmitExercise={handleSubmitExercise}
              />
            </div>
          ) : (
            <p>Loading final exam...</p>
          )
        )}
      </div>

      {/* Section 1: Exercises Tổng Quát của Cả Tuần */}
      {canShowExamTab() && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Exercises Overview</h2>
          {Object.keys(exercises).length > 0 ? (
            Object.entries(exercises).map(([taskId, taskExercises]) => (
              <div key={taskId} className="mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Task {taskId}:{" "}
                  {weekData.tasks_by_day[currentDay === "Exam" ? "Sunday" : currentDay].find(
                    (task) => task.id === parseInt(taskId)
                  )?.task || "Unknown Task"}
                </h3>
                {taskExercises.map((exercise) => (
                  <div key={exercise.id} className="bg-gray-50 p-3 rounded-lg mt-2">
                    <p className="text-sm font-medium text-gray-800">{exercise.exercise}</p>
                    <p className="text-sm text-gray-600">Type: {exercise.type}</p>
                    <p className="text-sm text-gray-600">
                      Your Answer: {exercise.user_answer || "Not answered"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: {exercise.is_correct ? "Correct" : "Incorrect"}
                    </p>
                    <p className="text-sm text-gray-600">Score: {exercise.user_score}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No exercises available for this week.</p>
          )}
        </div>
      )}

      {/* Section 2: Summary Exercises của Tuần */}
      {weekSummary && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Exercises Summary</h2>
          <div className="text-sm text-gray-600">
            <p>Total Exercises: {weekSummary.summary.total_exercises}</p>
            <p>Correct Exercises: {weekSummary.summary.correct_exercises}</p>
            <p>Total Score: {weekSummary.summary.score}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPlan;
