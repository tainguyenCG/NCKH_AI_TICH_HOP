import {
    FaLaptopCode,
    FaAtom,
    FaChartLine,
    FaPalette,
    FaHeartbeat,
    FaLandmark,
    FaLanguage,
    FaBrain,
    FaBook,
    FaCheckCircle,
  } from "react-icons/fa";
  import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
  
  const Interests = ({ userData, setUserData, nextStep, prevStep }) => {
    const interestsOptions = [
      { name: "Technology", icon: FaLaptopCode, color: "blue" },
      { name: "Science", icon: FaAtom, color: "purple" },
      { name: "Business", icon: FaChartLine, color: "green" },
      { name: "Art & Design", icon: FaPalette, color: "yellow" },
      { name: "Health & Fitness", icon: FaHeartbeat, color: "red" },
      { name: "History", icon: FaLandmark, color: "indigo" },
      { name: "Languages", icon: FaLanguage, color: "pink" },
      { name: "Psychology", icon: FaBrain, color: "teal" },
      { name: "Philosophy", icon: FaBook, color: "orange" },
    ];
  
    const toggleInterest = (interest) => {
      const currentInterests = userData.interests;
      if (currentInterests.includes(interest)) {
        setUserData({
          ...userData,
          interests: currentInterests.filter((i) => i !== interest),
        });
      } else if (currentInterests.length < 3) {
        setUserData({
          ...userData,
          interests: [...currentInterests, interest],
        });
      }
    };
  
    const handleSubmit = () => {
      if (userData.interests.length < 1) {
        alert("Please select at least 1 interest");
        return;
      }
      nextStep();
    };
  
    return (
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Select your interests
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Choose 1 to 3 interests to help us personalize your learning experience
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {interestsOptions.map((option) => (
            <div
              key={option.name}
              className={`interest-card bg-gray-50 dark:bg-gray-700 rounded-xl p-4 cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                userData.interests.includes(option.name)
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900"
                  : "border-transparent hover:border-blue-300"
              }`}
              onClick={() => toggleInterest(option.name)}
            >
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full bg-${option.color}-100 text-${option.color}-600 flex items-center justify-center mr-3`}
                >
                  <option.icon className="text-xl" />
                </div>
                <span className="font-medium text-gray-800 dark:text-white">
                  {option.name}
                </span>
                <div
                  className={`ml-auto ${
                    userData.interests.includes(option.name)
                      ? ""
                      : "hidden"
                  }`}
                >
                  <FaCheckCircle className="text-green-500 text-xl animate-[checkBounce_0.5s_ease]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-lg transition"
          >
            <BsArrowLeft className="inline mr-2" /> Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition transform hover:scale-105"
          >
            Continue to Skills <BsArrowRight className="inline ml-2" />
          </button>
        </div>
      </div>
    );
  };
  
  export default Interests;