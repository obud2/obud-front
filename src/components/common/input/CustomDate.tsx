import React, { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { bodyHiddenToggle } from 'src/constants';

import { CustomDateProps } from './CustomDate.props';
import { SCustomDate } from './CustomDate.styled';

import DatePicker from './DatePicker';

const CustomDate: React.FC<CustomDateProps> = (props) => {
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

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (err) {
      dateRef.current.scrollIntoView({ block: 'center' });
    }
  }, [err]);

  useEffect(() => {
    bodyHiddenToggle(isOpen);
  }, [isOpen]);

  const onClickDateOpen = () => {
    if (disabled) return;

    setIsOpen(true);
  };

  return (
    <SCustomDate ref={dateRef} style={style} width={width} height={height} fontSize={fontSize} color={color} disabled={disabled}>
      <label className="custom-date-label">
        {label}
        {point && <i className="custom-date-label-point">*</i>}
      </label>

      <div className={`custom-date-container ${isOpen ? 'active' : ''} ${err ? 'error' : ''}`} onClick={onClickDateOpen}>
        <p>{value || placeholder}</p>

        <Image src="/icons/ic_date.png" alt="date" width="16px" height="18px" />
      </div>

      <DatePicker value={value} onChange={onChange} selectList={[]} allSelect={false} />
    </SCustomDate>
  );
};

export default CustomDate;
