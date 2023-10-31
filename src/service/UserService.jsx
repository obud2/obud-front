import axiosInstanceV2 from 'src/constants/AxiosInstanceV2';

const getUserList = () => {
  return new Promise((resolve) => {
    axiosInstanceV2
        .get('user')
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
    axiosInstanceV2.get(`user/${id}`).then((response) => {
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
    axiosInstanceV2
      .request({
        method: method === 'new' ? 'post' : 'put',
        url: 'user',
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
    axiosInstanceV2.get(`user/check/${id}`).then((response) => {
      resolve(response?.data?.Item);
    });
  });
};

const changePassword = (id, password) => {
  return new Promise((resolve) => {
    const param = { id, change: password };
    axiosInstanceV2.put('user/changePassword', param).then((response) => {
      resolve(response?.data?.Item);
    });
  });
};

const findId = (name, hp) => {
  return new Promise((resolve) => {
    axiosInstanceV2.get(`user/findId?name=${name}&hp=${hp}`).then((response) => {
      resolve(response?.data);
    });
  });
};

const visitUser = () => {
  return new Promise((resolve) => {
    axiosInstanceV2.put('user/visit').then((response) => {
      resolve(response?.data);
    });
  });
};

const leaveUser = () => {
  return new Promise((resolve) => {
    axiosInstanceV2.delete('user').then((response) => {
      resolve(response?.data);
    });
  });
};

const myOrderList = () => {
  return new Promise((resolve) => {
    axiosInstanceV2.get('user/myPage').then((response) => {
      resolve(response?.data || {});
    });
  });
};

const myOrderItem = (id) => {
  return new Promise((resolve) => {
    axiosInstanceV2.get(`user/myPage/${id}`).then((response) => {
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
