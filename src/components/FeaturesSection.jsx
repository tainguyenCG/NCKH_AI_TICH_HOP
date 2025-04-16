// src/components/FeaturesSection.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faChartLine, faUsers, faCertificate } from '@fortawesome/free-solid-svg-icons';

const FeaturesSection = () => {
  const features = [
    { icon: faBrain, title: 'AI Tutor', desc: 'Get personalized help from our AI tutor that adapts to your learning style and pace.' },
    { icon: faChartLine, title: 'Progress Tracking', desc: 'Visualize your learning journey with detailed analytics and progress reports.' },
    { icon: faUsers, title: 'Collaborative Learning', desc: 'Connect with peers and educators in study groups and discussion forums.' },
    { icon: faCertificate, title: 'Certification', desc: 'Earn verifiable certificates upon course completion to showcase your skills.' },
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base font-semibold tracking-wide uppercase text-accent">Features</h2>
          <p className="mt-2 text-3xl font-extrabold leading-8 tracking-tight text-primary dark:text-white sm:text-4xl">
            Everything you need to enhance your learning
          </p>
          <p className="max-w-2xl mt-4 text-xl text-gray-500 dark:text-gray-400 lg:mx-auto">
            EduMind is designed to make learning more effective, engaging, and personalized.
          </p>
        </div>
        <div className="mt-10 space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
          {features.map((feature, index) => (
            <div key={index} className="relative p-6 transition-all duration-300 rounded-lg card-hover bg-gray-50 dark:bg-gray-800 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 rounded-md bg-accent bg-opacity-10">
                  <FontAwesomeIcon icon={feature.icon} className="text-xl text-accent" />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium leading-6 text-primary dark:text-white">{feature.title}</h3>
                  <p className="mt-2 text-base text-gray-500 dark:text-gray-400">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;