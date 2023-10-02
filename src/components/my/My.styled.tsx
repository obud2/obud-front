import styled from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

export const SMy = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 80px 15px 32px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    padding: 10px 15px 32px;
  }

  .obud-my-article {
    width: 100%;

    display: flex;
    padding-top: 40px;

    ${MOBILE} {
      flex-direction: column;
      padding-top: 0;
    }

    .my-tab-container {
      width: 17%;
      height: auto;

      ${TABLET} {
        width: 13%;
      }

      ${MOBILE} {
        width: 100%;
        margin-bottom: 24px;

        display: none;
      }
    }

    .my-list-container {
      width: 83%;
      height: auto;

      ${TABLET} {
        width: 87%;
      }

      ${MOBILE} {
        width: 100%;
        margin-top: 20px;
      }
    }
  }
`;
