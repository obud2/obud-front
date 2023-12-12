import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { Studio } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import { GetServerSidePropsContext } from 'next';
import ClassV2 from '@components/class/ClassV2';

type Props = {
  studios: Studio[][];
};

const Index = ({ studios }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <ClassV2 studios={studios} />
    </Layout>
  );
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const { sort } = context.query || {};

  const res = await Promise.all([StudioService.getSpecialList(), StudioService.getStudios(sort)]);
  const studios: Studio[][] = [];

  studios.push(res[0]); // Special 상품
  studios.push(res[1] || []); // Regular 업로드한지 2주 안지난 상품

  return {
    props: { studios },
    revalidate: 15,
  };
};

export default Index;
