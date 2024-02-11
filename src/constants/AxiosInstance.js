import axios from 'axios';
import { Auth } from 'aws-amplify';

import { API_URL, getJwt, tokenRefresh } from './index';

import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const TOKEN = getJwt();

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 1000 * 30,
  headers: {
    Pragma: 'no-cache',
    CacheControl: 'no-cache',
    Expires: '0',
    usertype: 'user',
    Authorization: TOKEN,
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const configClone = config;
    configClone.headers.Authorization = TOKEN;
    configClone.headers.usertype = 'user';
    configClone.headers.Bucket = awsconfig.aws_user_files_s3_bucket;
    return configClone;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      if (error.response && error.response.status === 401) {
        tokenRefresh().then((res) => {
          if (res) {
            window.location.reload();
          }
        });
      }
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
