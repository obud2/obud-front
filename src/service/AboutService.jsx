import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

const getListByType = (type) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/bbs/contact/`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value.filter((d) => d?.type === type));
      }
    });
  });
};

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/bbs/contact/${id}`).then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

const saveItem = (type, param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: type === 'new' ? 'post' : 'put',
        url: `${API_URL}/bbs/contact/`,
        data: param,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const AboutService = {
  info,
  getListByType,
  saveItem,
};

export default AboutService;
