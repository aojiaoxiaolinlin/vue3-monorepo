export * from './utils/RequestBody';
export * from './utils/RsaUtil';

import axios from 'axios';

// TODO: 需要更加完美的配置
export const request = axios.create({
  baseURL: 'http://localhost:8080',
});

export default request;
