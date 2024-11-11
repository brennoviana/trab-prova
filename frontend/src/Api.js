import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/users',
});

export const registerUser = (userData) => api.post('/', userData);
export const loginUser = (userData) => api.post('/login', userData);

export default api;
