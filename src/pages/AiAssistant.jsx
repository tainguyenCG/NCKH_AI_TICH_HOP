import React, { useState, useEffect, useRef } from 'react';
import {
  FaCloudUploadAlt,
  FaFile,
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileAlt,
  FaTimes,
  FaRobot,
  FaPaperPlane,
  FaLightbulb,
} from 'react-icons/fa';

const AiAssistant = () => {
    const [file, setFile] = useState(null);
    const [task, setTask] = useState('summarize');
    const [customInstruction, setCustomInstruction] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [response, setResponse] = useState(null);
    const [followUpQuestion, setFollowUpQuestion] = useState('');
    const fileInputRef = useRef(null);
    const uploadContainerRef = useRef(null);
  
    // Drag-and-drop handling
    useEffect(() => {
      const uploadContainer = uploadContainerRef.current;
      const handleDragOver = (e) => {
        e.preventDefault();
        uploadContainer.classList.add('border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-900');
      };
      const handleDragLeave = () => {
        uploadContainer.classList.remove('border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-900');
      };
      const handleDrop = (e) => {
        e.preventDefault();
        uploadContainer.classList.remove('border-indigo-600', 'bg-indigo-50', 'dark:bg-indigo-900');
        if (e.dataTransfer.files.length) {
          setFile(e.dataTransfer.files[0]);
        }
      };
  
      uploadContainer.addEventListener('dragover', handleDragOver);
      uploadContainer.addEventListener('dragleave', handleDragLeave);
      uploadContainer.addEventListener('drop', handleDrop);
  
      return () => {
        uploadContainer.removeEventListener('dragover', handleDragOver);
        uploadContainer.removeEventListener('dragleave', handleDragLeave);
        uploadContainer.removeEventListener('drop', handleDrop);
      };
    }, []);
  
    // File handling
    const handleFileChange = (e) => {
      if (e.target.files.length) {
        setFile(e.target.files[0]);
      }
    };
  
    const removeFile = () => {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
  
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
  
    // Process file with AI (simulated)
    const processFile = () => {
      if (!file) return;
  
      setIsProcessing(true);
      setResponse(null);
  
      setTimeout(() => {
        let responseText;
        switch (task) {
          case 'summarize':
            responseText = (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary dark:text-white">Document Summary</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Based on my analysis of the document, here are the key points:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>The document discusses the importance of machine learning in modern education systems</li>
                  <li>It outlines three main approaches to implementing AI in classrooms</li>
                  <li>The author presents case studies from five different school districts</li>
                  <li>Key challenges include data privacy concerns and teacher training</li>
                  <li>The conclusion suggests a phased implementation approach</li>
                </ul>
                <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg text-sm text-blue-700 dark:text-blue-200">
                  <FaLightbulb className="inline-block mr-2" />
                  This document would be particularly useful for educators looking to understand practical
                  applications of AI in schools.
                </div>
              </div>
            );
            break;
          case 'explain':
            responseText = (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary dark:text-white">Concept Explanation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The document contains several technical concepts that I can explain:
                </p>
                {/* Add more content as needed */}
              </div>
            );
            break;
          case 'questions':
            responseText = (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary dark:text-white">Generated Questions</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Here are some questions based on the document:
                </p>
                {/* Add more content as needed */}
              </div>
            );
            break;
          case 'analyze':
            responseText = (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary dark:text-white">Structure Analysis</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Here is the structural breakdown of the document:
                </p>
                {/* Add more content as needed */}
              </div>
            );
            break;
          case 'custom':
            responseText = (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary dark:text-white">Custom Instruction</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Following your instruction: "{customInstruction}"
                </p>
                {/* Add more content as needed */}
              </div>
            );
            break;
          default:
            responseText = null;
        }
        setResponse(responseText);
        setIsProcessing(false);
      }, 2000); // Simulate API delay
    };
  
    // File icon determination
    const getFileIcon = () => {
      if (!file) return { className: 'text-gray-500', icon: FaFile };
      const fileType = file.name.split('.').pop().toLowerCase();
      if (fileType === 'pdf') return { className: 'bg-red-500', icon: FaFilePdf };
      if (fileType === 'doc' || fileType === 'docx') return { className: 'bg-blue-600', icon: FaFileWord };
      if (fileType === 'ppt' || fileType === 'pptx') return { className: 'bg-orange-500', icon: FaFilePowerpoint };
      return { className: 'bg-gray-600', icon: FaFileAlt };
    };
  
    return (
      <>
        {/* Inline styles for animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
          .ai-message {
            animation: fadeIn 0.5s ease-out;
          }
          .typing-indicator span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: #4f46e5;
            margin-right: 4px;
            animation: bounce 1.4s infinite ease-in-out;
          }
          .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
          }
          .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
          }
        `}</style>
  
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-extrabold text-primary dark:text-white sm:text-4xl">
              <span className="block">EduMind AI Assistant</span>
            </h1>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Upload your documents and get instant AI-powered analysis, summaries, and insights.
            </p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Section */}
            <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">Upload Document</h2>
  
                <div
                  ref={uploadContainerRef}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer mb-6 hover:border-indigo-600 transition-all duration-300"
                >
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-800 mb-4">
                    <FaCloudUploadAlt className="text-indigo-600 dark:text-indigo-400 text-xl" />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    PDF, DOCX, PPTX, TXT (Max 10MB)
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileChange}
                  />
                </div>
  
                {file && (
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className={`w-12 h-12 flex items-center justify-center rounded-lg text-white mr-3 ${getFileIcon().className}`}>
                        {React.createElement(getFileIcon().icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-200 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        onClick={removeFile}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                      >
                        <FaTimes />
                      </button>
                    </div>
  
                    <div>
                      <label htmlFor="task-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        What would you like to do?
                      </label>
                      <select
                        id="task-select"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                      >
                        <option value="summarize">Summarize content</option>
                        <option value="explain">Explain concepts</option>
                        <option value="questions">Generate questions</option>
                        <option value="analyze">Analyze structure</option>
                        <option value="custom">Custom instruction</option>
                      </select>
                    </div>
  
                    {task === 'custom' && (
                      <div>
                        <label htmlFor="custom-instruction" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Your instruction
                        </label>
                        <textarea
                          id="custom-instruction"
                          rows="2"
                          value={customInstruction}
                          onChange={(e) => setCustomInstruction(e.target.value)}
                          className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-sm"
                          placeholder="Tell the AI what to do..."
                        />
                      </div>
                    )}
  
                    <button
                      onClick={processFile}
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <FaRobot className="mr-2" />
                      Process with AI
                    </button>
                  </div>
                )}
  
                <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-200 mb-3">Supported File Types</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-red-500 text-white mr-2">
                        <FaFilePdf />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">PDF</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-600 text-white mr-2">
                        <FaFileWord />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Word</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-500 text-white mr-2">
                        <FaFilePowerpoint />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">PowerPoint</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-600 text-white mr-2">
                        <FaFileAlt />
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">Text</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* AI Response Section */}
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
          </div>
        </div>
      </>
    );
  };

export default AiAssistant
