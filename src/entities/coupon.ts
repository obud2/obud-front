// Admin의 Coupon과는 다르다
export type Coupon = {
  id: string;
  couponId: string;
  name: string;
  discountType: CouponDiscountType;
  discountAmount: number;
  maxDiscountAmount: number;
  minOrderPriceAmount: number;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export enum CouponIssueType {
  BY_CODE = 'BY_CODE',
  TO_USER = 'TO_USER',
  TO_ALL_USERS = 'TO_ALL_USERS',
  WHEN_SIGNUP = 'WHEN_SIGNUP',
}

export enum CouponDiscountType {
  PERCENTAGE = 'PERCENTAGE',
  AMOUNT = 'AMOUNT',
}
