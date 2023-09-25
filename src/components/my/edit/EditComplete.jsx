import React from 'react';

import { SEditComplete } from './EditComplete.styled';
import CustomButton from '@components/common/button/CustomButton';

const EditComplete = ({ onStepChange }) => {
  return (
    <SEditComplete>
      <h4 className="password-check-title">프로필 수정이 완료되었습니다.</h4>

      <CustomButton fullWidth variant="outlined" onClick={() => onStepChange(1)}>
        돌아가기
      </CustomButton>
    </SEditComplete>
  );
};

export default EditComplete;
