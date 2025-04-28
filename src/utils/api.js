import axios from "axios";

const API_BASE_URL = "https://assistant.baopanel.com/api/v1";

// Tạo axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: "application/json",
  },
});

// Hàm thêm token vào headers nếu có
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//**************** Profiles
// API để lấy danh sách profiles
export const getProfiles = async () => {
  try {
    const response = await apiClient.get("/profiles", {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch profiles"
    );
  }
};

// API để xóa profile
export const deleteProfile = async (id) => {
  try {
    const response = await apiClient.delete(`/profiles/${id}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to delete profile"
    );
  }
};

// API để lưu profile
export const storeProfile = async (courseData) => {
  try {
    const response = await apiClient.post("/profiles/store", courseData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to store profile"
    );
  }
};

// API để generate
export const generate = async (data) => {
  try {
    const response = await apiClient.post("/generate", data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate"
    );
  }
};

// API để generate-next
export const generateNext = async (data) => {
  try {
    const response = await apiClient.post("/generate-next", data, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to generate next"
    );
  }
};

//**************** Tasks
// API để lấy tasks theo profileId
export const getTasksByProfile = async (profileId) => {
  try {
    const response = await apiClient.get(`/tasks/${profileId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks by profile"
    );
  }
};

// API để lấy tasks theo weekId
export const getTasksByWeek = async (weekId) => {
  try {
    const response = await apiClient.get(`/tasks/of-week/${weekId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch tasks by week"
    );
  }
};

// API để cập nhật trạng thái task theo taskId
export const updateTaskStatus = async (taskId, isDone) => {
  try {
    const response = await apiClient.patch(
      `tasks/${taskId}`,
      { is_done: isDone },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message
    );
  }
};

// API để cập nhật nội dung task theo taskId
export const updateTaskContent = async (taskId, taskData) => {
  try {
    const response = await apiClient.patch(
      `/learning/task/update/${taskId}`,
      taskData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to update task content"
    );
  }
};

//**************** Exercises
// API để lấy exercise theo taskId
export const getExerciseByTaskId = async (taskId) => {
  try {
    const response = await apiClient.get(`/exercises/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercise by task ID"
    );
  }
};

// API để lấy exercises theo weekId
export const getExercisesByWeekId = async (weekId) => {
  try {
    const response = await apiClient.get(`/exercises/by-week/${weekId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises by week ID"
    );
  }
};

// API để submit exercise
export const submitExercise = async (exerciseData) => {
  try {
    const response = await apiClient.post(`/exercises/submit`, exerciseData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit exercise"
    );
  }
};

// API để lấy summary exercises
export const getExercisesSummary = async (weekId) => {
  try {
    const response = await apiClient.post(
      `/exercises/summary`,
      { week_id: weekId },
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch exercises summary"
    );
  }
};

//**************** Stats
// API để lấy history theo weekId
export const getWeekHistory = async (weekId) => {
  try {
    const response = await apiClient.get(`/learning/weeks/history/${weekId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch week history"
    );
  }
};

// API để export tasks của week thành PDF
export const exportWeekToPDF = async (weekId) => {
  try {
    const response = await apiClient.get(`/learning/tasks/${weekId}`, {
      headers: getAuthHeaders(),
      responseType: "blob", // Để xử lý file PDF
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to export week to PDF"
    );
  }
};

// API để gợi ý tasks cho tuần mới
export const suggestTasksForWeek = async (weekId) => {
  try {
    const response = await apiClient.get(`/learning/tasks/${weekId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to suggest tasks for new week"
    );
  }
};