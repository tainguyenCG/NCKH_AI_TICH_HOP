// src/components/CTASection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faBookReader, faInfoCircle, faUserGraduate, faChalkboardTeacher, faProjectDiagram, faNetworkWired } from '@fortawesome/free-solid-svg-icons';

const CTASection = () => {
  const supports = [
    { icon: faUserGraduate, title: 'Personalized Learning', desc: 'Adaptive paths tailored to your goals and pace' },
    { icon: faChalkboardTeacher, title: 'Expert Instructors', desc: 'Learn from industry professionals and academics' },
    { icon: faProjectDiagram, title: 'Practical Projects', desc: 'Apply knowledge to real-world scenarios' },
    { icon: faNetworkWired, title: 'Career Support', desc: 'Resources to help you advance professionally' },
  ];

  return (
    <div className="relative bg-accent dark:bg-indigo-900 overflow-hidden">
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-accent to-purple-300 dark:from-indigo-900 dark:to-purple-500"></div>
      </div>
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:py-32 lg:px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your learning?</span>
            <span className="block">Start your journey today.</span>
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6 text-indigo-100 dark:text-indigo-200">
            Join thousands of learners who have accelerated their education with EduMind's innovative platform.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {supports.map((support, index) => (
              <div key={index} className="support-badge rounded-lg p-4 flex items-start">
                <div className="flex-shrink-0 bg-white bg-opacity-20 rounded-full p-2 mr-3">
                  <FontAwesomeIcon icon={support.icon} className="text-white text-lg" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{support.title}</h4>
                  <p className="mt-1 text-indigo-100 dark:text-indigo-200 text-sm">{support.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 lg:mt-0 lg:ml-8">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-accent bg-white hover:bg-gray-50 dark:bg-gray-800 dark:text-indigo-300 dark:hover:bg-gray-700"
            >
              <FontAwesomeIcon icon={faPlayCircle} className="mr-2" /> Start Learning Now
            </a>
          </div>
          <div className="ml-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent bg-opacity-60 hover:bg-opacity-70 dark:bg-indigo-800 dark:hover:bg-indigo-700"
            >
              <FontAwesomeIcon icon={faBookReader} className="mr-2" /> Browse Courses
            </a>
          </div>
          <div className="mt-4 text-indigo-100 dark:text-indigo-200 text-sm">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1" /> Free trial available for all new learners
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;