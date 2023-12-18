import axiosInstance from '@/constants/AxiosInstance';
import { SectionWithItems, Studio } from '@/entities/studio';

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
      .then((response) => resolve(response?.data?.value))
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

// TODO: move to entity after fix
interface GetStudiosInAllSectionsResponse {
  value: SectionWithItems[];
}

const getStudiosInAllSections = async () => {
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
const getStudiosFromCategory = async (categoryId: string) => {
  try {
    const res = await axiosInstance.get<GetStudiosFromCategoryResponse>(`v2/place?categoryId=${categoryId}`);
    return res.data.value || [];
  } catch (err) {
    return [];
  }
};

interface GetStudiosFromSectionResponse {
  value: Studio[];
}

const getStudiosFromSection = async (sectionId: string) => {
  try {
    const res = await axiosInstance.get<GetStudiosFromSectionResponse>(`studios/v2/sectionId=${sectionId}`);
    return res.data.value || [];
  } catch (err) {
    return [
      {
        isShow: true,
        updatedAt: 1702360384995,
        lessonType: 'Special',
        specialSort: 7,
        createdAt: 1701422506931,
        images: [
          {
            name: 'e5c95dda-8602-4742-9d0f-27be6a12867d',
            size: 1785977,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_e5c95dda-8602-4742-9d0f-27be6a12867d',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_e5c95dda-8602-4742-9d0f-27be6a12867d',
          },
        ],
        id: '92a873be-6b3a-4fcc-a7e0-7df8e6fe447a',
        createdBy: '니아타',
        studiosId: 'a030ca5d-adff-4b82-8e87-7f6bf7bef8e7',
        sortOrder: 2,
        title: 'iNTL 이태원 - 와인요가',
        addr: '서울 용산구 회나무로13가길 3-26',
        addrDetail: '2층',
      },
      {
        isShow: true,
        updatedAt: 1702346985891,
        lessonType: 'Special',
        specialSort: 10,
        createdAt: 1701411120489,
        images: [
          {
            name: '1b996e43-86e8-4f6a-94b4-f6be80d92298',
            size: 2290442,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_1b996e43-86e8-4f6a-94b4-f6be80d92298',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_1b996e43-86e8-4f6a-94b4-f6be80d92298',
          },
          {
            name: 'b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
            size: 628161,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
          },
          {
            name: '9338c309-f7ec-4a45-8b34-af83979b3421',
            size: 1497234,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_9338c309-f7ec-4a45-8b34-af83979b3421',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_9338c309-f7ec-4a45-8b34-af83979b3421',
          },
        ],
        id: '1936fcd7-6df5-45fc-a10c-4ef662732786',
        createdBy: 'obud 관리자',
        studiosId: 'd2f0741c-ba57-418e-896b-ed341fbeb1b9',
        sortOrder: 2,
        title: '일리에 - 원데이 티 클래스',
        addr: '서울 성동구 서울숲2길 19-7',
        addrDetail: '1층',
      },
      {
        isShow: true,
        updatedAt: 1702360342467,
        lessonType: 'Special',
        specialSort: 8,
        createdAt: 1702312271555,
        images: [
          {
            name: '644607a6-1ebd-40b0-b2f8-99b9c3426f26',
            size: 1627309,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_644607a6-1ebd-40b0-b2f8-99b9c3426f26',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_644607a6-1ebd-40b0-b2f8-99b9c3426f26',
          },
          {
            name: '7c78e826-d914-44af-9550-7b5d2f726f80',
            size: 2016280,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_7c78e826-d914-44af-9550-7b5d2f726f80',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_7c78e826-d914-44af-9550-7b5d2f726f80',
          },
          {
            name: '4c66215f-5df1-4a32-85df-0eac5a45a8eb',
            size: 2013673,
            type: 'image/jpeg',
            upload: true,
            key: 'class/lesson_4c66215f-5df1-4a32-85df-0eac5a45a8eb',
            url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_4c66215f-5df1-4a32-85df-0eac5a45a8eb',
          },
        ],
        id: '40ab961a-41a1-4604-af29-680918aa49bb',
        createdBy: 'obud 관리자',
        studiosId: '346bb727-7098-40c2-af07-8abaa97acf4c',
        sortOrder: 2,
        title: '키아나 사계 - 산토샤 명상',
        addr: '제주특별자치도 서귀포시 안덕면 사계남로50번길 1',
        addrDetail: '',
      },
    ];
  }
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
const getLessons = (studioId) => {
  // const keywordTemp = keyword ? `&keyword=${keyword}` : '';
  // const cursorTemp = cursor ? `&cursor=${cursor}` : '';

  return new Promise((resolve) => {
    axiosInstance.get(`studios/lesson?studiosId=${studioId}&limit=${limit}`).then((response) => {
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
  getStudiosFromSection,
  getStudiosInAllSections,
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
