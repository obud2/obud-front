import { UserPass } from '@/entities/pass';
import alert from '@/helpers/alert';
import { PassService } from '@/service/PassService';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import styled from 'styled-components';

const MyPassDetail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const userPassId = Number(id as string);

  const { data: userPass } = useUserPass(userPassId);

  if (!userPass) return null;

  // 결제일 3일 이후면 버튼 사라짐
  const isRefundButtonActive = moment().diff(moment(userPass.createdAt), 'days') < 3;

  const onClickRefund = () => {
    alert('', '환불 신청하시겠습니까?', '취소', '확인', async (res) => {
      if (res) {
        try {
          await PassService.refundUserPass({ userPassId: userPass.id });
          alert('', '환불 신청이 완료되었습니다.', '확인', '', () => {
            router.push('/my/pass');
          });
        } catch (e) {
          const error = e as { message: string };
          alert('', error.message || '환불 신청에 실패하였습니다. 다시 시도해주세요.', '확인');
        } finally {
          queryClient.invalidateQueries();
        }
      }
    });
  };

  return (
    <SMyPassDetail>
      <div className="title">패스 상세 정보</div>
      <div className="info">
        <div className="item">{userPass.pass.title}</div>
        <div className="item">
          {userPass.place.title} - {userPass.pass.durationInDays}일
        </div>
      </div>

      <div className="title">유효 기간</div>
      <div className="info">
        <div className="item">시작일: {moment(userPass.startDate).format('YYYY.MM.DD')}</div>
        <div className="item">종료일: {moment(userPass.endDate).format('YYYY.MM.DD')}</div>
      </div>

      <div className="title">에약 정보</div>
      <div className="info">
        <div className="item">
          예약 횟수: ({userPass.totalReservations} / {userPass.pass.maxReservations})
        </div>
        <div className="item">
          취소 횟수: ({userPass.totalCancels} / {userPass.pass.maxCancels})
        </div>
      </div>

      <div className="title">결제 정보</div>
      <div className="info">
        <div className="item">결제일: {moment(userPass.createdAt).format('YYYY.MM.DD')}</div>
        <div className="item">결제 금액: {userPass.pass.price.toLocaleString()}원</div>
      </div>

      <div className="title">환불 규정</div>
      <div className="info">
        <div className="refund-item">{userPass.pass.refundPolicy}</div>
      </div>

      {isRefundButtonActive && (
        <button className="refund-button" onClick={onClickRefund}>
          환불 신청
        </button>
      )}
    </SMyPassDetail>
  );
};

export default MyPassDetail;

const useUserPass = (userPassId: UserPass['id']) => {
  return useQuery([`userPasses/${userPassId}`], () => PassService.getUserPass({ userPassId }));
};

export const SMyPassDetail = styled.div`
  padding: 12px;
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  margin-bottom: 104px;

  .title {
    font-size: 1.4rem;
    font-weight: 600;
    padding: 12px 0;
    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_400};
    color: ${(props) => props.theme.main_color_slate_500};
    display: flex;
  }

  .info {
    padding: 12px 0;
    font-size: 1.2rem;
    font-weight: 400;

    .item {
      padding: 4px 0;
    }

    .refund-item {
      padding: 4px 0;
      background-color: #ccc;
    }
  }

  .refund-button {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.main_color_slate_500};
    color: ${(props) => props.theme.main_color_slate_500};
    font-size: 1.6rem;
    font-weight: 700;
    margin-top: 24px;
  }
`;