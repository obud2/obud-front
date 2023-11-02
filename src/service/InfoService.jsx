import axiosInstance from '@/constants/AxiosInstance';

const getListAll = () => {
  return new Promise((resolve) => {
    axiosInstance.get('bbs/info/').then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`bbs/info/${id}`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

const InfoService = {
  info,
  getListAll,
};

export default InfoService;
