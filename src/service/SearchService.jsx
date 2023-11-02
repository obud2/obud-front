import axiosInstance from '@/constants/AxiosInstance';

const getSearch = (keyword, data) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`search?keyword=${keyword}&date=${data}`)
      .then((res) => {
        resolve(res?.data?.value || []);
      })
      .catch(reject);
  });
};

const getKeyword = () => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get('search/keyword')
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
