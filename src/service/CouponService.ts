import axiosInstance from '@/constants/AxiosInstance';
import { Coupon } from '@/entities/coupon';

type ListCouponsRequest = {
  page?: number;
  status?: 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | '';
  name?: string;
};

type ListCouponsResponse = {
  value: {
    data: Coupon[];
    meta: {
      total: number;
      page: number;
      lastPage: number;
    };
  };
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

  const response = await axiosInstance.get<ListCouponsResponse>(`/coupon/me?${searchParams.toString()}`);
  return response.data.value.data;
};

type CreateCouponRequest = {
  code: string; // 영문대문자, 숫자5자리 고정
};

const createCoupon = async (request: CreateCouponRequest) => {
  await axiosInstance.post(`/coupon/me?code=${request.code}`);
};

const CouponService = {
  listCoupons,
  createCoupon,
};

export default CouponService;
