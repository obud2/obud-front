import styled from 'styled-components';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import Discover from '@/components/discover/Discover';
import { TopbarMobileHeight, TopbarHeight } from '@/components/layout/Layout.styled';
import { MOBILE } from '@/styled/variablesStyles';

const Index = () => {
  return (
    <Layout footerHide>
      <MainContainer>
        <MetaHeader title="obud :: 검색" />
        <Discover />
      </MainContainer>

    </Layout>
  );
};

export default Index;

export const MainContainer = styled.main`
  width: 100%;
  height: calc(100vh - ${TopbarHeight});

  ${MOBILE} {
    margin-top: ${TopbarMobileHeight};
  }
`;
