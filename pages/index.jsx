import { APP_PREFIX, APP_URL, IMG_PATH } from 'src/constants';

import Layout from '../src/components/layout/Layout';
import Main from '@components/main/Main';
import MetaHeader from '@components/common/meta/MetaHeader';
import { info } from 'sass';

export const Home = ({ banner }) => {
  return (
    <Layout headerPosition="absolute" scrollBtnHide>
      <MetaHeader title={APP_PREFIX} description="웰니스 생활을 편리하게" url={APP_URL} image={`${IMG_PATH}/obud_logo_img.png`} />
      <Main banner={banner} />
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  const banner = await info('main');

  return {
    props: {
      banner,
    },
    revalidate: 30,
  };
};
