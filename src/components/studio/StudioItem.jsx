import React from 'react';

import { useRouter } from 'next/router';

import { SStudioItem } from './StudioItem.styled';
import CustomImage from '@components/common/image/CustomImage';

const StudioItem = ({ id, images, title, category, lessonType, addr }) => {
  const router = useRouter();

  const onClickStudioDetail = () => {
    if (lessonType === 'Special') {
      router.push(`/lesson/${id}`);
    } else {
      router.push(`/class/${id}`);
    }
  };

  const addrRender = (data) => {
    const temp = data?.split(' ');

    return `${temp?.[0] || ''} ${temp?.[1] || ''} `;
  };

  return (
    <SStudioItem onClick={onClickStudioDetail} isActive={images?.[1]?.url}>
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
        {category?.length > 0 && category.join(', ')}
        {lessonType !== 'Special' && ' | ' + addrRender(addr || '')}
      </div>

      <div className="studio-item-contents-container">
        <p className="studio-item-title">{title || ''}</p>
      </div>
    </SStudioItem>
  );
};

export default StudioItem;
