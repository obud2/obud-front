import axiosInstance from '@/constants/AxiosInstance';
import { Pass, PassDetail, UserPass, UserPassStatus } from '@/entities/pass';
import { Place } from '@/entities/place';

type ListPassesRequest = {
  placeId: Place['id'];
};

type ListPassesResponse = {
  value: Pass[];
};

const listPasses = async (request: ListPassesRequest): Promise<ListPassesResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('placeId', request.placeId);

  const response = await axiosInstance.get<ListPassesResponse>(`/pass?${searchParams.toString()}`);
  return response.data;
};

type GetPassDetailRequest = {
  passId: Pass['id'];
};

const getPassDetail = async (request: GetPassDetailRequest): Promise<PassDetail> => {
  const response = await axiosInstance.get<{ value: PassDetail }>(`/pass/${request.passId}`);
  return response.data.value;
};

type ListUserPassesRequest = {
  status?: UserPassStatus;
};

type ListUserPassesResponse = {
  value: UserPass[];
};

const listUserPasses = async (request: ListUserPassesRequest = {}): Promise<ListUserPassesResponse> => {
  const searchParams = new URLSearchParams();

  if (request.status) searchParams.set('status', request.status);

  const response = await axiosInstance.get<ListUserPassesResponse>(`/pass/users/me?${searchParams.toString()}`);
  return response.data;
};

type GetUserPassRequest = {
  userPassId: UserPass['id'];
};

const getUserPass = async (request: GetUserPassRequest): Promise<UserPass | undefined> => {
  const response = await listUserPasses();

  return response.value.find((userPass) => userPass.id === request.userPassId);
};

type PurchasePassRequest = {
  passId: Pass['id'];
};

type PurchasePassResponse = {
  merchantUid: string;
};

const purchasePass = async (request: PurchasePassRequest): Promise<PurchasePassResponse> => {
  const response = await axiosInstance.post<PurchasePassResponse>(`/payments/pass/${request.passId}`);
  return response.data;
};

type PurchasePassCompleteRequest = {
  passId: Pass['id'];
  merchantUid: string;
  impUid: string;
  payAmount: number;
};

type PurchasePassCompleteResponse = {
  userPassId: UserPass['id'];
};

const purchasePassComplete = async (request: PurchasePassCompleteRequest): Promise<PurchasePassCompleteResponse> => {
  const response = await axiosInstance.post<PurchasePassCompleteResponse>(`/payments/pass/${request.passId}/complete`, request);
  return response.data;
};

export const PassService = {
  listPasses,
  getPassDetail,
  listUserPasses,
  getUserPass,
  purchasePass,
  purchasePassComplete,
};
