import axios from "axios";

const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
});

request.interceptors.request.use(config => {
  console.log('config', config);
  return config;
});

request.interceptors.response.use(
  response => {
    console.log('response', response);
    return response?.data;
  },
  error => {
    console.log('error', error);
    return Promise.reject(error);
  },
);

export default request;