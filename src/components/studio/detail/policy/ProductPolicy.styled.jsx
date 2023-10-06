import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SProductPolicy = styled.div`
  width: 100%;

  padding: 32px 40px;

  border-top: 1px solid ${(props) => props.theme.main_color_slate_200};
  border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

  /* background-color: ${(props) => props.theme.main_color_slate_500}; */

  display: flex;
  flex-direction: column;
  gap: 17px;

  ${MOBILE} {
    width: 100%;

    padding: 16px;
  }

  .product-policy-container {
    width: 100%;
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

      color: rgba(0, 0, 0, 0.5);

      ${MOBILE} {
        font-size: 1.5rem;
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

      font-size: 1.6rem;
      font-weight: 400;
      line-height: 140%;

      color: rgba(0, 0, 0, 0.5);
      padding-left: 30px;

      ${MOBILE} {
        font-size: 1.4rem;
        padding-left: 24px;
      }
    }
  }
`;
