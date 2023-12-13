import ClassByCategory from '@/components/class/ClassByCategory';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { StudioSection } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { GetServerSidePropsContext } from 'next';

type Props = {
  studioSection: StudioSection;
};

const Index = ({ studioSection }: Props) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={studioSection.name} mobileNavigationHide>
      <MetaHeader title={studioSection.name} />
      <ClassByCategory studios={studioSection.studios} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const sectionId = context.query.id as string;

  const studioSections = await StudioService.getStudiosInAllSections();
  const studioSection = studioSections.find((section) => `${section.id}` === sectionId);

  return {
    props: {
      studioSection,
    },
  };
};

export default Index;
