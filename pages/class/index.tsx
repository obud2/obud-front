import Class from '@/components/class/Class';
import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { Banner } from '@/entities/banner';
import { SectionWithItems } from '@/entities/studio';
import { listBanners } from '@/service/BannerService';
import { getStudiosInAllSections } from '@/service/StudioService';

type Props = {
  banners: Banner[];
  sectionWithItems: SectionWithItems[];
};

const Index = ({ banners, sectionWithItems }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <Class banners={banners} sectionWithItems={sectionWithItems} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await Promise.all([listBanners(), getStudiosInAllSections()]);

  return {
    props: {
      banners: res[0],
      sectionWithItems: res[1],
    },
  };
};

export default Index;
