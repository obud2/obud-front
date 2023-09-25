import React, { useEffect, useState } from 'react';

import { SCustomCheckBox, SCustomCheckBoxMore, SCheckBox } from './CustomCheckBox.style';
import { CustomCheckBoxProps } from './CustomCheckBox.props';

/**
 *
 * @param {*} more : 보기 버튼 활성화
 * @param {*} moreTitle : 보기 페이지 타이틀
 * @returns CheckBox
 */
const CustomCheckBox: React.FC<CustomCheckBoxProps> = ({ label, value, more, moreTitle, onClick, style, disabled }) => {
  const [isCheck, setIsCheck] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsCheck(value);
  }, [value]);

  const onClickCheckBoxHandle = () => {
    if (disabled) return;
    if (onClick) onClick(!isCheck);

    setIsCheck(!isCheck);
  };

  /**
   * Keybord Evnet
   */
  const onKeyEvnetHandle = (e: any) => {
    const KEYCODE = e.keyCode;
    const ENTER = 13;

    if (KEYCODE === ENTER) {
      onClickCheckBoxHandle();
    }
  };

  /**
   * 보기 상세 Open
   */
  const onClickMoreOpenHandle = () => {
    setIsOpen(true);
    bodyHiddenToggle(true);
  };

  /**
   * 보기 상세 Close
   */
  const onClickMoreCloseHandle = () => {
    setIsOpen(false);
    bodyHiddenToggle(false);
  };

  const bodyHiddenToggle = (swich: boolean) => {
    const body: any = document.querySelector('body');

    if (swich) {
      body.classList.add('hidden');
    } else {
      body.classList.remove('hidden');
    }
  };

  return (
    <>
      <SCustomCheckBox style={style} disabled={disabled} onKeyDown={onKeyEvnetHandle}>
        <CheckBox isCheck={isCheck} onClick={onClickCheckBoxHandle} />

        {label && (
          <label className="label" onClick={onClickCheckBoxHandle} tabIndex={0}>
            {label}
          </label>
        )}

        {more && (
          <button className="check-box-more" onClick={onClickMoreOpenHandle} tabIndex={0}>
            보기
          </button>
        )}
      </SCustomCheckBox>

      {isOpen && (
        <SCustomCheckBoxMore>
          <header className="checkbox-more-header">
            <p className="more-box-title">{moreTitle}</p>
            <button className="close-btn" onClick={onClickMoreCloseHandle} />
          </header>
          <div className="innerHtml" dangerouslySetInnerHTML={{ __html: more || '' }} />
        </SCustomCheckBoxMore>
      )}
    </>
  );
};

/**
 *
 * @param isCheck: boolean
 * @param onClick: Event
 * @returns CheckBox Icon
 */
const CheckBox = ({ isCheck, onClick }: { readonly isCheck: boolean; readonly onClick: any }): any => {
  return (
    <SCheckBox isCheck={isCheck} onClick={onClick}>
      <i className="check-icons" />
    </SCheckBox>
  );
};

export default CustomCheckBox;
