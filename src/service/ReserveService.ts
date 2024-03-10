import axiosInstance from '@/constants/AxiosInstance';
import { UserPass } from '@/entities/pass';
import { Reservation, ReservationStatus } from '@/entities/reservation';

type ReserveUsingPassRequest = {
  scheduleId: string;
  userPassId: UserPass['id'];
};

type ReserveUsingPassResponse = {
  value: { userPassReservationId: number };
};

const reserveUsingPass = async (req: ReserveUsingPassRequest): Promise<ReserveUsingPassResponse> => {
  const response = await axiosInstance.post<ReserveUsingPassResponse>('/reservation/pass', req);
  return response.data;
};

type ListReservationsRequest = {
  type: ReservationStatus;
};

type ListReservationsResponse = {
  value: Reservation[];
};

const listReservations = async (req: ListReservationsRequest): Promise<ListReservationsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('type', req.type);

  const response = await axiosInstance.get<ListReservationsResponse>(`/reservation/users/me?${searchParams.toString()}`);
  return response.data;
};

export const ReserveService = {
  reserveUsingPass,
  listReservations,
};
