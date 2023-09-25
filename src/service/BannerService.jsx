import { API_URL } from '../constants';

import axiosInstance from '../constants/AxiosInstance';

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/banner/${id}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const BannerService = {
  info,
};

export default BannerService;
