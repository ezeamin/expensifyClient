import axios from 'axios';

const API = import.meta.env.VITE_API || 'http://localhost:5000';

export default axios.create({
    baseURL: API,
});