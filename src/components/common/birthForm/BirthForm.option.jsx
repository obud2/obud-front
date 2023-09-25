/**
 *
 * @returns 1900 ~ 현재 연도까지 리턴
 */
export const YEAR = () => {
  const NOW = new Date();
  const NOW_YEAR = NOW.getFullYear();

  const YEAR = [];
  for (let i = 1900; i <= NOW_YEAR; i++) {
    YEAR.push({
      id: i,
      value: i,
    });
  }

  return YEAR?.length > 0 ? YEAR : [];
};

/**
 *
 * @returns 1 ~ 12월 리턴
 */
export const MONTH = () => {
  const MONTH = [];

  for (let i = 1; i <= 12; i++) {
    MONTH.push({
      id: i,
      value: i,
    });
  }

  return MONTH?.length > 0 ? MONTH : [];
};

/**
 * @param {*} year : 입력 년 필수입력.
 * @param {*} month : 입력 월 필수입력.
 */
export const DAYS = (year, month) => {
  if (!year) return [];
  if (!month) return [];

  const MONTH = new Date(Number(year), Number(month), 0);
  const DAYS = new Array(MONTH.getDate()).fill(''); // 일
  const DAY = [];

  // eslint-disable-next-line array-callback-return
  DAYS.map((_, i) => {
    DAY.push({
      id: i + 1,
      value: i + 1,
    });
  });

  return DAY?.length > 0 ? DAY : [];
};
