import { useRouter } from 'next/router';

import CustomImage from '@components/common/image/CustomImage';
import { SStudioItem } from './SectionStudioItem.styled';
import { SectionItem } from '@/entities/studio';

type Props = {
  studio: SectionItem;
};

const SectionStudioItem = ({ studio }: Props) => {
  const router = useRouter();

  const { id, name, images, addr, category, minPrice } = studio;

  const onClickStudioDetail = () => {
    router.push(`/class/${id}`);
  };

  return (
    <SStudioItem onClick={onClickStudioDetail} isActive={!!images?.[1]?.url}>
      <div className="studio-item-images-container">
        <div className="studio-item-image">
          <CustomImage className="studio-image-1" src={images?.[0]?.url || ''} width={800} height={800} alt="studio-images" />
        </div>
        {images?.[1]?.url && (
          <div className="studio-item-image">
            <CustomImage className="studio-image-2" src={images?.[1]?.url || ''} width={800} height={800} alt="studio-images" />
          </div>
        )}
      </div>

      <div className="studio-category-container">
        {category && Array.isArray(category) ? category.join(', ') : category}
        {` | ${addr?.split(' ').slice(0, 2).join(' ')}`}
      </div>

      <div className="studio-item-contents-container">
        <p className="studio-item-title">{name || ''}</p>
      </div>

      {minPrice && (
        <div className="studio-item-minprice-container">
          <p className="studio-item-title">{minPrice || ''}원</p>
        </div>
      )}
    </SStudioItem>
  );
};

export default SectionStudioItem;
