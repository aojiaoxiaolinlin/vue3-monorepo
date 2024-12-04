import axios from 'axios';

// TODO: 需要更加完美的配置
export const request = axios.create({
  baseURL: 'http://localhost:8848',
});

export default request;
