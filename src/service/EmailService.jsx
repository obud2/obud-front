import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

/**
 *
 * @param {*} param  {
 *                        toEmail:
 *                        name:
 *                    }
 * @returns
 */
const findPassword = (param) => {
  return new Promise((resolve) => {
    axiosInstance
      .post(`${API_URL}/email/findPassword`, param)
      .then((response) => {
        resolve(response?.data);
      })
      .catch(() => {
        resolve({});
      });
  });
};

/**
 *
 * @param {*} param  {
 *                        toEmail:
 *                        code:
 *                    }
 * @returns
 */

const checkVerify = (toEmail, code) => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`${API_URL}/email/checkVerify?toEmail=${toEmail}&code=${code}`)
      .then((response) => {
        resolve(response?.data);
      })
      .catch(() => {
        resolve({});
      });
  });
};

/**
 *
 * @param {*} param  {
 *                        id:
 *                        code:
 *                        newPassword:
 *                    }
 * @returns
 */

const changePassword = (param) => {
  return new Promise((resolve) => {
    axiosInstance
      .post(`${API_URL}/email/changePassword`, param)
      .then((response) => {
        resolve(response?.data);
      })
      .catch(() => {
        resolve({});
      });
  });
};

const EmailService = {
  findPassword,
  checkVerify,
  changePassword,
};

export default EmailService;
