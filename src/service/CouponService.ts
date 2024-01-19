import axiosInstance from '@/constants/AxiosInstance';
import { Coupon } from '@/entities/coupon';

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

const CouponService = {
  listCoupons,
  createCoupon,
};

export default CouponService;
