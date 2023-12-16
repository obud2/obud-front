import MetaHeader from '@components/common/meta/MetaHeader';
import Layout from '@components/layout/Layout';
import MobileMy from '@components/my/MobileMy';

const Index = () => {
  return (
    <Layout>
      <MetaHeader title="obud :: 마이페이지" />
      <MobileMy />
    </Layout>
  );
};

export default Index;
