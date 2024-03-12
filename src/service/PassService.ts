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

type RefundUserPassRequest = {
  userPassId: UserPass['id'];
};

const refundUserPass = async (request: RefundUserPassRequest): Promise<void> => {
  await axiosInstance.post(`/payments/pass/users/me/${request.userPassId}/refund`);
};

export type PurchasePassRequest = {
  passId: Pass['id'];
};

type PurchasePassResponse = {
  merchantUid: string;
};

const purchasePass = async (request: PurchasePassRequest): Promise<PurchasePassResponse> => {
  const response = await axiosInstance.post<{ value: PurchasePassResponse }>(`/payments/pass/${request.passId}`);
  return response.data.value;
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

type PurchasePassFailRequest = {
  passId: Pass['id'];
  merchantUid: string;
};

const purchasePassFail = async (request: PurchasePassFailRequest): Promise<void> => {
  await axiosInstance.post(`/payments/pass/${request.passId}/fail`, request);
};

type GetUsableUserPassRequest = {
  userPasses?: UserPass[];
  programId: string;
};

/**
 * 사용 가능한 패스 조회
 * UserPass안의 Program에 해당 프로그램이 있는지 확인
 * 여러개일 경우, 첫번째 패스를 반환
 */
const getUsableUserPass = (req: GetUsableUserPassRequest): UserPass | undefined => {
  const { userPasses = [], programId } = req;

  return userPasses.find((userPass) => userPass.programs.some((program) => program.id === programId));
};

export const PassService = {
  listPasses,
  getPassDetail,
  listUserPasses,
  getUserPass,
  refundUserPass,
  purchasePass,
  purchasePassComplete,
  purchasePassFail,
  getUsableUserPass,
};
