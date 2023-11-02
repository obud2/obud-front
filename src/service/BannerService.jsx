import axiosInstance from '@/constants/AxiosInstance';

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`banner/${id}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const BannerService = {
  info,
};

export default BannerService;
