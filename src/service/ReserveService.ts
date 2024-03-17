import axiosInstance from '@/constants/AxiosInstance';
import { UserPass } from '@/entities/pass';
import { Reservation, ReservationStatus } from '@/entities/reservation';

type ReserveUsingPassRequest = {
  scheduleId: string;
  userPassId: UserPass['id'];
  userName: string;
  userPhone: string;
};

type ReserveUsingPassResponse = {
  value: { userPassReservationId: number };
};

const reserveUsingPass = async (req: ReserveUsingPassRequest): Promise<ReserveUsingPassResponse> => {
  const response = await axiosInstance.post<ReserveUsingPassResponse>('/reservation/pass', req);
  return response.data;
};

type CancelReserveUsingPassRequest = {
  id: Reservation['id'];
};

const cancelReserveUsingPass = async (req: CancelReserveUsingPassRequest): Promise<void> => {
  await axiosInstance.post(`/reservation/pass/${req.id}/cancel`);
};

type ListReservationsRequest = {
  status: ReservationStatus;
};

type ListReservationsResponse = {
  value: Reservation[];
};

const listReservations = async (req: ListReservationsRequest): Promise<ListReservationsResponse> => {
  const searchParams = new URLSearchParams();
  searchParams.set('status', req.status);

  const response = await axiosInstance.get<ListReservationsResponse>(`/reservation/users/me?${searchParams.toString()}`);
  return response.data;
};

type GetReservationRequest = {
  id: Reservation['id'];
};

const getReservation = async (req: GetReservationRequest): Promise<Reservation> => {
  const response = await axiosInstance.get<{ value: Reservation }>(`/reservation/${req.id}`);
  return response.data.value;
};

const getReservationStatusText = (status: ReservationStatus) => {
  switch (status) {
    case 'CANCELLED':
      return '취소 완료';
    case 'COMPLETED':
      return '결제 완료';
    case 'UPCOMING':
      return '예약 완료';
    default:
      return '';
  }
};

export const ReserveService = {
  reserveUsingPass,
  cancelReserveUsingPass,
  listReservations,
  getReservation,
  getReservationStatusText,
};
