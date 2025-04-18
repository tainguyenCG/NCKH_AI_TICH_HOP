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
} from 'react-icons/fa';

const UploadDocument = ({ file, setFile, task, setTask, customInstruction, setCustomInstruction, processFile }) => {
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
    <div className="lg:col-span-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary dark:text-white mb-4">Upload Document</h2>

        <div
          ref={uploadContainerRef}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer mb-6 hover:border-indigo-600 transition-all duration-300"
          onClick={() => fileInputRef.current.click()}
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
                <p className="text-sm font-medium text-gray-900 dark:text-grayspot-200 truncate">{file.name}</p>
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
  );
};

export default UploadDocument;