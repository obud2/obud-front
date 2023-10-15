import React, { useContext, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { RiArrowDownSFill } from 'react-icons/ri';

import { CartContext } from 'src/context/CartContext';
import { OrderContext } from 'src/context/OrderContext';

import moment from 'moment';
import useAuthModal from 'src/store/useAuthModal';

import { loginCheck } from 'src/constants';

import ProductService from 'src/service/ProductService';

import Portal from 'src/Portal';
import { SLessonReservationDrawer } from './LessonReservationDrawer.styled';

import CustomButton from '@components/common/button/CustomButton';
import ReservationOption from './item/ReservationOption';
import alert from 'src/helpers/alert';
import FallBackLoading from '@components/loading/FallBackLoading';

const LessonReservationDrawer = ({ lesson, isOpen, isClose }) => {
  const drawerMainRef = useRef();
  const router = useRouter();

  const { setOrder } = useContext(OrderContext);
  const { setCart, isLoading: isCartLoading } = useContext(CartContext);

  const { onClickOpenAuth } = useAuthModal((state) => ({
    onClickOpenAuth: state.onClickOpenAuth,
  }));

  const dateFormat = 'YYYY-MM';
  const id = lesson?.id;

  const [data, setDate] = useState({});
  const [body, setBody] = useState({});

  const [isClear, setIsClear] = useState(0);
  const [currentDate, setCurrentDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);

    const res = await ProductService.getMonthPlans(id, currentDate);
    const list = res?.value || [];

    list?.forEach((a) => {
      const date = moment(a.startDate).format('YYYY-MM-DD');

      const startTime = moment(a.startDate).format('HH:mm');
      const endTime = moment(a.endDate).format('HH:mm');

      a.format = {};
      a.format.date = date;
      a.format.startTime = startTime;
      a.format.endTime = endTime;
    });

    const dateSet = new Set();

    const date = [];
    const day = {};

    // 년-월-일 추출
    list.forEach((a) => {
      const date = a?.format?.date;

      dateSet.add(date);
    });

    // date 배열에 오름차순으로 삽입
    Array.from(dateSet)
      .sort((a, b) => (a < b ? -1 : 1))
      .forEach((a) => {
        date.push(a);
      });

    // 날짜 별 일정 방 만들기
    date.forEach((a) => {
      day[a] = [];
    });

    // 날짜 별 일정 방에 일정 삽입
    list.forEach((a) => {
      if (day[a?.format?.date]) day[a?.format?.date].push(a);
    });

    setDate({ date, day });
    setIsLoading(false);
  };

  useEffect(() => {
    const body = document.querySelector('body');

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

  const onClear = () => {
    setIsClear((prev) => prev + 1);
  };

  const onChangeDate = async (e) => {
    const date = moment(e).format(dateFormat);

    await onClear();
    await setCurrentDate(date);
  };

  const onReturnData = async (e) => {
    await setBody(e);
  };

  const validateCheck = () => {
    let check = true;

    if (!loginCheck()) {
      onClickOpenAuth('login');
      return false;
    }

    if (!body?.selectDate) {
      alert('', '예약날짜를 선택해주세요.');
      check = false;
    }
    if (!body?.selectTime) {
      alert('', '예약시간을 선택해주세요.');
      check = false;
    }
    if (!(body?.selectCount > 0)) {
      alert('', '예약 인원수를 선택해주세요.');
      check = false;
    }
    if (body?.selectOption && body?.selectOption?.title !== '선택안함' && !(body?.selectOptionCount > 0)) {
      alert('', '추가 옵션수를 선택해주세요.');
      check = false;
    }
    if (body?.selectOptionCount > body?.selectCount) {
      alert('', '예약인원보다 옵션 수를 더 높게 설정할 수 없습니다.');
      check = false;
    }

    return check;
  };

  const onSelectOrder = (type) => {
    if (validateCheck()) {
      const param = {
        planId: body?.selectTime?.id || '',
        instructor: body?.selectTime?.instructor || '',
        price: body?.selectTime?.price || '',
        startDate: body?.selectTime?.startDate || '',
        endDate: body?.selectTime?.endDate || '',
        reservationCount: body?.selectCount || 0,

        // option
        payOption: body?.selectOption && body?.selectOption?.title !== '선택안함' ? body?.selectOption : {},
        payOptionCount: body?.selectOptionCount,

        // Items
        lessonTitle: lesson?.title || '',
        lessonImages: lesson?.images || [],
        studiosTitle: lesson?.studios?.title || '',
        instructorName: body?.selectTime?.instructorInfo?.name || '',
        format: body?.selectTime?.format || {},
      };

      switch (type) {
        case 'cart':
          onClear();
          setCart(param);
          break;
        case 'order':
          isClose();
          setOrder([param]).then(() => {
            router.push('/booking');
          });
          break;
      }
    }
  };

  const isAllLoading = isLoading || isCartLoading;

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
                isClear={isClear}
                onReturnData={onReturnData}
                scrollEle={drawerMainRef.current}
              />
            </div>
          </main>
        </div>

        <nav className="lesson-bottombar-container">
          <CustomButton fullWidth variant="outlined" onClick={() => onSelectOrder('cart')} disabled={isAllLoading} isLoading={isAllLoading}>
            장바구니
          </CustomButton>

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
