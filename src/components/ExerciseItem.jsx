import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ExerciseItem = ({
  exercise,
  taskId,
  userAnswers,
  setUserAnswers,
  exerciseResults,
  timers,
  handleSubmitExercise,
  isLoading,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  // Đếm thời gian liên tục khi bắt đầu làm bài
  useEffect(() => {
    let interval;
    if (timers[taskId]?.start && !timers[taskId]?.end) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - new Date(timers[taskId].start)) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timers, taskId]);

  // Định dạng thời gian từ ISO string
  const formatDateTime = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // Định dạng thời lượng (duration) từ giây sang phút:giây
  const formatDuration = (seconds) => {
    if (!seconds && seconds !== 0) return "N/A";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Xử lý thay đổi đáp án
  const handleAnswerChange = (value) => {
    if (exercise.is_submitted === 1) return; // Không cho chỉnh sửa nếu đã nộp
    setUserAnswers((prev) => ({ ...prev, [exercise.id]: value }));
  };

  // Xử lý submit
  const handleSubmit = () => {
    if (exercise.is_submitted === 1) return; // Không cho submit nếu đã nộp
    if (!userAnswers[exercise.id] || userAnswers[exercise.id].trim() === "") {
      alert("Please provide an answer before submitting.");
      return;
    }
    handleSubmitExercise(taskId, exercise.id, userAnswers[exercise.id]);
  };

  // Chỉ dựa vào exercise.is_submitted để xác định trạng thái nộp bài
  const isSubmitted = exercise.is_submitted === 1;

  // Lấy kết quả từ exerciseResults nếu đã nộp bài
  const result = exerciseResults[exercise.id] || {};

  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-2">
      {/* Tiêu đề bài tập */}
      <h4 className="font-medium text-gray-800">{exercise.exercise || exercise.question}</h4>
      <p className="text-sm text-gray-600 mt-1">Type: {exercise.type}</p>
      {exercise.difficulty && (
        <p className="text-sm text-gray-600">Difficulty: {exercise.difficulty}</p>
      )}

      {isSubmitted && Object.keys(result).length > 0 ? (
        <div className="mt-2 p-3 bg-green-100 rounded">
          {/* Câu trả lời của bạn */}
          <p className="text-sm">
            <strong>Your Answer:</strong>{" "}
            {result.your_answer || userAnswers[exercise.id] || "Not provided"}
          </p>

          {/* Đáp án đúng */}
          {result.answer && (
            <p className="text-sm">
              <strong>Correct Answer:</strong> {result.answer}
            </p>
          )}

          {/* Trạng thái (Đúng/Sai) */}
          {result.correct !== undefined && (
            <p className="text-sm">
              <strong>Correct:</strong>{" "}
              <span className={result.correct ? "text-green-600" : "text-red-600"}>
                {result.correct ? "Yes" : "No"}
              </span>
            </p>
          )}

          {/* Điểm số */}
          {result.score !== undefined && (
            <p className="text-sm">
              <strong>Score:</strong> {result.score}
            </p>
          )}

          {/* Phản hồi AI */}
          {result.ai_feedback && (
            <p className="text-sm">
              <strong>AI Feedback:</strong> {result.ai_feedback}
            </p>
          )}

          {/* Giải thích AI */}
          {result.ai_explanation && (
            <p className="text-sm">
              <strong>AI Explanation:</strong> {result.ai_explanation}
            </p>
          )}

          {/* Thời gian */}
          {(result.date?.start_time || result.date?.end_time || result.date?.duration !== undefined) && (
            <>
              <p className="text-sm">
                <strong>Start Time:</strong> {formatDateTime(result.date?.start_time)}
              </p>
              <p className="text-sm">
                <strong>End Time:</strong> {formatDateTime(result.date?.end_time)}
              </p>
              <p className="text-sm">
                <strong>Duration:</strong>{" "}
                {formatDuration(result.date?.duration !== undefined ? result.date.duration : elapsedTime)}
              </p>
            </>
          )}
        </div>
      ) : (
        <div className="mt-2">
          {exercise.type === "written" ? (
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your answer..."
              value={userAnswers[exercise.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={isLoading || exercise.is_submitted === 1}
            />
          ) : (
            <div className="space-y-2">
              {exercise.options?.length > 0 ? (
                exercise.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`exercise-${exercise.id}`}
                      value={String.fromCharCode(65 + index)} // A, B, C, D
                      checked={userAnswers[exercise.id] === String.fromCharCode(65 + index)}
                      onChange={(e) => handleAnswerChange(e.target.value)}
                      className="form-radio"
                      disabled={isLoading || exercise.is_submitted === 1}
                    />
                    <span>{option}</span>
                  </label>
                ))
              ) : (
                <p className="text-sm text-red-600">No options available for this exercise.</p>
              )}
            </div>
          )}
          <button
            onClick={handleSubmit}
            className={`mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
              isLoading ||
              !userAnswers[exercise.id] ||
              userAnswers[exercise.id].trim() === "" ||
              exercise.is_submitted === 1
                ? "bg-blue-600/50 cursor-not-allowed"
                : "hover:bg-blue-700"
            }`}
            disabled={
              isLoading ||
              !userAnswers[exercise.id] ||
              userAnswers[exercise.id].trim() === "" ||
              exercise.is_submitted === 1
            }
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white border-solid mr-2"></span>
                <span>Submitting...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
          {timers[taskId]?.start && !timers[taskId]?.end && (
            <div className="text-sm text-gray-600 mt-2">
              Time elapsed: {elapsedTime} seconds
            </div>
          )}
        </div>
      )}
    </div>
  );
};

ExerciseItem.propTypes = {
  exercise: PropTypes.object.isRequired,
  taskId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  userAnswers: PropTypes.object.isRequired,
  setUserAnswers: PropTypes.func.isRequired,
  exerciseResults: PropTypes.object.isRequired,
  timers: PropTypes.object.isRequired,
  handleSubmitExercise: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ExerciseItem;