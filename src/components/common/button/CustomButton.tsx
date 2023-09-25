import React, { useRef } from 'react';

import { SCustomButton } from './CustomButton.styled';
import { CustomButtonProps } from './CustomButton.props';

/**
 *
 * @param {*} variant : 버튼 모양 변형 종류
 *                      contained : 꽉찬 버튼 (default)
 *                      outlined : 윤곽 버튼
 *
 * @param {*} fullWidth : width : 100%
 *
 */
const CustomButton: React.FC<CustomButtonProps> = (props) => {
  const {
    id,
    className,

    // Style
    width,
    height,
    fontSize,
    fullWidth,
    margin,
    textColor,
    borderRadius,
    backgroundColor,
    borderColor,
    fontWeight,
    variant,
    style,

    // Event
    onClick,
    children,
    disabled,
    isLoading,
  } = props;

  const btnRef = useRef<HTMLButtonElement>(null);

  const onAction = (e: any) => {
    const ele: any = btnRef?.current;
    if (ele) {
      const top = ele?.getBoundingClientRect().top;
      const left = ele?.getBoundingClientRect().left;
      const x = e.clientX - left;
      const y = e.clientY - top;

      const action = document.createElement('span');
      action.className = 'active';
      action.style.left = `${x}px`;
      action.style.top = `${y}px`;

      ele.appendChild(action);

      setTimeout(() => {
        action.remove();
      }, 600);

      onClick?.(e);
    }
  };

  const onKeyDownOpenHandle = (e: React.KeyboardEvent) => {
    const KEY = e.key || e.keyCode;
    const ENTER = 13;

    if (KEY === 'Enter' || KEY === ENTER) {
      onAction(e);
    }
  };

  return (
    <SCustomButton
      ref={btnRef}
      id={id}
      className={className}
      style={style}
      width={width}
      height={height}
      margin={margin}
      fullWidth={fullWidth}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textColor={textColor}
      borderRadius={borderRadius}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      disabled={disabled}
      variant={variant}
      onClick={onAction}
      onKeyDown={onKeyDownOpenHandle}
      tabIndex={0}
    >
      <CustomButtonText isLoading={isLoading || false} children={children} />
    </SCustomButton>
  );
};

const CustomButtonText = ({ isLoading, children }: { readonly isLoading: boolean; readonly children: any }) => {
  return isLoading ? <i className="icons svg-loading" /> : children;
};

export default CustomButton;
