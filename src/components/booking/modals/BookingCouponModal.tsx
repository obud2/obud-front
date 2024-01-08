import CustomButton from '@/components/common/button/CustomButton';
import CouponItem from '@/components/common/coupon/Coupon';
import Modal from '@/components/common/modal/Modal';
import FallBackLoading from '@/components/loading/FallBackLoading';
import { Coupon } from '@/entities/coupon';
import CouponService from '@/service/CouponService';
import { useQuery } from 'react-query';
import styled from 'styled-components';

type Props = {
  open: boolean;
  onClose: () => void;
  setCoupon: (coupon: Coupon) => void;
};

const BookingCouponModal = ({ open, onClose, setCoupon }: Props) => {
  const { data: coupons } = useCoupons();

  if (!coupons) return <FallBackLoading isLoading />;

  return (
    <Modal open={open} close={onClose} ref={{} as any}>
      <Wrapper>
        <header className="coupon-header">
          <div className="coupon-title">보유한 쿠폰</div>
        </header>
        <div className="coupon-list-container">
          {coupons.length === 0 && <div className="coupon-empty">보유한 쿠폰이 없습니다.</div>}
          {coupons.map((coupon) => (
            <div
              key={coupon.id}
              onClick={() => {
                setCoupon(coupon);
                onClose();
              }}
            >
              <CouponItem coupon={coupon} />
            </div>
          ))}
        </div>
        <footer className="coupon-footer">
          <CustomButton fullWidth variant="outlined" onClick={onClose}>
            닫기
          </CustomButton>
        </footer>
      </Wrapper>
    </Modal>
  );
};

const useCoupons = () => {
  return useQuery('coupons/me', () => CouponService.listCoupons());
};

export default BookingCouponModal;

const Wrapper = styled.div`
  position: relative;
  padding: 16px;
  max-height: 70vh;
  overflow-y: auto;

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

  .coupon-list-container {
    max-height: 80vh;
    overflow-y: auto;
  }

  .coupon-empty {
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 1.4rem;
    font-family: 400;

    margin: 20px 0;

    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
