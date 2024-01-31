import React, { useEffect, useState, useCallback } from 'react';

import { addMonths, subDays, subMonths } from 'date-fns';

import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';

import { SPlanCalendar } from './PlanCalendar.styled';
import moment from 'moment';

const WEEK = ['일', '월', '화', '수', '목', '금', '토'];
const FORMAT = 'YYYY-MM-DD';

const dateFormat = (date) => {
  if (date) return moment(date).format('YYYYMMDD');
};

const PlanCalendar = ({ value, onChange, onChangeDate, selectList }) => {
  const [currentYear, setCurrentYear] = useState(new Date());

  const [valueDate, setValueDate] = useState('');
  const [selectedList, setSelectedList] = useState([]);

  const [isPrevHide, setIsPrevHide] = useState(false);

  useEffect(() => {
    if (selectList?.length) {
      const temp = [];

      selectList.forEach((item) => {
        temp.push(dateFormat(item));
      });

      setSelectedList(temp);
    }
  }, [selectList]);

  useEffect(() => {
    const now = moment(new Date()).format('YYYYMM');
    const current = moment(currentYear).format('YYYYMM');

    if (now === current) setIsPrevHide(true);
    else setIsPrevHide(false);

    if (onChangeDate) onChangeDate(currentYear);
  }, [currentYear]);

  useEffect(() => {
    setValueDate(value);
    if (value) setCurrentYear(new Date(value));
  }, [value]);

  //   다음달
  const nextDate = useCallback(() => {
    setCurrentYear((prev) => subMonths(prev, 1));
  }, [currentYear]);

  //   저번달
  const prevDate = useCallback(() => {
    setCurrentYear((prev) => addMonths(prev, 1));
  }, [currentYear]);

  return (
    <SPlanCalendar>
      <div className="date-picker-container">
        <div className="date-change">
          <span className={`prev-date ${isPrevHide ? 'hide' : ''}`} onClick={nextDate}>
            <IoIosArrowBack />
          </span>

          <span className="next-date" onClick={prevDate}>
            <IoIosArrowForward />
          </span>
        </div>

        <div className="datepicker">
          <RenderCalender today={currentYear} selectedList={selectedList} valueDate={valueDate} onChange={onChange} />
        </div>
      </div>
    </SPlanCalendar>
  );
};

const RenderCalender = ({ today, valueDate, selectedList, onChange }) => {
  const doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const year = doMonth.getFullYear(); // 연도
  const month = doMonth.getMonth(); // 월
  const days = new Array(lastDate.getDate()).fill(''); // 일

  //   데이터 선택
  const onSelectDate = (date, unable) => {
    if (!date) return;
    if (unable) return;

    if (onChange) {
      onChange(moment(date).format(FORMAT));
    }
  };

  // 캘린더 만들기
  const createCalender = (_year, _month, _days, _insert) => {
    const nowDate = new Date();
    const selectFormatDate = valueDate ? dateFormat(moment(valueDate).valueOf()) : '';

    const days = [];

    // 저번달 끝나는 요일 만큼 뒤로 미루기
    for (let i = 0; i < _insert; i++) {
      days.push('');
    }

    // 요일 일 수 채우기
    // eslint-disable-next-line no-return-assign
    _days = _days.map((day, i) => (day = i + 1));

    // 밀린 요일과 일 수 합치기
    _days = [...days, ..._days];

    const cell = [];
    let td = [];

    // 테이블에 데이터 Insert
    _days.forEach((day, idx) => {
      let date;
      let formatDate;

      let today = false;
      let active = false;
      let empty = false;
      let disabled = true;

      // Date Update
      if (day) {
        date = new Date(`${_year}/${_month}/${day}`);
        formatDate = dateFormat(date);
      }

      if (dateFormat(nowDate) === dateFormat(formatDate)) {
        today = true;
      }

      //   Day 없는 값 Empty
      if (!day) {
        empty = true;
      }

      //   선택 데이터
      if (formatDate === selectFormatDate) active = true;

      // 예약 목록 disabled
      if (selectedList.length) {
        if (selectedList.includes(formatDate)) disabled = false;
      }

      //   오늘 날짜 이전 disabled
      if (date < subDays(nowDate, 1)) {
        disabled = true;
      }

      const className = `
      date-picker-days ${today ? '_today' : ''} ${active ? '_active' : ''} 
      ${empty ? '_empty' : ''} ${disabled ? '_disabled' : '_un_disabled'}`.trim();

      td.push(
        <td
          // eslint-disable-next-line react/no-array-index-key
          key={`td_${_month}_${day}_${idx}`}
          onClick={() => onSelectDate(date, disabled)}
          className={className}
        >
          <div>{day}</div>
        </td>,
      );

      if ((idx + 1) % 7 === 0) {
        // eslint-disable-next-line react/no-array-index-key
        cell.push(<tr key={`td_${_month}_${day}_${idx}`}>{td}</tr>);
        td = [];
      }

      if (idx === _days.length - 1 && td.length > 0) {
        // eslint-disable-next-line react/no-array-index-key
        cell.push(<tr key={`td_${_month}_${day}__${idx}`}>{td}</tr>);
      }
    });

    return cell;
  };

  return (
    <React.Fragment>
      <p className="datepicker-year">
        {`${year}년 `}
        {`${month + 1}월`}
      </p>

      <div className="datepicker-week-to-days">
        <ul className="datepicker-week">
          {WEEK.map((week) => (
            <li key={`week-${week}`}>
              <div>{week}</div>
            </li>
          ))}
        </ul>

        <table className="datepicker-table">
          <tbody>{createCalender(year, month + 1, days, doMonth.getDay())}</tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default PlanCalendar;
