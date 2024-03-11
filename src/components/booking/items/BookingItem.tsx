import { textSilce } from '@/constants';
import { LayoutContext } from '@/context/LayoutContext';
import { MOBILE } from '@/styled/variablesStyles';
import { useContext } from 'react';
import styled, { css } from 'styled-components';

const BookingItem = ({ lessonId, title, studiosTitle, date, time, disabled }) => {
  const { matchese } = useContext(LayoutContext);

  const onClickGoPlan = () => {
    if (lessonId) {
      window.open(`/lesson/${lessonId}`);
    }
  };

  return (
    <SBookingItem disabled={disabled}>
      {matchese ? (
        <MobileRender title={title || ''} studiosTitle={studiosTitle || ''} date={date || ''} time={time || ''} />
      ) : (
        <WebRender
          title={title || ''}
          studiosTitle={studiosTitle || ''}
          date={date || ''}
          time={time || ''}
          onClickGoPlan={onClickGoPlan}
        />
      )}
    </SBookingItem>
  );
};

const WebRender = ({ title, studiosTitle, date, time, onClickGoPlan }) => {
  return (
    <>
      {/* 상품정보 */}
      <li className="booking-item cursor" onClick={onClickGoPlan}>
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
    </>
  );
};

const MobileRender = ({ title, studiosTitle, date, time }) => {
  return (
    <>
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
    </>
  );
};

export default BookingItem;

const SBookingItem = styled.ul<{ disabled: boolean }>`
  width: 100%;

  display: flex;
  position: relative;

  ${MOBILE} {
    display: flex;
    justify-content: center;

    gap: 12px;
  }

  ${(props) =>
    props.disabled &&
    css`
      * {
        color: #b5b5b5 !important;
      }
    `}

  .image-disabled-background {
    width: 88px;
    height: 88px;

    top: 0;
    left: 0;
    position: absolute;

    background-color: rgba(253, 253, 253, 0.5);

    ${MOBILE} {
      width: 100%;
      height: 100%;
    }
  }

  .booking-item {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    gap: 16px;

    font-size: 1.4rem;
    font-weight: 400;

    text-align: center;
    color: #555555;

    &.cursor {
      cursor: pointer;
    }

    &.bold {
      font-weight: 500;
    }

    .booking-title {
      display: flex;
      flex-direction: column;
      text-align: left;

      .booking-studios-title {
        font-size: 1.2rem;
      }
    }

    &:first-child {
      flex: 3;
      justify-content: flex-start;
    }
  }

  /* Mobile */
  .booking-mobile-image-container {
    flex: 1;
    position: relative;
    aspect-ratio: 1 / 1;
  }

  .booking-mobile-data-container {
    flex: 2;

    display: flex;
    flex-direction: column;
    gap: 4px;

    position: relative;

    ${(props) =>
      props.disabled &&
      css`
        * {
          color: #b5b5b5 !important;
        }
      `}

    .booking-title {
      font-size: 1.2rem;
      color: #565656;
      margin-bottom: 10px;
    }

    .booking-studios-title {
      font-size: 1.4rem;
      font-weight: 500;
      margin-bottom: 5px;
      color: #0d0d0d;
    }

    .booking-mobile-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;

      p {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 140%;

        word-break: break-word;

        &:first-child {
          color: #b5b5b5;
          white-space: nowrap;
        }

        &:last-child {
          color: #565656;
        }
      }
    }
  }
`;
