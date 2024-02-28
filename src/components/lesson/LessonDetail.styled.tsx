import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = `${688 + 30}px`;

export const SLesson = styled.article`
  width: 100%;

  max-width: ${PRODUCT_MAX_WIDTH};
  padding: 40px 15px 0;

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  ${MOBILE} {
    max-width: 100%;
    padding: 0;
  }

  .obud-line {
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.core_color_slate_50};

    margin: 40px 0;

    ${MOBILE} {
      margin: 20px 0;
    }
  }

  .obud-lesson-detail-step-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
    }
  }

  .obud-lesson-detail-option-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto 12px;

    display: flex;
    flex-direction: column;
    gap: 40px;

    ${MOBILE} {
      display: flex;
      flex-direction: column;

      max-width: 100%;
      padding: 0;

      gap: 20px;
    }

    .obud-images-container {
      width: 100%;
      position: relative;

      .lesson-detail-list {
        display: none;
        ${MOBILE} {
          display: block;
        }
      }

      .product-images {
        ${MOBILE} {
          display: none;
        }
      }
    }

    .obud-option-container {
      width: 100%;
      position: relative;
      ${MOBILE} {
        padding: 0 15px;
      }
    }
  }

  .obud-lesson-detail-contents-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 20px auto;

    padding: 10px 16px;

    * {
      img {
        width: 100%;
        height: auto;
      }
    }

    ${MOBILE} {
      width: 100%;
      padding: 0 15px;
    }
  }

  .obud-lesson-map {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 40px 0;
    margin: 0 auto;

    ${MOBILE} {
      width: 100%;
      padding: 24px 0px;
    }
  }

  .obud-lesson-policy {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 0 0 104px;
    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
      padding: 0px 0px 24px;
    }
  }

  .obud-lesson-studio {
    padding: 32px 16px;

    .obud-lesson-studio-title {
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .line {
      padding: 8px;
      height: 1px;
      border-top: 1px solid ${(props) => props.theme.core_color_slate_50};
    }

    .studio-container {
      display: flex;

      .studio-image {
        border: 1px solid #e5e5e5 !important;
      }

      .detail-container {
        flex: 1;
        padding: 8px 16px;

        .title-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;

          .title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 4px;
          }

          .detail {
            margin: 5px 0 15px 0;
            font-size: 13px;
            color: #1d64d0;
            display: flex;
            align-items: center;
            cursor: pointer;
          }

          .arrow-icon {
            width: 7px;
            height: 7px;

            transform: rotate(45deg);
            border-top: 1px solid #1d64d0;
            border-right: 1px solid #1d64d0;

            margin-left: 3px;
            position: relative;
          }
        }
      }
    }
  }
`;
