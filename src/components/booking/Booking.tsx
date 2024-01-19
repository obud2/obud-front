/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { UserContext } from 'src/context/UserContext';
import { Order, OrderContext } from 'src/context/OrderContext';

import { useQuery, useQueryClient } from 'react-query';

import { PAYMENT_METHOD } from './Booking.option';

import { addComma } from 'src/constants';
import { SBooking } from './Booking.styled';

import useBookingSetting from './hook/useBookingSetting';

import alert from 'src/helpers/alert';

import BookingBase from './base/BookingBase';
import CustomInput from '@components/common/input/CustomInput';
import CustomLabel from '@components/common/label/CustomLabel';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import CustomButton from '@components/common/button/CustomButton';
import CustomRadio, { CustomRadioItem } from '@components/common/radio/CustomRadio';

import FallBackLoading from '@components/loading/FallBackLoading';
import BookingCouponModal from './modals/BookingCouponModal';
import { Coupon, CouponDiscountType } from '@/entities/coupon';
import CouponService from '@/service/CouponService';

const Booking = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { impPay, impPayNative, isProcessingPayment } = useBookingSetting();
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');

  const [couponEnabled, setCouponEnabled] = useState<boolean>(false);

  useEffect(() => {
    const couponFeature = localStorage.getItem('couponFeature');
    if (couponFeature) {
      setCouponEnabled(true);
    }
  }, []);

  const { order } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  // TODO: 한번에 여러 order를 결제할 수 있게 되면 쿠폰 적용 로직 수정해야 함
  const scheduleId = order[0]?.planId;

  const { data: coupons } = useQuery(['coupons/me', { scheduleId }], () => CouponService.listCoupons({
      scheduleId,
  }), { enabled: !!scheduleId });
  const totalActiveCoupons = (coupons ?? []).filter((it) => !!it.canBeApplied).length;

  const [userInfo, setUserInfo] = useState<{ name?: string; hp?: string; email?: string }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [payMethod, setPayMethod] = useState<(typeof PAYMENT_METHOD)[number]['id']>(PAYMENT_METHOD[0].id);

  const [isAgree, setIsAgree] = useState({
    policy: false,
    check: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterCouponLoading, setIsRegisterCouponLoading] = useState(false);
  const [isUserInfoBring, setIsUserInfoBring] = useState(true);
  const isAllLoading = isRegisterCouponLoading || isLoading;

  // 상품 없으면 장바구니로 이동.
  useEffect(() => {
    if (order && !order.length) {
      router.back();
    }
  }, [order]);

  // 총 금액
  useEffect(() => {
    if (order && order?.length > 0) {
      let temp = 0;

      order?.forEach((a) => {
        const basePirce = Number(a?.price || 0) * Number(a?.reservationCount || 0);
        const optionPrice = Number(a?.payOption?.price) ? Number(a?.payOption?.price) * Number(a?.payOptionCount) : 0;

        temp += basePirce + optionPrice;
      });

      setTotalPrice(temp);
    }
  }, [order]);

  // 회원 정보 불러오기
  useEffect(() => {
    onClickUserInfoBring(true);
  }, [user]);

  if (!order.length) {
    return null;
  }

  // 회원 정보 불러오기 토글
  const onClickUserInfoBring = (loadUser: boolean) => {
    if (loadUser) {
      setUserInfo({ name: user?.name, hp: user?.phone, email: user?.email });
    } else {
      setUserInfo({});
    }

    setIsUserInfoBring(loadUser);
  };

  // 예약자 정보 인풋
  const onChangeInputValue = (type, e) => {
    setUserInfo((prev) => ({ ...prev, [type]: e }));
  };

  // 약관 동의
  const onClickAgreeValue = (type, e) => {
    setIsAgree((prev) => ({ ...prev, [type]: e }));
  };

  // 결제수단
  const onChangePayMethod = (type: (typeof PAYMENT_METHOD)[number]['id']) => {
    setPayMethod(type);
  };

  // 예약하기
  const onClickPayOrder = async () => {
    if (!userInfo?.name) {
      alert('', '예약자명은 필수입니다.');
      return;
    }
    if (!userInfo?.hp) {
      alert('', '휴대전화번호는 필수입니다.');
      return;
    }
    if (!payMethod) {
      alert('', '결제수단을 선택해주세요.');
      return;
    }
    if (!isAgree?.check) {
      alert('', '신청 전 클래스 시간, 장소, <br /> 내용, 환불 규정을 확인해주세요.');
      return;
    }
    if (!isAgree?.policy) {
      alert('', '구매조건 확인 및 결제진행에 <br /> 동의하여 주시기 바랍니다.');
      return;
    }

    setIsLoading(true);

    const payOption = {
      payMethod,
      userInfo: {
        name: userInfo.name,
        hp: userInfo.hp,
        email: userInfo.email || '',
      },
      title: `${order?.[0]?.lessonTitle}${order?.length > 1 ? order.length - 1 : ''}`,
      amount: totalPrice,
    };

    const createOrderParams: {
      couponId?: string;
      planId: string;
      price: number;
      startDate: string;
      endDate: string;
      instructor: string;
      reservationer: string;
      reservationerHp: string;
      reservationCount: number;
      payOption: Order['payOption'];
      payOptionCount: number;
    }[] = order.map((it) => ({
      couponId: currentCoupon?.id || '',
      planId: it?.planId || '',
      price: it?.price || 0,
      startDate: it?.startDate || '',
      endDate: it?.endDate || '',
      instructor: it?.instructor || '',
      reservationer: userInfo?.name || '',
      reservationerHp: userInfo?.hp || '',
      reservationCount: it?.reservationCount || 0,
      payOption: it?.payOption || '',
      payOptionCount: it?.payOptionCount || 0,
    }));

    if (window.ReactNativeWebView) {
      try {
        await impPayNative(createOrderParams, payOption);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const res = (await impPay(createOrderParams, payOption, setIsLoading)) as any;
        const orderStatus = res?.val?.orderStatus || 'FAIL';
        const errorMsg = res?.error_msg || '';

        queryClient.invalidateQueries(['my-order-list'], { refetchInactive: true });

        if (orderStatus === 'COMPLETE') {
          alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
            router.push('/my/order');
          });
        }
        if (orderStatus === 'FAIL') {
          if (errorMsg) {
            alert('', errorMsg, '', '', () => {
              router.push('/class');
            });
          } else {
            alert('', '예약을 취소하였습니다.', '', '', () => {
              router.push('/class');
            });
          }
        }
      } catch (err) {
        alert('', '죄송합니다. 예약에 실패하였습니다. <br /> 잠시 후 다시시도해주세요.', '', '', () => {
          router.push('/');
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onCreateCoupon = async () => {
    if (!couponCode) {
      alert('', '쿠폰 번호를 입력해주세요.', '', '');
      return;
    }

    try {
      const createdCoupon = await CouponService.createCoupon({ code: couponCode, scheduleId });
      await queryClient.invalidateQueries('coupons/me');
      if (createdCoupon.canBeApplied) {
        setCurrentCoupon(createdCoupon);
        alert('', '쿠폰이 등록되었습니다. <br /> 해당 쿠폰이 자동으로 선택됩니다.', '', '');
      } else {
        alert('', '쿠폰이 등록되었습니다. <br /> 하지만 이 수업에는 적용할 수 없는 쿠폰입니다.', '', '');
      }
    } catch (err) {
      alert('', `${(err as unknown as {message: string} | undefined)?.message ?? '쿠폰 등록에 실패했습니다.'} <br /> 올바른 쿠폰 코드 입력 후 다시 시도해주세요.`, '', '');
    } finally {
      setCouponCode('');
      setIsRegisterCouponLoading(false);
    }
  };

  const getCouponPrice = (coupon: Coupon | null) => {
    if (!coupon) return 0;

    if (coupon.minOrderPriceAmount > totalPrice) return 0;

    if (coupon.discountType === CouponDiscountType.AMOUNT) {
      if (coupon.maxDiscountAmount === 0) return coupon.discountAmount;

      return Math.min(coupon.discountAmount, coupon.maxDiscountAmount);
    }

    if (coupon.discountType === CouponDiscountType.PERCENTAGE) {
      if (coupon.maxDiscountAmount === 0) return totalPrice * (coupon.discountAmount / 100);

      return Math.min(totalPrice * (coupon.discountAmount / 100), coupon.maxDiscountAmount);
    }

    return 0;
  };

  return (
    <React.Fragment>
      <BookingBase subTitle="예약 수업 정보" list={order} subDate={undefined} />

      <SBooking>
        {/* 예약자 정보 영역 */}
        <section className="booking-user-info-container">
          <header className="booking-header">
            <p className="booking-title">예약자 정보</p>
            <CustomCheckBox label="회원 정보 불러오기" value={isUserInfoBring} onClick={onClickUserInfoBring} disabled={isAllLoading} />
          </header>

          <main className="booking-user-info">
            <CustomInput
              point
              label="예약자명"
              type="text"
              placeholder="예약자명을 입력해주세요."
              value={userInfo?.name || ''}
              onChange={(e) => onChangeInputValue('name', e.target.value)}
              disabled={isAllLoading}
            />
            <CustomInput
              point
              label="휴대전화"
              type="tel"
              placeholder="'-'없이 입력"
              value={userInfo?.hp || ''}
              onChange={(e) => onChangeInputValue('hp', e.target.value)}
              disabled={isAllLoading}
            />
          </main>
        </section>

        {/* 결제 정보 영역 */}
        <section className="booking-pay-info-container">
          {!couponEnabled && (
            <>
              <div className="booking-header">
                <p className="booking-title">결제 정보</p>
              </div>

              <div className="booking-total-price">
                <p>총 결제금액</p>
                <p>{addComma(totalPrice)}원</p>
              </div>
            </>
          )}

          <div className="booking-header">
            <p className="booking-title">결제 수단</p>
          </div>

          {/* 결제수단 */}
          <div className="booking-paymethod-container">
            <CustomRadio value={payMethod || ''} onChange={(e) => onChangePayMethod(e.target.value)}>
              {PAYMENT_METHOD.filter((a) => a.isShow).map((item) => (
                <CustomRadioItem key={item.id} isChecked={item.id === payMethod} value={item.id} label={item.value} disabled={isAllLoading} />
              ))}
            </CustomRadio>
          </div>

          {/* 쿠폰 */}
          {couponEnabled && (
            <>
              <div className="booking-header">
                <p className="booking-title">쿠폰</p>
              </div>
              <div className="booking-coupon-input-wrapper">
                <CustomInput label="쿠폰" type="text" placeholder={totalActiveCoupons > 0 ? `사용가능한 쿠폰 ${totalActiveCoupons}장` : '이 수업에 사용가능한 쿠폰이 없어요'} disabled value={currentCoupon?.name || ''} />
                <CustomButton width="120px" onClick={() => setOpenCouponModal(true)} disabled={isAllLoading || !totalActiveCoupons}>
                  쿠폰 선택
                </CustomButton>
                <BookingCouponModal scheduleId={scheduleId} open={openCouponModal} onClose={() => setOpenCouponModal(false)} setCoupon={setCurrentCoupon} />
              </div>
              <div className="booking-coupon-input-wrapper">
                <CustomInput
                  label="쿠폰 등록"
                  type="text"
                  placeholder="쿠폰번호를 입력해주세요."
                  value={couponCode}
                  disabled={isRegisterCouponLoading}
                  onChange={(e) => {
                    const code = e.target.value.trim().slice(0, 5).toUpperCase();
                    setCouponCode(code);
                  }}
                />
                <CustomButton width="120px" onClick={onCreateCoupon} disabled={isAllLoading || !couponCode}>
                  쿠폰 등록
                </CustomButton>
              </div>

              <div className="refund-policy-wrapper">
                <div className="refund-policy-header">취소/환불 규정</div>
                <div className="refund-policy-content">
                  <p>이용 8일 전 까지: 100% 환불</p>
                  <p>이용 7일 전 ~ 5일 전: 결제 금액의 50% 차감</p>
                  <p>이용 4일 전~ 이용 당일: 결제 금액의 100% 차감</p>
                </div>
              </div>

              <div className="booking-final-price-wrapper">
                <div className="booking-original-price">
                  <p>주문 금액</p>
                  <p>{addComma(totalPrice)}원</p>
                </div>
                <div className="booking-discount-price">
                  <p>ㄴ 쿠폰 할인</p>
                  <p>{addComma(getCouponPrice(currentCoupon))}원</p>
                </div>
                <div className="booking-final-price">
                  <p>최종 결제금액</p>
                  <p>{addComma(totalPrice - getCouponPrice(currentCoupon))}원</p>
                </div>
              </div>
            </>
          )}

          <footer className="booking-user-footer">
            <CustomLabel point label="신청 전 클래스 시간, 장소, 내용, 환불 규정을 확인해주세요." />

            <CustomCheckBox
              label="네, 확인했습니다."
              value={isAgree?.check}
              onClick={(e) => onClickAgreeValue('check', e)}
              disabled={isAllLoading}
            />
          </footer>

          <footer className="booking-user-footer">
            <CustomLabel point label="구매조건 확인 및 결제진행에 동의 합니다." />

            <CustomCheckBox
              label="동의합니다."
              value={isAgree?.policy}
              onClick={(e) => onClickAgreeValue('policy', e)}
              disabled={isAllLoading}
            />
          </footer>

          <CustomButton fullWidth onClick={onClickPayOrder} disabled={isAllLoading} isLoading={isAllLoading}>
            결제하기
          </CustomButton>
        </section>
      </SBooking>

      <FallBackLoading isLoading={isLoading || isProcessingPayment} />
    </React.Fragment>
  );
};

export default Booking;
