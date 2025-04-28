import React, { useState, useEffect } from "react";

const ExerciseItem = ({
  exercise,
  taskId,
  isTaskDone,
  userAnswers,
  setUserAnswers,
  exerciseResults,
  timers,
  handleSubmitExercise,
}) => {
  // State để đếm thời gian real-time
  const [elapsedTime, setElapsedTime] = useState(0);

  // Đếm thời gian liên tục khi bắt đầu làm bài
  useEffect(() => {
    let interval;
    if (timers[taskId]?.start && !timers[taskId]?.end) {
      interval = setInterval(() => {
        setElapsedTime(Math.floor((new Date() - new Date(timers[taskId].start)) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup khi component unmount hoặc submit
  }, [timers, taskId]);

  // Xử lý thay đổi đáp án
  const handleAnswerChange = (value) => {
    if (isTaskDone || exerciseResults[exercise.id]) return; // Không cho chỉnh sửa nếu task đã hoàn thành hoặc đã submit
    setUserAnswers((prev) => ({ ...prev, [exercise.id]: value }));
  };

  // Xử lý submit
  const handleSubmit = () => {
    if (isTaskDone || exerciseResults[exercise.id]) return; // Không cho submit nếu task đã hoàn thành hoặc đã submit
    if (!userAnswers[exercise.id]) {
      alert("Please provide an answer before submitting.");
      return;
    }
    handleSubmitExercise(taskId, exercise.id, userAnswers[exercise.id]);
  };

  return (
    <div className="bg-gray-50 p-3 rounded-lg mb-2">
      <h4 className="font-medium text-gray-800">{exercise.exercise || exercise.question}</h4>
      <p className="text-sm text-gray-600 mt-1">Type: {exercise.type}</p>
      {exercise.difficulty && (
        <p className="text-sm text-gray-600">Difficulty: {exercise.difficulty}</p>
      )}

      {(isTaskDone || exerciseResults[exercise.id]) ? (
        <div className="mt-2 p-3 bg-green-100 rounded">
          <p className="text-sm">
            <strong>Your Answer:</strong>{" "}
            {exerciseResults[exercise.id]?.your_answer ||
              exerciseResults[exercise.id]?.user_answer}
          </p>
          <p className="text-sm">
            <strong>Correct:</strong>{" "}
            {exerciseResults[exercise.id]?.correct ? "Yes" : "No"}
          </p>
          {!exerciseResults[exercise.id]?.correct && exercise.correct_answer && (
            <p className="text-sm text-red-600">
              <strong>Correct Answer:</strong> {exercise.correct_answer}
            </p>
          )}
          {exerciseResults[exercise.id]?.score && (
            <p className="text-sm">
              <strong>Score:</strong> {exerciseResults[exercise.id].score}
            </p>
          )}
          {exerciseResults[exercise.id]?.ai_feedback && (
            <p className="text-sm">
              <strong>AI Feedback:</strong> {exerciseResults[exercise.id].ai_feedback}
            </p>
          )}
          {exerciseResults[exercise.id]?.ai_explanation && (
            <p className="text-sm">
              <strong>AI Explanation:</strong>{" "}
              {exerciseResults[exercise.id].ai_explanation}
            </p>
          )}
          <p className="text-sm">
            <strong>Duration:</strong>{" "}
            {exerciseResults[exercise.id]?.date?.start_time &&
            exerciseResults[exercise.id]?.date?.end_time
              ? Math.floor(
                  (new Date(exerciseResults[exercise.id].date.end_time) -
                    new Date(exerciseResults[exercise.id].date.start_time)) /
                    1000
                )
              : Math.floor(
                  (new Date(timers[taskId]?.end || Date.now()) -
                    new Date(timers[taskId]?.start)) /
                    1000
                )}{" "}
            seconds
          </p>
        </div>
      ) : (
        <div className="mt-2">
          {exercise.type === "written" ? (
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Enter your answer..."
              value={userAnswers[exercise.id] || ""}
              onChange={(e) => handleAnswerChange(e.target.value)}
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
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            disabled={!userAnswers[exercise.id]}
          >
            Submit
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

export default ExerciseItem;
