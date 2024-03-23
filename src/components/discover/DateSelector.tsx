import { addDays, eachDayOfInterval, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRouter } from 'next/router';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { CalendarModal } from '@/components/discover/CalendarModal';

export const DateSelector = () => {
    const router = useRouter();

    const activeDate = useMemo(() => {
        return router.query?.date || format(new Date(), 'yyyy-MM-dd');
    }, [router]);

    const twoWeeks = useMemo(() => {
        const today = new Date();
        const fromTodayAfterTwoWeeks = eachDayOfInterval({ start: today, end: addDays(today, 13) });

        /**
         * return [{
         *  date: new Date('2024-03-12T15:00:00.000Z'),
         *  text: '13 수'
         * }, ...]
         * */
        return fromTodayAfterTwoWeeks.map((day, i) => {
        return {
            date: format(day, 'yyyy-MM-dd'),
            text: i === 0 ? '오늘' : format(day, 'dd EEEEE', { locale: ko }),
        };
        });
    }, []);

    const onClickDate = (date) => {
        router.push({
            pathname: '/discover',
            query: {
                date,
            },
        });
    };

    return (
      <SDateSelector>
        <Swiper slidesPerView={7}>
          {twoWeeks.map(({ date, text }) => {
            return (
              <SwiperSlide key={text} onClick={(() => onClickDate(date))}>
                <span className={activeDate === date ? 'active' : ''}>{text}</span>
              </SwiperSlide>
            );
        })}
        </Swiper>
        <CalendarModal>
          <FaRegCalendarAlt style={{ width: 23, height: 23 }} />
        </CalendarModal>
      </SDateSelector>
    );
};

const SDateSelector = styled.div`
  overflow-x: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;
  padding: 0 18px;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    font-size: 11px;

    span {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        &.active {
            background-color: rgba(52, 66, 53, 1);
            border-radius: 50%;
            color: #fff;
        }
    }
  }
`;
