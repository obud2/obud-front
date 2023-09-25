import _ from 'lodash';

import { regExp } from 'src/constants';

export const editValidateCheck = (body, error) => {
  const temp = _.cloneDeep(error);

  // null 체크
  if (!body?.email) temp.email.isErorr = true;

  if (body?.password && !body?.passwordCheck) temp.passwordCheck.isErorr = true;
  if (!body?.name) temp.name.isErorr = true;
  if (!body?.hp) temp.hp.isErorr = true;

  // 정규식 체크
  if (body?.email && !regExp('email').test(body?.email)) {
    temp.email.isErorr = true;
    temp.email.text = '이메일을 정확히 입력하세요.';
  }

  if (body?.password && !regExp('password').test(body?.password)) {
    temp.password.isErorr = true;
    temp.password.text = '영문, 숫자, 특수문자 포함 8자이상';
  }

  if (body?.password !== body?.passwordCheck) temp.passwordCheck.isErorr = true;

  if (body?.name && !regExp('name').test(body?.name)) {
    temp.name.isErorr = true;
    temp.name.text = '올바른 이름을 입력해주세요.';
  }

  if (body?.hp && !regExp('hp').test(body?.hp)) {
    temp.hp.isErorr = true;
    temp.hp.text = '올바른 전화번호를 입력해주세요.';
  }

  if (body?.birthdate && !(body?.birthdate?.length > 7)) {
    temp.birthdate.isErorr = true;
    temp.birthdate.text = '올바른 생년월일을 선택해주세요.';
  }

  return temp;
};

export const DEFALUT_ERROR = {
  password: {
    text: '비밀번호를 입력하세요.',
    isErorr: false,
  },
  passwordCheck: {
    text: '비밀번호가 일치하지 않습니다.',
    isErorr: false,
  },
  name: {
    text: '이름을 입력하세요.',
    isErorr: false,
  },
  hp: {
    text: '전화번호를 입력하세요.',
    isErorr: false,
  },
  birthdate: {
    text: '올바른 생년월일을 선택해주세요.',
    isErorr: false,
  },
};
