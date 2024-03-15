import React from 'react';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import PurchasePass from '@/components/purchase/PurchasePass';
import { Pass } from '@/entities/pass';
import { GetServerSidePropsContext } from 'next';

type Props = {
  passId: Pass['id'];
};

const Index = ({ passId }: Props) => {
  return (
    <Layout scrollBtnHide addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="패스 구매" mobileNavigationHide>
      <MetaHeader title="obud :: 패스 구매" />
      <PurchasePass passId={passId} />
    </Layout>
  );
};

export default Index;

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const passId = Number(query.passId ?? '0');

  return {
    props: {
      passId,
    },
  };
};
