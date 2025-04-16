import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';

const AISupportButton = () => {
  const location = useLocation();

  // Ẩn nút nếu đang ở trang /GeminiSp
  if (location.pathname === '/GeminiSp') {
    return null;
  }

  return (
    <Link
      to="/GeminiSp"
      className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors duration-200 z-50"
      title="AI Support"
    >
      <FaRobot className="text-xl" />
    </Link>
  );
};

export default AISupportButton;