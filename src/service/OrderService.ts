import axiosInstance from '@/constants/AxiosInstance';
import { AxiosResponse } from 'axios';
import { CreateOrderParam } from '@components/booking/hook/useBookingSetting';

/**
 *
 * @param {Array} params  : Docs 참고
 * @returns
 */
export const createOrder = async (params: CreateOrderParam[]): Promise<{ merchantUid: string }> => {
    return await axiosInstance
      .post<{ value: { merchantUid: string }}>('order', { orders: params })
      .then((res) => {
          return res.data.value;
      });
};

export const orderComplete = async (param: any) =>
  axiosInstance
    .post<{ value: { orderStatus?: 'COMPLETE' | 'FAIL'; error?: string; } }>('order/complete', param)
    .then((res) => {
      return res.data.value;
    });

export const orderFail = (param: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('order/payFail', param)
      .then((res) => {
        if (res?.status === 200) {
          resolve();
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });
};

export const payCancel = async (param: any): Promise<AxiosResponse<void>> =>
  axiosInstance
    .post<void>('order/payCancel', param);

export const reservationCancel = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`reservation/cancel/${id}`)
      .then((res) => {
        resolve(res);
      })
      .catch(reject);
  });
};

export const cancelCheck = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`reservation/cancel/check/${id}`)
      .then((res) => {
        resolve(res?.data?.value || {});
      })
      .catch(reject);
  });
};
