import About from '@/components/about/About';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="About us" mobileNavigationHide>
      <MetaHeader title="obud :: about us" />
      <About />
    </Layout>
  );
};

export default Index;
