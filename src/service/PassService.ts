import axiosInstance from '@/constants/AxiosInstance';
import { Pass, PassDetail, UserPass, UserPassStatus } from '@/entities/pass';
import { Place } from '@/entities/place';

type ListPassesRequest = {
  placeId: Place['id'];
};

type ListPassesResponse = {
  value: Pass[];
};

export const listPasses = async (request: ListPassesRequest): Promise<ListPassesResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('placeId', request.placeId);

  const response = await axiosInstance.get<ListPassesResponse>(`/pass?${searchParams.toString()}`);
  return response.data;
};

type GetPassDetailRequest = {
  passId: Pass['id'];
};

export const getPassDetail = async (request: GetPassDetailRequest): Promise<PassDetail> => {
  const response = await axiosInstance.get<PassDetail>(`/pass/${request.passId}`);
  return response.data;
};

type ListUserPassesRequest = {
  status?: UserPassStatus;
};

type ListUserPassesResponse = {
  value: UserPass[];
};

export const listUserPasses = async (request: ListUserPassesRequest = {}): Promise<ListUserPassesResponse> => {
  const searchParams = new URLSearchParams();

  if (request.status) searchParams.set('status', request.status);

  const response = await axiosInstance.get<ListUserPassesResponse>(`/pass/users/me?${searchParams.toString()}`);
  return response.data;
};
