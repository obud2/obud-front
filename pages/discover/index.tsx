import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import Discover from '@/components/discover/Discover';

const Index = () => {
  return (
    <Layout footerHide>
      <MetaHeader title="obud :: 검색" />
      <Discover />
    </Layout>
  );
};

export default Index;
