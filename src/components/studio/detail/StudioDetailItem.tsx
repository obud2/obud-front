import { SStudioDetailItem } from './StudioDetailItem.styled';
import CustomImage from '@components/common/image/CustomImage';
import { ObudImage } from '@/entities/studio';

type Props = {
  image: ObudImage;
};

const StudioDetailItem = ({ image }: Props) => {
  return (
    <SStudioDetailItem isActive>
      <div className="studio-item-images-container">
        <div className="studio-item-image">
          <CustomImage className="studio-image-1" src={image.url || ''} width={800} height={800} alt="studio-images" />
        </div>
      </div>
    </SStudioDetailItem>
  );
};

export default StudioDetailItem;
