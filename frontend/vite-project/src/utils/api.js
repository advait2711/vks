import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
    // Don't set Content-Type here - let axios handle it automatically
    // This allows FormData to set multipart/form-data with boundary
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Only set Content-Type to JSON if it's not FormData
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }
        // If it's FormData, axios will automatically set the correct Content-Type

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/secured-admin2711';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authAPI = {
    login: (credentials) => api.post('/admin/login', credentials),
    logout: () => api.post('/admin/logout'),
    verify: () => api.get('/admin/verify')
};

// News API
export const newsAPI = {
    getAll: () => api.get('/news'),
    getById: (id) => api.get(`/news/${id}`),
    create: (newsData) => api.post('/news', newsData),
    update: (id, newsData) => api.put(`/news/${id}`, newsData),
    delete: (id) => api.delete(`/news/${id}`)
};

// Admin User API
export const adminUserAPI = {
    getAll: () => api.get('/admin/users'),
    getById: (id) => api.get(`/admin/users/${id}`),
    create: (userData) => api.post('/admin/users', userData),
    update: (id, userData) => api.put(`/admin/users/${id}`, userData),
    delete: (id) => api.delete(`/admin/users/${id}`)
};

export default api;
