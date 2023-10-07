import { Studio } from '@/entities/studio';
import ProductMap from './map/ProductMap';
import ClassListBox from './option/ClassListBox';
import StudioOption from './option/StudioOption';
import { SStudioDetail } from './StudioDetail.styled';
import StudioDetailList from './StudioDetailList';

type Props = {
  studio: Studio;
};

const StudioDetail = ({ studio }: Props) => {
  return (
    <>
      <SStudioDetail>
        <section className="obud-studio-detail-option-container">
          <div className="obud-images-container">
            <StudioDetailList studio={studio} />
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
