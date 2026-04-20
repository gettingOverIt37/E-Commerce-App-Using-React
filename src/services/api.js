import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';
const api = axios.create({ baseURL: BASE_URL });

export const fetchProducts = () => api.get('/products?limit=100');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const fetchCategories = () => api.get('/products/categories');
export const fetchProductsByCategory = (category) =>
    api.get(`/products/category/${category}`);

export default api;