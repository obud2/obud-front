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
  lessonType?: string;
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

export enum StudioCategory {
  YOGA = '요가',
  PILATES = '필라테스',
  TEA = '차',
  ETC = '기타',
}

export const CategoryMap = {
  1: StudioCategory.YOGA,
  2: StudioCategory.PILATES,
  3: StudioCategory.TEA,
  4: StudioCategory.ETC,
};
