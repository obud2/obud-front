import { ObudImage } from './common';

export type Studio = {
  addr: string;
  addrDetail: string;
  category: string[];
  contents: string;
  convenience: string[];
  createdAt: number;
  createdBy: string;
  createdID: string;
  createdIP: string; // csv format
  homepage: string; // url
  id: string; // uuid
  images: ObudImage[];
  information: string;
  isShow: boolean;
  parking: string; // "true" | "false"
  parkingInfo: string;
  refund: StudioRefund[];
  refundPolicy: string;
  serviceCenter: string; // tel
  sortOrder: number;
  status: string; // "ENABLE"
  title: string;
  updatedAt: number;
  updatedBy: string;
  updatedID: string;
  updatedIP: string;
  viewCnt: number;
  wishCount: number;
  wishInfo: any; // TODO:
};

export type StudioRefund = {
  day: number;
  id: string;
  percent: number; // 50 for 50%
  studiosId: string;
};

export type StudioSection = {
  id: number;
  name: string;
  order: number;
  studios: Studio[];
}
