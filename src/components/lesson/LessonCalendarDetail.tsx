import { MOBILE } from '@/styled/variablesStyles';
import { ScheduleWithTime } from '@components/lesson/option/LessonReservationDrawer';
import _ from 'lodash';
import moment from 'moment';
import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import CustomButton from '../common/button/CustomButton';
import PlanCalendar from './option/item/PlanCalendar';

const DEFAULT_OPTION: ScheduleWithTime['payOption'] = { title: '선택안함', price: 0, maxMember: 0 };

type Props = {
  data: { date: string[]; day: Record<string, ScheduleWithTime[]> };
  onSelectOrder: (selectTime: ScheduleWithTime) => void;
  onChangeDate: (e: SetStateAction<string>) => void;
  onReturnData: (e: {
    selectDate: string;
    selectTime: ScheduleWithTime | undefined;
    selectCount: number;
    selectOption: ScheduleWithTime['payOption'];
    selectOptionCount: number;
  }) => void;
  scrollEle: HTMLElement | null;
};

const LessonCalendarDetail = ({ data, onSelectOrder, onChangeDate, onReturnData, scrollEle }: Props) => {
  const [selectDate, setSelectDate] = useState<string>('');
  const [selectTime, setSelectTime] = useState<ScheduleWithTime>();
  const [selectCount, setSelectCount] = useState(0);
  const [selectOption, setSelectOption] = useState<ScheduleWithTime['payOption']>(DEFAULT_OPTION);
  const [selectOptionCount, setSelectOptionCount] = useState<number>(0);
  const [schedules, setSchedules] = useState<ScheduleWithTime[]>([]);
  const [optionList, setOptionList] = useState<ScheduleWithTime['payOption'][]>([]);

  const [detailViewStates, setDetailViewStates] = useState<Record<string, boolean>>({});

  const toggleDetailView = (id: string) => {
    setDetailViewStates((prevStates) => ({
      ...prevStates,
      [id]: !prevStates[id],
    }));
  };

  useEffect(() => {
    onReturnData({
      selectDate: selectDate || '',
      selectTime,
      selectCount: selectCount || 0,
      selectOption,
      selectOptionCount: selectOptionCount || 0,
    });
  }, [selectDate, selectTime, selectCount, selectOption, selectOptionCount]);

  useEffect(() => {
    if (data?.day && selectDate && data.day[selectDate]) {
      const schedules = _.cloneDeep(data.day[selectDate]);
      const nowTime = moment().valueOf();

      schedules.forEach((it) => {
        const dataTime = moment(it.startDate).valueOf();
        it.isTimeOut = nowTime > dataTime;
        it.label = `${it?.format?.startTime} - ${it?.format?.endTime}`;
      });
      setSchedules(schedules);
    } else {
      setSchedules([]);
    }
  }, [selectDate]);

  useEffect(() => {
    const options = [DEFAULT_OPTION];

    if (selectTime?.payOption?.title) {
      options.push(selectTime?.payOption);
    }

    setOptionList(options);
  }, [selectTime]);

  useEffect(() => {
    if (scrollEle) {
      scrollEle.scrollTo(0, 0);
    }
  }, [optionList]);

  useEffect(() => {
    if (data.date?.length > 0) {
      data.date
        .sort((a, b) => (moment(a).isBefore(moment(b)) ? 1 : -1))
        .forEach((date) => {
          if (moment(date).startOf('day').isSameOrAfter(moment().startOf('day'))) {
            setSelectDate(date);
          }
        });
    }
  }, [data]);

  // 옵션 초기화
  const clearState = () => {
    setSelectDate('');
    setSelectTime(undefined);
    setSelectCount(0);
    setSelectOption(DEFAULT_OPTION);
    setSelectOptionCount(0);
  };

  // 날짜 선택
  const onChangeDatePicker = async (e: SetStateAction<string>) => {
    clearState();
    setSelectDate(e);
  };

  // 시간 선택
  const onChangeTime = (item: any) => {
    const value = item.id;
    const findIndex = schedules.findIndex((a) => a?.id === value);

    if (schedules[findIndex]?.id) {
      setSelectCount(1); // 시간 선택 시 인원 수 자동 1 부여.

      setSelectOption(DEFAULT_OPTION);
      setSelectOptionCount(0); // 옵션 초기화
    }

    setSelectTime(schedules[findIndex] || {});
    onSelectOrder(schedules[findIndex]);
  };

  const filteredSchedules = schedules?.sort((a, b) => (a.startDate >= b.startDate ? 1 : -1)) ?? [];

  return (
    <SLessonCalendarDetail>
      <PlanCalendar value={selectDate} onChange={onChangeDatePicker} onChangeDate={onChangeDate} selectList={data?.date || []} />
      <div className="line" />
      <div className="card-wrapper">
        {filteredSchedules.map((item) => {
          const disabled = item.isTimeOut || item.reservationStatus === 'impossible' || item.maxMember - item.currentMember === 0;
          return (
            <div key={item.id} className="card">
              <div className="first-line-wrapper">
                <div className="item1">
                  <div style={{ fontWeight: 700 }}>{moment(item.startDate).format('HH:mm')}</div>
                  <div>{moment(item.endDate).diff(moment(item.startDate), 'minutes')}분</div>
                </div>
                <div className="item2">
                  <div style={{ fontWeight: 700 }}>{item.title}</div>
                  <div>{item.instructor && item.instructor !== 'x' && <p style={{ color: 'grey' }}>w/{item.instructor}</p>}</div>
                </div>
                <div className="item3">
                  <div>{item.price.toLocaleString()}원</div>
                </div>
              </div>
              <div className="second-line-wrapper">
                <div className="item1" />
                <div className="item2">
                  {item.description && (
                    <>
                      <div className="detail" onClick={() => toggleDetailView(item.id)}>
                        {detailViewStates[item.id] ? '접기' : '상세보기'}
                        <div className={`arrow-icon ${detailViewStates[item.id] ? 'up' : 'down'}`} />
                      </div>
                      {detailViewStates[item.id] && <div className="description">{item.description}</div>}
                    </>
                  )}
                </div>
                <div className="item3">
                  <CustomButton
                    borderRadius="8px"
                    fontWeight="bold"
                    fontSize="14px"
                    height="24px"
                    width="70px"
                    onClick={() => onChangeTime(item)}
                    disabled={disabled}
                    style={{
                      color: disabled ? 'grey' : 'white',
                    }}
                  >
                    {disabled ? '마감' : '예약'}
                  </CustomButton>
                </div>
              </div>
            </div>
          );
        })}
        {filteredSchedules.length === 0 && <div>해당 날짜에는 수업이 없습니다</div>}
      </div>
    </SLessonCalendarDetail>
  );
};

export default LessonCalendarDetail;

export const SLessonCalendarDetail = styled.article`
  font-family: OpenSans;
  width: 100%;
  padding: 0 10px 10px 10px;

  ${MOBILE} {
    gap: 6px;
    padding: 10px 5px;
  }

  .line {
    height: 1px;
    border-top: 1px solid ${(props) => props.theme.core_color_slate_50};
    margin: 16px 0;
  }

  .card-wrapper {
  }

  .card {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    padding: 16px;

    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};
  }

  .first-line-wrapper {
    display: flex;
    gap: 8px;
  }

  .second-line-wrapper {
    display: flex;
    gap: 8px;
    margin-top: 8px;
  }

  .item1 {
    width: 80px;
  }
  .item2 {
    flex: 1;
  }
  .item3 {
    text-align: right;
    width: 80px;
  }

  .detail {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #555555;
  }

  .description {
    padding: 8px 0;
    color: #555555;
  }

  .arrow-icon {
    width: 7px;
    height: 7px;

    transform: rotate(45deg);
    border-top: 1px solid #555555;
    border-right: 1px solid #555555;

    margin-top: 3px;
    margin-left: 6px;
    top: -1px;
    position: relative;

    &.up {
      transform: rotate(-45deg);
    }
    &.down {
      transform: rotate(45deg);
    }
  }
`;
