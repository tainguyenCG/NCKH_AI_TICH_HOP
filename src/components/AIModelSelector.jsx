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

  const toggleDropdown = (e) => {
    e.stopPropagation();
    console.log("Toggling dropdown, current isOpen:", isOpen);
    setIsOpen((prev) => !prev);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-96">
      <div
        id="selectedAIDisplay"
        className="bg-white rounded-xl shadow-md p-4 cursor-pointer flex items-center justify-between border border-gray-200 hover:border-indigo-300 transition-all"
        onClick={toggleDropdown}
      >
        <div className="flex items-center w-full">
          <div
            id="selectedAIIcon"
            className={`w-10 h-10 rounded-full ${selectedAI.bgColor} flex items-center justify-center mr-3 ${selectedAI.color}`}
          >
            {selectedAI.icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 id="selectedAIName" className="font-medium text-gray-800 truncate">
              {selectedAI.name}
            </h3>
            <p id="selectedAIDesc" className="text-xs text-gray-500 truncate">
              {selectedAI.description}
            </p>
          </div>
        </div>
        <FaChevronDown
          id="dropdownArrow"
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="aiDropdown"
            ref={dropdownRef}
            className="absolute z-20 mt-2 bg-white rounded-xl max-w-96 shadow-lg border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div id="aiOptions" className="max-h-80  overflow-y-auto">
              {aiOptions.map((ai) => (
                <div
                  key={ai.id}
                  className={`flex items-center p-4 cursor-pointer hover:bg-indigo-50 ${
                    selectedModel === ai.id ? "bg-indigo-50" : ""
                  }`}
                  data-id={ai.id}
                  onClick={() => selectAI(ai.id)}
                >
                  <div
                    className={`w-10 h-10 rounded-full ${ai.bgColor} flex items-center justify-center mr-3 ${ai.color}`}
                  >
                    {ai.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium ${
                        selectedModel === ai.id ? "text-indigo-600 font-semibold" : "text-gray-800"
                      } truncate`}
                    >
                      {ai.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{ai.description}</p>
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

export default AIModelSelector;