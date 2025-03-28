import axios from 'axios';

// Create a base Axios instance
const apiURL = process.env.REACT_APP_API_URL
const authAxios = axios.create({
  baseURL: `/`, // Base URL for your API
});

export default authAxios;