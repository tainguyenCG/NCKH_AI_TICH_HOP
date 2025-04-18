import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaCommentDots, FaBrain, FaCode, FaRocket, FaLanguage, FaChevronDown, FaCheck } from "react-icons/fa";

const aiOptions = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    description: "Advanced conversational AI for general knowledge",
    icon: <FaCommentDots />,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    id: "phi",
    name: "Phi-3.5-MoE-instruct",
    description: "Efficient AI for structured tasks",
    icon: <FaBrain />,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    id: "jamba",
    name: "AI21-Jamba-1.5-Large",
    description: "Creative text generation and analysis",
    icon: <FaCode />,
    color: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    id: "deepseek",
    name: "DeepSeek-V3-0324",
    description: "Deep learning for complex queries",
    icon: <FaRocket />,
    color: "text-orange-500",
    bgColor: "bg-orange-100",
  },
  {
    id: "llama",
    name: "Llama-4-Scout-17B-16E-Instruct",
    description: "Open-source large language model",
    icon: <FaLanguage />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
];

const AIModelSelector = ({ selectedModel, setSelectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedAI = aiOptions.find((ai) => ai.id === selectedModel) || {
    id: null,
    name: "Choose your model",
    description: "Click to select",
    icon: <FaRobot />,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  };

  const toggleDropdown = () => {
    console.log("Toggling dropdown, current isOpen:", isOpen);
    setIsOpen(!isOpen);
  };

  const selectAI = (aiId) => {
    console.log("Selecting AI model:", aiId);
    setSelectedModel(aiId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        console.log("Clicked outside, closing dropdown");
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-md mx-auto">
      {/* Selected AI Display */}
      <div
        id="selectedAIDisplay"
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer flex items-center justify-between border border-gray-200 hover:border-indigo-300 transition-all"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <div
            id="selectedAIIcon"
            className={`w-10 h-10 rounded-full ${selectedAI.bgColor} flex items-center justify-center mr-3`}
          >
            {selectedAI.icon}
          </div>
          <div>
            <h3 id="selectedAIName" className="font-medium text-gray-800">
              {selectedAI.name}
            </h3>
            <p id="selectedAIDesc" className="text-xs text-gray-500">
              {selectedAI.description}
            </p>
          </div>
        </div>
        <FaChevronDown
          id="dropdownArrow"
          className={`text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="aiDropdown"
            ref={dropdownRef}
            className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div id="aiOptions" className="max-h-80 overflow-y-auto">
              {aiOptions.map((ai) => (
                <div
                  key={ai.id}
                  className={`ai-option flex items-center p-4 cursor-pointer ${
                    selectedModel === ai.id ? "active" : ""
                  } hover:bg-indigo-50`}
                  data-id={ai.id}
                  onClick={() => selectAI(ai.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${ai.bgColor} flex items-center justify-center mr-3`}
                  >
                    {ai.icon}
                  </div>
                  <div className="flex-1">
                    <h4
                      className={`ai-name font-medium ${
                        selectedModel === ai.id ? "text-indigo-600 font-semibold" : ""
                      }`}
                    >
                      {ai.name}
                    </h4>
                    <p className="text-xs text-gray-500">{ai.description}</p>
                  </div>
                  {selectedModel === ai.id && (
                    <FaCheck className="text-indigo-500" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* No-animation version (uncomment if framer-motion is not installed):
const AIModelSelector = ({ selectedModel, setSelectedModel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedAI = aiOptions.find((ai) => ai.id === selectedModel) || {
    id: null,
    name: "Choose your model",
    description: "Click to select",
    icon: <FaRobot />,
    color: "text-gray-500",
    bgColor: "bg-gray-100",
  };

  const toggleDropdown = () => {
    console.log("Toggling dropdown, current isOpen:", isOpen);
    setIsOpen(!isOpen);
  };

  const selectAI = (aiId) => {
    console.log("Selecting AI model:", aiId);
    setSelectedModel(aiId);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        console.log("Clicked outside, closing dropdown");
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative max-w-md mx-auto">
      <div
        id="selectedAIDisplay"
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer flex items-center justify-between border border-gray-200 hover:border-indigo-300 transition-all"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <div
            id="selectedAIIcon"
            className={`w-10 h-10 rounded-full ${selectedAI.bgColor} flex items-center justify-center mr-3`}
          >
            {selectedAI.icon}
          </div>
          <div>
            <h3 id="selectedAIName" className="font-medium text-gray-800">
              {selectedAI.name}
            </h3>
            <p id="selectedAIDesc" className="text-xs text-gray-500">
              {selectedAI.description}
            </p>
          </div>
        </div>
        <FaChevronDown
          id="dropdownArrow"
          className={`text-gray-400 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
        />
      </div>
      {isOpen && (
        <div
          id="aiDropdown"
          ref={dropdownRef}
          className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
        >
          <div id="aiOptions" className="max-h-80 overflow-y-auto">
            {aiOptions.map((ai) => (
              <div
                key={ai.id}
                className={`ai-option flex items-center p-4 cursor-pointer ${
                  selectedModel === ai.id ? "active" : ""
                } hover:bg-indigo-50`}
                data-id={ai.id}
                onClick={() => selectAI(ai.id)}
              >
                <div
                  className={`w-10 h-10 rounded-full ${ai.bgColor} flex items-center justify-center mr-3`}
                >
                  {ai.icon}
                </div>
                <div className="flex-1">
                  <h4
                    className={`ai-name font-medium ${
                      selectedModel === ai.id ? "text-indigo-600 font-semibold" : ""
                    }`}
                  >
                    {ai.name}
                  </h4>
                  <p className="text-xs text-gray-500">{ai.description}</p>
                </div>
                {selectedModel === ai.id && (
                  <FaCheck className="text-indigo-500" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
*/

export default AIModelSelector;