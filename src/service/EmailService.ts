import axiosInstance from '@/constants/AxiosInstance';

/**
 *
 * @param {*} param  {
 *                        toEmail:
 *                        name:
 *                    }
 * @returns
 */
export const findPassword = (param) => {
  return new Promise((resolve) => {
    axiosInstance
      .post('email/findPassword', param)
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

export const checkVerify = (toEmail, code) => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`email/checkVerify?toEmail=${toEmail}&code=${code}`)
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

export const changePassword = (param) => {
  return new Promise((resolve) => {
    axiosInstance
      .post('email/changePassword', param)
      .then((response) => {
        resolve(response?.data);
      })
      .catch(() => {
        resolve({});
      });
  });
};
