import { Place } from '@/entities/place';
import { listPasses } from '@/service/PassService';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

type Props = {
  placeId: Place['id'];
};

const PassList = ({ placeId }: Props) => {
  const router = useRouter();
  const { data: passes } = usePasses(placeId);

  return (
    <SPassList>
      <div className="banner">정규권과 원데이 클래스를 할인된 가격에 구매하세요!</div>
      {passes?.length === 0 && <div>패스가 없습니다.</div>}
      {passes?.map((pass) => (
        <div className="pass-item" key={pass.id} onClick={() => router.push(`/class/${placeId}/pass/${pass.id}`)}>
          <div>
            <div>{pass.title}</div>
            <div>{pass.price.toLocaleString()}원</div>
          </div>
          <div className="pass-arrow-icon" />
        </div>
      ))}
    </SPassList>
  );
};

const usePasses = (placeId: Place['id']) => {
  return useQuery(['passes', placeId], () => listPasses({ placeId }), { select: (data) => data?.value });
};

const SPassList = styled.div`
  width: 100%;
  margin-bottom: 104px;

  .banner {
    width: 100%;
    padding: 16px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 12px;

    font-size: 1.4rem;
    font-weight: 400;
    background: ${(props) => props.theme.main_color_slate_500};
    color: white;
  }

  .pass-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};
    margin-bottom: 8px;
  }

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

    /* background-color: #565656; */
  }
`;

export default PassList;
