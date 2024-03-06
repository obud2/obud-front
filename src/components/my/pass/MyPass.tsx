import FallBackLoading from '@/components/loading/FallBackLoading';
import { MOBILE } from '@/styled/variablesStyles';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { listUserPasses } from '@/service/PassService';
import UserPassItem from '@/components/common/pass/UserPass';

const MyPass = () => {
  const { data: userPasses } = useUserPasses();

  if (!userPasses) return <FallBackLoading isLoading />;

  return (
    <SMyPass>
      <div className="coupon-header">
        <div className="coupon-title">보유한 패스</div>
      </div>
      <div className="coupon-list-container">
        {userPasses.length === 0 && <div className="coupon-empty">보유한 쿠폰이 없습니다.</div>}
        {userPasses.map((userPass) => (
          <UserPassItem key={userPass.id} userPass={userPass} />
        ))}
      </div>
    </SMyPass>
  );
};

export default MyPass;

const useUserPasses = () => {
  return useQuery('userPasses/me', () => listUserPasses(), { select: (data) => data.value });
};

export const SMyPass = styled.div`
  width: 100%;
  margin-bottom: 104px;

  ${MOBILE} {
    margin-bottom: 0;
  }

  .coupon-header {
    width: 100%;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .coupon-title {
      font-size: 1.6rem;
      font-family: '400';

      color: ${(props) => props.theme.main_color_slate_500};

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }

  .coupon-list-container {
  }

  .coupon-empty {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.4rem;
    font-family: '400';

    margin-top: 20px;

    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
