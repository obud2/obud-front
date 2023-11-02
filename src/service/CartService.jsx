import moment from 'moment';
import axiosInstance from '@/constants/AxiosInstance';

const getCart = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('cart')
      .then((res) => {
        const nowDate = moment().valueOf();
        const list = res?.data?.value || [];

        list?.forEach((a) => {
          // 날짜 데이터 포맷처리.
          const date = moment(a.startDate).format('YYYY-MM-DD');

          const startTime = moment(a.startDate).format('HH:mm');
          const endTime = moment(a.endDate).format('HH:mm');

          a.format = {};
          a.format.date = date;
          a.format.startTime = startTime;
          a.format.endTime = endTime;
          a.format.pastDate = false;

          // 오늘 기준 날짜 지났는지 체크.
          const endTimeCheck = moment(a.endDate).valueOf();

          if (nowDate > endTimeCheck) {
            a.format.pastDate = true;
          }
        });

        resolve(list || []);
      })
      .catch(reject);
  });
};

const setCart = (param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post('cart', param)
      .then((res) => resolve(res?.data?.value || {}))
      .catch(reject);
  });
};

const deleteCart = (list) => {
  return new Promise((resolve) => {
    axiosInstance.delete('cart', { data: list }).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const CartService = {
  getCart,
  setCart,
  deleteCart,
};

export default CartService;
