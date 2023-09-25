import React, { useContext, useEffect } from 'react';

import { SMyEdit } from './MyEdit.styled';
import { UserContext } from 'src/context/UserContext';

import PasswordCheck from './PasswordCheck';

import useProfileStep from 'src/store/useProfileStep';
import MyEditForm from './MyEditForm';
import EditComplete from './EditComplete';

const MyEdit = () => {
  const { user } = useContext(UserContext);
  const { isStep, onStepChange } = useProfileStep((state) => ({
    isStep: state.isStep,
    onStepChange: state.onStepChange,
  }));

  useEffect(() => {
    if (user?.isSns) {
      onStepChange(2);
    }
  }, [user]);

  return (
    <SMyEdit>
      {isStep === 1 && <PasswordCheck onStepChange={onStepChange} />}

      {isStep === 2 && <MyEditForm onStepChange={onStepChange} />}

      {isStep === 3 && <EditComplete onStepChange={onStepChange} />}
    </SMyEdit>
  );
};

export default MyEdit;
