import React, { useState } from 'react';
import moment from 'moment';
import { addComma } from 'src/constants';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { myOrderItem } from 'src/service/UserService';
import { reservationCancel } from 'src/service/OrderService';
import { PAYMENT_METHOD } from '@components/booking/Booking.option';
import BookingBase from '@components/booking/base/BookingBase';
import FallBackLoading from '@components/loading/FallBackLoading';
import CustomButton from '@components/common/button/CustomButton';
import alert from 'src/helpers/alert';
import CancelModal from './CancelModal';
import styled from 'styled-components';
import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from '@/styled/variablesStyles';

const MyOrderDetail = () => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { id } = router.query;

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [useLoading, setUseLoading] = useState(false);

  const fetchData = async () => {
    const res = await myOrderItem(id);
    const obj = (res as any)?.value || [];

    const nowDate = moment().valueOf();
    const date = moment(obj.startDate).format('YYYY-MM-DD');

    const startTime = moment(obj.startDate).format('HH:mm');
    const endTime = moment(obj.endDate).format('HH:mm');

    obj.format = {};
    obj.format.date = date;
    obj.format.startTime = startTime;
    obj.format.endTime = endTime;
    obj.format.pastDate = false;

    obj.images = typeof obj.images === 'object' ? [obj.images] : obj.images;
    obj.payMethod = '';

    PAYMENT_METHOD.forEach((a) => {
      if (obj?.payInfo?.pay_method === a?.id) obj.payMethod = a?.value;
    });

    // 오늘 기준 날짜 지났는지 체크.
    const endTimeCheck = moment(obj.endDate).valueOf();

    if (nowDate > endTimeCheck) {
      obj.format.pastDate = true;
    }

    if (obj?.orderStatus === 'CANCEL' || obj?.orderStatus === 'FAIL' || obj?.orderStatus === 'WAIT' || obj?.orderStatus === 'CANCELING') {
      obj.format.pastDate = true;
    }

    return [obj];
  };

  const { data, isLoading } = useQuery(['my-order-item', id], fetchData, { enabled: !!id });

  const onClickCancelModalOpen = () => {
    setIsCancelModalOpen(true);
  };

  const onClickPayCancel = () => {
    alert('', '예약을 취소하시겠습니까? <br /> 취소 및 환불 규정을 확인해 주세요.', '취소', '확인', () => {
      if (data) {
        setUseLoading(true);
        setIsCancelModalOpen(false);

        reservationCancel(data[0]?.id)
          .then((res: any) => {
            if (res?.status === 200) {
              alert('', '예약 취소되었습니다. <br /> 환불은 마이페이지 > 예약현황에서 <br /> 확인해 주세요.', '', '', () => {
                router.push('/my/order');
              });
            } else {
              alert('', res?.message || '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
            }

            setUseLoading(false);
          })
          .catch(() => {
            alert('', '오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
          })
          .finally(() => {
            queryClient.invalidateQueries(['my-order-list'], { refetchInactive: true });
          });
      }
    });
  };

  const isAllLoading = useLoading || isLoading;

  return (
    <>
      <BookingBase
        subTitle="예약 수업 정보"
        subDate={`주문일자 : ${moment(data?.[0]?.createdAt).format('YYYY-MM-DD')}`}
        list={data || []}
      />

      <SMyOrderDetail>
        {/* 예약자 정보 영역 */}
        <section className="booking-info-container">
          <header className="booking-header">
            <p className="booking-title">예약자 정보</p>
          </header>
          <main className="booking-content">
            <div className="booking-info">
              <header>이름</header>
              <main>{data?.[0]?.reservationer || ''}</main>
            </div>
            <div className="booking-info">
              <header>휴대전화</header>
              <main>{data?.[0]?.reservationerHp || ''}</main>
            </div>
          </main>
        </section>

        {/* 결제 정보 영역 */}
        <section className="booking-info-container">
          <header className="booking-header">
            <p className="booking-title">결제 정보</p>
          </header>

          <div className="booking-content">
            <div className="booking-info">
              <p>총 결제금액</p>
              <p>{addComma(data?.[0]?.amount || 0)}원</p>
            </div>

            {data?.[0]?.orderStatus === 'CANCEL' && (
              <div className="booking-info cancel">
                <p>차감 금액</p>
                <p>- {addComma((data?.[0].cancelAmount || 0) - (data?.[0].amount || 0))}원</p>
              </div>
            )}

            {data?.[0]?.orderStatus === 'CANCEL' && (
              <div className="booking-info cancel">
                <p>환불 금액</p>
                <p>{addComma(data?.[0]?.cancelAmount || 0)}원</p>
              </div>
            )}

            <div className="booking-info">
              <p>결제수단</p>
              <p>{data?.[0]?.payMethod || '-'}</p>
            </div>
          </div>

          {!data?.[0]?.format?.pastDate && (
            <footer className="booking-pay-footer">
              <CustomButton variant="outlined" fullWidth onClick={onClickCancelModalOpen} disabled={isAllLoading} isLoading={isAllLoading}>
                예약취소
              </CustomButton>
            </footer>
          )}
        </section>
      </SMyOrderDetail>

      <CancelModal
        id={data?.[0]?.id || ''}
        isOpen={isCancelModalOpen}
        isClose={() => setIsCancelModalOpen(false)}
        isLoading={isAllLoading}
        onClickPayCancel={onClickPayCancel}
      />

      <FallBackLoading isLoading={isAllLoading} />
    </>
  );
};

export default MyOrderDetail;

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
