import styled from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

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
      width: 100%;
      max-width: ${MAX_WIDTH};
      padding: 40px 15px;
      padding-bottom: 32px;

      margin: 0 auto;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }

      ${MOBILE} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;

        max-width: 100%;
        padding: 0 15px;
      }

      display: flex;
      justify-content: flex-start;
      padding: 12px;
      margin-bottom: 35px;

      div {
        margin-right: 8px;
      }
    }

    .class-section-container {
      width: 100%;
      max-width: ${MAX_WIDTH};
      padding: 60px 15px;
      padding-bottom: 32px;

      margin: 0 auto;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }

      margin-bottom: 12px;
      padding: 15px;

      ${MOBILE} {
        margin-bottom: 8px;

        max-width: 100%;
        padding: 20px 0 20px 15px;
      }

      .section-title-container {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .section-title {
          font-size: 1.8rem;
          font-weight: bold;

          ${MOBILE} {
            font-size: 1.6rem;
          }
        }

        .section-more {
          font-size: 1.4rem;
          color: ${(props) => props.theme.core_color_slate_400};
          margin-right: 10px;
          cursor: pointer;

          ${MOBILE} {
            font-size: 1.3rem;
          }
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
