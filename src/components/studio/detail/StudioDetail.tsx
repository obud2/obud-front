import { TabPane, Tabs } from '@/components/common/tab/Tabs';
import Like from '@/components/option/Like';
import Share from '@/components/option/Share';
import { Studio } from '@/entities/studio';
import WishService from '@/service/WishService';
import { useQueryClient } from 'react-query';
import ProductImages from './images/ProductImages';
import ProductMap from './map/ProductMap';
import ClassList from './option/ClassList';
import StudioOption from './option/StudioOption';
import { SStudioOption } from './option/StudioOption.styled';
import { SStudioDetail } from './StudioDetail.styled';
import StudioDetailList from './StudioDetailList';

type Props = {
  studio: Studio;
};

export type StudioTabType = 'home' | 'reservation';

const StudioDetail = ({ studio }: Props) => {
  const queryClient = useQueryClient();

  const onClickWish = async (checked: boolean) => {
    if (checked) {
      await WishService.deleteWish(studio?.wishInfo?.wishId);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    } else {
      await WishService.setWish(studio?.id);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    }
  };

  return (
    <SStudioDetail>
      <section className="obud-studio-detail-option-container">
        <div className="obud-images-container">
          <div className="studio-detail-list">
            <StudioDetailList studio={studio} />
          </div>
          <div className="product-images">
            <ProductImages images={studio?.images || []} />
          </div>
        </div>
      </section>

      <SStudioOption>
        <div className="obud-studio-header">
          <h4 className="obud-studio-title">{studio?.title || ''}</h4>
          <div className="obud-studio-category-container">{studio?.category.join(', ')}</div>
          <div className="obud-studio-icons">
            <Like value={studio?.wishInfo?.isWish ?? false} onClick={onClickWish} />
            <Share isHide={false} data={studio} title={studio?.title || ''} />
          </div>
        </div>
      </SStudioOption>

      <Tabs>
        <TabPane tab="home" tabName="홈">
          <div className="obud-padding-container">
            <section className="obud-studio-detail-contents-container" dangerouslySetInnerHTML={{ __html: studio?.contents || '' }} />
            <section className="obud-line" />
            <div className="obud-option-container">
              <StudioOption studio={studio || {}} />
            </div>
            <section className="obud-line" />
            <section className="obud-studio-map">
              <div className="obud-map-title">위치 정보</div>
              <ProductMap addr={studio?.addr || ''} />
              <div className="obud-map-address">{studio?.addr || ''}</div>
            </section>
          </div>
        </TabPane>
        <TabPane tab="reservation" tabName="예약">
          <ClassList studioId={studio?.id || ''} />
        </TabPane>
      </Tabs>
    </SStudioDetail>
  );
};

export default StudioDetail;
