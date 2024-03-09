import { PassService } from '@/service/PassService';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const PassDetail = () => {
  const router = useRouter();
  const { passId } = router.query;
  const id = Number(passId as string);

  const { data: passDetail } = usePass(id);

  if (!passDetail) return null;

  return (
    <SPassDetail>
      <div className="title">{passDetail.title}</div>
      <div className="info">
        <div className="info-title">적용 프로그램</div>
        {passDetail.programs.map((program) => (
          <div key={program.id} className="info-item">
            <div>{program.title}</div>
            <div className="pass-arrow-icon" />
          </div>
        ))}
        {passDetail.programs.length === 0 && <div className="info-item">적용 프로그램이 없습니다.</div>}
      </div>

      <div className="info">
        <div className="info-title">사용 기한</div>
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

      <div className="info">
        <div className="info-title">환불 규정</div>
        <div className="info-item">{passDetail.refundPolicy}</div>
      </div>

      <div className="button-wrapper">
        <button>구매하기</button>
      </div>
    </SPassDetail>
  );
};

const usePass = (passId: number) => {
  return useQuery(['pass', passId], () => PassService.getPassDetail({ passId }));
};

export default PassDetail;

const SPassDetail = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;

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
      display: flex;
      font-size: 1.2rem;
      font-weight: 400;
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
  }

  .button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    button {
      width: 100%;
      height: 48px;
      border-radius: 8px;
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: white;
      font-size: 1.6rem;
      font-weight: 700;
    }
  }
`;
