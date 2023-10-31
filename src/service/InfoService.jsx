import axiosInstanceV2 from 'src/constants/AxiosInstanceV2';

const getListAll = () => {
  return new Promise((resolve) => {
    axiosInstanceV2.get('bbs/info/').then((response) => {
      if (response.data && response.data.value) {
        resolve(response.data.value);
      }
    });
  });
};

const info = (id) => {
  return new Promise((resolve) => {
    axiosInstanceV2.get(`bbs/info/${id}`).then((response) => {
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
