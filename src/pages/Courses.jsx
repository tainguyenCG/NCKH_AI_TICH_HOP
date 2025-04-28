import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseProfile from "../components/CourseProfile";
import { getProfiles, deleteProfile, getTasksByProfile, getTasksByWeek } from "../utils/api"; // Bỏ import generate

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
      const storedWeekId = localStorage.getItem(`weekId_${profileId}`);
      let taskResponse;

      if (storedWeekId) {
        // Nếu có weekId trong localStorage, gọi getTasksByWeek
        console.log(`Fetching tasks for week ${storedWeekId}`);
        taskResponse = await getTasksByWeek(storedWeekId);
        console.log("Tasks by week response:", taskResponse.data);
        toast.info("Loading existing week plan", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-blue-600 text-white",
        });
      } else {
        // Nếu không có weekId, gọi getTasksByProfile (lần đầu sau khi submit course)
        console.log(`Fetching tasks by profile ${profileId}`);
        taskResponse = await getTasksByProfile(profileId);
        console.log("Tasks by profile response:", taskResponse.data);
        if (!taskResponse.data || !taskResponse.data.week) {
          throw new Error("No tasks or week data available");
        }
        const initialWeekId = taskResponse.data.week.id;
        localStorage.setItem(`weekId_${profileId}`, initialWeekId); // Lưu weekId vào localStorage
        toast.success("Tasks fetched successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: "bg-blue-600 text-white",
        });
      }

      const weekId = taskResponse.data.week.id;

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