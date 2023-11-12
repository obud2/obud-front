import _ from 'lodash';
import moment from 'moment';
import { SetStateAction, useEffect, useState } from 'react';
import { addComma } from 'src/constants';
import PlanCalendar from './PlanCalendar';
import PlanNumberOfPeopleCheck from './PlanNumberOfPeopleCheck';
import { SReservationOption, SReservationTimeOption } from './ReservationOption.styled';

const DEFAULT_OPTION = { title: '선택안함', price: 0, maxMember: 0 };

type Props = {
  data: { date: string[]; day: any };
  isLoading: boolean;
  onChangeDate: (e: SetStateAction<string>) => void;
  onReturnData: (e: any) => void;
  isClear: boolean;
  scrollEle: any;
};

const ReservationOption = ({ data, isLoading, onChangeDate, onReturnData, isClear, scrollEle }: Props) => {
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState<any>({ id: '', label: '' });
  const [selectCount, setSelectCount] = useState(0);
  const [selectOption, setSelectOption] = useState<any>(DEFAULT_OPTION);
  const [selectOptionCount, setSelectOptionCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [timeList, setTimeList] = useState<any[]>([]);
  const [optionList, setOptionList] = useState<any[]>([]);

  useEffect(() => {
    onReturnData({
      selectDate: selectDate || '',
      selectTime: selectTime || '',
      selectCount: selectCount || 0,
      selectOption: selectOption || '',
      selectOptionCount: selectOptionCount || 0,
    });

    let price = 0;

    if (selectTime?.id) {
      const basicPrice = Number(selectTime?.price || 0) * selectCount;
      const optionPrice = Number(selectOption?.price || 0) * selectOptionCount;

      price = basicPrice + optionPrice;
    }

    setTotal(price);
  }, [selectDate, selectTime, selectCount, selectOption, selectOptionCount]);

  useEffect(() => {
    if (data?.day && selectDate && data.day[selectDate]) {
      const list = _.cloneDeep(data.day[selectDate]);
      const nowTime = moment().valueOf();

      list?.forEach((a: any) => {
        const dataTime = moment(a?.startDate).valueOf();
        a.isTimeOut = nowTime > dataTime;
        a.label = `${a?.format?.startTime} - ${a?.format?.endTime}`;
      });
      setTimeList(list);
    } else {
      setTimeList([]);
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
    if (isClear) {
      clearState();
    }
  }, [isClear]);

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
  const clearState = async () => {
    await setSelectDate('');
    await setSelectTime({});
    await setSelectCount(0);
    await setSelectOption(DEFAULT_OPTION);
    await setSelectOptionCount(0);
  };

  // 날짜 선택
  const onChangeDatePicker = async (e: SetStateAction<string>) => {
    clearState();
    setSelectDate(e);
  };

  // 시간 선택
  const onChangeTime = (item: any) => {
    const value = item.id;
    const findIndex = timeList.findIndex((a) => a?.id === value);

    if (timeList[findIndex]?.id) {
      setSelectCount(1); // 시간 선택 시 인원 수 자동 1 부여.

      setSelectOption(DEFAULT_OPTION);
      setSelectOptionCount(0); // 옵션 초기화
    }

    setSelectTime(timeList[findIndex] || {});
  };

  // 인원수 선택
  const onChangePlanCountPeople = (e: SetStateAction<number>) => {
    setSelectCount(e);
  };

  // 옵션 선택
  // const onChangeOption = (e) => {
  //   const { value } = e.target;
  //   const findIndex = optionList.findIndex((a) => a?.title === value);

  //   setSelectOption(optionList[findIndex] || {});
  // };

  // 추가 옵션 수 선택
  // const onChangePlanCountOption = (e) => {
  //   setSelectOptionCount(e);
  // };

  return (
    <SReservationOption>
      {/* 예약날짜 */}
      <PlanCalendar value={selectDate} onChange={onChangeDatePicker} onChangeDate={onChangeDate} selectList={data?.date || []} />

      {/* 예약 시간 */}
      <SReservationTimeOption>
        <h4 className="option-title">회차를 선택하세요</h4>
        <div className="time-option-list">
          {timeList
            ?.sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
            ?.map((item) => {
              const isTimeOut = item?.isTimeOut;
              const isImpossible = item?.reservationStatus === 'impossible' || item.maxMember - item.currentMember === 0;

              return (
                <div
                  key={item?.id}
                  onClick={() => onChangeTime(item)}
                  className={`time-option-item ${item.id === selectTime?.id ? 'selected' : ''} ${
                    isImpossible || isTimeOut ? 'disabled' : ''
                  }`}
                >
                  <p>{item?.label}</p>
                  {item?.instructor !== 'x' && <p>{item.instructor}</p>}
                  {/* {isTimeOut && <div className="item-timeout">마감</div>} */}
                  {/* {isImpossible && <div className="item-impossible">매진</div>} */}
                </div>
              );
            })}
          {timeList?.length === 0 && <div className="time-option-item">날짜를 선택하세요</div>}
        </div>
      </SReservationTimeOption>

      <h4 className="option-title">인원/수량을 선택하세요</h4>
      <div className="result-bottom">
        {/* 인원수 */}
        <PlanNumberOfPeopleCheck
          placeholder="인원"
          disabled={!selectTime?.id || isLoading}
          maxNumber={selectTime ? selectTime.maxMember - selectTime.currentMember : 0}
          value={selectCount}
          onChange={onChangePlanCountPeople}
        />
        <div className="reservation-total">
          총 상품금액 <b className="total-price">{`${addComma(total)}원`}</b>
        </div>
      </div>

      {/* TODO: 추가 옵션은 이후에 추가한다. 지금은 의도적으로 주석 처리해둔다 */}

      {/* 추가옵션 */}
      {/* {optionList?.length > 1 && (
        <CustomSelect
          className="option-list"
          placeholder="추가옵션"
          value={selectOption?.title || ''}
          disabled={!selectTime?.id || isLoading}
          onChange={onChangeOption}
          textPosition="center"
        >
          {optionList?.map((item) => {
            const impossible = item.maxMember - item.currentMember === 0;

            return (
              <SelectItems key={item?.title} value={item?.title || ''}>
                <Flex
                  fullWidth
                  justifyContent="space-between"
                  value={item?.title}
                  data-value={item?.title}
                  className={`${impossible ? 'disabled' : ''}`}
                >
                  <p>{item?.title}</p>

                  <Flex>
                    {impossible && <div className="item-impossible">품절</div>}
                    <p>{`${addComma(item?.price || 0)}원`}</p>
                  </Flex>
                </Flex>
              </SelectItems>
            );
          })}
        </CustomSelect>
      )} */}

      {/* 추가 옵션수 */}
      {/* {optionList?.length > 1 && (
        <PlanNumberOfPeopleCheck
          placeholder="추가 옵션수"
          disabled={selectOption?.title === '선택안함' || isLoading}
          maxNumber={(selectOption.maxMember || 0) - (selectOption?.currentMember || 0)}
          value={selectOptionCount}
          onChange={onChangePlanCountOption}
        />
      )} */}
    </SReservationOption>
  );
};

export default ReservationOption;
