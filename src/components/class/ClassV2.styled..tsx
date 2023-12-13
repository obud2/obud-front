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

    .class-section-container {
      margin-bottom: 8px;
      padding: 12px;

      .section-title-container {
        margin-bottom: 12px;
        .section-title {
          font-size: 14px;
          font-weight: bold;
        }
      }

      .section-studio-container {
        .section-studio-item {
          margin-right: 12px;
        }
      }
    }
  }
`;
