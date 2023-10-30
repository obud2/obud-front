import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import StudioDetail from '@/components/studio/detail/StudioDetail';
import { Studio } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { GetServerSidePropsContext } from 'next';

type Props = {
  studio: Studio;
};

const Index = ({ studio }: Props) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={studio?.title || ''} mobileNavigationHide>
      <MetaHeader title={studio?.title || ''} description={studio?.title || ''} image={studio?.images?.[0]?.url || ''} />
      <StudioDetail studio={studio} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;
  const cookies = context?.req?.cookies;

  const studio = await StudioService.getStudio(id, cookies?.ID_OBUD_SES);

  return {
    props: { studio },
  };
};

export default Index;
