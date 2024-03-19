import { CouponDiscountType } from './coupon';

export type PaymentStatus = 'COMPLETE' | 'CANCEL';
export type MerchandiseType = 'ONE_TIME_RESERVATION' | 'PASS';
export type ReservationStatus = 'UPCOMING' | 'COMPLETED' | 'CANCELLED';

export type Reservation = {
  // '예약 번호'
  key: string;
  id: string;
  status: ReservationStatus;
  date: string;
  reserveAt: string;
  cancelAt: string | null;
  user: {
    id: string;
    name: string;
    phone: string;
  };
  images: {
    key: string;
    url: string;
  }[];
  place: {
    id: string;
    title: string;
  };
  program: {
    id: string;
    title: string;
  };
  schedule: {
    id: string;
    // 수업 시작시간. format: 2024-03-10T08:30
    startDate: string;
    // 수업 종료시간. format: 2024-03-10T09:30
    endDate: string;
  };
  reservationCount: number;
  payment: {
    // 주문 번호
    key: string;
    merchandiseType: MerchandiseType;
    // [패스 예약]
    pass?: {
      id: number;
      title: string;
    };
    // [단건 예약]
    // 결제 금액
    payAmount?: number;
    // 정가 금액
    totalAmount?: number;
    // 할인 금액 (쿠폰)
    discountAmount?: number;
    // 환불 금액
    cancelAmount?: number;
  };
};

export type Payment = {
  key: string;
  status: PaymentStatus;
  date: string;
  payAt: string;
  cancelAt: string | null;
  user: {
    id: string;
    name: string;
    phone: string;
  };
  merchandiseType: MerchandiseType;
  place: {
    id: string;
    title: string;
  };
  // 패스 결제의 경우
  pass?: {
    id: number;
    title: string;
  };
  // 단건 결제의 경우
  program?: {
    id: string;
    title: string;
  };
  reservationCount: number;
  // 결제 금액
  payAmount: number;
  // 정가 금액
  totalAmount: number;
  // 할인 금액 (쿠폰)
  discountAmount: number;
  coupon?: {
    name: string;
    discountType: CouponDiscountType;
    discountAmount: number;
  };
  // 환불 금액
  cancelAmount: number;
};
