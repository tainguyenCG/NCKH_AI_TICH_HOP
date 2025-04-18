// src/components/PersonalInfo.jsx
import { BsArrowRight } from "react-icons/bs";
// src/components/PersonalInfo.jsx
const PersonalInfo = ({ userData, setUserData, nextStep }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, age, occupation } = userData;
    if (!name || !age || !occupation) {
      alert("Please fill in all fields");
      return;
    }
    nextStep();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Tell us about yourself
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="age"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Age
          </label>
          <input
            type="number"
            id="age"
            value={userData.age}
            onChange={(e) =>
              setUserData({ ...userData, age: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>
        <div>
          <label
            htmlFor="occupation"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            Occupation/Field
          </label>
          <input
            type="text"
            id="occupation"
            value={userData.occupation}
            onChange={(e) =>
              setUserData({ ...userData, occupation: e.target.value })
            }
            placeholder="e.g. Software Engineer, Student, Designer"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition transform hover:scale-105"
        >
          Continue to Interests <BsArrowRight className="inline ml-2" />
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;