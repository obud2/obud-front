import { useRouter } from 'next/router';

import CustomImage from '@components/common/image/CustomImage';
import { SStudioItem } from './SectionStudioItem.styled';
import { Banner } from '@/entities/banner';

type Props = {
  banner: Banner;
};

const BannerItem = ({ banner }: Props) => {
  const router = useRouter();

  const { id, name, imageUrl } = banner;

  const handleDetail = () => {
    router.push(`/class/${id}`);
  };

  return (
    <SStudioItem onClick={handleDetail} isActive={!!imageUrl}>
      <div className="studio-item-images-container">
        <div className="studio-item-image">
          <CustomImage className="studio-image-1" src={imageUrl} width={800} height={800} alt="studio-images" />
        </div>
      </div>

      <div className="studio-item-contents-container">
        <p className="studio-item-title">{name || ''}</p>
      </div>
    </SStudioItem>
  );
};

export default BannerItem;
