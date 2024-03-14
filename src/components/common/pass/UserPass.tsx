import { UserPass } from '@/entities/pass';
import styled from 'styled-components';
import moment from 'moment';
import { useRouter } from 'next/router';

type Props = {
  userPass: UserPass;
};

const UserPassItem = ({ userPass }: Props) => {
  const router = useRouter();

  const handleReservation = () => {
    router.push(`/class/${userPass.place.id}`);
  };

  const handleDetail = () => {
    router.push(`/my/pass/${userPass.id}`);
  };

  return (
    <SUserPass>
      <div className="pass-item-title-wrapper">
        <span className="pass-item-title">{userPass.pass.title}</span>
      </div>
      <div className="pass-item-description-wrapper">
        <div className="pass-item">{userPass.place.title}</div>
        <div className="pass-item">
          {moment(userPass.startDate).format('YYYY.MM.DD')} ~ {moment(userPass.endDate).format('YYYY.MM.DD')}
          {/* D-Day는  오늘날짜 기준으로 카운트한다 */}
          <span className="d-day">(D-{moment(userPass.endDate).diff(moment(), 'days') + 1})</span>
        </div>
        <div className="pass-item option">
          <span>
            예약 횟수: ({userPass.totalReservations} / {userPass.pass.maxReservations})
          </span>
          <span>
            취소 횟수: ({userPass.totalCancels} / {userPass.pass.maxCancels})
          </span>
        </div>
      </div>
      <div className="pass-button-wrapper">
        <button className="detail" onClick={handleDetail}>
          상세보기
        </button>
        {userPass.status === 'IN_USE' && <button onClick={handleReservation}>예약하기</button>}
      </div>
    </SUserPass>
  );
};

export default UserPassItem;

const SUserPass = styled.div`
  padding: 12px;
  margin-bottom: 16px;
  border-top: 1px solid #f5f5f5;

  .pass-item-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .pass-item-title {
      font-size: 1.6rem;
      font-weight: bold;
      color: ${(props) => props.theme.main_color_slate_500};
    }
  }

  .pass-item-description-wrapper {
    .pass-item {
      padding: 4px 0;
      font-size: 1.2rem;
      font-weight: 400;
      color: ${(props) => props.theme.main_color_slate_400};
      .d-day {
        padding: 0 4px;
      }
    }
    .option {
      font-size: 1.1rem;
      span {
        margin-right: 8px;
      }
    }
  }

  .pass-button-wrapper {
    display: flex;
    gap: 8px;
    margin-top: 12px;
    button {
      padding: 8px 16px;
      border-radius: 8px;
      background-color: ${(props) => props.theme.main_color_slate_500};
      color: white;
      font-size: 1.2rem;
      font-weight: 400;
      cursor: pointer;

      &.detail {
        background-color: white;
        color: ${(props) => props.theme.main_color_slate_500};
        border: 1px solid ${(props) => props.theme.main_color_slate_500};
      }
    }
  }

  .pass-item-min-order-price {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 8px;
    line-height: 1.5;
    color: ${(props) => props.theme.main_color_slate_400};
  }
`;
