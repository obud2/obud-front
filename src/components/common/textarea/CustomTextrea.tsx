import React, { useEffect, useRef, useState } from 'react';

import { SCustomTextarea } from './CustomTextrea.styled';

import { CustomTextareaProps } from './CustomTextrea.props';
import CustomLabel from '../label/CustomLabel';

/**
 *
 * @param props
 * @returns CustomInput
 */
const CustomTextrea: React.FC<CustomTextareaProps> = (props) => {
  const {
    label,
    point,
    err,

    placeholder,
    name,
    value,
    disabled,
    maxLength,
    rows,

    // Style
    style,
    width,
    height,
    fontSize,

    // Event
    onChange,
    onKeyDown,
  } = props;
  const inputRef = useRef<any>(null);

  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (err) {
      inputRef.current.focus();
    }
  }, [err]);

  /**
   * Input Focus Check
   */
  const onFocus = () => {
    setIsFocus(true);
  };

  /**
   * Input Blur Check
   */
  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <SCustomTextarea style={style} width={width} height={height} fontSize={fontSize} disabled={disabled}>
      <CustomLabel label={label} point={point} />

      <div className={`custom-textarea-container ${isFocus ? 'active' : ''} ${err ? 'error' : ''}`}>
        <textarea
          className="custom-textarea"
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          ref={inputRef}
          rows={rows}
        />
      </div>
    </SCustomTextarea>
  );
};

export default CustomTextrea;
