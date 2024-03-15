import { useRouter } from 'next/router';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';

import My from '@components/my/My';
import { TABS } from '@components/my/My';

const Index = () => {
  const router = useRouter();
  const { type } = router.query;

  const tab = TABS.find((item) => item.id === type);
  const headerTitle = tab?.title || '';

  return (
    <Layout
      addonBeforeHeader={type !== 'order' ? 'backTic' : 'empty'}
      addonAfterHeader="empty"
      mobileNavigationHide={type !== 'order'}
      headerTitle={headerTitle}
    >
      <MetaHeader title="obud :: 마이페이지" />
      <My />
    </Layout>
  );
};

export default Index;
