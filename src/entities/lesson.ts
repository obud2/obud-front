import { ObudImage } from './common';
import { Studio } from './studio';

export type Lesson = {
  contents: string;
  createdAt: number;
  createdBy: string; // "Admin"
  createdID: string; // uuid
  createdIP: string; // csv format
  id: string; // uuid
  images: ObudImage[];
  isShow: boolean;
  lessonType: string; // "Regular"
  sortOrder: number;
  specialSort: number;
  status: string; // "ENABLED"
  studios: Studio;
  studiosId: Studio['id'];
  title: string;
  updatedAt: number;
  updatedBy: string; // "오붓"
  updatedID: string; // uuid
  updatedIP: string; // csv format
  viewCnt: number;
  minPrice: number;
  maxPrice: number;
  isSoldOut: boolean;
};
