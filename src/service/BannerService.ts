import axiosInstance from '@/constants/AxiosInstance';
import { Banner } from '@/entities/banner';

export const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`banner/${id}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

type ListBannersResponse = {
  value: Banner[];
};

export const listBanners = async () => {
  const response = await axiosInstance.get<ListBannersResponse>('v2/banner');
  return response.data.value;
};
