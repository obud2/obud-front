import axios from 'axios';
import { Auth } from 'aws-amplify';

import { API_URL_V2, cookieRemove, getJwt, setJwt } from './index';

import awsconfig from '../aws-exports';

Auth.configure(awsconfig);

const TOKEN = getJwt();

const axiosInstanceV2 = axios.create({
  baseURL: API_URL_V2,
  timeout: 1000 * 30,
  headers: {
    Pragma: 'no-cache',
    CacheControl: 'no-cache',
    Expires: '0',
    usertype: 'user',
    Authorization: TOKEN,
  },
});

axiosInstanceV2.interceptors.request.use(
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

axiosInstanceV2.interceptors.response.use(
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
      return Promise.resolve(error.response.data);
    }

    return Promise.resolve(error);
  },
);

export const tokenRefresh = async () => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();

    return new Promise((resolve) => {
      cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
        if (session) {
          const { idToken } = session;

          setJwt(idToken.jwtToken);
          resolve(idToken.jwtToken);
        }
      });
    });
  } catch (e) {
    if (e === 'The user is not authenticated') {
      cookieRemove();
      Auth.signOut();
    }
  }
};

export default axiosInstanceV2;
