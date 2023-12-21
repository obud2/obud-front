import ClassBySection from '@/components/class/ClassBySection';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { SectionWithItems } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { GetServerSidePropsContext } from 'next';

type Props = {
  sectionWithItems: SectionWithItems;
};

const Index = ({ sectionWithItems }: Props) => {
  const section = sectionWithItems.section;

  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={section.name} mobileNavigationHide>
      <MetaHeader title={section.name} />
      <ClassBySection sectionWithItems={sectionWithItems} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const sectionId = context.query.id as string;

  const studioSections = await StudioService.getStudiosInAllSections();
  const sectionWithItems = studioSections.find((section) => `${section.section.id}` === `${sectionId}`);

  return {
    props: {
      sectionWithItems,
    },
  };
};

export default Index;
