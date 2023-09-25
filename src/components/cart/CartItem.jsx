import React from 'react';

import { SCartItem } from './CartItem.styled';

import BookingItem from '@components/booking/items/BookingItem';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';

const CartItem = ({ id, item, isChecked, status, onClick }) => {
  return (
    <SCartItem>
      <div className="cart-select-container">
        <CustomCheckBox value={isChecked} onClick={(e) => onClick(id, e)} />
      </div>

      <BookingItem
        lessonId={item?.lessonId}
        images={item?.lessonImages?.[0]?.url || ''}
        title={item?.lessonTitle || ''}
        studiosTitle={item?.studiosTitle || ''}
        date={item?.format?.date || ''}
        time={`${item?.format?.startTime}~${item?.format?.endTime}`}
        lecturer={item?.instructorName || ''}
        price={item?.price || ''}
        person={item?.reservationCount || ''}
        option={item?.payOption || ''}
        optionCount={item?.payOptionCount || ''}
        disabled={status === 'impossible'}
      />

      <div className="cart-note-container">{status === 'impossible' && <div className="item-impossible">품절</div>}</div>
    </SCartItem>
  );
};

export default CartItem;
