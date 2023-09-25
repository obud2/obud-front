import React, { useState, useEffect } from 'react';

import { STimePicker } from './TimePicker.styled';
import { HOUR, MINUTE_TO_SECOND } from './TimePicker.option';

const TimePicker = ({ open, onClose, value, onChange, position }) => {
  const [hour, setHour] = useState([]);
  const [minute, setMinute] = useState([]);
  const [second, setSecond] = useState([]);

  const [time, setTime] = useState({
    hour: '00',
    minute: '00',
    second: '00',
  });

  useEffect(() => {
    createdTime();
  }, []);

  useEffect(() => {
    if (value) {
      const split = value?.split(':');

      const [h, m, s] = split;

      setTime({
        hour: h,
        minute: m,
        second: s,
      });
    }
  }, [value]);

  useEffect(() => {
    const temp = `${time?.hour}:${time?.minute}:${time?.second}`;

    if (onChange) {
      onChange(temp);
    }
  }, [time]);

  const createdTime = () => {
    const hourTemp = [];
    const minuteBySecondTemp = [];

    HOUR.forEach((_, i) => {
      const temp = timeFormat(i);

      hourTemp.push(temp);
    });

    MINUTE_TO_SECOND.forEach((_, i) => {
      const temp = timeFormat(i);

      minuteBySecondTemp.push(temp);
    });

    setHour(hourTemp);
    setMinute(minuteBySecondTemp);
    setSecond(minuteBySecondTemp);
  };

  const onClickNowTime = () => {
    const nowDate = new Date();

    const hourTemp = timeFormat(nowDate.getHours());
    const minuteTemp = timeFormat(nowDate.getMinutes());
    const secondTemp = timeFormat(nowDate.getSeconds());

    setTime({
      hour: hourTemp,
      minute: minuteTemp,
      second: secondTemp,
    });
    onClose();
  };

  const timeFormat = (time) => {
    let temp;

    if (time < 10) temp = `0${time}`;
    else temp = `${time}`;

    return temp;
  };

  const onClickTime = (type, e) => {
    setTime((prev) => ({ ...prev, [type]: e }));
  };

  return (
    <STimePicker open={open} position={position}>
      <div className="time-picker-background" onClick={onClose} />

      <div className="time-picker-container">
        <div className="time-pricker">
          <ul className="picker-time-panel-column">
            {hour &&
              hour?.map((item) => (
                <li
                  key={`hour-${item}`}
                  className={`prcker-time-panel-item ${time?.hour === item ? 'active' : ''}`}
                  onClick={() => onClickTime('hour', item)}
                >
                  <div>{item}</div>
                </li>
              ))}
          </ul>

          <ul className="picker-time-panel-column">
            {minute &&
              minute?.map((item) => (
                <li
                  key={`minute-${item}`}
                  className={`prcker-time-panel-item ${time?.minute === item ? 'active' : ''}`}
                  onClick={() => onClickTime('minute', item)}
                >
                  <div>{item}</div>
                </li>
              ))}
          </ul>

          <ul className="picker-time-panel-column">
            {second &&
              second?.map((item) => (
                <li
                  key={`second-${item}`}
                  className={`prcker-time-panel-item ${time?.second === item ? 'active' : ''}`}
                  onClick={() => onClickTime('second', item)}
                >
                  <div>{item}</div>
                </li>
              ))}
          </ul>
        </div>

        <div className="timepicker-today-container">
          <button className="timepicker-now-button" onClick={onClickNowTime}>
            Now
          </button>

          <button className="timepicker-submit-button" onClick={onClose}>
            OK
          </button>
        </div>
      </div>
    </STimePicker>
  );
};

export default TimePicker;
