import axiosInstance from '@/constants/AxiosInstance';

export const getItem = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/code/${id}`)
      .then((res) => resolve(res?.data?.value || {}))
      .catch(reject);
  });
};
