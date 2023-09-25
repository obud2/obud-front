import React from 'react';

import ProductService from '../../src/service/ProductService';

import Layout from '@components/layout/Layout';
import Lesson from '@components/lesson/Lesson';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = ({ lesson }) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={lesson?.title || ''}>
      <MetaHeader title={lesson?.title || ''} description={lesson?.title || ''} image={lesson?.images?.[0]?.url || ''} />
      <Lesson lesson={lesson} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const lesson = await ProductService.getLesson(id);

  return {
    props: { lesson },
  };
};

export default Index;
