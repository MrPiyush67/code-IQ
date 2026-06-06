import axiosClient from "../lib/axiosClient.js";

export const sessionApi = {
  createSession: async (data) => {
    const response = await axiosClient.post("/sessions", data);
    return response.data;
  },

  getActiveSessions: async () => {
    const response = await axiosClient.get("/sessions/active");
    return response.data;
  },
  getMyRecentSessions: async () => {
    const response = await axiosClient.get("/sessions/my-recent");
    return response.data;
  },

  getSessionById: async (id) => {
    const response = await axiosClient.get(`/sessions/${id}`);
    return response.data;
  },

  joinSession: async (id) => {
    const response = await axiosClient.post(`/sessions/${id}/join`);
    return response.data;
  },
  endSession: async (id) => {
    const response = await axiosClient.post(`/sessions/${id}/end`);
    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosClient.get(`/chat/token`);
    return response.data;
  },
};