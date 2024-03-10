import { SBookingBase } from './BookingBase.styled';
import BookingItem from '../items/BookingItem';

const HEADER = ['상품정보', '날짜', '시간'];

const BookingBase = ({ subTitle, subDate, list }) => {
  return (
    <SBookingBase>
      <header className="booking-base-header">
        <p className="booking-sub-title">{subTitle || ''}</p>
        <p className="booking-sub-date">{subDate || ''}</p>
      </header>

      <ul className="booking-item-header-container">
        {HEADER?.map((item) => (
          <li key={`booking-header-item-${item}`} className="booking-header-item">
            {item}
          </li>
        ))}
      </ul>

      <ul className="booking-item-list-container">
        {list &&
          list?.length > 0 &&
          list?.map((item) => (
            <BookingItem
              key={`booking-item-key-${item?.id}`}
              lessonId={item?.lessonId}
              title={item?.lessonTitle || ''}
              studiosTitle={item?.studiosTitle || ''}
              date={item?.format?.date || ''}
              time={`${item?.format?.startTime}~${item?.format?.endTime}`}
              lecturer={item?.instructorName || ''}
              price={item?.price || ''}
              person={item?.reservationCount || ''}
              option={item?.payOption || ''}
              optionCount={item?.payOptionCount || ''}
            />
          ))}
      </ul>
    </SBookingBase>
  );
};

export default BookingBase;
