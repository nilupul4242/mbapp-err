import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

const API_BASE_URL = 'https://your-api-url.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  async (config) => {
    const { authToken } = React.useContext(AuthContext);
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
