import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { Studio, StudioSection } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import ClassV2 from '@components/class/ClassV2';

type Props = {
  specialStudios: Studio[];
  sectionedStudios: StudioSection[];
};

const Index = ({ specialStudios, sectionedStudios }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <ClassV2 specialStudios={specialStudios} sectionedStudios={sectionedStudios} />
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await Promise.all([StudioService.getSpecialList(), StudioService.getStudiosInAllSections()]);

  return {
    props: {
      specialStudios: res[0],
      sectionedStudios: res[1],
    },
    revalidate: 15,
  };
};

export default Index;
