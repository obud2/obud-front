import React from 'react';

import { APP_PREFIX, APP_URL, IMG_PATH } from 'src/constants';

import Layout from '../src/components/layout/Layout';
import Main from '@components/main/Main';

import BannerService from 'src/service/BannerService';
import MetaHeader from '@components/common/meta/MetaHeader';

export const Index = ({ banner }) => {
  return (
    <Layout headerPosition="absolute" scrollBtnHide>
      <MetaHeader title={APP_PREFIX} description="요가와 함꼐하는 웰니스 라이프" url={APP_URL} image={`${IMG_PATH}/obud_logo.png`} />
      <Main banner={banner} />
    </Layout>
  );
};

export default Index;

export const getStaticProps = async () => {
  const banner = await BannerService.info('main');

  return {
    props: {
      banner,
    },
    revalidate: 30,
  };
};
