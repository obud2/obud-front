import React from 'react';

import { SLessonOption } from './LessonOption.styled';

import Share from '@components/option/Share';

const LessonOption = ({ data, shareHide }) => {
  return (
    <SLessonOption>
      <div className="obud-lesson-header">
        <div className="obud-lesson-title-container">
          <h5 className="obud-lesson-subTitle">{data?.studios?.title || ''}</h5>
          <h4 className="obud-lesson-title">{data?.title || ''}</h4>
        </div>

        <div className="obud-lesson-option">
          <Share data={data} title={data?.title || ''} isHide={shareHide} />
        </div>
      </div>
    </SLessonOption>
  );
};

export default LessonOption;
