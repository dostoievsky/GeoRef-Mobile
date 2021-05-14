import axios from 'axios';

const api = axios.create({
  baseURL:'https://backend-unificado-production.herokuapp.com',
});

export default api;
