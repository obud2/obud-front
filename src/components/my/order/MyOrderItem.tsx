import { SlArrowRight } from 'react-icons/sl';
import moment from 'moment';
import { MOBILE } from '@/styled/variablesStyles';
import CustomButton from '@components/common/button/CustomButton';
import styled from 'styled-components';
import { Reservation } from '@/entities/reservation';
import { ReserveService } from '@/service/ReserveService';

type Props = {
  reservation: Reservation;
  onClickOrderDetail: (id: string) => void;
};

const MyOrderItem = ({ reservation, onClickOrderDetail }: Props) => {
  return (
    <SMyOrderItem>
      <section className="order-item-mobile-header">
        {ReserveService.getReservationStatusText(reservation.status)}
        <button onClick={() => onClickOrderDetail(reservation.id)}>
          상세보기
          <SlArrowRight />
        </button>
      </section>

      <section className="order-item-container">
        <section className="order-item-contents-container">
          <p className="order-item-studio-title">{reservation.place.title}</p>
          <p className="order-item-lesson-title">{reservation.program.title}</p>

          <div className="order-item-option">
            <p>{moment(reservation.schedule.startDate).format('YYYY.MM.DD (ddd)')}</p>
            <p>•</p>
            <p>{`${moment(reservation.schedule.startDate).format('HH:mm')}`}</p>
            <p>•</p>
            <p>{`${reservation.reservationCount}명`}</p>
          </div>

          {reservation.payment.merchandiseType === 'PASS' && (
            <div className="order-item-pass-info">
              <p>{reservation.payment.pass?.title}</p>
            </div>
          )}
        </section>
        <section className="order-item-status-container">{ReserveService.getReservationStatusText(reservation.status)}</section>
        <section className="order-item-detail-container">
          <CustomButton variant="outlined" onClick={() => onClickOrderDetail(reservation.id)}>
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

  border: 1px solid #e5e5e5;
  border-radius: 10px;
  box-shadow: 1px 1px 5px -1px #e5e5e5;
  padding: 20px;

  ${MOBILE} {
    gap: 15px;
    flex-direction: column;
    align-items: flex-start;
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

      .order-item-pass-info {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        margin-top: 4px;
        color: ${(props) => props.theme.main_color_slate_300};
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

  .CANCELLED {
    color: #ec3519;
  }
  .COMPLETED {
    color: ${(props) => props.theme.main_color_slate_400};
  }
  .UPCOMING {
    color: ${(props) => props.theme.core_color_slate_600};
  }
`;
