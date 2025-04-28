import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CourseProfile from "../components/CourseProfile";
import { getProfiles, deleteProfile } from "../utils/api"; // Bỏ import getTasksByProfile, getTasksByWeek

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

  const handleNavigateLearningPlan = (profileId, courseName) => {
    // Chỉ chuyển hướng đến LearningPlan mà không lấy dữ liệu tuần
    navigate("/learning-plan", {
      state: {
        profileId,
        courseName,
      },
    });
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