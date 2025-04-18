import React from 'react';
import { FaRobot, FaPaperPlane } from 'react-icons/fa';

const AIAnalysis = ({ file, isProcessing, response, followUpQuestion, setFollowUpQuestion }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg h-full flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-xl font-semibold text-primary dark:text-white">AI Analysis</h2>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          {!file && !isProcessing && !response && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-800 mb-4">
                <FaRobot className="text-indigo-600 dark:text-indigo-400 text-2xl" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200 mb-2">
                No document processed yet
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Upload a document and select an analysis type to get started. The AI will provide insights,
                summaries, and answer your questions about the content.
              </p>
            </div>
          )}

          {isProcessing && (
            <div className="h-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="typing-indicator mb-4">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  AI is analyzing your document...
                </p>
              </div>
            </div>
          )}

          {response && (
            <div className="space-y-6 ai-message">
              {response}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              className="flex-1 rounded-l-md border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 outline-none dark:text-gray-200 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
              placeholder="Ask a follow-up question..."
            />
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAnalysis;