import api from "./api";

export const resetPasswordService = {
  // Reset password
  async resetPassword(email, newPassword, confirmPassword) {
    try {
      const response = await api.post("/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to reset password" };
    }
  },
};
