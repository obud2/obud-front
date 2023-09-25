import React, { useEffect, useRef, useState } from 'react';

import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { SCustomInput } from './CustomInput.styled';

import { CustomInputProps } from './CustomInput.props';
import CustomLabel from '../label/CustomLabel';

/**
 *
 * @param {*} variant : 인풋 모양 변형 종류
 *                      contained : 꽉찬 인풋 (default)
 *                      outlined : 하단 인풋
 *
 * @param props
 * @returns CustomInput
 */
const CustomInput: React.FC<CustomInputProps> = (props) => {
  const {
    label,
    point,
    isError,
    color,

    type,
    placeholder,
    name,
    value,
    disabled,
    maxLength,

    // Style
    style,
    width,
    height,
    fontSize,
    variant,

    // Event
    onChange,
    onKeyDown,
  } = props;
  const inputRef = useRef<any>(null);

  const [_type, setType] = useState(type);

  const [isFocus, setIsFocus] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isError) {
      inputRef.current.focus();
    }
  }, [isError]);

  /**
   * Type : Password Event
   */
  const handlePasswordType = () => {
    if (isVisible) {
      setIsVisible(false);
      setType('password');
    } else {
      setIsVisible(true);
      setType('text');
    }
  };

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
    <SCustomInput style={style} width={width} height={height} fontSize={fontSize} color={color} variant={variant} disabled={disabled}>
      <CustomLabel label={label} point={point} />

      <div className={`custom-input-container ${isFocus ? 'active' : ''} ${isError ? 'error' : ''}`}>
        <input
          className="custom-input"
          type={_type}
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
          readOnly={!onChange}
        />

        {type === 'password' &&
          (isVisible ? (
            <span className="password-icon" onClick={handlePasswordType}>
              <BsEye />
            </span>
          ) : (
            <span className="password-icon" onClick={handlePasswordType}>
              <BsEyeSlash />
            </span>
          ))}
      </div>
    </SCustomInput>
  );
};

export default CustomInput;
