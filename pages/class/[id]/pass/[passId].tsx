import Layout from '@/components/layout/Layout';
import PassDetail from '@/components/studio/detail/option/PassDetail';

const Index = () => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle="패스" mobileNavigationHide>
      <PassDetail />
    </Layout>
  );
};

export default Index;
