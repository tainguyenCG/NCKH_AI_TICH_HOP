const ProgressSteps = ({ currentStep }) => {
    const steps = [
      "Info",
      "Interests",
      "Skills",
      "Preferences",
      "Dashboard",
    ];
  
    const progressPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;
  
    return (
      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative h-10">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-600 transform -translate-y-1/2"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-500 transform -translate-y-1/2 transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <div className="flex justify-between relative">
            {steps.map((label, index) => (
              <div key={index} className="flex flex-col items-center z-20">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    index + 1 <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`text-sm font-medium absolute bottom-[-30px] w-full text-center transition-colors ${
                    index + 1 <= currentStep
                      ? "text-gray-600 dark:text-gray-300"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProgressSteps;