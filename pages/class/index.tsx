import MetaHeader from '@/components/common/meta/MetaHeader';
import Layout from '@/components/layout/Layout';
import { IMG_PATH } from '@/constants';
import { Banner } from '@/entities/banner';
import { SectionWithItems } from '@/entities/studio';
import BannerService from '@/service/BannerService';
import StudioService from '@/service/StudioService';
import ClassV2 from '@components/class/ClassV2';

type Props = {
  banners: Banner[];
  sectionWithItems: SectionWithItems[];
};

const Index = ({ banners, sectionWithItems }: Props) => {
  return (
    <Layout>
      <MetaHeader title="obud :: class" image={`${IMG_PATH}/obud_logo_img.png`} />
      <ClassV2 banners={banners} sectionWithItems={sectionWithItems} />
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const res = await Promise.all([BannerService.listBanners(), StudioService.getStudiosInAllSections()]);

  return {
    props: {
      banners: res[0],
      sectionWithItems: res[1],
    },
  };
};

export default Index;
