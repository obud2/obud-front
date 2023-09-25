import React from 'react';

import { SWishItem } from './WishItem.styled';
import StudioItem from '@components/studio/StudioItem';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';

const WishItem = ({ id, item, isEdit, onEdit, disabled }) => {
  return (
    <SWishItem>
      {isEdit && (
        <div className="wish-edit-active">
          <div className="wish-check-item-container">
            <CustomCheckBox onClick={() => onEdit(id)} />
          </div>
        </div>
      )}

      {disabled && <div className="wish-disabled" />}

      <StudioItem
        id={item?.id || ''}
        images={item?.images || []}
        title={item?.title || ''}
        category={item?.category || ''}
        lessonType={item?.lessonType || ''}
        addr={item?.addr || ''}
      />
    </SWishItem>
  );
};

export default WishItem;
