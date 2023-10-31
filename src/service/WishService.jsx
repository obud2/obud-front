import axiosInstanceV2 from '../constants/AxiosInstanceV2';

const getWish = () => {
  return new Promise((resolve) => {
    axiosInstanceV2.get('user/wish').then((response) => {
      resolve(response?.data?.value || []);
    });
  });
};

const setWish = (studio) => {
  return new Promise((resolve) => {
    axiosInstanceV2.post(`user/wish/${studio}`).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const deleteWishs = (body) => {
  return new Promise((resolve) => {
    axiosInstanceV2.delete('user/wish', { data: body }).then((response) => {
      resolve(response?.data?.value || {});
    });
  });
};

const deleteWish = (id) => {
  return new Promise((resolve) => {
    axiosInstanceV2.delete(`user/wish/${id}`).then((response) => {
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
