import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faAtom, faChartPie, faClock, faUserGraduate } from '@fortawesome/free-solid-svg-icons';

const PopularCoursesSection = () => {
  const courses = [
    { icon: faLaptopCode, title: 'AI Fundamentals', desc: 'Learn the core concepts of artificial intelligence and machine learning.', duration: '8 weeks', level: 'Beginner', color: 'purple-500' },
    { icon: faAtom, title: 'Data Science', desc: 'Master data analysis, visualization, and statistical modeling techniques.', duration: '12 weeks', level: 'Intermediate', color: 'blue-500' },
    { icon: faChartPie, title: 'Business Analytics', desc: 'Transform data into business insights and make data-driven decisions.', duration: '6 weeks', level: 'All Levels', color: 'green-500' },
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center mb-12">
          <h2 className="text-base text-accent font-semibold tracking-wide uppercase">Popular Courses</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-primary dark:text-white sm:text-4xl">
            Expand your knowledge
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            Explore our most popular courses across various disciplines.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <div key={index} className="course-card bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 bg-${course.color} rounded-md p-3`}>
                    <FontAwesomeIcon icon={course.icon} className="text-gray-900 dark:text-white text-xl" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg leading-6 font-medium text-primary dark:text-white">{course.title}</h3>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-500 dark:text-gray-400">{course.desc}</p>
                  <div className="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FontAwesomeIcon icon={faClock} className="mr-1" /> {course.duration}
                    <span className="mx-2">•</span>
                    <FontAwesomeIcon icon={faUserGraduate} className="mr-1" /> {course.level}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCoursesSection;