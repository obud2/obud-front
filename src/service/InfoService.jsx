import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

const getListAll = () => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/bbs/info/`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/bbs/info/${id}`).then((response) => {
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
