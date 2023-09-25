import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { bodyHiddenToggle } from 'src/constants';

import { CustomTimeProps } from './CustomTime.props';
import { SCustomTime } from './CustomTime.styled';
import TimePicker from './TimePicker';

const CustomTime: React.FC<CustomTimeProps> = (props) => {
  const {
    label,
    point,
    err,
    color,

    disabled,
    placeholder,

    // Style
    style,
    width,
    height,
    fontSize,

    // Event
    value,
    onChange,
  } = props;
  const dateRef = useRef<any>(null);

  const [position, setPosition] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (err) {
      dateRef.current.focus();
    }
  }, [err]);

  useEffect(() => {
    bodyHiddenToggle(isOpen);
  }, [isOpen]);

  /**
   * 요소 위치 마다 포지션 변경
   */
  const positionSetting = () => {
    const ele = dateRef?.current;

    if (ele) {
      const INNER_HEIGHT = window.innerHeight;
      const TOP = ele?.getBoundingClientRect().top;

      if (INNER_HEIGHT - TOP < 100) {
        setPosition('middle');
      } else if (INNER_HEIGHT / 2 < TOP) {
        setPosition('top');
      } else {
        setPosition('bottom');
      }
    }
  };

  const onClickTimeOpen = () => {
    if (disabled) return;

    positionSetting();
    setIsOpen(true);
  };

  const onClickTimeClose = () => {
    setIsOpen(false);
  };

  return (
    <SCustomTime ref={dateRef} style={style} width={width} height={height} fontSize={fontSize} color={color} disabled={disabled}>
      <label className="custom-time-label">
        {label}
        {point && <i className="custom-time-label-point">*</i>}
      </label>

      <div className={`custom-time-container ${isOpen ? 'active' : ''} ${err ? 'error' : ''}`} onClick={onClickTimeOpen}>
        <p>{value || placeholder}</p>

        <Image src="/icons/ic_time.png" alt="time" width="18px" height="18px" />
      </div>

      <TimePicker open={isOpen} onClose={onClickTimeClose} value={value} onChange={onChange} position={position} />
    </SCustomTime>
  );
};

export default CustomTime;
