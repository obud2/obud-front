/* eslint-disable no-console */
import React, { useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { UserContext } from 'src/context/UserContext';
import { OrderContext } from 'src/context/OrderContext';
import { CartContext } from 'src/context/CartContext';

import { useQueryClient } from 'react-query';

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

const Booking = () => {
  const queryClient = useQueryClient();
  const { impPay, impPayNative } = useBookingSetting();

  const router = useRouter();

  const { order } = useContext<any>(OrderContext);
  const { user } = useContext(UserContext);
  const { deleteCart } = useContext<any>(CartContext);

  const [userInfo, setUserInfo] = useState<{ name?: string; hp?: string; email?: string }>({});
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [payMethod, setPayMethod] = useState<(typeof PAYMENT_METHOD)[number]['id']>(PAYMENT_METHOD[0].id);

  const [isAgree, setIsAgree] = useState({
    policy: false,
    check: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isUserInfoBring, setIsUserInfoBring] = useState(true);

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

    const cart: string[] = order.filter((it) => it?.cart).map((it) => it?.id);
    const createOrderParams: {
      planId: string;
      price: number;
      startDate: string;
      endDate: string;
      instructor: string;
      reservationer: string;
      reservationerHp: string;
      reservationCount: number;
      payOption: string;
      payOptionCount: number;
    }[] = order.map((it) => ({
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
        console.log(err);
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
            deleteCart(cart);
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
        alert('', '예약 실패하였습니다. <br /> 잠시 후 다시시도해주세요.', '', '', () => {
          router.push('/');
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <React.Fragment>
      <BookingBase subTitle="예약 수업 정보" list={order} subDate={undefined} />

      <SBooking>
        {/* 예약자 정보 영역 */}
        <section className="booking-user-info-container">
          <header className="booking-header">
            <p className="booking-title">예약자 정보</p>
            <CustomCheckBox label="회원 정보 불러오기" value={isUserInfoBring} onClick={onClickUserInfoBring} disabled={isLoading} />
          </header>

          <main className="booking-user-info">
            <CustomInput
              point
              label="예약자명"
              type="text"
              placeholder="예약자명을 입력해주세요."
              value={userInfo?.name || ''}
              onChange={(e) => onChangeInputValue('name', e.target.value)}
              disabled={isLoading}
            />
            <CustomInput
              point
              label="휴대전화"
              type="tel"
              placeholder="'-'없이 입력"
              value={userInfo?.hp || ''}
              onChange={(e) => onChangeInputValue('hp', e.target.value)}
              disabled={isLoading}
            />
          </main>
        </section>

        {/* 결제 정보 영역 */}
        <section className="booking-pay-info-container">
          <header className="booking-header">
            <p className="booking-title">결제 정보</p>
          </header>

          <div className="booking-total-price">
            <p>총 결제금액</p>
            <p>{addComma(totalPrice)}원</p>
          </div>

          <header className="booking-header">
            <p className="booking-title">결제 수단</p>
          </header>

          {/* 결제수단 */}
          <div className="booking-paymethod-container">
            <CustomRadio value={payMethod || ''} onChange={(e) => onChangePayMethod(e.target.value)}>
              {PAYMENT_METHOD.filter((a) => a.isShow).map((item) => (
                <CustomRadioItem key={item.id} isChecked={item.id === payMethod} value={item.id} label={item.value} disabled={isLoading} />
              ))}
            </CustomRadio>
          </div>

          <footer className="booking-user-footer">
            <CustomLabel point label="신청 전 클래스 시간, 장소, 내용, 환불 규정을 확인해주세요." />

            <CustomCheckBox
              label="네, 확인했습니다."
              value={isAgree?.check}
              onClick={(e) => onClickAgreeValue('check', e)}
              disabled={isLoading}
            />
          </footer>

          <footer className="booking-user-footer">
            <CustomLabel point label="구매조건 확인 및 결제진행에 동의 합니다." />

            <CustomCheckBox
              label="동의합니다."
              value={isAgree?.policy}
              onClick={(e) => onClickAgreeValue('policy', e)}
              disabled={isLoading}
            />
          </footer>

          <CustomButton variant="outlined" fullWidth onClick={onClickPayOrder} disabled={isLoading} isLoading={isLoading}>
            결제하기
          </CustomButton>
        </section>
      </SBooking>

      <FallBackLoading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default Booking;
