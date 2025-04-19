import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faFileAlt, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  // State for dark mode
  const [isDark, setIsDark] = useState(false);

  // Toggle dark mode and persist in localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white navbar dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 mr-2 text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
                <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
              </div>
              <span className="text-lg font-semibold text-primary dark:text-white">EduMind</span>
            </div>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`    
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/Courses"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`
                }
              >
                Courses
              </NavLink>
              <NavLink
                to="/Resources"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`
                }
              >
                Resources
              </NavLink>
              <NavLink
                to="/Research"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`
                }
              >
                Research
              </NavLink>
              <NavLink
                to="/learning-plan"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`
                }
              >
                Learning plan
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/Docs"
                className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                Docs
              </NavLink>
              {/* Dark Mode Toggle Button */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="w-5 h-5" />
              </button>
              <NavLink
                to="/login"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md download-btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500"
              >
                Login Now
                <svg
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  ></path>
                </svg>
              </NavLink>
            </div>
          </div>
          <div className="flex items-center -mr-2 sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;