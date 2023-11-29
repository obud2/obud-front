import React from 'react';

import { SMyOrderItem } from './MyOrderItem.styled';
import { SlArrowRight } from 'react-icons/sl';
// import { addComma } from 'src/constants';

import moment from 'moment';

import CustomButton from '@components/common/button/CustomButton';
import CustomImage from '@components/common/image/CustomImage';

const MyOrderItem = ({ data, onClickOrderDetail }) => {
  const statusRender = () => {
    let status = '';

    switch (data?.orderStatus) {
      case 'CANCEL':
        status = '취소완료';
        break;
      case 'COMPLETE':
        status = '결제 완료';
        break;
      case 'FAIL':
        status = '결제 실패';
        break;
      case 'WAIT':
        status = '결제 대기중';
        break;
      case 'REFUSAL':
        status = '취소 거절';
        break;
      case 'CANCELING':
        status = '취소처리중';
        break;
    }

    return <p className={data?.orderStatus}>{status}</p>;
  };

  return (
    <SMyOrderItem>
      <section className="order-item-mobile-header">
        {statusRender()}
        <button onClick={() => onClickOrderDetail(data?.id)}>
          <span>상세보기</span>
          <SlArrowRight />
        </button>
      </section>

      <section className="order-item-container">
        <section className="order-item-image-container">
          <CustomImage src={data?.images?.url || ''} layout="fill" />
        </section>

        <section className="order-item-contents-container">
          <p className="order-item-studio-title">{data?.studiosTitle || ''}</p>
          <p className="order-item-lesson-title">{data?.lessonTitle || ''}</p>

          <div className="order-item-option">
            <p>{moment(data?.startDate).format('YYYY.MM.DD (ddd)')}</p>
            <p>•</p>
            <p>{`${moment(data?.startDate).format('HH:mm')}`}</p>
            <p>•</p>
            <p>{`${data?.reservationCount}명`}</p>
            {/* <p>{`${addComma(data?.amount || 0)}원`}</p> */}
          </div>
        </section>

        <section className="order-item-status-container">{statusRender()}</section>

        <section className="order-item-detail-container">
          <CustomButton variant="outlined" onClick={() => onClickOrderDetail(data?.id)}>
            상세보기
          </CustomButton>
        </section>
      </section>
    </SMyOrderItem>
  );
};

export default MyOrderItem;
