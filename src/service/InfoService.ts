import axiosInstance from '@/constants/AxiosInstance';

export const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`bbs/info/${id}`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};
