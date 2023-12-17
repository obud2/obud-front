import axiosInstance from '@/constants/AxiosInstance';

const getListByType = (type) => {
  return new Promise((resolve) => {
    axiosInstance.get('bbs/contact/').then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value.filter((d) => d?.type === type));
      }
    });
  });
};

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`bbs/contact/${id}`).then((response) => {
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
        method: 'post',
        url: 'bbs/contact/',
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
