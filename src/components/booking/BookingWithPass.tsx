import { UserPass } from '@/entities/pass';
import CustomButton from '../common/button/CustomButton';
import { ReserveService } from '@/service/ReserveService';
import alert from '@/helpers/alert';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

type Props = {
  userInfo: { name?: string; hp?: string; email?: string };
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  scheduleId: string;
  usableUserPass: UserPass;
};

const BookingWithPass = ({ userInfo, isLoading, setIsLoading, scheduleId, usableUserPass }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onClickReserve = async () => {
    if (!userInfo?.name) {
      alert('', '예약자명은 필수입니다.');
      return;
    }
    if (!userInfo?.hp) {
      alert('', '휴대전화번호는 필수입니다.');
      return;
    }

    setIsLoading(true);
    try {
      await ReserveService.reserveUsingPass({
        scheduleId,
        userPassId: usableUserPass.id,
        userName: userInfo.name,
        userPhone: userInfo.hp,
      });
      alert('', '감사합니다. <br /> 예약이 완료되었습니다.', '', '', () => {
        router.replace('/my/order');
      });
      queryClient.invalidateQueries();
    } catch (err) {
      const error = err as { message: string };
      alert('', error.message || '죄송합니다. 예약에 실패하였습니다. <br /> 잠시 후 다시 시도해주세요.', '', '', () => {
        router.push('/class');
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section style={{ flex: 0.6 }}>
      <header className="booking-header">
        <p className="booking-title">사용 가능한 패스</p>
      </header>
      <main className="booking-user-pass">
        <div className="booking-user-pass-item">
          {usableUserPass.pass.title} ({usableUserPass.pass.durationInDays}일)
        </div>
      </main>

      <CustomButton fullWidth onClick={onClickReserve} disabled={isLoading} isLoading={isLoading}>
        예약하기
      </CustomButton>
    </section>
  );
};

export default BookingWithPass;
