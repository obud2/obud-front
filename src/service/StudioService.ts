import axiosInstance from '@/constants/AxiosInstance';
import { Studio, StudioSection } from '@/entities/studio';

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
interface getStudiosInAllSectionsResponse {
  value: StudioSection[];
}

const getStudiosInAllSections = async () => {
  try {
    const res = await axiosInstance.get<getStudiosInAllSectionsResponse>('studios/section');
    return res.data.value || [];
  } catch (err) {
    // TODO: handle
    return [
      // { // temporarily hide
      //   id: 1,
      //   name: '이번달 추천 프로그램',
      //   order: 1,
      //   studios: [
      //     {
      //       isShow: true,
      //       updatedAt: 1702360384995,
      //       lessonType: 'Special',
      //       specialSort: 7,
      //       createdAt: 1701422506931,
      //       images: [
      //         {
      //           name: 'e5c95dda-8602-4742-9d0f-27be6a12867d',
      //           size: 1785977,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_e5c95dda-8602-4742-9d0f-27be6a12867d',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_e5c95dda-8602-4742-9d0f-27be6a12867d',
      //         },
      //       ],
      //       id: '92a873be-6b3a-4fcc-a7e0-7df8e6fe447a',
      //       createdBy: '니아타',
      //       studiosId: 'a030ca5d-adff-4b82-8e87-7f6bf7bef8e7',
      //       sortOrder: 2,
      //       title: 'iNTL 이태원 - 와인요가',
      //       addr: '서울 용산구 회나무로13가길 3-26',
      //       addrDetail: '2층',
      //       category: ['요가'],
      //     },
      //     {
      //       isShow: true,
      //       updatedAt: 1702346985891,
      //       lessonType: 'Special',
      //       specialSort: 10,
      //       createdAt: 1701411120489,
      //       images: [
      //         {
      //           name: '1b996e43-86e8-4f6a-94b4-f6be80d92298',
      //           size: 2290442,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_1b996e43-86e8-4f6a-94b4-f6be80d92298',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_1b996e43-86e8-4f6a-94b4-f6be80d92298',
      //         },
      //         {
      //           name: 'b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
      //           size: 628161,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_b549eb9c-9dc9-4e47-ab73-a7cb528cd3ff',
      //         },
      //         {
      //           name: '9338c309-f7ec-4a45-8b34-af83979b3421',
      //           size: 1497234,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_9338c309-f7ec-4a45-8b34-af83979b3421',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_9338c309-f7ec-4a45-8b34-af83979b3421',
      //         },
      //       ],
      //       id: '1936fcd7-6df5-45fc-a10c-4ef662732786',
      //       createdBy: 'obud 관리자',
      //       studiosId: 'd2f0741c-ba57-418e-896b-ed341fbeb1b9',
      //       sortOrder: 2,
      //       title: '일리에 - 원데이 티 클래스',
      //       addr: '서울 성동구 서울숲2길 19-7',
      //       addrDetail: '1층',
      //     },
      //     {
      //       isShow: true,
      //       updatedAt: 1702360342467,
      //       lessonType: 'Special',
      //       specialSort: 8,
      //       createdAt: 1702312271555,
      //       images: [
      //         {
      //           name: '644607a6-1ebd-40b0-b2f8-99b9c3426f26',
      //           size: 1627309,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_644607a6-1ebd-40b0-b2f8-99b9c3426f26',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_644607a6-1ebd-40b0-b2f8-99b9c3426f26',
      //         },
      //         {
      //           name: '7c78e826-d914-44af-9550-7b5d2f726f80',
      //           size: 2016280,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_7c78e826-d914-44af-9550-7b5d2f726f80',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_7c78e826-d914-44af-9550-7b5d2f726f80',
      //         },
      //         {
      //           name: '4c66215f-5df1-4a32-85df-0eac5a45a8eb',
      //           size: 2013673,
      //           type: 'image/jpeg',
      //           upload: true,
      //           key: 'class/lesson_4c66215f-5df1-4a32-85df-0eac5a45a8eb',
      //           url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/class/lesson_4c66215f-5df1-4a32-85df-0eac5a45a8eb',
      //         },
      //       ],
      //       id: '40ab961a-41a1-4604-af29-680918aa49bb',
      //       createdBy: 'obud 관리자',
      //       studiosId: '346bb727-7098-40c2-af07-8abaa97acf4c',
      //       sortOrder: 2,
      //       title: '키아나 사계 - 산토샤 명상',
      //       addr: '제주특별자치도 서귀포시 안덕면 사계남로50번길 1',
      //       addrDetail: '',
      //     },
      //   ],
      // },
      {
        id: 2,
        name: '신규 추가된 장소',
        order: 2,
        studios: [
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '1b996e43-86e8-4f6a-94b4-f6be80d92298',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/lesson_1b996e43-86e8-4f6a-94b4-f6be80d92298',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_261e443f-3764-475d-941f-e30c5d262ae4',
              },
            ],
            id: '346bb727-7098-40c2-af07-8abaa97acf4c',
            createdBy: 'obud 관리자',
            studiosId: '346bb727-7098-40c2-af07-8abaa97acf4c',
            sortOrder: 2,
            title: '키아나요가 사계점',
            addr: '제주 서귀포시',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360342467,
            lessonType: '',
            specialSort: 8,
            createdAt: 1702312271555,
            images: [
              {
                name: '644607a6-1ebd-40b0-b2f8-99b9c3426f26',
                size: 1627309,
                type: 'image/jpeg',
                upload: true,
                key: 'class/lesson_644607a6-1ebd-40b0-b2f8-99b9c3426f26',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_52dddb9f-a328-4190-8aba-3f3b8dd551ac',
              },
            ],
            id: 'd494b0bb-bed3-4cab-a57d-5223be46cd1b',
            createdBy: 'obud 관리자',
            studiosId: 'd494b0bb-bed3-4cab-a57d-5223be46cd1b',
            sortOrder: 2,
            title: '노루물요가',
            addr: '서울 용산구 후암로 2',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: 'e5c95dda-8602-4742-9d0f-27be6a12867d',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/lesson_e5c95dda-8602-4742-9d0f-27be6a12867d',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_e66cdf5e-9790-4507-a9c5-51ddb4be9f29',
              },
            ],
            id: 'a030ca5d-adff-4b82-8e87-7f6bf7bef8e7',
            createdBy: '니아타',
            studiosId: 'a030ca5d-adff-4b82-8e87-7f6bf7bef8e7',
            sortOrder: 2,
            title: 'iNTL 이태원',
            addr: '서울 용산구 회나무로13가길 3-26',
            addrDetail: '2층',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '7ae51a1f-1b8f-45aa-b31e-879dcc19be7b',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/lesson_7ae51a1f-1b8f-45aa-b31e-879dcc19be7b',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_3fae1802-48e3-476b-8f2b-0836298b76ea',
              },
            ],
            id: '7ae51a1f-1b8f-45aa-b31e-879dcc19be7b',
            createdBy: '니아타',
            studiosId: '7ae51a1f-1b8f-45aa-b31e-879dcc19be7b',
            sortOrder: 2,
            title: 'YOGIS CLUB 요기스 클럽',
            addr: '서울 서대문구 연희로15길 39',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '92ea242d-870c-43d0-82bd-bca5717bec12',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/92ea242d-870c-43d0-82bd-bca5717bec12',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_0a8ff02f-5971-44d3-a90e-d2e865ff8907',
              },
            ],
            id: '92ea242d-870c-43d0-82bd-bca5717bec12',
            createdBy: '니아타',
            studiosId: '7ae51a1f-1b8f-45aa-b31e-879dcc19be7b',
            sortOrder: 2,
            title: '북촌요가원',
            addr: '서울 종로구 계동길 128',
            addrDetail: '',
            category: ['요가'],
          },
        ],
      },
      {
        id: 3,
        name: '추천 공간',
        order: 3,
        studios: [
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: 'b17e66f3-6c4d-4bb1-8f67-ec0da3c3c98d',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/b17e66f3-6c4d-4bb1-8f67-ec0da3c3c98d',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_a45e6fac-54bd-4bc6-a299-14abb5f00c32',
              },
            ],
            id: 'b17e66f3-6c4d-4bb1-8f67-ec0da3c3c98d',
            createdBy: 'obud 관리자',
            studiosId: 'b17e66f3-6c4d-4bb1-8f67-ec0da3c3c98d',
            sortOrder: 2,
            title: '차요가',
            addr: '서울 강남구 논현로 841 (신사동, 제이비 미소 빌딩)',
            addrDetail: '',
            category: ['요가', '차'],
          },
          {
            isShow: true,
            updatedAt: 1702360342467,
            lessonType: '',
            specialSort: 1,
            createdAt: 1702312271555,
            images: [
              {
                name: 'd3d35140-85f9-4876-9870-ed968b0c7991',
                size: 1627309,
                type: 'image/jpeg',
                upload: true,
                key: 'class/d3d35140-85f9-4876-9870-ed968b0c7991',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_c6ba6649-d759-41bc-950d-8c3666c2bc1d',
              },
            ],
            id: 'd3d35140-85f9-4876-9870-ed968b0c7991',
            createdBy: 'obud 관리자',
            studiosId: 'd3d35140-85f9-4876-9870-ed968b0c7991',
            sortOrder: 1,
            title: '나날라이프',
            addr: '서울 마포구 독막로34길 22 (신수동)',
            addrDetail: '',
            category: ['요가', '명상'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '920303fe-0563-4185-a0a1-b0c3cceefaa3',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/920303fe-0563-4185-a0a1-b0c3cceefaa3',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_e0fa5c73-df2e-4a01-97ae-813083c3db38',
              },
            ],
            id: '920303fe-0563-4185-a0a1-b0c3cceefaa3',
            createdBy: '니아타',
            studiosId: '920303fe-0563-4185-a0a1-b0c3cceefaa3',
            sortOrder: 2,
            title: '밀밀아',
            addr: '서울 용산구 녹사평대로40나길 38-11 (이태원동)',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '523e5e73-3e72-4634-8e20-6cb134330900',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/523e5e73-3e72-4634-8e20-6cb134330900',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_4161c3f8-2207-4716-a41f-eb6a124e5fe7',
              },
            ],
            id: '523e5e73-3e72-4634-8e20-6cb134330900',
            createdBy: '니아타',
            studiosId: '523e5e73-3e72-4634-8e20-6cb134330900',
            sortOrder: 2,
            title: '클라우드랜드 스튜디오',
            addr: '서울 은평구 갈현로3나길 7',
            addrDetail: '',
            category: ['스튜디오'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '8ee952fa-7686-4e52-9a71-802e148697b6',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/8ee952fa-7686-4e52-9a71-802e148697b6',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_70a4e63c-60d8-4d98-bebe-618fa174a832',
              },
            ],
            id: '8ee952fa-7686-4e52-9a71-802e148697b6',
            createdBy: '니아타',
            studiosId: '8ee952fa-7686-4e52-9a71-802e148697b6',
            sortOrder: 2,
            title: '프리에',
            addr: '서울 강남구 헌릉로571길 34-27',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702360384995,
            lessonType: '',
            specialSort: 7,
            createdAt: 1701422506931,
            images: [
              {
                name: '7200c347-03b0-41e5-b40c-e05184c35d3c',
                size: 1785977,
                type: 'image/jpeg',
                upload: true,
                key: 'class/7200c347-03b0-41e5-b40c-e05184c35d3c',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_e4d91dcd-22b5-4678-aa65-0e4ef5417822',
              },
            ],
            id: '7200c347-03b0-41e5-b40c-e05184c35d3c',
            createdBy: '니아타',
            studiosId: '7200c347-03b0-41e5-b40c-e05184c35d3c',
            sortOrder: 2,
            title: '스튜디오 헤트 HETH',
            addr: '서울 영등포구 양평로 144',
            addrDetail: '',
            category: ['필라테스', '스튜디오'],
          },
        ],
      },
      {
        id: 4,
        name: 'Tea Course',
        order: 4,
        studios: [
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '7eedf23c-dbb6-4879-b860-aca8039bcd0f',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/7eedf23c-dbb6-4879-b860-aca8039bcd0f',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_9c064d6e-8338-44fc-aed8-473b7b3ce4ba',
              },
            ],
            id: '7eedf23c-dbb6-4879-b860-aca8039bcd0f',
            createdBy: 'obud 관리자',
            studiosId: '7eedf23c-dbb6-4879-b860-aca8039bcd0f',
            sortOrder: 2,
            title: '우연못',
            addr: '제주 제주시 은수길 110',
            addrDetail: '',
            category: ['차'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '61b3b45a-d2d1-404d-aa52-066440e9d0e1',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/61b3b45a-d2d1-404d-aa52-066440e9d0e1',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_62aa7383-9635-435a-b1c9-4491fcc789b9',
              },
            ],
            id: '61b3b45a-d2d1-404d-aa52-066440e9d0e1',
            createdBy: 'obud 관리자',
            studiosId: '61b3b45a-d2d1-404d-aa52-066440e9d0e1',
            sortOrder: 2,
            title: '연화차',
            addr: '제주 제주시 조천읍 선교로 46',
            addrDetail: '',
            category: ['차'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: 'd2f0741c-ba57-418e-896b-ed341fbeb1b9',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/d2f0741c-ba57-418e-896b-ed341fbeb1b9',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_58fd24f3-50eb-4d02-b028-f6ef3220828b',
              },
            ],
            id: 'd2f0741c-ba57-418e-896b-ed341fbeb1b9',
            createdBy: 'obud 관리자',
            studiosId: 'd2f0741c-ba57-418e-896b-ed341fbeb1b9',
            sortOrder: 2,
            title: '일리에',
            addr: '서울 성동구 서울숲2길 19-7',
            addrDetail: '',
            category: ['차'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: 'd2adfbce-2287-4138-bebd-f81d8b89f331',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/d2adfbce-2287-4138-bebd-f81d8b89f331',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_e9307092-a746-452f-bdbc-a3ce104e325c',
              },
            ],
            id: 'd2adfbce-2287-4138-bebd-f81d8b89f331',
            createdBy: 'obud 관리자',
            studiosId: 'd2adfbce-2287-4138-bebd-f81d8b89f331',
            sortOrder: 2,
            title: '그린랩',
            addr: '서울 성동구 서울숲2길 18-11',
            addrDetail: '',
            category: ['차', '요가'],
          },
        ],
      },
      {
        id: 5,
        name: '제주도 스튜디오',
        order: 3,
        studios: [
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '5efd89f1-b3af-4e97-b169-9d87fca9005d',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/5efd89f1-b3af-4e97-b169-9d87fca9005d',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_df18e4c6-37a7-41a5-92c0-41ef2731559b',
              },
            ],
            id: '5efd89f1-b3af-4e97-b169-9d87fca9005d',
            createdBy: 'obud 관리자',
            studiosId: '5efd89f1-b3af-4e97-b169-9d87fca9005d',
            sortOrder: 2,
            title: '언노운무브먼트 스튜디오',
            addr: '제주 제주시 조천읍 선흘리 1813-6',
            addrDetail: '',
            category: ['요가', '필라테스'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '135ff062-7237-4715-ba70-d37ca055c542',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/135ff062-7237-4715-ba70-d37ca055c542',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_0127dc14-bd65-41db-8b7c-b284b0239d37',
              },
            ],
            id: '135ff062-7237-4715-ba70-d37ca055c542',
            createdBy: 'obud 관리자',
            studiosId: '135ff062-7237-4715-ba70-d37ca055c542',
            sortOrder: 2,
            title: '애월 7일',
            addr: '제주 제주시 애월읍 납읍로4길 7',
            addrDetail: '',
            category: ['요가'],
          },

          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '0e49f806-78fa-4d05-9171-583d38a02be6',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/0e49f806-78fa-4d05-9171-583d38a02be6',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_4a75630b-48c2-4be4-be56-a79ce346187e',
              },
            ],
            id: '0e49f806-78fa-4d05-9171-583d38a02be6',
            createdBy: 'obud 관리자',
            studiosId: '0e49f806-78fa-4d05-9171-583d38a02be6',
            sortOrder: 2,
            title: '지금,',
            addr: '제주 제주시 애월읍 애월해안로 890',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '41c3c56c-cff1-4c95-bad8-596eeec44caf',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/41c3c56c-cff1-4c95-bad8-596eeec44caf',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_32850b30-1d94-49c1-af82-f051a7ee9a2b',
              },
            ],
            id: '41c3c56c-cff1-4c95-bad8-596eeec44caf',
            createdBy: 'obud 관리자',
            studiosId: '41c3c56c-cff1-4c95-bad8-596eeec44caf',
            sortOrder: 2,
            title: '요가쿨라 제주',
            addr: '제주 제주시 한경면 명이1길 32',
            addrDetail: '',
            category: ['요가'],
          },
          {
            isShow: true,
            updatedAt: 1702346985891,
            lessonType: '',
            specialSort: 10,
            createdAt: 1701411120489,
            images: [
              {
                name: '4e5ffb1c-b69c-4e9b-b992-f16fdc669cad',
                size: 2290442,
                type: 'image/jpeg',
                upload: true,
                key: 'class/4e5ffb1c-b69c-4e9b-b992-f16fdc669cad',
                url: 'https://s3.ap-northeast-2.amazonaws.com/file.obud.site/studio/studio_cfdff6d7-7996-4f11-984f-f7f10880bef0',
              },
            ],
            id: '4e5ffb1c-b69c-4e9b-b992-f16fdc669cad',
            createdBy: 'obud 관리자',
            studiosId: '4e5ffb1c-b69c-4e9b-b992-f16fdc669cad',
            sortOrder: 2,
            title: '취다선',
            addr: '제주 서귀포시 성산읍 해맞이해안로 2688',
            addrDetail: '',
            category: ['요가', '명상', '차'],
          },
        ],
      },
    ] as any[];
  }
};

interface GetStudiosFromCategoryResponse {
  value: Studio[];
}
const getStudiosFromCategory = async (categoryId: string) => {
  try {
    const res = await axiosInstance.get<GetStudiosFromCategoryResponse>(`studios/v2/categoryId=${categoryId}`);
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
