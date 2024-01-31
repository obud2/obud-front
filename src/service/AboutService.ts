import axiosInstance from '@/constants/AxiosInstance';

export const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`bbs/contact/${id}`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

export const saveItem = (type, param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: 'post',
        url: 'bbs/contact/',
        data: param,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
