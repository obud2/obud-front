import React, { useState } from 'react';

import { RiArrowUpSFill } from 'react-icons/ri';
import { SLessonReservation } from './LessonReservation.styled';

import CustomButton from '@components/common/button/CustomButton';
import LessonReservationDrawer from './LessonReservationDrawer';

const LessonReservation = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickOpen = () => {
    setIsOpen(true);
  };

  return (
    <React.Fragment>
      <SLessonReservation>
        <nav className="lesson-bottombar-container">
          <div className="lesson-bottombar-header" onClick={onClickOpen}>
            <button className="lesson-drawer-close-button">
              <RiArrowUpSFill />
            </button>
          </div>

          <div className="lesson-bottombar-box">
            <CustomButton fullWidth variant="outlined" onClick={onClickOpen}>
              장바구니
            </CustomButton>

            <CustomButton fullWidth onClick={onClickOpen}>
              예약하기
            </CustomButton>
          </div>
        </nav>
      </SLessonReservation>

      {/* 버튼 누를 시 모달 업 */}
      <LessonReservationDrawer lesson={data} isOpen={isOpen} isClose={() => setIsOpen(false)} />
    </React.Fragment>
  );
};

export default LessonReservation;
