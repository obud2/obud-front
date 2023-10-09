import ProductService from '@/service/ProductService';

import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import LessonDetail from '@/components/lesson/LessonDetail';
import { Lesson } from '@/entities/lesson';
import { GetServerSidePropsContext } from 'next';

type Props = {
  lesson: Lesson;
};

const Index = ({ lesson }: Props) => {
  return (
    <Layout addonBeforeHeader="backTicWithHome" headerTitle={lesson?.title || ''}>
      <MetaHeader title={lesson?.title || ''} description={lesson?.title || ''} image={lesson?.images?.[0]?.url || ''} />
      <LessonDetail lesson={lesson} />
    </Layout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  const lesson = await ProductService.getLesson(id);

  return {
    props: { lesson },
  };
};

export default Index;
