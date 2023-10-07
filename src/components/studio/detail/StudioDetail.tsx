import { Studio } from '@/entities/studio';
import Steps from '@components/common/steps/Steps';
import { useEffect, useState } from 'react';
import ProductImages from './images/ProductImages';
import ProductMap from './map/ProductMap';
import ClassListBox from './option/ClassListBox';
import StudioOption from './option/StudioOption';
import { SStudioDetail } from './StudioDetail.styled';

type Props = {
  studio: Studio;
};

const StudioDetail = ({ studio }: Props) => {
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    const temp = [{ label: 'Class', link: '/class' }];

    if (studio?.title) {
      temp.push({ label: studio?.title, link: '' });
    }

    setSteps(temp);
  }, [studio]);

  return (
    <>
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
    </>
  );
};

export default StudioDetail;
