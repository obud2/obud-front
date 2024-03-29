import { useEffect } from 'react';

import { useRouter } from 'next/router';
import { loginCheck } from 'src/constants';

import BaseTab from '@components/base/BaseTab';
import TabPanel from '@components/tabPanel/TabPanel';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from '@/styled/variablesStyles';
import styled from 'styled-components';
import MyCoupon from './coupon/MyCoupon';
import MyEdit from './edit/MyEdit';
import MyOrder from './order/MyOrder';
import MyPass from './pass/MyPass';
import WishList from './wish/WishList';

export type TabType = {
  id: string;
  title: string;
};

export const TABS: TabType[] = [
  { id: 'pass', title: '패스 관리' },
  { id: 'order', title: '예약 내역' },
  { id: 'coupon', title: '나의 쿠폰' },
  { id: 'wish', title: '저장한 장소' },
  { id: 'edit', title: '프로필 수정' },
];

const My = () => {
  const router = useRouter();
  const { type } = router.query;

  useEffect(() => {
    if (!loginCheck()) router.push('/');
  }, []);

  const onChangeTabValue = (_: TabType['title'], data: TabType) => {
    router.push(`/my/${data?.id}`);
  };

  return (
    <SMy>
      <article className="obud-my-article">
        <section className="my-tab-container">
          <BaseTab tabs={TABS} value={type} onChange={onChangeTabValue} />
        </section>

        <section className="my-list-container">
          <TabPanel value={type} index="order">
            <MyOrder />
          </TabPanel>

          <TabPanel value={type} index="pass">
            <MyPass />
          </TabPanel>

          <TabPanel value={type} index="coupon">
            <MyCoupon />
          </TabPanel>

          <TabPanel value={type} index="edit">
            <MyEdit />
          </TabPanel>

          <TabPanel value={type} index="wish">
            <WishList />
          </TabPanel>
        </section>
      </article>
    </SMy>
  );
};

export default My;

const SMy = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 80px 15px 32px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    padding: 10px 15px 32px;
  }

  .obud-my-article {
    width: 100%;

    display: flex;
    padding-top: 40px;

    ${MOBILE} {
      flex-direction: column;
      padding-top: 0;
    }

    .my-tab-container {
      width: 17%;
      height: auto;

      ${TABLET} {
        width: 13%;
      }

      ${MOBILE} {
        width: 100%;
        margin-bottom: 24px;

        display: none;
      }
    }

    .my-list-container {
      width: 83%;
      height: auto;

      ${TABLET} {
        width: 87%;
      }

      ${MOBILE} {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
`;
