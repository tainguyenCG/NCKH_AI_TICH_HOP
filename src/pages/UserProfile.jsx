import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProfile = () => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Không có dữ liệu",
    age: "Không có dữ liệu",
    gender: "Không có dữ liệu",
    email: "Không có dữ liệu",
  });
  const [error, setError] = useState("");

  // Lấy dữ liệu người dùng từ API khi trang được tải
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get("https://assistant.baopanel.com/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
          name: response.data.name || "Không có dữ liệu",
          age: response.data.age || "Không có dữ liệu",
          gender: response.data.gender || "Không có dữ liệu",
          email: response.data.email || "Không có dữ liệu",
        });
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          localStorage.removeItem("isLoggedIn");
          navigate("/login");
        } else {
          setError(err.response?.data?.message || "Failed to fetch user data.");
        }
      }
    };
    fetchUser();
  }, [navigate]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Khôi phục dữ liệu từ API
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://assistant.baopanel.com/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          name: response.data.name || "Không có dữ liệu",
          age: response.data.age || "Không có dữ liệu",
          gender: response.data.gender || "Không có dữ liệu",
          email: response.data.email || "Không có dữ liệu",
        });
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data.");
      }
    };
    fetchUser();
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        "https://assistant.baopanel.com/api/user",
        {
          name: user.name,
          age: user.age,
          gender: user.gender,
          email: user.email,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      } else {
        setError(err.response?.data?.message || "Failed to update user data.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="flex flex-col max-w-2xl w-full p-8 mx-4 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl shadow-2xl sm:mx-6 lg:mx-8 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
        <div className="px-4 py-6">
          <h2 className="mb-2 text-4xl font-extrabold tracking-tight text-white">Your Profile</h2>
          <p className="mb-8 text-sm italic text-gray-100">
            Here are your account details.
          </p>

          {error && <p className="mb-4 text-sm text-red-200">{error}</p>}

          {isEditing ? (
            // Form chỉnh sửa
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-100">Name</label>
                <input
                  className="p-4 text-gray-900 transition-all duration-300 bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col" style={{ width: 'calc(40% - 0.4rem)' }}>
                  <label className="mb-1 text-sm font-medium text-gray-100">Age</label>
                  <input
                    className="p-4 text-gray-900 transition-all duration-300 bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="number"
                    name="age"
                    value={user.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col" style={{ width: 'calc(60% - 0.6rem)' }}>
                  <label className="mb-1 text-sm font-medium text-gray-100">Gender</label>
                  <select
                    className="p-4 text-gray-900 transition-all duration-300 bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Chọn Giới Tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-100">Email</label>
                <input
                  className="p-4 text-gray-900 transition-all duration-300 bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  className="flex-1 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:from-blue-700 hover:to-blue-900 hover:shadow-xl hover:-translate-y-1"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="flex-1 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 hover:shadow-xl hover:-translate-y-1"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            // Chế độ xem
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-100">Name</label>
                <div className="p-4 text-gray-900 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl hover:shadow-xl hover:bg-opacity-100 hover:-translate-y-1">
                  {user.name}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col" style={{ width: 'calc(40% - 0.4rem)' }}>
                  <label className="mb-1 text-sm font-medium text-gray-100">Age</label>
                  <div className="p-4 text-gray-900 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl hover:shadow-xl hover:bg-opacity-100 hover:-translate-y-1">
                    {user.age}
                  </div>
                </div>
                <div className="flex flex-col" style={{ width: 'calc(60% - 0.6rem)' }}>
                  <label className="mb-1 text-sm font-medium text-gray-100">Gender</label>
                  <div className="p-4 text-gray-900 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl hover:shadow-xl hover:bg-opacity-100 hover:-translate-y-1">
                    {user.gender === "male" ? "Nam" : user.gender === "female" ? "Nữ" : user.gender}
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-1 text-sm font-medium text-gray-100">Email</label>
                <div className="p-4 text-gray-900 transition-all duration-300 transform bg-white border border-gray-200 shadow-lg bg-opacity-95 rounded-xl hover:shadow-xl hover:bg-opacity-100 hover:-translate-y-1">
                  {user.email}
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-10">
            {!isEditing && (
              <>
                <button
                  className="flex-1 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl hover:from-blue-700 hover:to-blue-900 hover:shadow-xl hover:-translate-y-1"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
                <button
                  className="flex-1 py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-red-600 to-red-800 rounded-xl hover:from-red-700 hover:to-red-900 hover:shadow-xl hover:-translate-y-1"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;