import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('Unauthorized access - redirecting to login');
      // You can implement a redirect here if needed
    } else if (error.response && error.response.status === 403) {
      // Handle forbidden access
      console.error('Forbidden access - you do not have permission to access this resource');
    } else if (error.response && error.response.status === 404) {   
      // Handle not found
      console.error('Resource not found - check the URL');
    }
    else if (error.response && error.response.status >= 500) {
      // Handle server errors
      console.error('Server error - please try again later');
    }
    return Promise.reject(error);
  }
);

export default api;
