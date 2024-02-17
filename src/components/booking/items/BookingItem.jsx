import React, { useContext } from 'react';

import { textSilce } from 'src/constants';
import { LayoutContext } from 'src/context/LayoutContext';
import { SBookingItem } from './BookingItem.styled';

import CustomImage from '@components/common/image/CustomImage';

const BookingItem = ({ lessonId, title, studiosTitle, images, date, time, disabled }) => {
  const { matchese } = useContext(LayoutContext);

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
          onClickGoPlan={onClickGoPlan}
          disabled={disabled}
        />
      )}
    </SBookingItem>
  );
};

const WebRender = ({ title, studiosTitle, images, date, time, onClickGoPlan, disabled }) => {
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

    </React.Fragment>
  );
};

const MobileRender = ({ title, studiosTitle, date, time }) => {
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

      </div>
    </React.Fragment>
  );
};

export default BookingItem;
