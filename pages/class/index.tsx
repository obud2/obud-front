import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { Studio, StudioSection } from '@/entities/studio';
import StudioService from '@/service/StudioService';
import Class from '@components/class/Class';

type Props = {
  specialStudios: Studio[];
  sectionedStudios: StudioSection[];
};

const Index = ({ specialStudios, sectionedStudios }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <Class specialStudios={specialStudios} sectionedStudios={sectionedStudios} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await Promise.all([StudioService.getSpecialList(), StudioService.getStudiosInAllSections()]);

  return {
    props: {
      specialStudios: res[0],
      sectionedStudios: res[1],
    },
  };
};

export default Index;
