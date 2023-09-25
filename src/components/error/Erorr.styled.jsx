import styled from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

export const SErorr = styled.div`
  width: 100vw;
  height: 100vh;

  background-color: #f6f6f8;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  .error-container {
    width: 100%;
    max-width: ${MAX_WIDTH};
    padding: 0 15px;

    margin: 10% auto;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 30px;

    ${TABLET} {
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      max-width: 100%;
      flex-direction: column;

      margin: 15% auto;
    }

    .error-text-container {
      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-end;

      ${MOBILE} {
        align-items: center;
      }

      h1 {
        font-weight: 900;
        font-size: 85px;
        color: #344235;
        margin-top: 0.3em;
        margin-bottom: -20px;
      }

      h3 {
        font-size: 34px;
        color: #344235;
        margin: 0 0 1.3em;
        font-weight: normal;
      }

      p {
        font-size: 15px;
        color: #7f8a98;
        margin: 0 0 3px;
      }

      a {
        display: block;
        margin-top: 20px;

        font-size: 15px;
        color: #344235;
      }
    }

    .error-img-container {
      width: 100%;

      ${MOBILE} {
        display: none;
      }
    }
  }
`;
