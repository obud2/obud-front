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

    background-color: ${(props) => props.theme.main_color_slate_200};

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

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    gap: 40px;

    ${MOBILE} {
      display: flex;
      flex-direction: column;

      max-width: 100%;
      padding: 0;

      gap: 16px;
    }

    .obud-images-container {
      width: 100%;
      position: relative;
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

    margin: 8px auto 0;

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
    }
  }

  .obud-lesson-map {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 40px 0;
    margin: 0 auto;

    ${MOBILE} {
      max-width: 100%;
      padding: 24px 0px;
    }
  }

  .obud-lesson-policy {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};

    padding: 0 0 104px;
    margin: 0 auto;

    ${MOBILE} {
      width: 100%;
      padding: 24px 0px;
    }
  }
`;
