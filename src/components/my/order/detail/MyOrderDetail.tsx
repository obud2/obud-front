import { useContext, useState } from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { reservationCancel } from 'src/service/OrderService';
import FallBackLoading from '@components/loading/FallBackLoading';
import CustomButton from '@components/common/button/CustomButton';
import alert from 'src/helpers/alert';
import CancelModal from './CancelModal';
import styled from 'styled-components';
import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from '@/styled/variablesStyles';
import { Reservation } from '@/entities/reservation';
import { ReserveService } from '@/service/ReserveService';
import { LayoutContext } from '@/context/LayoutContext';

const HEADER = ['상품정보', '날짜', '시간', '예약 수단'];

const MyOrderDetail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { matchese } = useContext(LayoutContext);

  const { id } = router.query;
  const reservationId = id as Reservation['id'];
  const { data: reservation } = useReservation(reservationId);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [useLoading, setUseLoading] = useState(false);

  const onClickCancelModalOpen = () => {
    setIsCancelModalOpen(true);
  };

  const onClickPayCancel = () => {
    alert('', '예약을 취소하시겠습니까? <br /> 취소 및 환불 규정을 확인해 주세요.', '취소', '확인', (res) => {
      if (reservation && res) {
        setUseLoading(true);
        setIsCancelModalOpen(false);

        reservationCancel(reservation.id)
          .then((res: any) => {
            if (res?.status === 200) {
              alert('', '예약 취소되었습니다. <br /> 환불은 마이페이지 > 예약현황에서 <br /> 확인해 주세요.', '', '', () => {
                router.push('/my/order');
              });
            } else {
              alert('', res?.message || '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
            }
          })
          .catch((err) => {
            const error = err as { message: string };
            alert('', error.message || '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
          })
          .finally(() => {
            setUseLoading(false);
            queryClient.invalidateQueries();
          });
      }
    });
  };

  const onClickReserveCancelByPass = () => {
    alert('예약을 취소하시겠습니까?', '- 취소 가능 횟수가 차감됩니다 <br />- 취소 후 복구가 불가합니다.', '취소', '확인', async (res) => {
      if (reservation && res) {
        setUseLoading(true);
        setIsCancelModalOpen(false);

        try {
          await ReserveService.cancelReserveUsingPass({ id: reservation.id });
          alert('', '예약이 취소되었습니다.', '', '', () => {
            router.push('/my/order');
          });
        } catch (err) {
          const error = err as { message: string };
          alert('', error.message || '예약 취소에 실패했습니다. <br /> 고객센터에 문의해주세요.');
        } finally {
          setUseLoading(false);
          queryClient.invalidateQueries();
        }
      }
    });
  };

  const onClickGoPlan = () => {
    window.open(`/lesson/${reservation?.program.id}`);
  };

  if (!reservation) return null;

  const isAllLoading = useLoading;
  const isCancellable = moment(reservation.schedule.endDate).isAfter(moment()) && reservation.status === 'UPCOMING';

  return (
    <>
      <SBookingBase>
        <header className="booking-base-header">
          <p className="booking-sub-title">예약 수업 정보</p>
          <p className="booking-sub-date">{`주문일자 : ${moment(reservation.reserveAt).format('YYYY-MM-DD')}`}</p>
        </header>

        <ul className="booking-item-header-container">
          {HEADER.map((item) => (
            <li key={`booking-header-item-${item}`} className="booking-header-item">
              {item}
            </li>
          ))}
        </ul>

        <SBookingItem>
          <ul className="booking-item-list-container">
            {matchese && (
              <div className="booking-mobile-data-container">
                {/* 제목 */}
                <div className="booking-title">
                  <h4 className="booking-studios-title">{reservation.place.title.slice(0, 15)}</h4>
                  <p>{reservation.program.title || '-'}</p>
                </div>

                {/* 날짜 , 시간 */}
                <div className="booking-mobile-title">
                  <p>예약일정</p>
                  <p>
                    {moment(reservation.schedule.startDate).format('YYYY-MM-DD')},{moment(reservation.schedule.startDate).format('HH:mm')}~
                    {moment(reservation.schedule.endDate).format('HH:mm')}
                  </p>
                </div>
                {reservation.payment.pass && (
                  <div className="booking-mobile-title">
                    <p>예약수단</p>
                    <p>{reservation.payment.pass.title}</p>
                  </div>
                )}
              </div>
            )}
            {!matchese && (
              <>
                {/* 상품정보 */}
                <li className="booking-item cursor" onClick={onClickGoPlan}>
                  <div className="booking-title">
                    <h4 className="booking-studios-title">{reservation.place.title.slice(0, 18)}</h4>
                    <p>{reservation.program.title || '-'}</p>
                  </div>
                </li>
                {/* 날짜 */}
                <li className="booking-item">
                  <p>{moment(reservation.schedule.startDate).format('YYYY-MM-DD')}</p>
                </li>
                {/* 시간 */}
                <li className="booking-item">
                  <p>
                    {moment(reservation.schedule.startDate).format('HH:mm')}~{moment(reservation.schedule.endDate).format('HH:mm')}
                  </p>
                </li>
                {/* 예약 수단 */}
                <li className="booking-item">{reservation.payment.pass ? <p>{reservation.payment.pass.title}</p> : <p>단건 결제</p>}</li>
              </>
            )}
          </ul>
        </SBookingItem>
      </SBookingBase>

      <SMyOrderDetail>
        {/* 예약자 정보 영역 */}
        <section className="booking-info-container">
          <header className="booking-header">
            <p className="booking-title">예약자 정보</p>
          </header>
          <main className="booking-content">
            <div className="booking-info">
              <header>이름</header>
              <main>{reservation.user.name}</main>
            </div>
            <div className="booking-info">
              <header>휴대전화</header>
              <main>{reservation.user.phone}</main>
            </div>
          </main>
        </section>

        {/* 결제 정보 영역 */}
        {reservation.payment.merchandiseType === 'ONE_TIME_RESERVATION' && (
          <section className="booking-info-container">
            <header className="booking-header">
              <p className="booking-title">결제 정보</p>
            </header>

            <div className="booking-content">
              <div className="booking-info">
                <p>총 결제금액</p>
                <p>{reservation.payment.payAmount?.toLocaleString() || 0}원</p>
              </div>

              {!!reservation.payment.discountAmount && (
                <div className="booking-info cancel">
                  <p>할인 금액</p>
                  <p>- {reservation.payment.discountAmount}원</p>
                </div>
              )}

              {(!!reservation.payment.cancelAmount || reservation.status === 'CANCELLED') && (
                <div className="booking-info cancel">
                  <p>환불 금액</p>
                  <p>{reservation.payment.cancelAmount?.toLocaleString() || 0}원</p>
                </div>
              )}
            </div>
          </section>
        )}

        {isCancellable && reservation.payment.merchandiseType === 'ONE_TIME_RESERVATION' && (
          <footer className="booking-pay-footer">
            <CustomButton variant="outlined" fullWidth onClick={onClickCancelModalOpen} disabled={isAllLoading} isLoading={isAllLoading}>
              예약취소
            </CustomButton>
          </footer>
        )}

        {isCancellable && reservation.payment.merchandiseType === 'PASS' && (
          <footer className="booking-pay-footer">
            <CustomButton
              variant="outlined"
              fullWidth
              onClick={onClickReserveCancelByPass}
              disabled={isAllLoading}
              isLoading={isAllLoading}
            >
              예약취소
            </CustomButton>
          </footer>
        )}
      </SMyOrderDetail>

      {reservation.payment.merchandiseType === 'ONE_TIME_RESERVATION' && (
        <CancelModal
          id={reservation.id}
          isOpen={isCancelModalOpen}
          isClose={() => setIsCancelModalOpen(false)}
          isLoading={isAllLoading}
          onClickPayCancel={onClickPayCancel}
        />
      )}
      <FallBackLoading isLoading={isAllLoading} />
    </>
  );
};

export default MyOrderDetail;

const useReservation = (id: Reservation['id']) => {
  return useQuery(['reservations', id], () => ReserveService.getReservation({ id }), { enabled: !!id });
};

const SBookingItem = styled.ul`
  width: 100%;

  display: flex;
  position: relative;

  ${MOBILE} {
    display: flex;
    justify-content: center;

    gap: 12px;
  }

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

const SBookingBase = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};

  padding: 60px 15px;
  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
  }

  .booking-base-header {
    width: 100%;

    margin-top: 24px;
    padding-bottom: 16px;

    border-bottom: 1px solid;

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${MOBILE} {
      margin-top: 0;
    }

    .booking-sub-title {
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 140%;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .booking-sub-date {
      color: #565656;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;
    }
  }

  .booking-item-header-container {
    width: 100%;
    padding: 17px 0;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

    ${MOBILE} {
      display: none;
    }

    .booking-header-item {
      flex: 1;

      font-size: 1.4rem;
      line-height: 140%;

      text-align: center;

      &:first-child {
        flex: 3;
      }
    }
  }

  .booking-item-list-container {
    width: 100%;

    display: flex;
    flex-direction: row;

    padding: 24px 0;
    gap: 24px;

    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

    ${MOBILE} {
      padding: 18px 16px;
      flex-direction: column;
    }
  }
`;

const SMyOrderDetail = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;
  padding-bottom: 32px;

  margin: 0 auto;

  display: flex;
  justify-content: center;

  gap: 32px;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    flex-direction: column;
    gap: 45px;
  }

  .booking-info-container {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;

    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

    &:last-child {
      border: none;
    }

    ${MOBILE} {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;
    }

    .booking-header {
      width: 100%;

      padding-bottom: 8px;
      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      font-size: 1.8rem;
      font-weight: 600;

      display: flex;
      align-items: center;
      justify-content: space-between;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .booking-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 20px;
      gap: 10px;

      color: #565656;

      .booking-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.cancel {
          color: #f25656;
        }
      }
    }

    .booking-pay-footer {
      width: 100%;
      display: flex;
      flex-direction: column;

      ${MOBILE} {
        margin-top: 20px;
      }
    }
  }
`;
