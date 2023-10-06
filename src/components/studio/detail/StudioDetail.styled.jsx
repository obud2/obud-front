import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = `${688 + 30}px`;

export const SStudioDetail = styled.article`
  width: 100%;

  max-width: ${PRODUCT_MAX_WIDTH};
  padding-top: 40px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;

  position: relative;

  ${MOBILE} {
    max-width: 100%;
    padding-top: 0;
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
      padding: 0 0 8px 15px;
    }
  }

  .obud-title-category-container {
    display: flex;
  }

  .obud-studio-tab-container {
    display: flex;
    font-size: 1.5rem;
    border-top: 0.5px solid rgb(217, 217, 217);
    border-bottom: 0.5px solid rgb(217, 217, 217);
    gap: 10px;
    justify-content: space-evenly;
    padding: 20px 0;

    .tab-button.active::after {
      content: '';
      position: absolute;
      bottom: -5px; /* Adjust this value to control the padding below the underline */
      left: 0;
      width: 100%;
      height: 2px; /* Adjust this value to control the underline thickness */
      background-color: blue; /* Change this to your preferred underline color */
    }
  }

  .obud-studio-category-container {
    /* width: 100%; */

    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 10px;

    gap: 1px;
    /* padding: 1px 0; */

    /* margin-bottom: 10px; */
    flex-wrap: wrap;

    .studio-category-item {
      width: auto;
      height: auto;
      display: flex;

      /* padding: 1px 8px; */

      font-size: 1.3rem;

      color: ${(props) => props.theme.main_color_slate_300};
      /* border: 1px solid ${(props) => props.theme.main_color_slate_300}; */

      p {
        position: relative;
        top: 1px;
      }

      ${MOBILE} {
        font-size: 1.1rem;
        padding: 2px 1px;

        /* border: 1px solid ${(props) => props.theme.main_color_slate_100}; */
      }
    }
  }

  .obud-studio-header {
    width: 100%;
    padding-bottom: 16px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    ${MOBILE} {
      border: none;
      padding: 0 15px;
      /* flex-direction: column; */
    }

    .obud-studio-title {
      flex: 1;

      font-size: 2.4rem;
      font-weight: 700;
      line-height: 140%;

      color: #0d0d0d;

      ${MOBILE} {
        font-size: 1.8rem;
      }
    }

    .obud-studio-icons {
      display: flex;

      gap: 20px;

      margin-left: 5px;

      ${MOBILE} {
        /* width: 100%; */
        margin: 15px 0 10px;
        gap: 10px;
      }
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
      /* padding: 0 ; */

      gap: 12px;
    }

    .obud-images-container {
      width: 100%;
      position: relative;
    }

    .obud-option-container {
      width: 100%;
      position: relative;
    }
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
      padding: 0 15px;

      overflow: hidden;
    }
  }

  .obud-studio-map {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 40px 0 104px;
    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
      padding: 24px 15px;
    }
  }
`;
