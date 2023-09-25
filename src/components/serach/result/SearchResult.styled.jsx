import styled from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

export const SSearchResult = styled.div`
  width: 100%;

  padding: 60px 0 60px;

  ${MOBILE} {
    padding: 30px 0 40px;
  }

  .search-keyword-container {
    max-width: ${MAX_WIDTH};
    padding: 0 15px;
    padding-bottom: 30px;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    color: ${(props) => props.theme.main_color_slate_300};

    ${TABLET} {
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      max-width: 100%;
      font-size: 1.4rem;
    }

    .search-icon {
      width: 45px;
      height: 45px;
      border-radius: 50%;

      background-color: rgb(238, 238, 238);

      display: flex;
      justify-content: center;
      align-items: center;

      margin-right: 15px;

      ${MOBILE} {
        width: 35px;
        height: 35px;
      }

      .icons {
        width: 20px;
        height: 20px;

        ${MOBILE} {
          width: 15px;
          height: 15px;
        }
      }
    }

    .result-title {
      font-size: 1.8rem;
      font-weight: 600;

      color: rgb(46, 46, 46);

      margin-bottom: 3px;

      ${MOBILE} {
        font-size: 1.5rem;
      }
    }

    .result-length {
      font-size: 1.4rem;
      color: rgb(85, 85, 85);

      b {
        color: ${(props) => props.theme.main_color_slate_400};
      }

      ${MOBILE} {
        font-size: 1.2rem;
      }
    }
  }
`;
