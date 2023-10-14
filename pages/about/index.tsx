import About from '@/components/about/About';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from 'src/constants';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="About" mobileNavigationHide>
      <MetaHeader title="obud :: about" image={`${IMG_PATH}/obud_logo_img.png`} />
      <About />
    </Layout>
  );
};

export default Index;
