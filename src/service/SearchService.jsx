import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

const getSearch = (keyword, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/search?keyword=${keyword}&date=${data}`)
      .then((res) => {
        resolve(res?.data?.value || []);
      })
      .catch(reject);
  });
};

const getKeyword = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${API_URL}/search/keyword`)
      .then((res) => {
        resolve(res?.data?.value || []);
      })
      .catch(reject);
  });
};

const SearchService = {
  getSearch,
  getKeyword,
};

export default SearchService;
