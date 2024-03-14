import Chip from '@/components/common/chip/Chip';
import UserPassItem from '@/components/common/pass/UserPass';
import FallBackLoading from '@/components/loading/FallBackLoading';
import { UserPassStatus } from '@/entities/pass';
import { PassService } from '@/service/PassService';
import { MOBILE } from '@/styled/variablesStyles';
import { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const MyPass = () => {
  const [status, setStatus] = useState<UserPassStatus>('IN_USE');

  const { data: userPasses } = useUserPasses(status);

  if (!userPasses) return <FallBackLoading isLoading />;

  return (
    <SMyPass>
      <div className="coupon-header">
        <div className="coupon-title">보유한 패스</div>
      </div>
      <div className="coupon-description">
        <Chip style={{ background: status === 'IN_USE' ? '#F5F5F5' : 'white' }} label="사용중" onClick={() => setStatus('IN_USE')} />
        <Chip style={{ background: status === 'EXPIRED' ? '#F5F5F5' : 'white' }} label="만료" onClick={() => setStatus('EXPIRED')} />
        <Chip style={{ background: status === 'CANCELLED' ? '#F5F5F5' : 'white' }} label="해지" onClick={() => setStatus('CANCELLED')} />
      </div>
      <div className="coupon-list-container">
        {userPasses.length === 0 && <div className="coupon-empty">보유한 패스가 없습니다.</div>}
        {userPasses.map((userPass) => (
          <UserPassItem key={userPass.id} userPass={userPass} />
        ))}
      </div>
    </SMyPass>
  );
};

export default MyPass;

const useUserPasses = (status: UserPassStatus) => {
  return useQuery(['userPasses/me', status], () => PassService.listUserPasses({ status }), { select: (data) => data.value });
};

export const SMyPass = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
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

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }

  .coupon-description {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
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

    margin-top: 40px;
  }
`;
