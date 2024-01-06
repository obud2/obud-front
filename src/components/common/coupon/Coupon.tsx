import { Coupon } from '@/entities/coupon';
import moment from 'moment';
import styled from 'styled-components';

type Props = {
  coupon: Coupon;
};

const CouponItem = ({ coupon }: Props) => {
  return (
    <SCoupon>
      <div className="coupon-item-header">
        <div className="coupon-item-title-wrapper">
          <span className="coupon-item-title">{coupon.name}</span>
          {coupon.maxDiscountAmount && (
            <span className="coupon-item-max-discount">(최대 {coupon.maxDiscountAmount.toLocaleString()}원)</span>
          )}
        </div>
        {coupon.minOrderPriceAmount && (
          <div className="coupon-item-min-order-price">최소 주문 금액: {coupon.minOrderPriceAmount.toLocaleString()}원</div>
        )}
        {coupon.endDate && <div className="coupon-item-date">{moment(coupon.endDate).format('YYYY.MM.DD')} 까지 적용 가능</div>}
      </div>
    </SCoupon>
  );
};

export default CouponItem;

const SCoupon = styled.div``;
