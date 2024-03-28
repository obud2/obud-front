import CustomImage from '@/components/common/image/CustomImage';
import { loginCheck } from '@/constants';
import { DisplayType, useMap } from '@/context/MapContext';
import useAuthModal from '@/store/useAuthModal';
import { format } from 'date-fns';
import Link from 'next/link';
import { useContext } from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import styled from 'styled-components';
import { OrderContext, Order } from 'src/context/OrderContext';
import { useRouter } from 'next/router';
import { ScheduleWithTime } from '@components/lesson/option/LessonReservationDrawer';
import moment from 'moment';

const DEFAULT_OPTION: ScheduleWithTime['payOption'] = { title: '선택안함', price: 0, maxMember: 0 };

export const List = () => {
  const router = useRouter();
    const { places, setType, reset } = useMap();
    const { onClickOpenAuth } = useAuthModal((state) => ({
      onClickOpenAuth: state.onClickOpenAuth,
    }));

    const { setOrder } = useContext(OrderContext);

    const hadleReservation = (schedule: any, lesson: any) => {
      if (!loginCheck()) {
        onClickOpenAuth('login');
        return false;
      }

      const date = moment(schedule.startDate).format('YYYY-MM-DD');
      const startTime = moment(schedule.startDate).format('HH:mm');
      const endTime = moment(schedule.endDate).format('HH:mm');

      const param: Order = {
        planId: schedule.id || '',
        instructor: schedule.instructor || '',
        price: schedule.price || 0,
        startDate: schedule.startDate || '',
        endDate: schedule.endDate || '',
        // control in booking page
        reservationCount: 1,

        // option
        payOption: DEFAULT_OPTION,
        payOptionCount: 0,

        // Items
        lessonTitle: lesson?.title || '',
        lessonImages: lesson?.images || [],
        lessonId: lesson?.id || '',
        studiosId: lesson?.studios?.id || '',
        studiosTitle: lesson?.studios?.title || '',
        instructorName: schedule.instructorInfo?.name || '',

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        format: { date, startTime, endTime }!,
        maxMember: schedule.maxMember,
        currentMember: schedule.currentMember,
      };

      setOrder([param]);
      router.push('/booking');
    };

    return (

      <div
        style={{
            flex: 1,
            width: 380,
            overflow: 'auto',
        }}
      >
        <SList>{places.map((place) => {
        const images = place?.images ? JSON.parse(place.images) : [];
        const image = images?.[0]?.url || '';

        const category = place?.category ? JSON.parse(place.category) : [];

        return (
          <div key={place.id}>
            <div className="devider" />
            <Link href={`/class/${place.id}`}>
              <div className="wrap">
                {image && <CustomImage src={image} width={70} height={70} />}
                <div className="discription">
                  <div className="obud-place-option">
                    <div>{category.join(',')}</div>|
                    <div>{place.region}</div>
                  </div>
                  <div className="obud-place-title">{place.title}</div>
                </div>
              </div>
            </Link>

            <div className="program">

              {
  place?.programs?.map((program) => {
    return (
      <div key={program.id}>
        <div className="program-title">
          <p>{program?.title}</p>
          <Link href={`/lesson/${program.id}`}>
            <div className="more"><span>더보기</span><RiArrowRightSLine /></div>
          </Link>
        </div>

        <div className="program-schedules">
          {
          program?.schedules?.map((schedule) => {
            return (
              <div key={schedule.id} className="program-schedules-time" onClick={() => hadleReservation(schedule, program)}>
                <div>
                  <span>{format(new Date(schedule.updatedAt), 'hh:mm')}</span>
                  <span>{schedule.scheduleTitlePreset?.title}</span>
                </div>
              </div>
);
          })
        }
        </div>

      </div>
);
  })
}

            </div>
          </div>
);
      })}

          <div className="show-map" onClick={() => { setType(DisplayType.MAP); reset(); }}>지도로 보기</div>
        </SList>
      </div>
);
};

const SList = styled.div`
    position: relative;
    width: 380px;
    height: 100%;
    .devider {
        height: 6px;
        background-color: #EEEFF1;
    }

    .wrap {
        display: flex;
        padding: 20px 23px 0;
        gap: 10px
    }

    .discription {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .show-map {
        position: fixed;
        display: flex;
        background-color: #344235;
        border-radius: 15px;
        gap: 6px;
        width: 134px;
        height: 33px;
        justify-content: center;
        align-items: center;
        transform: translateX(-50%);
        z-index: 40;
        left: 50%;
        bottom: 20px;
        color: #ffffff;
        font-size: 13px;
    }

    .program {
      padding: 20px 23px;
    }

    .program-title {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      p {
        font-weight: 400;
      }
    }

    .more {
      display: flex;
      align-items: center;
    }

    .program-schedules {
      display: grid;
      grid-template-columns: 84px 84px 84px;
      gap: 24px;
      padding: 10px 0;
    }

    .program-schedules-time {
        display: inline-block;

      div {
        display: flex;
        gap: 2px;
        border-radius: 10px;
        border: 1px solid #D9D9D9;
        width: 84px;
        height: 43px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        span {
          font-size: 11px;    
          text-align: center;
          word-break: keep-all;
        }

        &:hover {
          background-color: #344235;
          color: #ffffff;
        }
      }
    }
`;
