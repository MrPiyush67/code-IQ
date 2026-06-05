import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // cookies sent to server automatically on every req
});

export default axiosClient;
