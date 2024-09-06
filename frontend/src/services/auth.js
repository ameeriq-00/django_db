import axios from "axios";

const API_URL = "http://localhost:8000/api/";

const AuthService = {
  login: async (username, password) => {
    const response = await axios.post(API_URL + "token/", {
      username,
      password,
    });
    if (response.data.access) {
      localStorage.setItem("token", response.data.access);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  getCurrentUser: () => {
    return localStorage.getItem("token");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axios.post(API_URL + "token/refresh/", {
          refresh: refreshToken,
        });
        if (response.data.access) {
          localStorage.setItem("token", response.data.access);
        }
        return response.data;
      } catch (error) {
        console.error("Error refreshing token:", error);
        AuthService.logout();
      }
    }
  },
};

export default AuthService;
