import React, { useRef, useEffect } from 'react';

import { SCustomRadio, SCustomRadioItem } from './CustomRadio.style';
import { CustomRadioItemProps, CustomRadioProps } from './CustomRadio.style.props';
import CustomLabel from '../label/CustomLabel';

/**
 *
 * @param param0
 * @returns CustomRadio
 */
const CustomRadio: React.FC<CustomRadioProps> = ({ label, point, children, value, onChange }) => {
  const radioRef = useRef<any>(null);

  useEffect(() => {
    /**
     * EventHandler
     */
    const onClickValueHandle = (e: any) => {
      const DISABLED = e.target.classList.contains('disabled');

      if (DISABLED) return;

      const event = {
        target: { value: e.target.dataset?.value, name: e.target?.name },
      };

      onChange(event);
    };

    const onKeyDownOpenHandle = (e: React.KeyboardEvent) => {
      const KEY = e.key || e.keyCode;
      const ENTER = 13;

      if (KEY === 'Enter' || KEY === ENTER) {
        onClickValueHandle(e);
      }
    };

    if (radioRef?.current) {
      if (radioRef?.current?.children?.length > 0) {
        for (let i = 0; i < radioRef.current.children?.length; i++) {
          radioRef.current.children[i].addEventListener('click', onClickValueHandle);
          radioRef.current.children[i].addEventListener('keydown', onKeyDownOpenHandle);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [radioRef]);

  useEffect(() => {
    if (radioRef?.current) {
      if (radioRef?.current?.children?.length > 0) {
        for (let i = 0; i < radioRef.current.children?.length; i++) {
          if (radioRef.current.children[i].dataset.value === value) {
            radioRef.current.children[i].classList.add('active');
          } else {
            radioRef.current.children[i].classList.remove('active');
          }
        }
      }
    }
  }, [radioRef, value]);

  return (
    <SCustomRadio ref={radioRef}>
      <CustomLabel label={label} point={point} />

      <div className="radio-item-container">{children}</div>
    </SCustomRadio>
  );
};

export const CustomRadioItem: React.FC<CustomRadioItemProps> = ({ value, isChecked, label, disabled }) => {
  return (
    <SCustomRadioItem
      className={`${isChecked ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
      value={value}
      disabled={disabled}
      data-value={value}
      tabIndex={0}
    >
      <span className="radio-item-button" />
      <span className="radio-item-label">{label}</span>
    </SCustomRadioItem>
  );
};

export default CustomRadio;
