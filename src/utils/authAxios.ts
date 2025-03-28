import axios from 'axios';

const authAxios = axios.create({
  baseURL: `/`,
});

export default authAxios;