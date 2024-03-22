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
        <div className="item">{userPass.place.title}</div>
      </div>

      <div className="title">예약 가능 프로그램</div>
      <div className="info">
        {userPass.programs.map((program) => (
          <div className="item" key={program.id} style={{ cursor: 'pointer' }}>
            <div
              onClick={() => {
                router.push(`/lesson/${program.id}`);
              }}
            >
              {program.title}
            </div>
            <div className="pass-arrow-icon" />
          </div>
        ))}
      </div>

      <div className="title">유효 기간</div>
      <div className="info">
        <div className="item">시작일: {moment(userPass.startDate).format('YYYY.MM.DD')}</div>
        <div className="item">종료일: {moment(userPass.endDate).format('YYYY.MM.DD')}</div>
      </div>

      <div className="title">예약 정보</div>
      <div className="info">
        {userPass.pass.maxReservations !== null ? (
          <div className="item">
            예약 횟수: ({userPass.totalReservations} / {userPass.pass.maxReservations})
          </div>
        ) : (
          <div className="item">예약 횟수: ({userPass.totalReservations} / 무제한)</div>
        )}
        {userPass.pass.maxCancels !== null ? (
          <div className="item">
            취소 횟수: ({userPass.totalCancels} / {userPass.pass.maxCancels})
          </div>
        ) : (
          <div className="item">취소 횟수: ({userPass.totalCancels} / 무제한)</div>
        )}
      </div>

      <div className="title">결제 정보</div>
      <div className="info">
        <div className="item">결제일: {moment(userPass.createdAt).format('YYYY.MM.DD')}</div>
        <div className="item">결제 금액: {userPass.pass.price.toLocaleString()}원</div>
      </div>

      <div className="title">환불 규정</div>
      <div className="info">
        <div className="item">{'결제일 포함 5일 이내이며 미 예약 시 : 100% 환불\n'}</div>
        <div className="item" style={{ lineHeight: '1.6' }}>
          결제일로부터 6일 이후 혹은 예약 시 해당 장소에서 환불을 처리합니다. 장소의 내부 환불 규정에 따라 환불됩니다.
        </div>
        <div className="refund-item">
          <div style={{ marginBottom: '5px' }}>장소 내부 환불 규정</div>
          {userPass.pass.refundPolicy}
        </div>
      </div>

      {userPass.canUserRefund && (
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
    display: flex;
  }

  .info {
    padding: 12px 0;
    font-size: 1.2rem;
    font-weight: 400;

    .item {
      display: flex;
      align-items: center;
      padding: 4px 0;
    }

    .refund-item {
      background-color: #eeeff1;
      border-radius: 5px;
      padding: 10px;
      margin: 5px;
    }
  }

  .pass-arrow-icon {
    width: 6px;
    height: 6px;

    transform: rotate(45deg);
    border-top: 1px solid #565656;
    border-right: 1px solid #565656;

    margin-top: 5px;
    margin-left: 5px;
    top: -1px;
    position: relative;
  }

  .refund-button {
    width: 100%;
    height: 48px;
    background-color: white;
    border: 1px solid ${(props) => props.theme.main_color_slate_500};
    color: ${(props) => props.theme.main_color_slate_500};
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 24px;
  }
`;
