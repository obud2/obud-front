import React, { useEffect, useRef, useState } from 'react';

import { SAdressInput } from './AdressInput.styled';

import CustomLabel from '../label/CustomLabel';
import DaumPost from './DaumPost';

const AdressInput = ({ label, point, value, onChange, disabled }) => {
  const detailInputRef = useRef();

  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState({
    adr: '',
    detail: '',
  });

  useEffect(() => {
    if (value?.length > 0) {
      setBody({
        adr: value?.[0],
        detail: value?.[1],
      });
    }
  }, [value]);

  const onOpenAdrPost = () => {
    setIsOpen(true);
  };

  const onCloseAdrPost = () => {
    setIsOpen(false);
  };

  const onChangeInput = (type, e) => {
    if (type === 'adr') detailInputRef.current.focus();
    const temp = { ...body, [type]: e };

    onChange(temp);
    setBody(temp);
  };

  const onFocus = () => {
    setIsFocus(true);
  };

  const onBlur = () => {
    setIsFocus(false);
  };

  return (
    <SAdressInput disabled={disabled}>
      <CustomLabel label={label} point={point} />

      <div className={`adr-input-container ${isFocus ? 'active' : ''}`}>
        <input className="adr-input" placeholder="주소" readOnly value={body?.adr} onFocus={onOpenAdrPost} disabled={disabled} />

        <input
          ref={detailInputRef}
          className="adr-input detail"
          placeholder="상세 주소"
          value={body?.detail}
          onChange={(e) => onChangeInput('detail', e.target.value)}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      <DaumPost isOpen={isOpen} isClose={onCloseAdrPost} onChange={(e, extra) => onChangeInput('adr', `${e} (${extra})`)} />
    </SAdressInput>
  );
};

export default AdressInput;
