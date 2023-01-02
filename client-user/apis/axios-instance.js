import axios from 'axios';
const instance = axios.create({
  baseURL: 'https://bluesville-customer-web.herokuapp.com',
  // baseURL: 'http://localhost:3000',
});

export default instance;
