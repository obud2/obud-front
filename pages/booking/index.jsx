import React from 'react';

import Layout from '@components/layout/Layout';
import Booking from '@components/booking/Booking';

const Index = () => {
  return (
    <Layout scrollBtnHide addonBeforeHeader="backTic" addonAfterHeader="empty" headerTitle="예약하기" mobileNavigationHide>
      <Booking />
    </Layout>
  );
};

export default Index;
