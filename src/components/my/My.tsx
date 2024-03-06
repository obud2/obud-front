import React, { useEffect } from 'react';

import { useRouter } from 'next/router';
import { loginCheck } from 'src/constants';

import { SMy } from './My.styled';

import BaseTab from '@components/base/BaseTab';
import TabPanel from '@components/tabPanel/TabPanel';

import MyEdit from './edit/MyEdit';
import WishList from './wish/WishList';
import MyOrder from './order/MyOrder';
import MyCoupon from './coupon/MyCoupon';
import MyPass from './pass/MyPass';

type TabType = {
  id: string;
  title: string;
};

export const TAB: TabType[] = [
  { id: 'pass', title: '패스 관리' },
  { id: 'coupon', title: '쿠폰 관리' },
  { id: 'order', title: '예약 내역' },
  { id: 'wish', title: '위시 리스트' },
  { id: 'edit', title: '프로필 수정' },
];

const My = () => {
  const router = useRouter();

  const { type } = router.query;

  useEffect(() => {
    if (!loginCheck()) {
      router.push('/');
    }
  }, []);

  const onChangeTabValue = (_: TabType['title'], data: TabType) => {
    router.push(`/my/${data?.id}`);
  };

  return (
    <SMy>
      <article className="obud-my-article">
        <section className="my-tab-container">
          <BaseTab tabs={TAB} value={type} onChange={onChangeTabValue} />
        </section>

        <section className="my-list-container">
          <TabPanel value={type} index="pass">
            <MyPass />
          </TabPanel>

          <TabPanel value={type} index="coupon">
            <MyCoupon />
          </TabPanel>

          <TabPanel value={type} index="order">
            <MyOrder />
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
