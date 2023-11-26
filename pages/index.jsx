import { APP_PREFIX, APP_URL, IMG_PATH } from 'src/constants';

import Layout from '../src/components/layout/Layout';
import Main from '@components/main/Main-renewal';
import MetaHeader from '@components/common/meta/MetaHeader';

export const Home = () => {
  return (
    <Layout headerPosition="absolute" footerHide mobileNavigationHide headerHide scrollBtnHide>
      <MetaHeader title={APP_PREFIX} description="웰니스 생활을 편리하게" url={APP_URL} image={`${IMG_PATH}/site-renewal.png`} />
      <Main />
    </Layout>
  );
};

export default Home;

