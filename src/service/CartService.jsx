import moment from 'moment';
import axiosInstanceV2 from '@/constants/AxiosInstanceV2';

const getCart = () => {
  return new Promise((resolve, reject) => {
    axiosInstanceV2
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
    axiosInstanceV2
      .post('cart', param)
      .then((res) => resolve(res?.data?.value || {}))
      .catch(reject);
  });
};

const deleteCart = (list) => {
  return new Promise((resolve) => {
    axiosInstanceV2.delete('cart', { data: list }).then((response) => {
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
