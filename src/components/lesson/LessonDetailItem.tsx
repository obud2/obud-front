import CustomImage from '@/components/common/image/CustomImage';
import { ObudImage } from '@/entities/common';
import { SLessonDetailItem } from './LessonDetailItem.styled';

type Props = {
  image: ObudImage;
};

const LessonDetailItem = ({ image }: Props) => {
  return (
    <SLessonDetailItem isActive>
      <div className="lesson-item-images-container">
        <div className="lesson-item-image">
          <CustomImage className="lesson-image-1" src={image.url || ''} width={800} height={800} alt="studio-images" />
        </div>
      </div>
    </SLessonDetailItem>
  );
};

export default LessonDetailItem;
