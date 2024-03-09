import { SlArrowRight } from 'react-icons/sl';

import moment from 'moment';

import { MOBILE } from '@/styled/variablesStyles';
import CustomButton from '@components/common/button/CustomButton';
import CustomImage from '@components/common/image/CustomImage';
import styled from 'styled-components';

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
          상세보기
          <SlArrowRight />
        </button>
      </section>

      <section className="order-item-container">
        <section className="order-item-image-container">
          <CustomImage src={data?.images?.url || data?.images?.[0]?.url || ''} layout="fill" />
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

const SMyOrderItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  ${MOBILE} {
    gap: 15px;
    flex-direction: column;
    align-items: flex-start;

    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 1px 1px 5px -1px #e5e5e5;

    padding: 20px;
  }

  .order-item-mobile-header {
    width: 100%;
    display: none;

    ${MOBILE} {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-weight: 400;
      line-height: 140%;

      button {
        font-weight: 400;
        line-height: 140%;

        color: #000;

        svg {
          margin-left: 5px;
          vertical-align: middle;
          height: 12px;
          width: 12px;
          margin-bottom: 1px;
        }
      }
    }
  }

  .order-item-container {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 16px;

    .order-item-image-container {
      min-width: 89px;
      aspect-ratio: 1 / 1;

      border: 0.5px solid #eeeeee;
      position: relative;

      ${MOBILE} {
        min-width: 50px;
      }
    }

    .order-item-contents-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;

      color: #000;

      font-weight: 400;
      line-height: 140%;

      ${MOBILE} {
        padding: 0;
        gap: 0;
      }

      .order-item-option {
        display: flex;
        font-size: 12px;
      }

      .order-item-studio-title {
        font-size: 14px;
        font-weight: bold;
      }
      .order-item-lesson-title {
        font-size: 12px;
      }
    }

    .order-item-status-container {
      min-width: 200px;

      font-size: 13px;

      font-weight: 400;
      line-height: 140%;
      text-align: center;

      ${MOBILE} {
        text-align: left;
        padding: 8px 0 16px 16px;
        display: none;
      }
    }

    .order-item-detail-container {
      min-width: 88px;

      text-align: center;

      button {
        width: 88px;
        height: 36px;
      }

      ${MOBILE} {
        display: none;
      }
    }
  }

  .CANCEL {
    color: #ec3519;
  }
  .COMPLETE {
    color: ${(props) => props.theme.main_color_slate_400};
  }
  .FAIL {
    color: ${(props) => props.theme.core_color_slate_600};
  }
  .WAIT {
    color: ${(props) => props.theme.main_color_slate_400};
  }
  .REFUSAL {
    color: #ec3519;
  }
  .CANCELING {
    color: #ec3519;
  }
`;
