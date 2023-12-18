import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { SectionWithItems, Studio } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import ClassV2 from '@components/class/ClassV2';

type Props = {
  specialStudios: Studio[];
  sectionWithItems: SectionWithItems[];
};

const Index = ({ specialStudios, sectionWithItems }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <ClassV2 specialStudios={specialStudios} sectionWithItems={sectionWithItems} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await Promise.all([StudioService.getSpecialList(), StudioService.getStudiosInAllSections()]);

  return {
    props: {
      specialStudios: res[0],
      sectionWithItems: res[1],
    },
  };
};

export default Index;
