import { Coupon } from '@/entities/coupon';
import moment from 'moment';
import styled from 'styled-components';

type Props = {
  coupon: Coupon;
  error?: string;
};

const CouponItem = ({ coupon, error }: Props) => {
  return (
    <SCoupon>
      {!!error && <div style={{ fontWeight: 600, color: 'red', marginBottom: 6, textAlign: 'start' }}>{error}</div>}
      <div className="coupon-item-title-wrapper">
        <span className="coupon-item-title">{coupon.name}</span>
        {coupon.maxDiscountAmount && <span className="coupon-item-max-discount">(최대 {coupon.maxDiscountAmount.toLocaleString()}원)</span>}
      </div>
      {!!coupon.minOrderPriceAmount && (
        <div className="coupon-item-min-order-price">최소 주문 금액: {coupon.minOrderPriceAmount.toLocaleString()}원</div>
      )}
      {coupon.endDate && <div className="coupon-item-date">{moment(coupon.endDate).format('YYYY.MM.DD')} 까지 적용 가능</div>}
    </SCoupon>
  );
};

export default CouponItem;

const SCoupon = styled.div`
  padding: 20px;
  margin-bottom: 16px;

  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);

  .coupon-item-title-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;

    .coupon-item-title {
      font-size: 1.6rem;
      font-weight: bold;
      color: ${(props) => props.theme.main_color_slate_500};
    }

    .coupon-item-max-discount {
      font-size: 1.2rem;
      font-weight: 400;
      color: ${(props) => props.theme.main_color_slate_400};
    }
  }

  .coupon-item-min-order-price {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 8px;
    line-height: 1.5;
    color: ${(props) => props.theme.main_color_slate_400};
  }
`;
