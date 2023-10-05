import React, { useEffect, useState } from 'react';

import { SStudioDetail } from './StudioDetail.styled';

import Steps from '@components/common/steps/Steps';
import ProductImages from './images/ProductImages';
import StudioOption from './option/StudioOption';
import ProductMap from './map/ProductMap';

import ClassList from './option/ClassList';

import WishService from 'src/service/WishService';
import Share from '@components/option/Share';
import Like from '@components/option/Like';

const StudioDetail = ({ studio }) => {
  const [steps, setSteps] = useState([]);
  const [selectedTab, setSelectedTab] = useState('home');
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const onClickWish = async (checked) => {
    if (checked) {
      await WishService.deleteWish(data?.wishInfo?.wishId);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    } else {
      await WishService.setWish(data?.id);
      queryClient.invalidateQueries(['my-wish-list'], { refetchInactive: true });
    }
  };

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
        <section className="obud-studio-detail-option-container">
          <div className="obud-images-container">
            <ProductImages images={studio?.images || []} />
          </div>

          <div className="obud-studio-header">
            <div className="obud-title-category-container">
              <h4 className="obud-studio-title">{studio?.title || ''}</h4>
              <div className="obud-studio-category-container">
                {studio &&
                  studio?.category?.length > 0 &&
                  studio?.category?.map((item, index) => (
                    <div key={item} className="studio-category-item">
                      <p>{item}</p>
                      {index < studio.category.length - 1 && <span>,</span>}
                    </div>
                  ))}
              </div>
            </div>
            <div className="obud-studio-icons">
              <Like value={studio?.wishInfo?.isWish ?? false} onClick={onClickWish} />

              <Share data={studio} title={studio?.title || ''} />
            </div>
          </div>
          <section className="obud-studio-tab-container">
            <button className={`tab-button ${selectedTab === 'home' ? 'active' : ''}`} onClick={() => handleTabChange('home')}>
              홈
            </button>
            <button
              className={`tab-button ${selectedTab === 'reservations' ? 'active' : ''}`}
              onClick={() => handleTabChange('reservations')}
            >
              예약
            </button>
          </section>
          {selectedTab === 'home' && (
            <React.Fragment>
              <section className="obud-option-container">
                <StudioOption data={studio || {}} />
              </section>
              <section className="obud-line" />
              <section className="obud-studio-detail-contents-container" dangerouslySetInnerHTML={{ __html: studio?.contents || '' }} />
              <section className="obud-studio-map">
                <ProductMap addr={studio?.addr || ''} />
              </section>
            </React.Fragment>
          )}

          {selectedTab === 'reservations' && <ClassList id={studio?.id || ''} />}
        </section>
      </SStudioDetail>
    </React.Fragment>
  );
};

export default StudioDetail;
