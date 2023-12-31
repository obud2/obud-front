import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = `${688 + 30}px`;

export const SProductPolicy = styled.div`
  width: 100%;
  max-width: ${PRODUCT_MAX_WIDTH};

  padding: 20px 16px;

  margin: 0 auto;

  display: flex;
  flex-direction: column;
  gap: 17px;

  ${MOBILE} {
    width: 100%;
  }

  .product-policy-container {
    width: 100%;
    max-width: ${PRODUCT_MAX_WIDTH};
    display: flex;
    flex-direction: column;

    gap: 9px;

    ${MOBILE} {
      gap: 4px;
    }

    .product-policy-title {
      width: 100%;
      display: flex;
      align-items: center;

      gap: 10px;

      font-size: 1.7rem;
      font-weight: 700;
      line-height: 140%;

      padding-top: 15px;

      ${MOBILE} {
        font-size: 1.6rem;
      }

      .icons {
        width: 20px;
        height: 20px;

        ${MOBILE} {
          width: 16px;
          height: 16px;
        }
      }
    }

    .product-policy-contents {
      width: 100%;

      white-space: pre-line;
      word-break: keep-all;

      font-size: 14px;
      font-weight: 400;
      line-height: 140%;

      border-top: 1px solid ${(props) => props.theme.core_color_slate_50};
      padding-top: 15px;
    }
  }
`;
