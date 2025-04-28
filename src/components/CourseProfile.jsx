import React from "react";
import {
  FaBell,
  FaBookOpen,
  FaCircle,
  FaCode,
  FaPlus,
  FaTasks,
  FaTimes,
  FaTrash,
  FaLightbulb,
  FaBullseye,
  FaBrain,
  FaClock,
} from "react-icons/fa";

const CourseProfile = ({
  profiles,
  loading,
  tasks,
  isCreateModalOpen,
  isTasksModalOpen,
  selectedCourse,
  handleCreateCourse,
  handleModalShow,
  handleModalClose,
  handleNavigateLearningPlan,
  setIsTasksModalOpen,
  handleDelete,
  isNavigating, // Nhận trạng thái loading từ Courses
}) => {
  return (
    <div className="min-h-screen bg-gray-100 font-poppins">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">My Learning Paths</h2>
            <p className="text-gray-500">Track and manage your learning progress</p>
          </div>
          <button
            onClick={handleModalShow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <FaPlus className="text-sm" />
            <span>New Course</span>
          </button>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 animate-pulse mx-auto">
              <FaBookOpen className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">Loading courses...</h3>
          </div>
        ) : profiles.length === 0 ? (
          <div id="empty-state" className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaBookOpen className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No learning courses yet</h3>
            <p className="text-gray-500 mb-6">Create your first course to start tracking your learning journey</p>
            <button
              onClick={handleCreateCourse}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            >
              Create Course
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="course-card bg-white rounded-lg shadow-sm overflow-hidden border-l-4 border-blue-500 hover:transform hover:-translate-y-0.5 hover:shadow-md transition-all"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-10 h-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <FaCode className="text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{profile.course_name}</h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        Started {new Date(profile.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Skill Level</span>
                      <span className="text-sm font-medium text-blue-600">{profile.skill_level}%</span>
                    </div>
                    <div className="skill-bar bg-gray-200 w-full h-[6px] rounded-[3px]">
                      <div
                        className="skill-progress bg-blue-500 h-full rounded-[3px] transition-all duration-500"
                        style={{ width: `${profile.skill_level}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                      <FaLightbulb className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Skills Focus</p>
                        <div className="flex flex-wrap gap-1">
                          {profile.secondary_skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full hover:transform hover:-translate-y-0.5 transition-all"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                      <FaBullseye className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Learning Goal</p>
                        <p className="text-sm text-secondary line-clamp-2">{profile.goals}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                      <FaBrain className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Learning Style</p>
                        <p className="text-sm text-secondary">{profile.learning_style}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2 p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                      <FaClock className="text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm font-semibold text-primary mb-1">Daily Time</p>
                        <p className="text-sm text-secondary">{profile.daily_learning_time}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-2 mt-6">
                    <button
                      onClick={() => handleDelete(profile.id)}
                      className="flex-grow py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FaTrash className="inline mr-1" /> Remove
                    </button>
                    <button
                      onClick={() => handleNavigateLearningPlan(profile.id, profile.course_name)}
                      className={`flex-grow py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                        isNavigating
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-blue-50 hover:bg-blue-100 text-blue-600"
                      }`}
                      disabled={isNavigating}
                    >
                      <FaTasks className="inline mr-1" /> {isNavigating ? "Loading..." : "Tasks"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Course Modal */}
        <div
          className={`modal fixed inset-0 bg-black/30 z-50 flex items-center justify-center transition-all duration-300 ${
            isCreateModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`modal-content bg-white rounded-lg shadow-xl w-full max-w-md transform transition-all duration-300 ${
              isCreateModalOpen ? "translate-y-0" : "translate-y-5"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">New Learning Course</h3>
                <button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Please proceed to the course creation page to add a new course.
              </p>
              <button
                onClick={handleCreateCourse}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
              >
                Go to Create Course
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Modal */}
        <div
          className={`modal fixed inset-0 bg-black/30 z-50 flex items-center justify-center transition-all duration-300 ${
            isTasksModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div
            className={`modal-content bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col transform transition-all duration-300 ${
              isTasksModalOpen ? "translate-y-0" : "translate-y-5"
            }`}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">
                  Tasks for {selectedCourse?.name}
                </h3>
                <button
                  onClick={() => setIsTasksModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <FaTasks className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No tasks found</h3>
                  <p className="text-gray-500">There are no tasks available for this course</p>
                </div>
              ) : (
                <div>
                  {tasks.map((task, index) => (
                    <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-800">{task.title}</h4>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.priority === "Low"
                              ? "bg-blue-100 text-blue-800"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <FaCircle className="text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Due {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">#{index + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setIsTasksModalOpen(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseProfile;