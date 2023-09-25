import React, { useEffect, useState } from 'react';

import { SBirthForm } from './BirthForm.styled';

import CustomLabel from '../label/CustomLabel';
import CustomSelect, { SelectItems } from '../select/CustomSelect';

import { YEAR, MONTH, DAYS } from './BirthForm.option';

const BirthForm = ({ label, point, value, onChange, isError, disabled }) => {
  const [body, setBody] = useState({
    year: '1990',
    month: '',
    days: '',
  });

  useEffect(() => {
    if (value) {
      const temp = value?.split('-');

      setBody({ year: temp?.[0] || '', month: temp?.[1] || '', days: temp?.[2] || '' });
    }
  }, [value]);

  useEffect(() => {
    const temp = `${body?.year || ''}-${body?.month || ''}-${body?.days || ''}`;

    if (body?.year && onChange) {
      onChange(temp);
    }
  }, [body]);

  const onChangeSelect = (type, value) => {
    setBody((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <SBirthForm>
      <CustomLabel label={label} point={point} />

      <div className="birthday-form-container">
        <div className="select-item">
          <CustomSelect
            placeholder="년"
            value={body?.year || ''}
            isError={isError}
            disabled={disabled}
            onChange={(e) => onChangeSelect('year', e.target.value)}
          >
            {YEAR().map((item) => (
              <SelectItems key={item?.id} value={item?.id || ''}>
                {item?.value}
              </SelectItems>
            ))}
          </CustomSelect>
        </div>

        <div className="select-item">
          <CustomSelect
            placeholder="월"
            value={body?.month || ''}
            isError={isError}
            disabled={disabled}
            onChange={(e) => onChangeSelect('month', `00${e.target.value}`.slice(-2))}
          >
            {MONTH().map((item) => (
              <SelectItems key={item?.id} value={item?.id || ''}>
                {item?.value}
              </SelectItems>
            ))}
          </CustomSelect>
        </div>

        <div className="select-item">
          <CustomSelect
            placeholder="일"
            value={body?.days || ''}
            isError={isError}
            disabled={disabled}
            onChange={(e) => onChangeSelect('days', `00${e.target.value.toString()}`.slice(-2))}
          >
            {DAYS(body?.year || '', body?.month || '').map((item) => (
              <SelectItems key={item?.id} value={item?.id || ''}>
                {item?.value}
              </SelectItems>
            ))}
          </CustomSelect>
        </div>
      </div>
    </SBirthForm>
  );
};

export default BirthForm;
