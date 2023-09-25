export const MAILDOMAIN = [
  {
    id: 'naver.com',
    title: 'naver.com',
  },
  {
    id: 'daum.net',
    title: 'daum.net',
  },
  {
    id: 'hanmail.net',
    title: 'hanmail.net',
  },
  {
    id: 'gmail.com',
    title: 'gmail.com',
  },
  {
    id: 'nate.com',
    title: 'nate.com',
  },
];

export const HP = [
  {
    id: '010',
    title: '010',
  },
  {
    id: '011',
    title: '011',
  },
  {
    id: '012',
    title: '012',
  },
  {
    id: '013',
    title: '013',
  },
  {
    id: '014',
    title: '014',
  },
  {
    id: '015',
    title: '015',
  },
  {
    id: '016',
    title: '016',
  },
  {
    id: '017',
    title: '017',
  },
  {
    id: '018',
    title: '018',
  },
  {
    id: '019',
    title: '019',
  },
  {
    id: '030',
    title: '030',
  },
  {
    id: '050',
    title: '050',
  },
  {
    id: '060',
    title: '060',
  },
  {
    id: '070',
    title: '070',
  },
  {
    id: '080',
    title: '080',
  },
  {
    id: '090',
    title: '090',
  },
];

/**
 *
 * @returns 1900 ~ 현재 연도까지 리턴
 */
export const YEAR = () => {
  const NOW = new Date();

  const YEAR_DATA = [];
  for (let i = 1900; i <= NOW; i++) {
    YEAR_DATA.push({
      id: i,
      value: `${i}년`,
    });
  }

  return YEAR_DATA?.length > 0 ? YEAR_DATA : [];
};

/**
 *
 * @returns 1 ~ 12월 리턴
 */
export const MONTH = () => {
  const MONTH_DATA = [];

  for (let i = 1; i <= 12; i++) {
    MONTH_DATA.push({
      id: i,
      value: `${i}월`,
    });
  }

  return MONTH_DATA?.length > 0 ? MONTH_DATA : [];
};

/**
 * @param {*} year : 입력 년 필수입력.
 * @param {*} month : 입력 월 필수입력.
 */
export const DAYS = (year, month) => {
  if (!year) return [];
  if (!month) return [];

  const MONTH_DATA = new Date(Number(year), Number(month), 0);
  const DAYS_DATA = new Array(MONTH_DATA.getDate()).fill(''); // 일
  const DAY_DATA = [];

  DAYS_DATA.forEach((_, i) => {
    DAY_DATA.push({
      id: i,
      value: `${i}일`,
    });
  });

  return DAY_DATA?.length > 0 ? DAY_DATA : [];
};

export const HOUR = () => {
  const HOUR_DATA = [];

  for (let i = 24; i >= 1; i--) {
    HOUR_DATA.push({
      id: i,
      value: `${i}시`,
    });
  }
  return HOUR_DATA?.length > 0 ? HOUR_DATA : [];
};

export const MINUTE = () => {
  const MINUTE_DATA = [];

  for (let i = 0; i <= 55; i++) {
    if (i % 5 === 0) {
      MINUTE_DATA.push({
        id: i,
        value: `${i}분`,
      });
    }
  }
  return MINUTE_DATA?.length > 0 ? MINUTE_DATA : [];
};

export const GENDER = [
  {
    id: 'woman',
    title: '여성',
  },
  {
    id: 'man',
    title: '남성',
  },
];

export const AGE = [
  {
    id: '10~19',
    title: '10대',
  },
  {
    id: '20~29',
    title: '20대',
  },
  {
    id: '30~39',
    title: '30대',
  },
  {
    id: '40~49',
    title: '40대',
  },
  {
    id: '50~59',
    title: '50대',
  },
  {
    id: '60~',
    title: '60대 이상',
  },
];
