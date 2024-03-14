import { Place } from './place';

export type Pass = {
  id: number;
  placeId: Place['id'];
  sortOrder: number;
  isShow: boolean;
  title: string;
  durationInDays: number;
  price: number;
  maxReservations: number | null;
  maxCancels: number | null;
  minCancelWindowHour: number;
  minCancelWindowMinute: number;
  notice: string;
  refundPolicy: string;
  createdAt: string;
};

export type PassDetail = Pass & {
  userHasPass: boolean;
  programs: {
    id: string;
    title: string;
  }[];
  place: {
    id: string;
    title: string;
    refundPolicy: string;
  };
};

export type UserPassStatus = 'IN_USE' | 'EXPIRED' | 'CANCELLED';
export type UserPass = {
  id: number;
  status: UserPassStatus;
  canReserve: boolean;
  canUserRefund: boolean;
  user: {
    name: string;
    phone: string;
  };
  programs: {
    id: string;
    title: string;
  }[];
  place: {
    id: string;
    title: string;
    refundPolicy: string;
  };
  pass: Pass;
  startDate: string;
  endDate: string;
  totalReservations: number;
  totalCancels: number;
  createdAt: string; // == 결제일
};
