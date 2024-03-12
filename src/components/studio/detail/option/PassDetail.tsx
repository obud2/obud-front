import { PassService } from '@/service/PassService';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import alert from '@/helpers/alert';

const PassDetail = () => {
  const router = useRouter();
  const { passId } = router.query;
  const id = Number(passId as string);

  const { data: passDetail } = usePass(id);
  const { data: userPasses } = useUserPasses();

  const handlePurchase = () => {
    if (!passDetail || !userPasses) return;

    if (userPasses.find((userPass) => userPass.pass.id === passDetail.id)) {
      alert('', '이미 해당 프로그램의 패스를 보유하고 있습니다.\n마이페이지 > 나의 패스를 확인해 주세요.');
      return;
    }

    router.push(`/purchase/pass/${passDetail.id}`);
  };

  if (!passDetail) return null;

  return (
    <SPassDetail>
      <div className="title">{passDetail.title}</div>
      <div className="info">
        <div className="info-title">적용 프로그램</div>
        {passDetail.programs.map((program) => (
          <div
            key={program.id}
            className="info-item info-clickable"
            onClick={() => {
              router.push(`/lesson/${program.id}`);
            }}
          >
            <div>{program.title}</div>
            <div className="pass-arrow-icon" />
          </div>
        ))}
        {passDetail.programs.length === 0 && <div className="info-item">적용 프로그램이 없습니다.</div>}
      </div>

      <div className="info">
        <div className="info-title">이용 기한</div>
        <div className="info-item">{passDetail.durationInDays}일</div>
      </div>

      <div className="info">
        <div className="info-title">예약 가능 횟수</div>
        <div className="info-item">{passDetail.maxReservations}회</div>
      </div>

      <div className="info">
        <div className="info-title">가격</div>
        <div className="info-item">{passDetail.price.toLocaleString()}원</div>
      </div>

      <div className="info">
        <div className="info-title">유의사항</div>
        <div className="info-item">{passDetail.notice}</div>
      </div>

      {/* <div className="info">
        <div className="info-title">환불 규정</div>
        <div className="info-item">
          <span style={{ color: 'red' }}>결제일</span>
          <span>{'로부터 5일 이내이며 미 예약 시 : 100% 환불\n'}</span>
          <span style={{ color: 'red' }}>결제일</span>
          <span>{'로부터 5일 이후 혹은 예약 시 '}</span>
          <span style={{ fontWeight: 'bold' }}>해당 장소(스튜디오)의 내규에 따라 위약금 차감 후 환불됩니다.</span>
        </div>
        {passDetail.refundPolicy && <div className="refund-info-item">{passDetail.refundPolicy}</div>}
      </div> */}

      <div className="button-wrapper">
        <button onClick={handlePurchase}>구매하기</button>
      </div>
    </SPassDetail>
  );
};

const usePass = (passId: number) => {
  return useQuery(['pass', passId], () => PassService.getPassDetail({ passId }));
};

const useUserPasses = () => {
  return useQuery('userPasses', () => PassService.listUserPasses({ status: 'IN_USE' }), { select: (data) => data?.value });
};

export default PassDetail;

const SPassDetail = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
  height: 100%;
  padding: 40px 16px 16px 16px;

  .title {
    font-size: 1.6rem;
    font-weight: 600;

    color: ${(props) => props.theme.main_color_slate_500};
  }

  .info {
    padding: 8px 0;
    margin-top: 16px;
    .info-title {
      font-size: 1.4rem;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .info-item {
      white-space: pre-wrap;
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.4;
      color: ${(props) => props.theme.main_color_slate_400};

      .pass-arrow-icon {
        width: 6px;
        height: 6px;

        transform: rotate(45deg);
        border-top: 1px solid #565656;
        border-right: 1px solid #565656;

        margin-top: 3px;
        margin-left: 5px;
        top: -1px;
        position: relative;
      }
    }

    .refund-info-item {
      white-space: pre-wrap;
      font-size: 1.2rem;
      font-weight: 400;
      background-color: #eeeff1;
      border-radius: 5px;
      margin-top: 10px;
      padding: 5px;
    }
    .info-clickable {
      display: flex;
      align-items: center;
    }
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    button {
      width: 100%;
      height: 48px;
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: white;
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;
