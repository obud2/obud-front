import { SMain } from './Main.styled';

import styled from 'styled-components';
import Image from 'next/image';

export const AutoHeightImageWrapper = styled.div`
  width: 100%;

  & > span {
    position: relative !important;

    & .autoImage {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

const Main = () => {
  return (
    <SMain>
      <div className="obud-main-shadow-container">
        <div style={{ width: '100%', height: '100%', position: 'relative', backgroundColor: '#ffffff' }}>
          <Image src="/img/site-renewal.png" layout="fill" objectFit="contain" alt="obud-log" />
        </div>
      </div>
    </SMain>
  );
};

export default Main;
