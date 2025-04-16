import React from 'react';
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaPaperPlane} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Ẩn nút nếu đang ở trang /GeminiSp
  if (location.pathname === '/GeminiSp') {
    return null;
  }

  const footerData = {
    about: {
      title: 'EduMind',
      desc: 'Empowering learners worldwide through innovative education technology and expert-curated content.',
      socials: [
        { icon: <FaTwitter />, href: '#' },
        { icon: <FaLinkedin />, href: '#' },
        { icon: <FaYoutube />, href: '#' },
        { icon: <FaInstagram />, href: '#' },
      ],
    },
    learningPaths: [
      'Computer Science',
      'Data Science',
      'Mathematics',
      'Business',
      'Humanities',
    ],
    resources: [
      'Interactive Tutorials',
      'Video Lectures',
      'Practice Problems',
      'Research Papers',
      'Textbooks',
    ],
    support: [
      'Help Center',
      'Community Forum',
      'Feedback',
      'Report Issues',
      'FAQ',
    ],
    bottomLinks: [
      'Privacy',
      'Terms',
      'Accessibility',
      'Cookies',
    ],
  };

  return (
    <footer className="text-gray-300 bg-gray-900 dark:bg-gray-950 dark:text-gray-200">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* About Column */}
          <div className="footer-column">
            <h3 className="mb-4 text-lg font-semibold text-white dark:text-gray-100">{footerData.about.title}</h3>
            <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">{footerData.about.desc}</p>
            <div className="flex space-x-4">
              {footerData.about.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-400 transition-colors duration-200 hover:text-white dark:hover:text-gray-100"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Learning Paths Column */}
          <div className="footer-column">
            <h3 className="mb-4 text-lg font-semibold text-white dark:text-gray-100">Learning Paths</h3>
            <ul className="space-y-2">
              {footerData.learningPaths.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 transition-all duration-200 footer-link hover:text-white dark:hover:text-gray-100 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h3 className="mb-4 text-lg font-semibold text-white dark:text-gray-100">Resources</h3>
            <ul className="space-y-2">
              {footerData.resources.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 transition-all duration-200 footer-link hover:text-white dark:hover:text-gray-100 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="footer-column">
            <h3 className="mb-4 text-lg font-semibold text-white dark:text-gray-100">Support</h3>
            <ul className="space-y-2">
              {footerData.support.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-400 transition-all duration-200 footer-link hover:text-white dark:hover:text-gray-100 hover:translate-x-1"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-2 footer-column md:col-span-4 lg:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white dark:text-gray-100">Stay Updated</h3>
            <p className="mb-4 text-sm text-gray-400 dark:text-gray-500">
              Subscribe to our newsletter for new course announcements and learning tips.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 text-gray-800 transition-all duration-200 bg-white border border-gray-300 newsletter-input rounded-l-md dark:text-gray-200 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-indigo-500"
              />
              <button className="px-4 py-2 text-white transition-colors duration-200 bg-accent rounded-r-md hover:bg-indigo-700 dark:hover:bg-indigo-600">
                <FaPaperPlane />
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              We respect your privacy. No spam, ever.
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 mt-12 border-t border-gray-800 dark:border-gray-700">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerData.bottomLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 transition-colors duration-200 hover:text-white dark:hover:text-gray-100"
                >
                  {link}
                </a>
              ))}
            </div>
            <div className="mt-8 md:mt-0 md:order-1">
              <p className="text-sm text-gray-400 dark:text-gray-500">
                © Team TaiBaoPhuc EduMind Learning Platform. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
