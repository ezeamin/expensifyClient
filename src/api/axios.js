import axios from 'axios';

const API = process.env.REACT_APP_API || 'http://localhost:5000';

export default axios.create({
    baseURL: API,
});