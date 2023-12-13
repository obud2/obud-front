import ClassByCategory from '@/components/class/ClassByCategory';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { CategoryMap, Studio } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { GetServerSidePropsContext } from 'next';

type Props = {
  categoryId: string;
  studios: Studio[];
};

const Index = ({ categoryId, studios }: Props) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={CategoryMap[categoryId]} mobileNavigationHide>
      <MetaHeader title={CategoryMap[categoryId]} />
      <ClassByCategory studios={studios} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const categoryId = context.query.id as string;

  const studios = await StudioService.getStudiosFromCategory(categoryId);

  return {
    props: {
      categoryId,
      studios,
    },
  };
};

export default Index;
