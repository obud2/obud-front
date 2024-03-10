import Layout from '@components/layout/Layout';
import Search from '@/components/search/Search';
import MetaHeader from '@components/common/meta/MetaHeader';

const Index = () => {
  return (
    <Layout headerHide footerHide>
      <MetaHeader title="obud :: 검색" />
      <Search />
    </Layout>
  );
};

export default Index;
