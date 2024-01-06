import CouponItem from '@/components/common/coupon/Coupon';
import FallBackLoading from '@/components/loading/FallBackLoading';
import CouponService from '@/service/CouponService';
import { MOBILE } from '@/styled/variablesStyles';
import { useQuery } from 'react-query';
import styled from 'styled-components';

const MyCoupon = () => {
  const { data: coupons, isLoading } = useCoupons();

  // const coupons: Partial<Coupon>[] = [
  //   {
  //     id: '1',
  //     name: '할인쿠폰',
  //     issueType: CouponIssueType.BY_CODE,
  //     discountType: CouponDiscountType.AMOUNT,
  //     discountAmount: 1000,
  //     maxDiscountAmount: 10000,
  //     minOrderPriceAmount: 10000,
  //     endDate: '2021-10-10',
  //   },
  // ];

  return (
    <>
      <SMyCoupon>
        <div className="coupon-header">
          <div className="coupon-title">보유한 쿠폰</div>
        </div>
        <div className="coupon-list-container">
          {coupons?.map((coupon) => (
            <CouponItem key={coupon.id} coupon={coupon} />
          ))}
        </div>
      </SMyCoupon>
      <FallBackLoading isLoading={isLoading} />
    </>
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
      font-family: 400;

      color: ${(props) => props.theme.main_color_slate_500};

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }
`;
