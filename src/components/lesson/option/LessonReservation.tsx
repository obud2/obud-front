import { useState } from 'react';

import { RiArrowUpSFill } from 'react-icons/ri';
import { SLessonReservation } from './LessonReservation.styled';

import CustomButton from '@/components/common/button/CustomButton';
import { Lesson } from '@/entities/lesson';
import LessonReservationDrawer from './LessonReservationDrawer';

type Props = {
  lesson: Lesson;
};

const LessonReservation = ({ lesson }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SLessonReservation>
        <nav className="lesson-bottombar-container">
          <div className="lesson-bottombar-header" onClick={() => setIsOpen(true)}>
            <button className="lesson-drawer-close-button">
              <RiArrowUpSFill />
            </button>
          </div>

          <div className="lesson-bottombar-box">
            <CustomButton fullWidth variant="outlined" onClick={() => setIsOpen(true)}>
              장바구니
            </CustomButton>

            <CustomButton fullWidth onClick={() => setIsOpen(true)}>
              예약하기
            </CustomButton>
          </div>
        </nav>
      </SLessonReservation>

      {/* 버튼 누를 시 모달 업 */}
      <LessonReservationDrawer lesson={lesson} isOpen={isOpen} isClose={() => setIsOpen(false)} />
    </>
  );
};

export default LessonReservation;
