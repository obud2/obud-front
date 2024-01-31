import React, { useContext, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { RiArrowDownSFill } from 'react-icons/ri';

import { Order, OrderContext } from 'src/context/OrderContext';

import moment from 'moment';
import useAuthModal from 'src/store/useAuthModal';

import { loginCheck } from 'src/constants';

import { getMonthSchedules, Schedule } from '@/service/StudioService';

import Portal from 'src/Portal';
import { SLessonReservationDrawer } from './LessonReservationDrawer.styled';

import CustomButton from '@components/common/button/CustomButton';
import ReservationOption from './item/ReservationOption';
import alert from 'src/helpers/alert';
import FallBackLoading from '@components/loading/FallBackLoading';

export type ScheduleWithTime = Schedule & {
  format?: { date: string; startTime: string; endTime: string };
  isTimeOut?: boolean;
  label?: string;
};
const LessonReservationDrawer = ({ lesson, isOpen, isClose }: { lesson: any; isOpen: boolean; isClose: () => void }) => {
  const drawerMainRef = useRef<HTMLElement>(null);
  const router = useRouter();

  const { setOrder } = useContext(OrderContext);

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const dateFormat = 'YYYY-MM';
  const id = lesson?.id;

  const [data, setData] = useState<{ date: string[]; day: Record<string, ScheduleWithTime[]> }>({ date: [], day: {} });
  const [body, setBody] = useState<{
    selectDate: string;
    selectTime: ScheduleWithTime | undefined;
    selectCount: number;
    selectOption: ScheduleWithTime['payOption'];
    selectOptionCount: number;
  }>({
    selectDate: '',
    selectTime: undefined,
    selectCount: 0,
    selectOption: {},
    selectOptionCount: 0,
  });
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    const thisMonthSchedules = await getMonthSchedules(id, currentDate);
    const nextMonth = moment(currentDate).add(1, 'months').format(dateFormat);
    const nextMonthSchedules = await getMonthSchedules(id, nextMonth);

    const schedules: ScheduleWithTime[] = [...thisMonthSchedules, ...nextMonthSchedules].map((it) => {
      const date = moment(it.startDate).format('YYYY-MM-DD');
      const startTime = moment(it.startDate).format('HH:mm');
      const endTime = moment(it.endDate).format('HH:mm');
      return { ...it, format: { date, startTime, endTime } };
    });

    const dateSet = new Set(schedules.map((a) => a?.format?.date).filter((a): a is string => !!a));
    const date = Array.from(dateSet).sort((a, b) => (a < b ? -1 : 1)) || [];
    const day = schedules.reduce((acc, cur) => {
      const date = cur?.format?.date;
      if (!date) {
        return acc;
      }
      if (!acc[date]) {
        acc[date] = [cur];
      } else {
        acc[date].push(cur);
      }
      return acc;
    }, {} as Record<string, ScheduleWithTime[]>);
    setData({ date, day });

    setIsLoading(false);
  };

  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    if (isOpen) {
      body.classList.add('order-hidden');
    } else {
      body.classList.remove('order-hidden');
    }

    return () => body.classList.remove('order-hidden');
  }, [isOpen]);

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  const onChangeDate = (e) => {
    const date = moment(e).format(dateFormat);

    setCurrentDate(date);
  };

  const validateCheck = () => {
    let check = true;

    if (!loginCheck()) {
      onClickOpenAuth('login');
      return false;
    }

    if (!body.selectDate) {
      alert('', '예약날짜를 선택해주세요.');
      check = false;
    }
    if (!body.selectTime?.format) {
      alert('', '예약시간을 선택해주세요.');
      check = false;
    }
    if (!(body.selectCount > 0)) {
      alert('', '예약 인원수를 선택해주세요.');
      check = false;
    }
    if (body.selectOption && body.selectOption?.title !== '선택안함' && !(body.selectOptionCount > 0)) {
      alert('', '추가 옵션수를 선택해주세요.');
      check = false;
    }
    if (body.selectOptionCount > body.selectCount) {
      alert('', '예약인원보다 옵션 수를 더 높게 설정할 수 없습니다.');
      check = false;
    }

    return check;
  };

  const onSelectOrder = (type) => {
    if (validateCheck()) {
      const param: Order = {
        planId: body.selectTime?.id || '',
        instructor: body.selectTime?.instructor || '',
        price: body.selectTime?.price || 0,
        startDate: body.selectTime?.startDate || '',
        endDate: body.selectTime?.endDate || '',
        reservationCount: body.selectCount || 0,

        // option
        payOption: body.selectOption && body.selectOption.title !== '선택안함' ? body.selectOption : {},
        payOptionCount: body.selectOptionCount,

        // Items
        lessonTitle: lesson?.title || '',
        lessonImages: lesson?.images || [],
        studiosTitle: lesson?.studios?.title || '',
        instructorName: body.selectTime?.instructorInfo?.name || '',
        format: body.selectTime!.format!,
      };

      switch (type) {
        case 'order':
          isClose();
          setOrder([param]);
          router.push('/booking');
          break;
      }
    }
  };

  const isAllLoading = isLoading;

  return (
    <Portal>
      <SLessonReservationDrawer isOpen={isOpen}>
        <div className="reservation-drawer-background" onClick={isClose} />

        <div className="reservation-drawer-container">
          <header className="reservation-drawer-header" onClick={isClose}>
            <button className="reservation-drawer-close-button">
              <RiArrowDownSFill />
            </button>
          </header>

          <main className="reservation-drawer-main" ref={drawerMainRef}>
            <div className="reservation-drawer-main-container">
              <ReservationOption
                data={data}
                isLoading={isAllLoading}
                onChangeDate={onChangeDate}
                onReturnData={setBody}
                scrollEle={drawerMainRef.current}
              />
            </div>
          </main>
        </div>

        <nav className="lesson-bottombar-container">
          <CustomButton fullWidth onClick={() => onSelectOrder('order')} disabled={isAllLoading} isLoading={isAllLoading}>
            예약하기
          </CustomButton>
        </nav>
      </SLessonReservationDrawer>

      <FallBackLoading isLoading={isAllLoading} />
    </Portal>
  );
};

export default LessonReservationDrawer;
