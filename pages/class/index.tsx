import Layout from '@components/layout/Layout';
import Class from '@components/class/Class';
import MetaHeader from '@components/common/meta/MetaHeader';
import ProductService from '@/service/ProductService';
import { GetServerSidePropsContext } from 'next';
import { IMG_PATH } from 'src/constants';

const Index = ({ studios }: any) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <Class studios={studios} />
    </Layout>
  );
};

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const { sort } = context.query || {};

  const res = await Promise.all([ProductService.getSpecialList(), ProductService.getStudios(sort)]);
  const studios = [];

  studios.push(res[0]); // Special 상품
  studios.push(res[1] || []); // Regular 업로드한지 2주 안지난 상품
  // studios.push(res[1]?.oldData || []); // Regular 업로드한지 2주 지난 상품

  return {
    props: { studios },
    revalidate: 30,
  };
};

export default Index;
