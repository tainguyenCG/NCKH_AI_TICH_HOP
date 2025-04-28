import React from "react";
import { FaLightbulb, FaChartBar, FaBook, FaRoad } from "react-icons/fa";

const WeekInfo = ({ weekData }) => {
  if (!weekData?.week) return null;

  const { summary, notes, id } = weekData.week;
  const feedback = weekData.feedback;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">Week {id} Summary</h2> */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Summary</h3>
        <p className="text-sm text-gray-600">{summary}</p>
      </div>
      {notes && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
          <div className="flex">
            <FaLightbulb className="text-yellow-500 mt-1" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Learning Notes</h3>
              <div className="mt-2 text-sm text-yellow-700">
                {notes.split(". ").map((note, index) => (
                  <p key={index}>• {note}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {feedback && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Feedback for Previous Week</h3>
          {/* Performance Summary */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
              <FaChartBar className="mr-2 text-blue-500" /> Performance Summary
            </h4>
            <p className="text-sm text-gray-600">{feedback.performance_summary}</p>
          </div>
          {/* Mastery Analysis */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
              <FaBook className="mr-2 text-blue-500" /> Mastery Analysis
            </h4>
            <p className="text-sm text-gray-600">
              <strong>Overall Score:</strong> {feedback.mastery_analysis.overall_score}%
            </p>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Strengths:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.mastery_analysis.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Areas for Improvement:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.mastery_analysis.areas_for_improvement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Learning Recommendations */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
              <FaLightbulb className="mr-2 text-blue-500" /> Learning Recommendations
            </h4>
            <p className="text-sm text-gray-600">
              <strong>Suggested Difficulty:</strong> Level {feedback.learning_recommendations.suggested_difficulty}
            </p>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Focus Topics:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.learning_recommendations.focus_topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Resource Types:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.learning_recommendations.resource_types.map((resource, index) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Progression Path */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
              <FaRoad className="mr-2 text-blue-500" /> Progression Path
            </h4>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Continue:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.progression_path.continue.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Introduce:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.progression_path.introduce.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-600 font-medium">Reinforce:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {feedback.progression_path.reinforce.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekInfo;