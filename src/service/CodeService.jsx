import axiosInstance from '@/constants/AxiosInstance';

const getList = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('/code')
      .then((res) => resolve(res?.data))
      .catch(reject);
  });
};

const getItem = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/code/${id}`)
      .then((res) => resolve(res?.data?.value || {}))
      .catch(reject);
  });
};

const getListByGroup = (group) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`/code/group/${group}`)
      .then((res) => resolve(res.data?.value))
      .catch(reject);
  });
};

const saveItem = (type, param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: type === 'new' ? 'post' : 'put',
        url: '/code',
        data: param,
      })
      .then((response) => {
        resolve(response.data.value);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const CodeService = {
  getList,
  getItem,
  getListByGroup,
  saveItem,
};

export default CodeService;
