import React, { useEffect, useState, useRef } from 'react';

import { SCustomSelect, SSelectItemsContainer, SSelectItems, SSlectItemsBackground } from './CustomSelect.style';

import CustomLabel from '../label/CustomLabel';
import { CustomSelectProps, SelectItemsProps } from './CustomSelect.props';

/**
 * @returns 셀렉트 박스 기본 UI
 */
const CustomSelect: React.FC<CustomSelectProps> = ({
  className,
  style,
  label,
  point,

  variant,
  isError,
  disabled,
  textPosition,

  placeholder,
  value,
  onChange,
  children,
}) => {
  const selectRef = useRef<any>(null);
  const selectListRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState('');

  // Select Option AddEvent
  useEffect(() => {
    /**
     * EventHandler
     */
    const onClickValueHandle = (e: any) => {
      const DISABLED = e.target.classList.contains('disabled');

      if (DISABLED) return;

      const event = {
        target: { value: e.target?.dataset?.value, name: e.target?.name },
      };

      onChange(event);
      onClickCloseHandle();
    };

    if (selectListRef?.current) {
      if (selectListRef?.current?.children?.length > 0) {
        for (let i = 0; i < selectListRef.current.children?.length; i++) {
          selectListRef.current.children[i].addEventListener('click', onClickValueHandle);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Select Value / Option Value Check
  useEffect(() => {
    if (selectListRef?.current && value && isOpen) {
      if (selectListRef?.current?.children?.length > 0) {
        for (let i = 0; i < selectListRef.current.children?.length; i++) {
          if (value === selectListRef.current.children[i]?.dataset?.value) {
            selectListRef.current.children[i].classList.add('active');
          } else {
            selectListRef.current.children[i].classList.remove('active');
          }
        }
      }
    }
  }, [value, isOpen]);

  // Select List Box KeyBord Position
  useEffect(() => {
    if (selectListRef?.current && isOpen) {
      if (selectListRef?.current?.children?.length > 0) {
        for (let i = 0; i < selectListRef.current.children?.length; i++) {
          if (i === index) {
            selectListRef.current.children[i].classList.add('index');
          } else {
            selectListRef.current.children[i].classList.remove('index');
          }
        }

        const scrollTo = selectListRef.current.children[0].getBoundingClientRect().height * index;

        selectListRef.current.scrollTo({
          top: scrollTo,
        });
      }
    }
  }, [index, isOpen]);

  // Select List Box Keybord Evnet
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', keyboardController);
    }

    return () => window.removeEventListener('keydown', keyboardController);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Select List Box Scroll Move
  useEffect(() => {
    if (isOpen) {
      if (selectListRef?.current && isOpen) {
        if (selectListRef?.current?.children?.length > 0) {
          for (let i = 0; i < selectListRef.current.children?.length; i++) {
            if (selectListRef.current.children[i]?.value.toString() === value) {
              const scrollTo = selectListRef.current.children[i].offsetTop;

              selectListRef.current.scrollTo({ top: scrollTo });
            }
          }
        }
      }
    }
  }, [isOpen]);

  /**
   * Open
   */
  const onClickOpenHandle = () => {
    if (isOpen) return;
    if (disabled) return;

    positionSetting();
    bodyHiddenToggle(true);
    setIsOpen(true);
  };

  /**
   * Close
   */
  const onClickCloseHandle = () => {
    bodyHiddenToggle(false);
    setIsOpen(false);
  };

  /**
   * Keybord Evnet Enter Open
   */
  const onKeyDownOpenHandle = (e: any) => {
    const KEY = e.key || e.keyCode;
    const DOWN = 40;

    if (KEY === 'ArrowDown' || KEY === DOWN) {
      onClickOpenHandle();
    }
  };

  /**
   * 요소 위치 마다 포지션 변경
   */
  const positionSetting = () => {
    const ele: any = selectRef?.current;
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

  // 키보드 제어
  const keyboardController = (e: any) => {
    const MAX_INDEX = (selectListRef?.current?.children?.length || 0) - 1;
    const KEY_CODE = e?.keyCode;

    const UP = 38;
    const DOWN = 40;
    const ENTER = 13;
    const ESC = 27;

    switch (KEY_CODE) {
      case UP:
        e.preventDefault();
        setIndex((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            return prev;
          }
        });
        break;
      case DOWN:
        e.preventDefault();
        setIndex((prev) => {
          if (prev < MAX_INDEX) {
            return prev + 1;
          } else {
            return prev;
          }
        });
        break;
      case ENTER:
        e.preventDefault();
        const ele: any = document?.querySelector('.index') as HTMLElement;

        ele.click();
        break;
      case ESC:
        e.preventDefault();
        onClickCloseHandle();
        break;
    }
  };

  const bodyHiddenToggle = (toggle: boolean) => {
    const body: any = document.querySelector('body');

    if (toggle) {
      body.classList.add('hidden');
    } else {
      body.classList.remove('hidden');
    }
  };

  return (
    <SCustomSelect
      className={className}
      ref={selectRef}
      style={style}
      variant={variant}
      textPosition={textPosition}
      onClick={onClickOpenHandle}
      disabled={disabled}
    >
      <CustomLabel label={label} point={point} />

      <div
        className={`select-container ${isOpen ? 'active' : ''} ${disabled ? 'disabled' : ''} ${isError ? 'error' : ''}`}
        onKeyDown={onKeyDownOpenHandle}
        tabIndex={disabled ? -1 : 0}
      >
        <div className="select-text-arrow-container">
          <div className="select-text-box">{value || placeholder}</div>
          <span className="arrow" />
        </div>

        {isOpen && (
          <>
            <SSlectItemsBackground onClick={onClickCloseHandle} />

            <SSelectItemsContainer ref={selectListRef} position={position} role="listbox">
              {placeholder && (
                <SelectItems value={`placeholder_${placeholder}`} isDisabled>
                  {placeholder}
                </SelectItems>
              )}

              {children}
            </SSelectItemsContainer>
          </>
        )}
      </div>
    </SCustomSelect>
  );
};

/**
 * @returns Select 리스트 아이템
 * Select Basic Items
 */
export const SelectItems: React.FC<SelectItemsProps> = ({ children, value, isDisabled }) => {
  return (
    <SSelectItems value={value} data-value={value} tabIndex={0} role="option" className={isDisabled ? 'disabled' : ''}>
      {children}
    </SSelectItems>
  );
};

export default CustomSelect;
