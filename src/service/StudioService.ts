import axiosInstance from '@/constants/AxiosInstance';
import { SectionWithItems, Studio } from '@/entities/studio';

/**
 *
 * @param {*} cursor : 다음 페이지
 * @param {*} keyword : 검색 keyword
 * @returns
 */
export const getStudios = (sort) => {
  const sorted = sort ? `?sort=${sort}` : '';

  return new Promise((resolve) => {
    axiosInstance
      .get(`studios${sorted}`)
      .then((response) => resolve(response?.data?.value))
      .catch(() => {
        resolve([]);
      });
  });
};

// TODO: move to entity after fix
interface GetStudiosInAllSectionsResponse {
  value: SectionWithItems[];
}

export const getStudiosInAllSections = async () => {
  try {
    const res = await axiosInstance.get<GetStudiosInAllSectionsResponse>('v2/place/section');
    return res.data.value || [];
  } catch (err) {
    return [];
  }
};

interface GetStudiosFromCategoryResponse {
  value: Studio[];
}
export const getStudiosFromCategory = async (categoryId: string) => {
  try {
    const res = await axiosInstance.get<GetStudiosFromCategoryResponse>(`v2/place?categoryId=${categoryId}`);
    return getStudiosFromCategoryAdapter(res.data.value) || [];
  } catch (err) {
    return [];
  }
};

export const getStudiosFromCategoryAdapter = (studios: Studio[]) => {
  return studios.map((studio) => ({
    ...studio,
    images: typeof studio.images === 'string' ? JSON.parse(studio.images) : studio.images,
  }));
};

export const getSpecialList = () => {
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

export const getStudio = (id, userId) => {
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
export const getLessons = (studioId) => {
  // const keywordTemp = keyword ? `&keyword=${keyword}` : '';
  // const cursorTemp = cursor ? `&cursor=${cursor}` : '';

  return new Promise((resolve) => {
    axiosInstance.get(`studios/lesson?studiosId=${studioId}&limit=${limit}`).then((response) => {
      resolve(response.data);
    });
  });
};

export const getLesson = (id) => {
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
export const getMonthPlans = (lessonId: string, month: string) => {
  if (lessonId && month) {
    return axiosInstance.get(`studios/plan/month?lessonId=${lessonId}&date=${month}`);
  }
};
