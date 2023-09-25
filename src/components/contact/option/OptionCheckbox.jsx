import React, { useEffect, useState } from 'react';

import _ from 'lodash';

import { SOptionCheckbox } from './OptionCheckbox.styled';
import CustomCheckBox from '@components/common/checkbox/CustomCheckBox';
import CustomLabel from '@components/common/label/CustomLabel';

const OptionCheckbox = ({ label, point, option, disabled, onChange }) => {
  const [body, setBody] = useState([]);

  useEffect(() => {
    if (onChange) {
      onChange(body);
    }
  }, [body]);

  const onClickCheckbox = (e) => {
    const temp = _.cloneDeep(body);
    const findIndex = temp?.findIndex((a) => a === e);

    if (findIndex > -1) {
      temp.splice(findIndex, 1);
    } else {
      temp.push(e);
    }

    setBody(temp);
  };

  return (
    <SOptionCheckbox>
      <CustomLabel label={label} point={point} />

      <div className="option-list-container">
        {option &&
          option?.length > 0 &&
          option?.map((item) => {
            const checked = body?.includes(item?.id);

            return (
              <div key={item?.id} className="option-item">
                <CustomCheckBox label={item?.label} value={checked} disabled={disabled} onClick={() => onClickCheckbox(item?.id)} />
              </div>
            );
          })}
      </div>
    </SOptionCheckbox>
  );
};

export default OptionCheckbox;
