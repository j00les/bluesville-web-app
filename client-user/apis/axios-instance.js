import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://blv-database-production.up.railway.app',
  //baseURL: 'http://localhost:3000',
});

export default instance;
