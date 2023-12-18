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
};

export enum StudioCategory {
  YOGA = '요가',
  TEA = '차',
  MEDITATION = '명상',
  ETC = '기타',
}

export const CategoryMap = {
  1: StudioCategory.YOGA,
  2: StudioCategory.TEA,
  3: StudioCategory.MEDITATION,
  4: StudioCategory.ETC,
};

export type Section = {
  id: number;
  name: string;
  order: number;
  isVisible: boolean;
  createdAt: string; // ex: "2023-12-11T05:15:22.275Z"
  updatedAt: string;
};

export type SectionOrderItem = {
  id: number;
  order: number;
};

export enum SectionItemType {
  // studios
  PLACE = 'PLACE',
  // lesson
  PROGRAM = 'PROGRAM',
}

export type SectionItem = {
  type: SectionItemType;
  id: string;
  name: string;
  images: { key: string; url: string }[];
  order: number;
  /// @deprecated use `address` instead
  addr?: string;
  address?: string;
};

export type SectionWithItems = {
  id: number; // Section Id;
  section: Section;
  items: SectionItem[];
};
