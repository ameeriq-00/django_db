import axios from "axios";
import AuthService from "./auth";

const API_URL = "http://localhost:8000/api/";

const ApiService = {
  axiosInstance: axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  }),

  setup: () => {
    ApiService.axiosInstance.interceptors.request.use(
      (config) => {
        const token = AuthService.getToken();
        if (token) {
          config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    ApiService.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await AuthService.refreshToken();
            const token = AuthService.getToken();
            if (token) {
              ApiService.axiosInstance.defaults.headers.common[
                "Authorization"
              ] = "Bearer " + token;
              return ApiService.axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  },

  // Person methods
  getPersons: (params) => ApiService.axiosInstance.get("persons/", { params }),
  getPerson: (id) => ApiService.axiosInstance.get(`persons/${id}/`),
  createPerson: (data) => ApiService.axiosInstance.post("persons/", data),
  updatePerson: (id, data) =>
    ApiService.axiosInstance.put(`persons/${id}/`, data),
  deletePerson: (id) => ApiService.axiosInstance.delete(`persons/${id}/`),

  // Media methods
  getPersonMedia: (personId) =>
    ApiService.axiosInstance.get(`media/?PersonID=${personId}`),
  addMedia: (personId, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("PersonID", personId);
    formData.append("file_path", file.name);
    formData.append("file_type", file.type);

    return ApiService.axiosInstance.post("media/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteMedia: (id) => ApiService.axiosInstance.delete(`media/${id}/`),

  // Sheet import method
  importSheet: (personId, formData) => {
    return ApiService.axiosInstance.post(`import/${personId}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  // ATemp methods
  getATemp: (params) => ApiService.axiosInstance.get("a_temp/", { params }),
  createATemp: (data) => ApiService.axiosInstance.post("a_temp/", data),
  updateATemp: (id, data) =>
    ApiService.axiosInstance.put(`a_temp/${id}/`, data),
  deleteATemp: (id) => ApiService.axiosInstance.delete(`a_temp/${id}/`),

  // ZTemp methods
  getZTemp: (params) => ApiService.axiosInstance.get("z_temp/", { params }),
  createZTemp: (data) => ApiService.axiosInstance.post("z_temp/", data),
  updateZTemp: (id, data) =>
    ApiService.axiosInstance.put(`z_temp/${id}/`, data),
  deleteZTemp: (id) => ApiService.axiosInstance.delete(`z_temp/${id}/`),

  // KTemp methods
  getKTemp: (params) => ApiService.axiosInstance.get("k_temp/", { params }),
  createKTemp: (data) => ApiService.axiosInstance.post("k_temp/", data),
  updateKTemp: (id, data) =>
    ApiService.axiosInstance.put(`k_temp/${id}/`, data),
  deleteKTemp: (id) => ApiService.axiosInstance.delete(`k_temp/${id}/`),

  // Archive methods
  getArchives: (params) =>
    ApiService.axiosInstance.get("archives/", { params }),
  getArchive: (id) => ApiService.axiosInstance.get(`archives/${id}/`),
  createArchive: (data) => ApiService.axiosInstance.post("archives/", data),
  updateArchive: (id, data) =>
    ApiService.axiosInstance.put(`archives/${id}/`, data),
  deleteArchive: (id) => ApiService.axiosInstance.delete(`archives/${id}/`),

  // Dispatch methods
  getDispatches: (params) =>
    ApiService.axiosInstance.get("dispatches/", { params }),
  getDispatch: (id) => ApiService.axiosInstance.get(`dispatches/${id}/`),
  createDispatch: (data) => ApiService.axiosInstance.post("dispatches/", data),
  updateDispatch: (id, data) =>
    ApiService.axiosInstance.put(`dispatches/${id}/`, data),
  deleteDispatch: (id) => ApiService.axiosInstance.delete(`dispatches/${id}/`),

  // Global search method
  globalSearch: (query) => ApiService.axiosInstance.get(`search/?q=${query}`),

  // Report generation method (if applicable)
  generateReport: (params) =>
    ApiService.axiosInstance.get("report/", { params }),
};

export default ApiService;
