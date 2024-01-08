import axiosInstance from '@/constants/AxiosInstance';
import { Coupon } from '@/entities/coupon';

type ListCouponsRequest = {
  page?: number;
  status?: 'PENDING' | 'IN_PROGRESS' | 'FINISHED' | '';
  name?: string;
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

  const response = await axiosInstance.get<ListCouponsResponse>(`/coupon/me?${searchParams.toString()}`);
  return response.data.value;

  // return [
  //   {
  //     id: '4f27a90e-67ff-4f9e-96d0-8c55b9050310',
  //     name: '쿠폰테스트3',
  //     code: null,
  //     userCoupons: [],
  //     issueType: 'TO_USER',
  //     discountType: 'AMOUNT',
  //     discountAmount: 10000,
  //     maxDiscountAmount: 10000,
  //     minOrderPriceAmount: 10000,
  //     allowDuplicatePerUser: false,
  //     startDate: '2024-01-07',
  //     endDate: '2024-01-07',
  //     placeAllowList: [],
  //     programAllowList: [],
  //     placeBlockList: [],
  //     programBlockList: [],
  //     createdAt: '2024-01-06T16:48:39.444Z',
  //     updatedAt: '2024-01-06T16:48:39.444Z',
  //   },
  //   {
  //     id: '509bdb60-2051-4de8-9dba-f202aef63383',
  //     name: '모든유저쿠폰2',
  //     code: null,
  //     issueType: 'TO_ALL_USERS',
  //     discountType: 'AMOUNT',
  //     discountAmount: 50,
  //     maxDiscountAmount: 500,
  //     minOrderPriceAmount: 5000,
  //     allowDuplicatePerUser: false,
  //     startDate: '2024-01-07',
  //     endDate: '2024-01-10',
  //     placeAllowList: [],
  //     programAllowList: [],
  //     placeBlockList: [],
  //     programBlockList: [],
  //     createdAt: '2024-01-06T15:55:40.524Z',
  //     updatedAt: '2024-01-06T15:55:40.524Z',
  //   },
  //   {
  //     id: '37bff535-05ac-4fea-b545-95aceea7e527',
  //     name: '모든유저쿠폰',
  //     code: 'CWEAT',
  //     userCoupons: [],
  //     issueType: 'BY_CODE',
  //     discountType: 'AMOUNT',
  //     discountAmount: 50,
  //     maxDiscountAmount: 500,
  //     minOrderPriceAmount: 500,
  //     allowDuplicatePerUser: false,
  //     startDate: '2024-01-07',
  //     endDate: '2024-01-07',
  //     placeAllowList: [],
  //     programAllowList: [],
  //     placeBlockList: [],
  //     programBlockList: [],
  //     createdAt: '2024-01-06T15:54:25.040Z',
  //     updatedAt: '2024-01-06T15:54:25.040Z',
  //   },
  //   {
  //     id: '2ee614ec-2fd6-49ef-896e-604a6f4f90b0',
  //     name: '테스트 쿠폰',
  //     code: '7QL6O',
  //     userCoupons: [],
  //     issueType: 'BY_CODE',
  //     discountType: 'AMOUNT',
  //     discountAmount: 0,
  //     maxDiscountAmount: 1000,
  //     minOrderPriceAmount: 10000,
  //     allowDuplicatePerUser: false,
  //     startDate: '2024-01-07',
  //     endDate: '2024-01-09',
  //     placeAllowList: [],
  //     programAllowList: [],
  //     placeBlockList: [],
  //     programBlockList: [],
  //     createdAt: '2024-01-06T15:49:05.127Z',
  //     updatedAt: '2024-01-06T15:49:05.127Z',
  //   },
  // ] as unknown as Coupon[];
};

type CreateCouponRequest = {
  code: string; // 영문대문자, 숫자5자리 고정
};

const createCoupon = async (request: CreateCouponRequest) => {
  const res = await axiosInstance.post(`/coupon/me?code=${request.code.toLocaleUpperCase()}`);

  if (res.status !== 200) {
    throw new Error('쿠폰 생성에 실패했습니다.');
  }
};

const CouponService = {
  listCoupons,
  createCoupon,
};

export default CouponService;
