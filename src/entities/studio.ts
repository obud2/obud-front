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

// TODO: Image Name 이름을 조금 더 General하게 바꿀 수도 있음.
export type ObudImage = {
  key: string;
  name: string;
  size: number;
  type: string;
  upload: boolean;
  url: string;
};

export type StudioRefund = {
  day: number;
  id: string;
  percent: number; // 50 for 50%
  studiosId: string;
};
