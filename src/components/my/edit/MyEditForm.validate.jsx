import _ from 'lodash';

import { regExp } from 'src/constants';

export const editValidateCheck = (body, error) => {
  const temp = _.cloneDeep(error);

  // null 체크
  if (!body?.email) temp.email.isError = true;

  if (body?.password && !body?.passwordCheck) temp.passwordCheck.isError = true;
  if (!body?.name) temp.name.isError = true;
  if (!body?.hp) temp.hp.isError = true;

  // 정규식 체크
  if (body?.email && !regExp('email').test(body?.email)) {
    temp.email.isError = true;
    temp.email.text = '이메일을 정확히 입력하세요.';
  }

  if (body?.password && !regExp('password').test(body?.password)) {
    temp.password.isError = true;
    temp.password.text = '영문, 숫자, 특수문자 포함 8자이상';
  }

  if (body?.password !== body?.passwordCheck) temp.passwordCheck.isError = true;

  if (body?.name && !regExp('name').test(body?.name)) {
    temp.name.isError = true;
    temp.name.text = '올바른 이름을 입력해주세요.';
  }

  if (body?.hp && !regExp('hp').test(body?.hp)) {
    temp.hp.isError = true;
    temp.hp.text = '올바른 전화번호를 입력해주세요.';
  }

  if (body?.birthdate && !(body?.birthdate?.length > 7)) {
    temp.birthdate.isError = true;
    temp.birthdate.text = '올바른 생년월일을 선택해주세요.';
  }

  return temp;
};

export const DEFALUT_ERROR = {
  password: {
    text: '비밀번호를 입력하세요.',
    isError: false,
  },
  passwordCheck: {
    text: '비밀번호가 일치하지 않습니다.',
    isError: false,
  },
  name: {
    text: '이름을 입력하세요.',
    isError: false,
  },
  hp: {
    text: '전화번호를 입력하세요.',
    isError: false,
  },
  birthdate: {
    text: '올바른 생년월일을 선택해주세요.',
    isError: false,
  },
};
