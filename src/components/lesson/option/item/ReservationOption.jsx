import { useEffect, useState } from 'react';

import _ from 'lodash';

import moment from 'moment';

import { addComma } from 'src/constants';
// import { Flex } from 'src/styled/CommonStyles';
import { SReservationOption, SReservationTimeOption } from './ReservationOption.styled';

import PlanCalendar from './PlanCalendar';
// import CustomSelect, { SelectItems } from '@components/common/select/CustomSelect';
import PlanNumberOfPeopleCheck from './PlanNumberOfPeopleCheck';

const DEFAULT_OPTION = { title: '선택안함', price: 0, maxMember: 0 };

const ReservationOption = ({ data, isLoading, onChangeDate, onReturnData, onClear, scrollEle }) => {
  const [selectDate, setSelectDate] = useState('');
  const [selectTime, setSelectTime] = useState({ id: '', label: '' });
  const [selectCount, setSelectCount] = useState(0);
  const [selectOption, setSelectOption] = useState(DEFAULT_OPTION);
  const [selectOptionCount, setSelectOptionCount] = useState(0);

  const [total, setTotal] = useState(0);

  const [timeList, setTimeList] = useState([]);
  const [optionList, setOptionList] = useState([]);

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
    if (data?.day[selectDate]) {
      const list = _.cloneDeep(data?.day[selectDate]);
      const nowTime = moment().valueOf();

      list?.forEach((a) => {
        let isTimeOut = false;
        const dataTime = moment(a?.startDate).valueOf();

        if (nowTime > dataTime) isTimeOut = true;

        a.isTimeOut = isTimeOut;

        // 제목 Format
        a.label = `${a?.format?.startTime}~${a?.format?.endTime}`;
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
      scrollEle.scrollTo(0, scrollEle.scrollHeight);
    }
  }, [optionList]);

  useEffect(() => {
    if (onClear) {
      clearState();
    }
  }, [onClear]);

  // 옵션 초기화
  const clearState = async () => {
    await setSelectDate('');
    await setSelectTime();
    await setSelectCount(0);
    await setSelectOption(DEFAULT_OPTION);
    await setSelectOptionCount(0);
  };

  // 날짜 선택
  const onChangeDatePicker = async (e) => {
    clearState();
    setSelectDate(e);
  };

  // 시간 선택
  const onChangeTime = (item) => {
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
  const onChangePlanCountPeople = (e) => {
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
      <PlanCalendar
        value={selectDate}
        onChange={onChangeDatePicker}
        onChangeDate={onChangeDate}
        selectList={data?.date || []}
        disabled={isLoading}
      />

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
                className={`time-option-item ${item.id === selectTime?.id ? 'selected' : ''} ${isImpossible || isTimeOut ? 'disabled' : ''}`}
              >
                <p>{item?.label}</p>
                {item?.instructor !== 'x' && <p>{item.instructor}</p>}
                {isTimeOut && <div className="item-timeout">마감</div>}
                {isImpossible && <div className="item-impossible">품절</div>}
              </div>
            );
          })}
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
