import MetaHeader from '@components/common/meta/MetaHeader';
import Layout from '@components/layout/Layout';
import dynamic from 'next/dynamic';

const MobileMy = dynamic(() => import('@components/my/MobileMy'), { ssr: false });

const Index = () => {
  return (
    <Layout>
      <MetaHeader title="obud :: 마이페이지" />
      <MobileMy />
    </Layout>
  );
};

export default Index;
