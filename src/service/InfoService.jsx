import axiosInstance from '@/constants/AxiosInstance';

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
};

export default InfoService;
