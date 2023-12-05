import React, { useContext, useEffect, useState } from 'react';

import { addComma, textSilce } from 'src/constants';
import { SBookingItem } from './BookingItem.styled';
import { LayoutContext } from 'src/context/LayoutContext';

import CustomImage from '@components/common/image/CustomImage';

const BookingItem = ({ lessonId, title, studiosTitle, images, date, time, price, person, option, optionCount, disabled }) => {
  const { matchese } = useContext(LayoutContext);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const basePirce = Number(price || 0) * Number(person || 0);
    const optionPrice = Number(option?.price) ? Number(option?.price) * Number(optionCount) : 0;

    setTotal(basePirce + optionPrice);
  }, [price, person, option, optionCount]);

  const onClickGoPlan = () => {
    if (lessonId) {
      window.open(`/lesson/${lessonId}`);
    }
  };

  return (
    <SBookingItem disabled={disabled}>
      {matchese ? (
        <MobileRender
          title={title || ''}
          studiosTitle={studiosTitle || ''}
          images={images || ''}
          date={date || ''}
          time={time || ''}
          price={price || ''}
          person={person || ''}
          option={option || ''}
          optionCount={optionCount || ''}
          total={total}
          onClickGoPlan={onClickGoPlan}
          disabled={disabled}
        />
      ) : (
        <WebRender
          title={title || ''}
          studiosTitle={studiosTitle || ''}
          images={images || ''}
          date={date || ''}
          time={time || ''}
          price={price || ''}
          person={person || ''}
          option={option || ''}
          optionCount={optionCount || ''}
          total={total}
          onClickGoPlan={onClickGoPlan}
          disabled={disabled}
        />
      )}
    </SBookingItem>
  );
};

const WebRender = ({ title, studiosTitle, images, date, time, price, option, optionCount, person, total, onClickGoPlan, disabled }) => {
  return (
    <React.Fragment>
      {/* 상품정보 */}
      <li className="booking-item cursor" onClick={onClickGoPlan}>
        <CustomImage src={images} width="88" height="88" alt="class-image" layout="fixed" />
        {disabled && <div className="image-disabled-background" />}

        <div className="booking-title">
          <h4 className="booking-studios-title">{textSilce(studiosTitle || '', 18)}</h4>
          <p>{title || '-'}</p>
        </div>
      </li>

      {/* 날짜 */}
      <li className="booking-item">
        <p>{date || ''}</p>
      </li>

      {/* 시간 */}
      <li className="booking-item">
        <p>{time || ''}</p>
      </li>

      {/* 기본금액 */}
      <li className="booking-item">
        <p>{addComma(price || '0')}원</p>
      </li>

      {/* 인원 */}
      <li className="booking-item">
        <p>{person || '0'}명</p>
      </li>

      {/* 추가옵션 */}
      <li className="booking-item">
        <div>
          <p>{option?.title || '없음'}</p>
          {option?.price && <p>{`${addComma(option?.price || '')}원 × ${optionCount}명`}</p>}
        </div>
      </li>

      {/* 예약금액 */}
      <li className="booking-item bold">
        <p>{addComma(total || '0')}원</p>
      </li>
    </React.Fragment>
  );
};

const MobileRender = ({ title, studiosTitle, date, time, price, option, optionCount, person, total }) => {
  return (
    <React.Fragment>
      {/* 이미지 영역 */}

      {/* 옵션 영역 */}
      <div className="booking-mobile-data-container">
        {/* 제목 */}
        <div className="booking-title">
          <h4 className="booking-studios-title">{textSilce(studiosTitle || '', 15)}</h4>
          <p>{title || '-'}</p>
        </div>

        {/* 날짜 , 시간 */}
        <div className="booking-mobile-title">
          <p>예약일정</p>
          <p>{`${date || ''}, ${time || ''}`}</p>
        </div>

        {/* 기본급액 */}
        <div className="booking-mobile-title">
          <p>기본금액</p>
          <p>{`${addComma(price || '')}원 × ${person}명`}</p>
        </div>

        {/* 추가옵션 */}
        <div className="booking-mobile-title">
          <p>추가옵션</p>
          <p>{option?.title ? `${option?.title || ''} +${addComma(option?.price || '')}원 × ${optionCount}명` : '없음'}</p>
        </div>

        {/* 예약금액 */}
        <div className="booking-mobile-title">
          <p>예약금액</p>
          <p>{addComma(total || '0')}원</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BookingItem;
