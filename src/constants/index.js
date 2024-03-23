import { getCookie, setCookie, removeCookie } from '@/helpers/cookies';
import { Auth } from 'aws-amplify';

/**
 * API 호출 URL
 */
// export const API_URL = 'https://api.obud.co';
export const API_URL = 'http://localhost:8000';
export const APP_URL = 'https://www.obud.co';

/**
 * Google Map
 */
export const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api';
export const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;

/**
 * 프로젝트 이름
 */
export const APP_PREFIX = 'obud :: book your journey to wellness';

export const IMG_PATH = '/img';
export const S3_BUCKET = process.env.NEXT_PUBLIC_AWS_USER_S3;
export const BASE_IMG_URL = `https://s3.ap-northeast-2.amazonaws.com/${S3_BUCKET}/`;

export const KAKAO_KEY = '1bc0b186ced3029a79848ac251cee6b9';
export const IMP_CODE = 'imp27153470';
export const PG = 'danal_tpay';

/**
 * GR0100 : 어드민 ( 모든 권한 )
 * GR0110 : 스튜디오 ( 공간 관리 )
 * GR0120 : 강사 ( 클래스 관리 )
 * GR0200 : 사용자
 */
export const ADMIN = 'GR0100';
export const STUDIO = 'GR0110';
export const INSTRUCTOR = 'GR0120';
export const USR = 'GR0200';

// CANCEL = 'CANCEL',         취소됨
// COMPLETE = 'COMPLETE',     결제 완료
// FAIL = 'FAIL',             결제 실패
// WAIT = 'WAIT',             결제 대기줌
// CANCELING = 'CANCELING',   결제 취소 요청

/**
 * 쿠키 도메인 IP
 */
export const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_IP ? process.env.NEXT_PUBLIC_DOMAIN_IP : '.127.0.0.1';

/**
 * 로그인 쿠키 아이디
 * 약자 ID_JTW = 토큰 값
 * 약자 ID_SES = 로그인 아이디
 */
const PROJECT_ID = 'OBUD';
const TOKEN = `ID_${PROJECT_ID}_JWT`;
const USER_SESSION = `ID_${PROJECT_ID}_SES`;
const VISIT = `ID_${PROJECT_ID}_LOG_VISIT`;

function isJwtExpired(token) {
  // Decode the payload part of the JWT
  const payload = (token || '')?.split('.')[1];
  if (!payload) {
    return false;
  }

  const decodedPayload = JSON.parse(Buffer.from(payload, 'base64'));

  // Get the current time and convert to Unix timestamp in seconds
  const currentTime = Math.floor(Date.now() / 1000);

  // Check if the current time is greater than the expiration time
  return currentTime > decodedPayload.exp;
}

/**
 *
 * @returns 로그인 유저 토큰
 */
export const getJwt = () => {
  const jwt = getCookie(TOKEN);
  if (isJwtExpired(jwt)) {
    tokenRefresh();
    return;
  }
  return jwt;
};

export const tokenRefresh = async () => {
  try {
    const cognitoUser = await Auth.currentAuthenticatedUser();
    const currentSession = await Auth.currentSession();

    return new Promise((resolve) => {
      cognitoUser.refreshSession(currentSession.getRefreshToken(), (err, session) => {
        if (session) {
          const { idToken } = session;

          setJwt(idToken.jwtToken);
          resolve(idToken.jwtToken);
        }
      });
    });
  } catch (e) {
    if (e === 'The user is not authenticated') {
      cookieRemove();
      Auth.signOut();
    }
  }
};

export const setJwt = (token) => {
  window?.ReactNativeWebView?.postMessage(
    JSON.stringify({
      method: 'STORE_AUTH_TOKEN',
      token,
      path: '/',
      domain: DOMAIN,
    }),
  );

  return setCookie(TOKEN, token, { path: '/', domain: DOMAIN });
};

/**
 *
 * @returns 로그인 유저 아이디
 */
export const getUserId = () => {
  return getCookie(USER_SESSION) || '';
};

export const setUserId = (user) => {
  window?.ReactNativeWebView?.postMessage(
    JSON.stringify({
      method: 'STORE_AUTH_SESSION',
      user,
      path: '/',
      domain: DOMAIN,
    }),
  );
  return setCookie(USER_SESSION, user, { path: '/', domain: DOMAIN });
};

/**
 *
 * @returns 방문자 체크 쿠키
 */
export const getVisitId = () => {
  return getCookie(VISIT) || '';
};

export const setVisitId = (expires) => {
  return setCookie(VISIT, true, { path: '/', expires, domain: DOMAIN });
};

/**
 *
 * @returns 로그인 체크
 */
export const loginCheck = () => {
  return !!(getJwt() && getUserId());
};

/**
 *
 * @returns 로그아웃 쿠키 제거
 */
export const cookieRemove = () => {
  if (typeof window !== 'undefined') {
    window?.ReactNativeWebView?.postMessage(
      JSON.stringify({
        method: 'LOGOUT',
      }),
    );
  }
  return new Promise((resolve) => {
    removeCookie(TOKEN, { path: '/', domain: DOMAIN });
    removeCookie(USER_SESSION, { path: '/', domain: DOMAIN });

    resolve(true);
  });
};

/**
 *
 * @returns 스토리지 전부 삭제
 */
export const removeStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};

/**
 *
 * @returns 로그아웃
 */
export const userLogout = () => {
  removeStorage();
  cookieRemove();
  window.location.reload();
};

/**
 *
 * @param {String} cookieString
 * @returns json Cookie split
 */
export const cookieStringToObject = (cookieString) => {
  if (!(cookieString instanceof Object)) return {};

  const cookieStringClone = cookieString?.split('; ');
  const result = {};

  for (let i = 0; i < cookieStringClone.length; i++) {
    const cur = cookieStringClone[i].split('=');
    result[cur[0]] = cur[1];
  }

  return result;
};

/**
 *
 * @param {boolean} toggle
 * 스크롤 못하게 잠금.
 */
export const bodyHiddenToggle = (toggle) => {
  const body = document.querySelector('body');

  if (toggle) {
    body.classList.add('hidden');
  } else {
    body.classList.remove('hidden');
  }
};

/**
 *
 * @param {*} text
 * @returns 첫글자 소문자로 변경
 */
export const firstTextLowerCase = (text) => {
  const first = text?.slice(0, 1).toLowerCase();
  const last = text?.slice(1);

  return `${first}${last}`;
};

/**
 *
 * @param {*} text
 * @returns 첫글자 대문자로 변경
 */
export const firstTextUpperCase = (text) => {
  const first = text?.slice(0, 1).toUpperCase();
  const last = text?.slice(1);

  return `${first}${last}`;
};
export const textSilce = (title, silce) => {
  if (!title) return;

  return title?.length > silce ? `${title.slice(0, silce)}...` : title;
};

export const addComma = (num) => {
  const regexp = /\B(?=(\d{3})+(?!\d))/g;
  const numData = `${num}`;
  return numData.toString().replace(regexp, ',');
};

export const regExp = (type) => {
  switch (type) {
    case 'name':
      return /^[가-힣A-Za-z ]{2,}$/;
    case 'password':
      return /((?=.*\d)(?=.*[a-z])(?=.*[\W]).{8,})/;
    case 'email':
      return /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    case 'birth':
      return /^[0-9]+$/;
    case 'hp':
      return /^[0-9]+$/;
    default:
      return /^$/;
  }
};
