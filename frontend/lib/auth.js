import api from "./api";
import Cookies from "js-cookie";

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await api.post("/auth/login", credentials);
      const { user, token } = response.data.data;

      // Store token and user in cookies
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      return { user, token };
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      const { user, token } = response.data.data;

      // Store token and user in cookies
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });

      return { user, token };
    } catch (error) {
      throw error.response?.data || { message: "Registration failed" };
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data.data.user;
    } catch (error) {
      throw error.response?.data || { message: "Failed to get user" };
    }
  },

  // Reset password request
  async resetPassword(email) {
    try {
      const response = await api.post("/auth/reset-password", { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Reset password failed" };
    }
  },

  // Logout user
  logout() {
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.href = "/auth/login";
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!Cookies.get("token");
  },

  // Get user from cookies
  getUser() {
    const userCookie = Cookies.get("user");
    return userCookie ? JSON.parse(userCookie) : null;
  },
};
