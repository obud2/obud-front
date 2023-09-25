import React, { useEffect, useState } from 'react';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import _ from 'lodash';

import { SPlanNumberOfPeopleCheck } from './PlanNumberOfPeopleCheck.styled';
import alert from 'src/helpers/alert';

const PlanNumberOfPeopleCheck = ({ placeholder, disabled, value, onChange, maxNumber }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(value);
  }, [value]);

  const onClickChageCount = (type) => {
    let nowCount = _.cloneDeep(count);

    if (nowCount === maxNumber) {
      alert('', `최대 예약가능 정원은 ${maxNumber} 명입니다.`);
    }

    if (type === 'plus') {
      if (nowCount >= maxNumber) return;

      nowCount++;
    }

    if (type === 'minus') {
      if (nowCount <= 1) return;

      nowCount--;
    }

    if (onChange) onChange(nowCount);
    setCount(nowCount);
  };

  return (
    <SPlanNumberOfPeopleCheck disabled={disabled}>
      <button className="count-button" disabled={disabled} onClick={() => onClickChageCount('minus')}>
        <AiOutlineMinus />
      </button>

      <input className="number-of-people-input" placeholder={placeholder} value={count || placeholder} readOnly />

      <button className="count-button" disabled={disabled} onClick={() => onClickChageCount('plus')}>
        <AiOutlinePlus />
      </button>
    </SPlanNumberOfPeopleCheck>
  );
};

export default PlanNumberOfPeopleCheck;
