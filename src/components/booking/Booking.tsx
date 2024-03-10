import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import CustomInput from '@components/common/input/CustomInput';
import FallBackLoading from '@components/loading/FallBackLoading';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { OrderContext } from 'src/context/OrderContext';
import { UserContext } from 'src/context/UserContext';
import { SBooking } from './Booking.styled';
import BookingBase from './base/BookingBase';
import { PassService } from '@/service/PassService';
import BookingWithPass from './BookingWithPass';
import BookingWithoutPass from './BookingWithoutPass';

const Booking = () => {
  const router = useRouter();

  const { order } = useContext(OrderContext);
  const { user } = useContext(UserContext);

  const { data: userPasses } = useUserPasses();
  const usableUserPass = PassService.getUsableUserPass({ userPasses, programId: order[0].lessonId });

  const [userInfo, setUserInfo] = useState<{ name?: string; hp?: string; email?: string }>({});

  const [isLoading, setIsLoading] = useState(false);
  const [isUserInfoBring, setIsUserInfoBring] = useState(true);

  // 상품 없으면 장바구니로 이동.
  useEffect(() => {
    if (order && order.length === 0) {
      router.back();
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

  if (order.length === 0) return null;

  // 예약자 정보 인풋
  const onChangeInputValue = (type, e) => {
    setUserInfo((prev) => ({ ...prev, [type]: e }));
  };

  return (
    <>
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

        {usableUserPass && <BookingWithPass />}
        {!usableUserPass && <BookingWithoutPass isLoading={isLoading} setIsLoading={setIsLoading} userInfo={userInfo} />}
      </SBooking>

      <FallBackLoading isLoading={isLoading} />
    </>
  );
};

export default Booking;

const useUserPasses = () => {
  return useQuery('userPasses', () => PassService.listUserPasses({ status: 'IN_USE' }), { select: (data) => data?.value });
};
