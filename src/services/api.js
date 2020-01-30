import axios from 'axios';

const api = axios.create({
  baseURL: 'http://f-lab.herokuapp.com:3333'
})

export default api;