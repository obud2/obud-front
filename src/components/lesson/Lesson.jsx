import React, { useEffect, useState } from 'react';

import { SLesson } from './Lesson.styled';

import Steps from '@components/common/steps/Steps';
import ProductImages from '@components/studio/detail/images/ProductImages';
import ProductMap from '@components/studio/detail/map/ProductMap';
import ProductPolicy from '@components/studio/detail/policy/ProductPolicy';
import LessonOption from './option/LessonOption';
import LessonReservation from './option/LessonReservation';

const Lesson = ({ lesson }) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const temp = [{ label: 'Class', link: '/class' }];

    if (lesson?.studios?.title) {
      temp.push({ label: lesson?.studios?.title, link: `/class/${lesson?.studiosId}` });
    }

    if (lesson?.title) {
      temp.push({ label: lesson?.title, link: '' });
    }

    setSteps(temp);
  }, [lesson]);

  return (
    <SLesson>
      <section className="obud-lesson-detail-step-container">
        <Steps steps={steps} />
      </section>

      <section className="obud-lesson-detail-option-container">
        <div className="obud-images-container">
          <ProductImages images={lesson?.images || []} />
        </div>

        <div className="obud-option-container">
          <LessonOption data={lesson || {}} />
        </div>
      </section>

      {/* 예약하기 버튼 */}
      <LessonReservation data={lesson} />

      <section className="obud-line" />

      <section className="obud-lesson-detail-contents-container" dangerouslySetInnerHTML={{ __html: lesson?.contents || '' }} />

      <section className="obud-lesson-map">
        <ProductMap addr={lesson?.studios?.addr || ''} />
      </section>

      <section className="obud-lesson-policy">
        <ProductPolicy info={lesson?.studios?.information || ''} policy={lesson?.studios?.refundPolicy || ''} />
      </section>
    </SLesson>
  );
};

export default Lesson;
