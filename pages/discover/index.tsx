import styled from 'styled-components';

import Layout from '@components/layout/Layout';
import MetaHeader from '@components/common/meta/MetaHeader';
import Discover from '@/components/discover/Discover';
import { TopbarMobileHeight, TopbarHeight } from '@/components/layout/Layout.styled';
import { MOBILE } from '@/styled/variablesStyles';
import { GetServerSidePropsContext } from 'next';
import { SearchService } from '@/service/SearchService';
import { Place } from '@/entities/place';
import { format } from 'date-fns';
import { TimeValueMap } from '@/components/discover/filter-modal/filter-box/FilterSlider';

type Props = {
  places: Place[];
};

const Index = ({ places }:Props) => {
   return (
     <Layout footerHide>
       <MainContainer>
         <MetaHeader title="obud :: 검색" />
         <Discover places={places} />
       </MainContainer>
     </Layout>
  );
};

export const MainContainer = styled.main`
  width: 100%;
  height: calc(100vh - ${TopbarHeight});

  ${MOBILE} {
    margin-top: ${TopbarMobileHeight};
  }
`;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // eslint-disable-next-line prefer-const
  let { categoryIds, date, startTime, endTime } = context.query;
  if (!date) {
    date = format(new Date(), 'yyyy-MM-dd');
  }

  if (startTime) {
    startTime = TimeValueMap.find((item) => item.value === (startTime ? parseInt(startTime as string, 10) : 0))?.time.toString();
  }

  if (endTime) {
    endTime = TimeValueMap.find((item) => item.value === (endTime ? parseInt(endTime as string, 10) : 0))?.time.toString();
  }

  const places = await SearchService.aroundSearch({ categoryIds: categoryIds as string[], date: date as string, startTime: startTime as string, endTime: endTime as string, latitude: 37.5634554, longitude: 127.0375937 });

  return {
    props: { places: places.value },
  };
};

export default Index;
