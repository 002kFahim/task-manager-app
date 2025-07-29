import api from "./api";

export const taskService = {
  // Get all tasks
  async getTasks(params = {}) {
    try {
      const response = await api.get("/tasks", { params });
      return response.data.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch tasks" };
    }
  },

  // Get single task
  async getTask(id) {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data.data.task;
    } catch (error) {
      throw error.response?.data || { message: "Failed to fetch task" };
    }
  },

  // Create new task
  async createTask(taskData) {
    try {
      const response = await api.post("/tasks", taskData);
      return response.data.data.task;
    } catch (error) {
      throw error.response?.data || { message: "Failed to create task" };
    }
  },

  // Update task
  async updateTask(id, taskData) {
    try {
      const response = await api.put(`/tasks/${id}`, taskData);
      return response.data.data.task;
    } catch (error) {
      throw error.response?.data || { message: "Failed to update task" };
    }
  },

  // Delete task
  async deleteTask(id) {
    try {
      await api.delete(`/tasks/${id}`);
      return true;
    } catch (error) {
      throw error.response?.data || { message: "Failed to delete task" };
    }
  },

  // Get random task for spinning wheel
  async getRandomTask(category = null) {
    try {
      const params = category ? { category } : {};
      const response = await api.get("/tasks/random", { params });
      return response.data.data.task;
    } catch (error) {
      throw (
        error.response?.data || { message: "No tasks found for spinning wheel" }
      );
    }
  },

  // Get task statistics
  async getTaskStats() {
    try {
      const response = await api.get("/tasks/stats");
      return response.data.data;
    } catch (error) {
      throw (
        error.response?.data || { message: "Failed to fetch task statistics" }
      );
    }
  },
};
