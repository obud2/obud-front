import Layout from '@components/layout/Layout';
import Class from '@components/class/Class';
import MetaHeader from '@components/common/meta/MetaHeader';
import { getSpecialList, getStudios } from '@/service/StudioService';
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

type Studio = {
  isShow: boolean;
  updatedAt: number;
  category?: string[];
  lessonType?: 'Special';
  specialSort: number;
  createdAt: number;
  images: {
    name: string;
    size: number;
    type: string;
    upload: boolean;
    key: string;
    url: string;
  }[];
  id: string;
  createdBy: string;
  studiosId?: string;
  sortOrder: number;
  title: string;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { sort } = context.query || {};

  const res = await Promise.all([getSpecialList(), getStudios(sort)]);
  const studios: Studio[][] = [];

  studios.push(res[0] as Studio[]);
  studios.push(res[1] as Studio[]);

  return {
    props: { studios },
  };
};

export default Index;
