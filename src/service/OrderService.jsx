import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

/**
 *
 * @param {Array} param  : Docs 참고
 * @returns
 */
const setOrder = (param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${API_URL}/order`, { orders: param })
      .then((res) => {
        if (res?.status === 200) {
          resolve(res?.data?.value);
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });
};

const orderComplete = (param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${API_URL}/order/complete`, param)
      .then((res) => {
        if (res?.status === 200) {
          resolve(res?.data?.value);
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });
};

const orderFali = (param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${API_URL}/order/payFail`, param)
      .then((res) => {
        if (res?.status === 200) {
          resolve(res?.data?.value);
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });
};

const payCancel = (param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(`${API_URL}/order/payCancel`, param)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};

const reservationCancel = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${API_URL}/reservation/cancel/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};

const cancelCheck = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/reservation/cancel/check/${id}`)
      .then((res) => {
        resolve(res?.data?.value || {});
      })
      .catch(reject);
  });
};

const OrderService = {
  setOrder,
  orderComplete,
  orderFali,
  payCancel,
  reservationCancel,
  cancelCheck,
};

export default OrderService;
