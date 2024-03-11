import axiosInstance from '@/constants/AxiosInstance';
import { AxiosResponse } from 'axios';
import { CreateOrderParam } from '@components/booking/hook/useBookingSetting';
import { Order } from '@/context/OrderContext';

/**
 *
 * @param {Array} params  : Docs 참고
 * @returns
 */
export const createOrder = async (params: CreateOrderParam[]): Promise<{ merchantUid: string }> => {
  return await axiosInstance.post<{ value: { merchantUid: string } }>('order', { orders: params }).then((res) => {
    return res.data.value;
  });
};

export const orderComplete = async (param: any) =>
  axiosInstance.post<{ value: { orderStatus?: 'COMPLETE' | 'FAIL'; error?: string } }>('order/complete', param).then((res) => {
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

export const payCancel = async (param: any): Promise<AxiosResponse<void>> => axiosInstance.post<void>('order/payCancel', param);

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

type CancelCheckRequest = {
  id: string;
};

const cancelCheck = (req: CancelCheckRequest): Promise<any> => {
  const { id } = req;

  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`reservation/cancel/check/${id}`)
      .then((res) => {
        resolve(res?.data?.value || {});
      })
      .catch(reject);
  });
};

type GetTotalPriceFromOrdersRequest = {
  orders: Order[];
};

const getTotalPriceFromOrders = (request: GetTotalPriceFromOrdersRequest): number => {
  const { orders = [] } = request;

  return orders.reduce((acc, it) => {
    const price = Number(it.price ?? 0);
    const reservationCount = Number(it.reservationCount ?? 0);
    const payOptionPrice = Number((it.payOption as any).price ?? 0);
    const payOptionCount = Number(it.payOptionCount ?? 0);

    const basePrice = price * reservationCount;
    const optionPrice = payOptionPrice ? payOptionPrice * payOptionCount : 0;

    return acc + basePrice + optionPrice;
  }, 0);
};

export const OrderService = {
  getTotalPriceFromOrders,
  cancelCheck,
};
