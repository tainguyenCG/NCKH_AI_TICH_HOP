import React, { useState } from "react";

const CourseSetup = ({ courseData, setCourseData, nextStep }) => {
  const courseMapping = [
    { en: "Operating Systems", vi: "Hệ điều hành" },
    { en: "C++ Programming", vi: "Lập trình C++" },
    { en: "Database", vi: "Cơ sở dữ liệu" },
    { en: "Computer Networks", vi: "Mạng máy tính" },
    { en: "Web Programming", vi: "Lập trình web" },
    { en: " .NET Technology", vi: "Công nghệ .NET" },
    { en: "Java Programming", vi: "Lập trình Java" },
    { en: "General Physics", vi: "Vật lý đại cương" },
    { en: "Advanced Database", vi: "Cơ sở dữ liệu nâng cao" },
  ];

  const [contentInput, setContentInput] = useState("");

  const handleAddContent = () => {
    if (!contentInput.trim()) {
      alert("Please enter course content.");
      return;
    }
    setCourseData({
      ...courseData,
      course_content: [...courseData.course_content, contentInput.trim()],
    });
    setContentInput("");
  };

  const handleRemoveContent = (index) => {
    setCourseData({
      ...courseData,
      course_content: courseData.course_content.filter((_, i) => i !== index),
    });
  };

  const handleSelectCourse = (vi) => {
    setCourseData({
      ...courseData,
      course_name: vi,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!courseData.course_name) {
      alert("Please select a course name.");
      return;
    }
    if (courseData.course_content.length === 0) {
      alert("Please add at least one course content item.");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Course Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Course Name
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {courseMapping.map(({ en, vi }) => (
              <button
                key={vi}
                type="button"
                onClick={() => handleSelectCourse(vi)}
                className={`py-2 px-4 border rounded-lg shadow-sm transition-all ${
                  courseData.course_name === vi
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 hover:bg-blue-50 hover:border-blue-300 text-gray-700"
                }`}
              >
                {en}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Course Content
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="e.g. RÀNG BUỘC TOÀN VẸN"
            />
            <button
              type="button"
              onClick={handleAddContent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
            >
              Add
            </button>
          </div>
          {courseData.course_content.length > 0 && (
            <ul className="space-y-2">
              {courseData.course_content.map((content, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                >
                  <span>{content}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveContent(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition"
        >
          Continue to Interests
        </button>
      </form>
    </div>
  );
};

export default CourseSetup;