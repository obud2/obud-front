import axiosInstance from '@/constants/AxiosInstance';

export const getUser = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`user/${id}`).then((response) => {
      const res = response?.data?.value;

      if (res) {
        resolve(res);
      } else {
        resolve({});
      }
    });
  });
};

export const setUser = (method, param) => {
  return new Promise((resolve) => {
    axiosInstance
      .request({
        method: method === 'new' ? 'post' : 'put',
        url: 'user',
        data: param,
      })
      .then((response) => {
        if (response.status === 500) {
          resolve({});
        }
        if (response.status >= 400) {
          resolve(response);
        }
        resolve(response.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

export const findId = (name, hp) => {
  return new Promise((resolve) => {
    axiosInstance.get(`user/findId?name=${name}&hp=${hp}`).then((response) => {
      resolve(response?.data);
    });
  });
};

export const visitUser = () => {
  return new Promise((resolve) => {
    axiosInstance.put('user/visit').then((response) => {
      resolve(response?.data);
    });
  });
};

export const leaveUser = async () => {
  return axiosInstance.put('user/leave').then((response) => {
    return response?.data;
  });
};

export const myOrderItem = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`user/myPage/${id}`).then((response) => {
      resolve(response?.data || {});
    });
  });
};

export const myReservations = () => {
  return axiosInstance.get('user/myPage').then((response) => response.data);
};
