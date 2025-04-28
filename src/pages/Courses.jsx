import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseProfile from "../components/CourseProfile";
import { getProfiles, deleteProfile, getTasksByProfile, generate } from "../utils/api";

const Courses = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTasksModalOpen, setIsTasksModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await getProfiles();
        setProfiles(response.data);
        console.log("Profiles response:", response.data);
        toast.success(response.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-blue-600 text-white",
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-red-600 text-white",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      const response = await deleteProfile(id);
      setProfiles(profiles.filter((profile) => profile.id !== id));
      toast.success(response.message || "Course deleted successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-blue-600 text-white",
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    }
  };

  const handleCreateCourse = () => {
    navigate("/CreateCourse");
  };

  const handleModalShow = () => {
    setIsCreateModalOpen(true);
  };

  const handleModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleNavigateLearningPlan = async (profileId, courseName) => {
    try {
      console.log(`Fetching tasks for profile ${profileId}`);
      // Kiểm tra tuần học hiện tại
      const taskResponse = await getTasksByProfile(profileId);
      console.log("Tasks response:", taskResponse.data);

      let weekId = null;
      let hasWeek = taskResponse.data && taskResponse.data.week && taskResponse.data.tasks_by_day;

      if (!hasWeek) {
        // Nếu không có tuần học hoặc response là null, gọi generate
        console.log(`Generating tasks for profile ${profileId}`);
        const generateResponse = await generate({ profile_id: profileId });
        console.log("Generate response:", generateResponse.data);
        // Gọi lại getTasksByProfile để lấy dữ liệu mới
        const newTaskResponse = await getTasksByProfile(profileId);
        console.log("New tasks response after generate:", newTaskResponse.data);
        if (!newTaskResponse.data || !newTaskResponse.data.week) {
          throw new Error("Failed to generate tasks or no week data available");
        }
        weekId = newTaskResponse.data.week.id;
        hasWeek = true;
        toast.success("Tasks generated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-blue-600 text-white",
        });
      } else {
        weekId = taskResponse.data.week.id;
        toast.info("Tasks already exist, loading current week", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-blue-600 text-white",
        });
      }

      // Chuyển hướng đến LearningPlan
      navigate("/learning-plan", {
        state: {
          profileId,
          courseName,
          weekId,
        },
      });
    } catch (error) {
      console.error("Error navigating to LearningPlan:", error.response?.data || error.message);
      toast.error(error.message || "Failed to load learning plan", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: "bg-red-600 text-white",
      });
    }
  };

  return (
    <CourseProfile
      profiles={profiles}
      loading={loading}
      tasks={tasks}
      isCreateModalOpen={isCreateModalOpen}
      isTasksModalOpen={isTasksModalOpen}
      selectedCourse={selectedCourse}
      handleCreateCourse={handleCreateCourse}
      handleModalShow={handleModalShow}
      handleModalClose={handleModalClose}
      handleNavigateLearningPlan={handleNavigateLearningPlan}
      setIsTasksModalOpen={setIsTasksModalOpen}
      handleDelete={handleDelete}
    />
  );
};

export default Courses;