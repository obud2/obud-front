import axiosInstance from '@/constants/AxiosInstance';
import { Coupon, CouponDiscountType } from '@/entities/coupon';

type ListCouponsRequest = {
  page?: number;
  status?: 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | '';
  name?: string;
  scheduleId?: string;
};

type ListCouponsResponse = {
  value: Coupon[];
};

const listCoupons = async (request: ListCouponsRequest = {}) => {
  const searchParams = new URLSearchParams();

  if (request.page) {
    searchParams.set('page', request.page.toString());
  } else {
    searchParams.set('page', '1');
  }

  if (request.status) searchParams.set('status', request.status);
  if (request.name) searchParams.set('name', request.name);
  if (request.scheduleId) searchParams.set('scheduleId', request.scheduleId);

  const response = await axiosInstance.get<ListCouponsResponse>(`/coupon/me?${searchParams.toString()}`);
  return response.data.value;
};

type CreateCouponRequest = {
  code: string; // 영문대문자, 숫자5자리 고정
  scheduleId: string;
};

const createCoupon = async (request: CreateCouponRequest): Promise<Coupon> => {
  const { code, scheduleId } = request;
  const res = await axiosInstance.post<{ value: Coupon }>(`/coupon/me?code=${code.toLocaleUpperCase()}&scheduleId=${scheduleId}`);
  return res.data.value;
};

type GetCouponDiscountPriceRequest = {
  coupon: Coupon | null;
  price: number;
};

// 쿠폰 할인 금액 계산
const getCouponDiscountPrice = (request: GetCouponDiscountPriceRequest): number => {
  const { coupon, price } = request;

  if (!coupon || !price) return 0;

  if (coupon.minOrderPriceAmount > price) return 0;

  if (coupon.discountType === CouponDiscountType.AMOUNT) {
    if (coupon.maxDiscountAmount === 0) {
      return Math.min(coupon.discountAmount, price);
    }

    return Math.min(coupon.discountAmount, coupon.maxDiscountAmount, price);
  }

  if (coupon.discountType === CouponDiscountType.PERCENTAGE) {
    const discount = Math.round(price * (coupon.discountAmount / 100));
    if (coupon.maxDiscountAmount === 0) {
      return discount;
    }

    return Math.min(discount, coupon.maxDiscountAmount);
  }

  return 0;
};

// 쿠폰 할인 타입에 따른 메시지 표시
type GetCouponTypeMessageRequest = {
  coupon: Coupon | null;
};

const getCouponTypeMessage = (request: GetCouponTypeMessageRequest): string => {
  const { coupon } = request;

  if (!coupon) return '';

  if (coupon.discountType === CouponDiscountType.AMOUNT) {
    return `${coupon.discountAmount.toLocaleString()}원 할인`;
  }

  if (coupon.discountType === CouponDiscountType.PERCENTAGE) {
    return `${coupon.discountAmount}% 할인`;
  }

  return '';
};

type ListActiveCouponsRequest = {
  coupons?: Coupon[];
  price: number;
};

/**
 * 적용 가능한 쿠폰 리스트
 */
const listActiveCoupons = (request: ListActiveCouponsRequest): Coupon[] => {
  const { coupons = [], price } = request;

  return coupons.filter((it) => !!it.canBeApplied).filter((it) => price >= it.minOrderPriceAmount);
};

export const CouponService = {
  listCoupons,
  createCoupon,
  getCouponDiscountPrice,
  getCouponTypeMessage,
  listActiveCoupons,
};
