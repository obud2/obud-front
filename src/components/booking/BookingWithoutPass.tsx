import CustomButton from '@/components/common/button/CustomButton';
import CustomCheckBox from '@/components/common/checkbox/CustomCheckBox';
import CustomInput from '@/components/common/input/CustomInput';
import CustomLabel from '@/components/common/label/CustomLabel';
import CustomRadio, { CustomRadioItem } from '@/components/common/radio/CustomRadio';
import PlanNumberOfPeopleCheck from '@/components/lesson/option/item/PlanNumberOfPeopleCheck';
import { OrderContext } from '@/context/OrderContext';
import { Coupon } from '@/entities/coupon';
import alert from '@/helpers/alert';
import { CouponService } from '@/service/CouponService';
import { OrderService } from '@/service/OrderService';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { PAYMENT_METHOD } from './Booking.option';
import { CreateOrderParam } from './hook/useBookingSetting';
import BookingCouponModal from './modals/BookingCouponModal';
import { PayOptions } from '../purchase/hook/usePurchasePass';

type Props = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  userInfo: { name?: string; hp?: string; email?: string };
  impPay: (createOrderParams: CreateOrderParam[], payOption: PayOptions, setIsLoading: (value: boolean) => void) => Promise<any>;
  impPayNative: (createOrderParams: CreateOrderParam[], payOption: PayOptions) => Promise<any>;
};

const BookingWithoutPass = ({ isLoading, setIsLoading, userInfo, impPay, impPayNative }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { order, setOrder } = useContext(OrderContext);

  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [currentCoupon, setCurrentCoupon] = useState<Coupon | null>(null);
  const [couponCode, setCouponCode] = useState<string>('');
  const [payMethod, setPayMethod] = useState<(typeof PAYMENT_METHOD)[number]['id']>(PAYMENT_METHOD[0].id);
  const [isAgree, setIsAgree] = useState({ policy: false, check: false });
  const [isRegisterCouponLoading, setIsRegisterCouponLoading] = useState(false);

  const scheduleId = order[0]?.planId;
  const { data: coupons } = useCoupons(scheduleId);

  const price = OrderService.getTotalPriceFromOrders({ orders: order });
  const discountedPrice = price - CouponService.getCouponDiscountPrice({ coupon: currentCoupon, price });
  const activeCoupons = CouponService.listActiveCoupons({ coupons, price });
  const isAllLoading = isRegisterCouponLoading || isLoading;

  // 약관 동의
  const onClickAgreeValue = (type, e) => {
    setIsAgree((prev) => ({ ...prev, [type]: e }));
  };

  // 결제수단
  const onChangePayMethod = (type: (typeof PAYMENT_METHOD)[number]['id']) => {
    setPayMethod(type);
  };

  const onCreateCoupon = async () => {
    if (!couponCode) {
      alert('', '쿠폰 번호를 입력해주세요.', '', '');
      return;
    }

    try {
      const createdCoupon = await CouponService.createCoupon({ code: couponCode, scheduleId });
      if (createdCoupon.canBeApplied) {
        setCurrentCoupon(createdCoupon);
        alert('', '쿠폰이 등록되었습니다. <br /> 해당 쿠폰이 자동으로 선택됩니다.', '', '');
      } else {
        alert('', '쿠폰이 등록되었습니다. <br /> 하지만 이 수업에는 적용할 수 없는 쿠폰입니다.', '', '');
      }
    } catch (err) {
      alert('', '쿠폰 등록에 실패했습니다. <br /> 올바른 쿠폰 코드 입력 후 다시 시도해주세요.', '', '');
    } finally {
      queryClient.invalidateQueries();
      setCouponCode('');
      setIsRegisterCouponLoading(false);
    }
  };

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
      title: `${order[0].lessonTitle}${order?.length > 1 ? order.length - 1 : ''}`,
      amount: discountedPrice,
    };

    // TODO: 장바구니가 도입되면 order가 여러개가 될 수 있음.
    if (!order.length) {
      alert('', '주문할 수업을 찾을 수 없습니다. 고객센터로 문의 부탁드립니다.');
      throw new Error('주문할 수업을 찾을 수 없습니다. 고객센터로 문의 부탁드립니다.');
    }
    if (order.length > 1) {
      alert('', '한 번에 여러 상품을 구매할 수 없습니다. 고객센터로 문의 부탁드립니다.');
      throw new Error('한 번에 여러 상품을 구매할 수 없습니다. 고객센터로 문의 부탁드립니다.');
    }

    const target = order[0];
    const createOrderParams: CreateOrderParam[] = [
      {
        price: target.price || 0,
        payAmount: discountedPrice,
        couponId: currentCoupon?.id || null,
        planId: target?.planId || '',
        startDate: target?.startDate || '',
        endDate: target?.endDate || '',
        instructor: target?.instructor && target.instructor !== 'x' ? target.instructor : '',
        reservationer: userInfo?.name || '',
        reservationerHp: userInfo?.hp || '',
        reservationCount: target?.reservationCount || 0,
        payOption: target?.payOption || {},
        payOptionCount: target?.payOptionCount || 0,
      },
    ];

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
        const res = await impPay(createOrderParams, payOption, setIsLoading);
        const orderStatus = res?.orderStatus || 'FAIL';
        const errorMsg = res?.error || '';

        queryClient.invalidateQueries(['my-order-list'], { refetchInactive: true });

        if (orderStatus === 'COMPLETE') {
          alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
            router.replace('/my/order');
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
        alert('', '죄송합니다. 예약에 실패하였습니다. <br /> 잠시 후 다시 시도해주세요.', '', '', () => {
          router.push('/class');
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <section className="booking-number-container">
        <header className="booking-header">
          <p className="booking-title">인원 선택</p>
        </header>

        <main className="booking-number">
          <PlanNumberOfPeopleCheck
            placeholder="인원"
            disabled={false}
            maxNumber={(order[0].maxMember ?? 0) - (order[0].currentMember ?? 0)}
            value={order[0].reservationCount || 0}
            onChange={(e) => {
              setOrder([{ ...order[0], reservationCount: e }]);
            }}
          />
          <div className="booking-total-price">
            <p>{price.toLocaleString()}원</p>
          </div>
        </main>
      </section>

      {/* 결제 정보 영역 */}
      <section className="booking-pay-info-container">
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
        <div className="booking-header">
          <p className="booking-title">쿠폰</p>
        </div>
        <div className="booking-coupon-container">
          <div className="booking-coupon-input-wrapper">
            <CustomInput
              label="쿠폰"
              type="text"
              placeholder={activeCoupons.length > 0 ? `사용가능한 쿠폰 ${activeCoupons.length}장` : '이 수업에 사용가능한 쿠폰이 없어요'}
              disabled
              value={CouponService.getCouponTypeMessage({ coupon: currentCoupon })}
            />
            <CustomButton width="120px" onClick={() => setOpenCouponModal(true)} disabled={isAllLoading || !activeCoupons.length}>
              쿠폰 선택
            </CustomButton>

            <BookingCouponModal
              scheduleId={scheduleId}
              price={price}
              open={openCouponModal}
              onClose={() => setOpenCouponModal(false)}
              setCoupon={setCurrentCoupon}
            />
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
        </div>
        {/* 최종 결제 금액 */}
        <div className="booking-header">
          <p className="booking-title">결제 금액</p>
        </div>

        <div className="booking-final-price-wrapper">
          <div className="booking-original-price">
            <p>주문 금액</p>
            <p>{price.toLocaleString()}원</p>
          </div>
          {currentCoupon && (
            <div className="booking-discount-price">
              <p>쿠폰 할인</p>
              <p>{discountedPrice.toLocaleString()}원</p>
            </div>
          )}
          <div className="booking-final-price">
            <p>최종 결제금액</p>
            <p>{discountedPrice.toLocaleString()}원</p>
          </div>
        </div>
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
    </>
  );
};

export default BookingWithoutPass;

const useCoupons = (scheduleId: string) => {
  return useQuery(['coupons/me', { scheduleId }], () => CouponService.listCoupons({ scheduleId }), { enabled: !!scheduleId });
};
