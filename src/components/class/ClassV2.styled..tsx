import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SClass = styled.div`
  width: 100%;

  .obud-class-article {
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 104px 0 60px;

    ${MOBILE} {
      padding: 0 0 40px;
    }

    .class-container {
      width: 100%;
      height: auto;
    }

    .class-category {
      display: flex;
      justify-content: flex-start;
      padding: 12px;
      margin-bottom: 12px;

      div {
        margin-right: 8px;
      }
    }
  }
`;
