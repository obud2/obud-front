import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = `${688 + 30}px`;

export const SStudioDetail = styled.article`
  width: 100%;
  max-width: ${PRODUCT_MAX_WIDTH};

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  position: relative;

  ${MOBILE} {
    max-width: 100%;
  }

  .obud-padding-container {
    padding: 40px 15px 0;

    ${MOBILE} {
      padding: 24px 15px;
    }
  }

  .obud-line {
    width: 100%;
    height: 1px;

    background-color: ${(props) => props.theme.main_color_slate_200};

    margin: 40px 0;

    ${MOBILE} {
      margin: 20px 0;
    }
  }

  .obud-studio-detail-step-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
      padding: 0 0 8px 0;
    }
  }

  .obud-studio-detail-option-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 40px;

    ${MOBILE} {
      display: flex;
      flex-direction: column;

      max-width: 100%;
      padding: 0;

      gap: 12px;
    }

    .obud-images-container {
      width: 100%;
      position: relative;

      .studio-detail-list {
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
  }

  .obud-option-container {
    width: 100%;
    position: relative;
  }

  .obud-studio-detail-contents-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    * {
      font-size: 1.6rem;

      img {
        width: 100%;
        height: auto;
      }
    }

    ${MOBILE} {
      width: 100%;
      padding: 0;

      overflow: hidden;
    }
  }

  .obud-studio-map {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 40px 0 104px;
    margin: 0 auto;

    font-size: 1.6rem;

    ${MOBILE} {
      max-width: 100%;
      padding: 24px 0px;
    }

    * {
      color: rgba(0, 0, 0, 0.5);
    }

    .obud-map-title {
      font-size: 1.7rem;
      font-weight: 700;
      line-height: 140%;

      padding-top: 15px;
      padding-bottom: 5px;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .obud-map-address {
      font-size: 1.3rem;
      padding-top: 5px;
    }
  }
`;
