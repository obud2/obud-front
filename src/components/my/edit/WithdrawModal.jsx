import React, { useState } from 'react';

import { userLogout } from 'src/constants';

import alert from 'src/helpers/alert';
import Modal from '@components/common/modal/Modal';
import { leaveUser } from 'src/service/UserService';

import { SWithdrawModal } from './WithdrawModal.styled';

import CustomButton from '@components/common/button/CustomButton';

const WithdrawModal = ({ isOpen, isClose }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onWithdraw = () => {
    setIsLoading(true);

    leaveUser()
      .then((res) => {
        if (res?.status === 200) {
          userLogout();
        } else {
          alert('', '회원탈퇴 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
        }
      })
      .catch(() => {
        alert('', '회원탈퇴 중 오류가 발생하였습니다. <br /> 잠시 후 다시시도해주세요.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal open={isOpen} close={isClose} disableEnforceFocus>
      <SWithdrawModal>
        <header className="withdraw-header">
          <h3>회원탈퇴</h3>
        </header>

        <main className="withdraw-main">
          <p>가입된 회원정보가 모두 삭제되며,</p>

          <p>본계정에 가진 모든 정보들은 복원되지 않습니다.</p>
          <br />
          <p>회원 탈퇴를 진행하시겠습니까?</p>
        </main>

        <footer className="withdraw-footer">
          <CustomButton fullWidth variant="outlined" onClick={isClose} disabled={isLoading}>
            취소
          </CustomButton>

          <CustomButton fullWidth onClick={onWithdraw} disabled={isLoading} isLoading={isLoading}>
            탈퇴
          </CustomButton>
        </footer>
      </SWithdrawModal>
    </Modal>
  );
};

export default WithdrawModal;
