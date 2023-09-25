import { API_URL } from '../constants';

import axiosInstance from 'src/constants/AxiosInstance';

const getUserList = () => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`${API_URL}/user/`)
      .then((response) => {
        response?.data?.value.sort((a, b) => {
          return Number(b.endDate) < Number(a.endDate) ? 1 : -1;
        });

        resolve(response?.data?.value || []);
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const getUser = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/${id}`).then((response) => {
      const res = response?.data?.value;

      if (res) {
        resolve(res);
      } else {
        resolve({});
      }
    });
  });
};

const setUser = (method, param) => {
  return new Promise((resolve) => {
    axiosInstance
      .request({
        method: method === 'new' ? 'post' : 'put',
        url: `${API_URL}/user/`,
        data: param,
      })
      .then((response) => {
        resolve(response?.data);
      })
      .catch((err) => {
        resolve(err);
      });
  });
};

const checkUser = ({ id }) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/check/${id}`).then((response) => {
      resolve(response?.data?.Item);
    });
  });
};

const changePassword = (id, password) => {
  return new Promise((resolve) => {
    const param = { id, change: password };
    axiosInstance.put(`${API_URL}/user/changePassword/`, param).then((response) => {
      resolve(response?.data?.Item);
    });
  });
};

const findId = (name, hp) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/findId?name=${name}&hp=${hp}`).then((response) => {
      resolve(response?.data);
    });
  });
};

const visitUser = () => {
  return new Promise((resolve) => {
    axiosInstance.put(`${API_URL}/user/visit`).then((response) => {
      resolve(response?.data);
    });
  });
};

const leaveUser = () => {
  return new Promise((resolve) => {
    axiosInstance.delete(`${API_URL}/user`).then((response) => {
      resolve(response?.data);
    });
  });
};

const myOrderList = () => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/myPage`).then((response) => {
      resolve(response?.data || {});
    });
  });
};

const myOrderItem = (id) => {
  return new Promise((resolve) => {
    axiosInstance.get(`${API_URL}/user/myPage/${id}`).then((response) => {
      resolve(response?.data || {});
    });
  });
};

const UserService = {
  getUser,
  setUser,
  getUserList,
  checkUser,
  changePassword,
  findId,
  leaveUser,
  visitUser,

  myOrderList,
  myOrderItem,
};

export default UserService;
