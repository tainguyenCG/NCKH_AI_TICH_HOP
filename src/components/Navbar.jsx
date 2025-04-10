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
    <nav className="navbar bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-2">
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
                to="/Community"
                className={({ isActive }) =>
                  `nav-link px-1 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white ${
                    isActive ? 'active font-semibold text-gray-900 dark:text-white' : ''
                  }`
                }
              >
                Community
              </NavLink>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="flex items-center space-x-4">
              <NavLink
                to="/Docs"
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
              >
                <FontAwesomeIcon icon={faFileAlt} className="mr-1" />
                Docs
              </NavLink>
              {/* Dark Mode Toggle Button */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 flex items-center"
                title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <FontAwesomeIcon icon={isDark ? faSun : faMoon} className="h-5 w-5" />
              </button>
              <NavLink
                to="/AiAssistant"
                className="download-btn inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 h-4 w-4"
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
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
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