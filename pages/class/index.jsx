import React from 'react';

import Layout from '@components/layout/Layout';
import Class from '@components/class/Class';
import MetaHeader from '@components/common/meta/MetaHeader';

import ProductService from '../../src/service/ProductService';

const Index = ({ studios }) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" />
      <Class studios={studios} />
    </Layout>
  );
};

export const getStaticProps = async (context) => {
  const { sort } = context.query || {};

  const res = await Promise.all([ProductService.getSpecialList(), ProductService.getStudios(sort)]);
  const studios = [];

  studios.push(res[0]); // Special 상품
  studios.push(res[1]?.newData || []); // Regular 업로드한지 2주 안지난 상품
  studios.push(res[1]?.oldData || []); // Regular 업로드한지 2주 지난 상품

  return {
    props: { studios },
    revalidate: 30,
  };
};

export default Index;
