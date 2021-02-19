import axios from 'axios';
import { BACKEND_URL } from '../config';
import store from '../redux/store/store';

const axiosOptions = {
  baseURL: BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

const axiosService = axios.create(axiosOptions);

axiosService.interceptors.request.use(
  (config) => {
    if (config.baseURL) {
      const TOKEN = store.getState().auth.token;

      if (TOKEN) {
        config.headers.common['x-auth-token'] = TOKEN;
      }
    }

    return config;
  },
  (err) => Promise.reject(err),
);

axiosService.CancelToken = axios.CancelToken;
axiosService.isCancel = axios.isCancel;

export default axiosService;
