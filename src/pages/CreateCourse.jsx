import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseSetup from "../components/CollectInforStep/CourseSetup";
import Interests from "../components/CollectInforStep/Interests";
import Skills from "../components/CollectInforStep/Skills";
import Preferences from "../components/CollectInforStep/Preferences";
import Dashboard from "../components/CollectInforStep/Dashboard";
import ProgressSteps from "../components/CollectInforStep/ProgressSteps";
import { storeProfile, generate } from "../utils/api";
import { useNavigate } from "react-router-dom";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false); // State để kiểm soát loading
  const [loadingMessage, setLoadingMessage] = useState(""); // Thông điệp loading
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_content: [],
    primary_skill: "",
    skill_level: 0,
    interests: [],
    secondary_skills: [],
    goals: "",
    learning_style: "",
    daily_learning_time: "",
    preferred_resources: [],
    language: "",
    custom_ai_prompt: "",
  });

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    console.log("Submitting courseData:", courseData);
    try {
      // Bật loading và cập nhật thông điệp
      setIsLoading(true);
      setLoadingMessage("Saving your course profile...");

      // Lưu profile
      const response = await storeProfile(courseData);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.log("API Response:", response);

      // Gọi generate để tạo tasks cho tuần đầu tiên
      const profileId = response.data.id; // Giả sử API trả về id của profile vừa tạo
      if (!profileId) throw new Error("Profile ID not found in response");

      // Cập nhật thông điệp loading cho bước generate
      setLoadingMessage("Generating tasks for your course...");

      console.log(`Generating tasks for profile ${profileId}`);
      const generateResponse = await generate({ profile_id: profileId });
      console.log("Generate response:", generateResponse.data);

      // Tắt loading và chuyển hướng
      setIsLoading(false);
      setLoadingMessage("");
      navigate("/Courses");
    } catch (error) {
      // Tắt loading nếu có lỗi
      setIsLoading(false);
      setLoadingMessage("");
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      console.error("Error storing profile or generating tasks:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-light dark:bg-dark font-sans relative">
      {/* Overlay Loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg">
            {/* Spinner */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid mb-4"></div>
            {/* Thông điệp loading */}
            <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
              {loadingMessage}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary dark:text-white sm:text-5xl">
            Course Setup Assistant
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-secondary dark:text-gray-400">
            Configure your personalized learning journey by providing course details and preferences.
          </p>
        </div>
        <ProgressSteps currentStep={currentStep} />
        {currentStep === 1 && (
          <CourseSetup
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
          />
        )}
        {currentStep === 2 && (
          <Interests
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 3 && (
          <Skills
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 4 && (
          <Preferences
            courseData={courseData}
            setCourseData={setCourseData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        {currentStep === 5 && (
          <Dashboard
            courseData={courseData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            isLoading={isLoading} // Truyền isLoading xuống Dashboard để disable nút nếu cần
          />
        )}
      </div>
    </div>
  );
};

export default CreateCourse;