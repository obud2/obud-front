import React from 'react';

import ProductService from 'src/service/ProductService';

import Layout from '@components/layout/Layout';
import StudioDetail from '@components/studio/detail/StudioDetail';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = ({ studio }) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={studio?.title || ''} mobileNavigationHide>
      <MetaHeader title={studio?.title || ''} description={studio?.title || ''} image={studio?.images?.[0]?.url || ''} />
      <StudioDetail studio={studio} />
    </Layout>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const cookies = context?.req?.cookies;

  const studio = await ProductService.getStudio(id, cookies?.ID_OBUD_SES);

  return {
    props: { studio },
  };
};

export default Index;
