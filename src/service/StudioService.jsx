import axiosInstance from '@/constants/AxiosInstance';

/**
 *
 * @param {*} cursor : 다음 페이지
 * @param {*} keyword : 검색 keyword
 * @returns
 */
const getStudios = (sort) => {
  const sorted = sort ? `?sort=${sort}` : '';

  return new Promise((resolve) => {
    axiosInstance
      .get(`studios${sorted}`)
      .then((response) =>
        resolve(response?.data?.value))
      .catch(() => {
        resolve([]);
      });
  });
};

const getStudioCategories = () => {
  return new Promise((resolve) => {
    axiosInstance
      .get('studios/category')
      .then((response) => {
        resolve(response?.data?.value || []);
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const getStudiosBySections = () => {
  return new Promise((resolve) => {
    axiosInstance
      .get('studios/section')
      .then((response) => {
        resolve(response?.data?.value || []);
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const getStudiosFromCategory = (categoryId) => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`/studios/v2?categoryId=${categoryId}`)
      .then((response) => {
        resolve(response?.data?.value || []);
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const getSpecialList = () => {
  return new Promise((resolve) => {
    axiosInstance
      .get('studios/lesson/special')
      .then((response) => {
        const val = response?.data?.value?.sort((a, b) => (a.specialSort > b.specialSort ? -1 : 1));

        resolve(val);
      })
      .catch(() => {
        resolve([]);
      });
  });
};

const getStudio = (id, userId) => {
  const user = userId ? `?userId=${userId}` : '';

  return new Promise((resolve) => {
    axiosInstance
      .get(`studios/${id}${user}`)
      .then((response) => {
        resolve(response?.data?.value || {});
      })
      .catch(() => {
        resolve({});
      });
  });
};

/**
 *
 * @param {*} param : Docs 참고
 * @returns
 */
const setStudio = (method, param) => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .request({
        method: method === 'new' ? 'post' : 'put',
        url: 'studios',
        data: param,
      })
      .then((response) => {
        resolve(response?.data?.value || {});
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 *  *************************************
 *  Class Service
 *  *************************************
 */

/**
 *
 * @param {*} studioId : 공간 ID
 * @param {*} cursor : 다음 페이지
 * @param {*} keyword : 검색 keyword
 * @returns
 */
const limit = 15;
const getLessons = (studioId, cursor, keyword) => {
  const keywordTemp = keyword ? `&keyword=${keyword}` : '';
  const cursorTemp = cursor ? `&cursor=${cursor}` : '';

  return new Promise((resolve) => {
    axiosInstance.get(`studios/lesson?studiosId=${studioId}&limit=${limit}${cursorTemp}${keywordTemp}`).then((response) => {
      resolve(response.data);
    });
  });
};

const getLesson = (id) => {
  return new Promise((resolve) => {
    axiosInstance
      .get(`studios/lesson/${id}`)
      .then((response) => {
        resolve(response?.data?.value || {});
      })
      .catch(() => {
        resolve({});
      });
  });
};

/**
 *  *************************************
 *  Plan Service
 *  *************************************
 */

/**
 *
 * @param {*} lessonId : 클래스 ID
 * @param {*} cursor : 다음 페이지
 * @param {*} keyword : 검색 keyword
 * @returns
 */

const getPlans = (lessonId, cursor, keyword) => {
  const keywordTemp = keyword ? `&keyword=${keyword}` : '';
  const cursorTemp = cursor ? `&cursor=${cursor}` : '';

  return new Promise((resolve) => {
    axiosInstance.get(`studios/plan/all?lessonId=${lessonId}&limit=${limit}${cursorTemp}${keywordTemp}`).then((response) => {
      resolve(response.data);
    });
  });
};

const getMonthPlans = (lessonId, month) => {
  if (lessonId && month) {
    return new Promise((resolve) => {
      axiosInstance.get(`studios/plan/month?lessonId=${lessonId}&date=${month}`).then((response) => {
        resolve(response.data);
      });
    });
  }
};

const StudioService = {
  getStudios,
  getStudioCategories,
  getStudiosFromCategory,
  getStudiosBySections,
  getStudio,
  setStudio,
  getSpecialList,

  // Lesson
  getLessons,
  getLesson,

  // Plan
  getPlans,
  getMonthPlans,
};

export default StudioService;
