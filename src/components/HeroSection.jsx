import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaSearch, FaChartLine, FaUserGraduate } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-[radial-gradient(circle_at_25%_50%,_rgba(79,70,229,0.08)_0%,_rgba(79,70,229,0)_50%)] dark:bg-[radial-gradient(circle_at_25%_50%,_rgba(99,102,241,0.1)_0%,_rgba(99,102,241,0)_50%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="relative z-10">
          <div className="text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left Side */}
              <div className="lg:w-1/2 lg:pr-12">
                <h1 className="text-4xl tracking-tight font-extrabold text-primary dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Transform your</span>
                  <span className="block text-accent">learning journey</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  EduMind combines cutting-edge educational technology with expert-curated content to help you master new skills and achieve your learning goals.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <Link
                    to="/AiAssistant"
                    className="download-btn w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 md:py-4 md:text-lg md:px-10"
                  >
                    <FaPlay className="mr-2" /> Start Learning
                  </Link>
                  <a
                    href="#"
                    className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-accent text-base font-medium rounded-md text-accent bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-indigo-300 dark:border-indigo-500 dark:hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                  >
                    <FaSearch className="mr-2" /> Explore Courses
                  </a>
                </div>
                <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md mx-auto lg:mx-0">
                  <div className="flex items-center">
                    <div className="rounded-full bg-accent text-white w-12 h-12 flex items-center justify-center mr-4">
                      <FaChartLine className="text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-primary dark:text-white">94% of learners report improved understanding</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">"The personalized learning paths helped me progress faster."</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
                <div className="relative">
                  <div className="absolute -top-8 -left-8 w-32 h-32 bg-purple-100 dark:bg-purple-900 rounded-full opacity-50 animate-[float_6s_ease-in-out_infinite]"></div>
                  <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-100 dark:bg-blue-900 rounded-full opacity-50 animate-[float_7s_ease-in-out_infinite_1s]"></div>
                  <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white mr-3">
                        <FaUserGraduate />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary dark:text-white">Dr. Sarah Johnson</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Education Specialist</p>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">"EduMind's adaptive learning technology helps students learn at their own pace while ensuring they master each concept before moving forward."</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm">Personalized Learning</span>
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">Expert Guidance</span>
                      <span className="px-3 py-1 bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm">Proven Results</span>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-accent">50K+</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Active Learners</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">300+</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Courses</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-accent">98%</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Satisfaction</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-yellow-100 dark:bg-yellow-900 rounded-full opacity-50 animate-[float_5s_ease-in-out_infinite_0.5s]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
