import React, { useEffect, useState } from 'react';

import { SStudioDetail } from './StudioDetail.styled';

import Steps from '@components/common/steps/Steps';
import ProductImages from './images/ProductImages';
import StudioOption from './option/StudioOption';
import ProductMap from './map/ProductMap';

import ClassListBox from './option/ClassListBox';

const StudioDetail = ({ studio }) => {
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const temp = [{ label: 'Class', link: '/class' }];

    if (studio?.title) {
      temp.push({ label: studio?.title, link: '' });
    }

    setSteps(temp);
  }, [studio]);

  return (
    <React.Fragment>
      <SStudioDetail>
        <section className="obud-studio-detail-step-container">
          <Steps steps={steps} />
        </section>

        <section className="obud-studio-detail-option-container">
          <div className="obud-images-container">
            <ProductImages images={studio?.images || []} />
          </div>

          <div className="obud-option-container">
            <StudioOption data={studio || {}} />
          </div>
        </section>

        <section className="obud-line" />

        <section className="obud-studio-detail-contents-container" dangerouslySetInnerHTML={{ __html: studio?.contents || '' }} />

        <section className="obud-studio-map">
          <ProductMap addr={studio?.addr || ''} />
        </section>
      </SStudioDetail>

      {/* 예약목록 */}
      <ClassListBox id={studio?.id || ''} />
    </React.Fragment>
  );
};

export default StudioDetail;
