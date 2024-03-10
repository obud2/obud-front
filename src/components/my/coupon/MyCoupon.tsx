import CouponItem from '@/components/common/coupon/Coupon';
import FallBackLoading from '@/components/loading/FallBackLoading';
import { CouponService } from '@/service/CouponService';
import { MOBILE } from '@/styled/variablesStyles';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const MyCoupon = () => {
  const { data: coupons } = useCoupons();

  if (!coupons) return <FallBackLoading isLoading />;

  return (
    <SMyCoupon>
      <div className="coupon-header">
        <div className="coupon-title">보유한 쿠폰</div>
      </div>
      <div className="coupon-list-container">
        {coupons.length === 0 && <div className="coupon-empty">보유한 쿠폰이 없습니다.</div>}
        {coupons.map((coupon) => (
          <CouponItem key={coupon.id} coupon={coupon} />
        ))}
      </div>
    </SMyCoupon>
  );
};

export default MyCoupon;

const useCoupons = () => {
  return useQuery('coupons/me', () => CouponService.listCoupons());
};

export const SMyCoupon = styled.div`
  width: 100%;
  margin-bottom: 104px;

  ${MOBILE} {
    margin-bottom: 0;
  }

  .coupon-header {
    width: 100%;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .coupon-title {
      font-size: 1.6rem;
      font-family: '400';

      color: ${(props) => props.theme.main_color_slate_500};

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }

  .coupon-list-container {
  }

  .coupon-empty {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.4rem;
    font-family: '400';

    margin-top: 20px;

    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
