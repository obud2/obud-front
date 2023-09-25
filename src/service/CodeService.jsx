import { API_URL } from '../constants';
import axiosInstance from 'src/constants/AxiosInstance';

const getList = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/code`)
      .then((res) => resolve(res?.data))
      .catch(reject);
  });
};

const getItem = (id) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/code/${id}`)
      .then((res) => resolve(res?.data?.value || {}))
      .catch(reject);
  });
};

const getListByGroup = (group) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/code/group/${group}`)
      .then((res) => resolve(res.data?.value))
      .catch(reject);
  });
};

const saveItem = (type, param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: type === 'new' ? 'post' : 'put',
        url: `${API_URL}/code`,
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
