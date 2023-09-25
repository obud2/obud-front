import { API_URL } from '../constants';

import axiosInstance from '../constants/AxiosInstance';

const getWish = () => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/wish`).then((response) => {
      resolve(response?.data?.value || []);
    });
  });
};

const setWish = (studio) => {
  return new Promise((resolve) => {
    axiosInstance.post(`${API_URL}/user/wish/${studio}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const deleteWishs = (body) => {
  return new Promise((resolve) => {
    axiosInstance.delete(`${API_URL}/user/wish`, { data: body }).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const deleteWish = (id) => {
  return new Promise((resolve) => {
    axiosInstance.delete(`${API_URL}/user/wish/${id}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const WishService = {
  getWish,
  setWish,
  deleteWish,
  deleteWishs,
};

export default WishService;
