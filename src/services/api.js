import axios from 'axios';

const api = axios.create({
  baseURL: 'https://f-lab.herokuapp.com:3333'
})

export default api;