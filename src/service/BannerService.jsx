import { API_URL } from '@/constants';

import axiosInstanceV2 from '@/constants/AxiosInstanceV2';

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstanceV2.get(`${API_URL}/banner/${id}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const BannerService = {
  info,
};

export default BannerService;
