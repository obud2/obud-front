import { Lesson } from '@/entities/lesson';
import { Schedule, getMonthSchedules } from '@/service/StudioService';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { loginCheck } from 'src/constants';
import { Order, OrderContext } from 'src/context/OrderContext';
import alert from 'src/helpers/alert';
import useAuthModal from 'src/store/useAuthModal';
import { MOBILE } from 'src/styled/variablesStyles';
import styled from 'styled-components';
import LessonCalendarDetail from './LessonCalendarDetail';

export type ScheduleWithTime = Schedule & {
  format?: { date: string; startTime: string; endTime: string };
  isTimeOut?: boolean;
  label?: string;
};

type Props = {
  lesson: Lesson;
};

const LessonCalendar = ({ lesson }: Props) => {
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

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, [currentDate]);

  const onChangeDate = (e) => {
    const date = moment(e).format(dateFormat);

    setCurrentDate(date);
  };

  // TODO: Fix
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
    // if (!body.selectTime?.format) {
    //   alert('', '예약시간을 선택해주세요.');
    //   check = false;
    // }
    // if (!(body.selectCount > 0)) {
    //   alert('', '예약 인원수를 선택해주세요.');
    //   check = false;
    // }
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

  // TODO: Fix
  const onSelectOrder = () => {
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        format: body.selectTime!.format!,
      };

      setOrder([param]);
      router.push('/booking');
    }
  };

  return (
    <SLessonCalendar>
      <div className="reservation-drawer-container">
        <main className="reservation-drawer-main">
          <div className="reservation-drawer-main-container">
            <LessonCalendarDetail
              data={data}
              onSelectOrder={onSelectOrder}
              onChangeDate={onChangeDate}
              onReturnData={setBody}
              scrollEle={null}
            />
          </div>
        </main>
      </div>
    </SLessonCalendar>
  );
};

export default LessonCalendar;

const PRODUCT_MAX_WIDTH = '688px';
const MAX_HEIGHT = '75vh';

export const SLessonCalendar = styled.div`
  .reservation-drawer-container {
    width: ${PRODUCT_MAX_WIDTH};
    max-height: ${MAX_HEIGHT};
    padding: 16px;
    margin-top: 12px;
    background-color: ${(props) => props.theme.sub_color_slate_50};

    ${MOBILE} {
      width: 100%;
    }

    .reservation-drawer-header {
      width: 100%;
      height: 34px;

      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      border-bottom: 1px solid #eeeeee;
      padding-bottom: 10px;

      .reservation-drawer-close-button {
        width: 19px;
        height: 19px;

        svg {
          width: 100%;
          height: 100%;
          color: #868686;
        }
      }
    }

    .reservation-drawer-main {
      width: 100%;
      max-height: ${MAX_HEIGHT};

      flex: 1;

      overflow-x: hidden;
      overflow-y: auto;

      .reservation-drawer-main-container {
        width: 100%;
        height: auto;
      }
    }
  }

  .lesson-bottombar-container {
    width: ${PRODUCT_MAX_WIDTH};
    padding: 10px 10px 20px;
    border-top: 1px solid rgba(33, 33, 33, 0.1);
    background-color: ${(props) => props.theme.sub_color_slate_50};

    display: flex;
    gap: 24px;

    overflow: hidden;

    ${MOBILE} {
      width: 100%;
      padding: 10px 10px 20px;

      gap: 8px;
    }
  }
`;
