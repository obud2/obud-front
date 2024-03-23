// studio / lesson is deprecated
// use place / program instead

export type Place = {
  id: string;
  status: string;
  title: string;
  content: string;
  studioCategoryId: number;
  address?: string;
  addressDetail?: string;
  category: any;
  convenience: any;
  homepage: string;
  images: any;
  information: string;
  isShow: boolean;
  parking: boolean;
  parkingInfo: string;
  refundPolicy: string;
  serviceCenter: string;
  sortOrder: number;
  wishCount: number;
  viewCount: number;
  latitude: number;
  longitude: number;
};
