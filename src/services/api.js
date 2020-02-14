import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f-lab.herokuapp.com'
})

export default api;