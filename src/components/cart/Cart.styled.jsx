import styled from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

export const SCart = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  .obud-cart-article {
    width: 100%;

    display: flex;
    flex-direction: column;

    ${MOBILE} {
      margin-bottom: 60px;
    }

    .cart-item-header-container {
      width: 100%;
      padding: 13px 0;

      display: flex;
      align-items: center;

      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

      ${MOBILE} {
        padding: 10px 0;
        border-top: 1px solid ${(props) => props.theme.main_color_slate_200};
      }

      .cart-select-container {
        min-width: 24px;
        height: 100%;

        margin: 0 16px;

        ${MOBILE} {
          margin: 0;
        }
      }

      .cart-item-header {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: flex-start;

        ${MOBILE} {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .cart-header-item {
          flex: 1;

          font-size: 1.4rem;
          font-weight: 400;
          line-height: 140%;

          text-align: center;

          color: ${(props) => props.theme.main_color_slate_400};

          &:first-child {
            flex: 3;
          }

          ${MOBILE} {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);

            &:nth-child(n + 2) {
              display: none;
            }
          }
        }
      }
    }

    .cart-item-list-container {
      width: 100%;

      display: flex;
      flex-direction: column;

      padding: 24px 0;
      gap: 24px;

      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

      .cart-empty {
        width: 100%;
        height: 150px;

        text-align: center;

        font-size: 1.4rem;
        color: #00000033;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        gap: 10px;

        .icons {
          width: 30px;
          height: 30px;
        }
      }
    }

    .cart-item-check-container {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-top: 16px;

      ${MOBILE} {
        gap: 8px;

        align-items: flex-start;
        flex-direction: column;
      }

      .cart-item-button-container {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 8px;

        .cart-delete-button {
          width: 88px;
          height: 30px;

          font-size: 1.2rem;
        }
      }

      .cart-select-total-price-container {
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 1.8rem;
        font-weight: 700;
        line-height: 100%;

        color: ${(props) => props.theme.main_color_slate_400};

        gap: 95px;

        ${MOBILE} {
          width: 100%;
          justify-content: flex-end;

          font-size: 1.4rem;
          gap: 45px;
        }
      }
    }

    .cart-item-reservation {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 32px;
      margin-top: 47px;

      ${MOBILE} {
        gap: 24px;
        flex-direction: column-reverse;
      }

      .cart-order-button {
        width: 448px;

        ${MOBILE} {
          width: 100%;
        }
      }

      .shopping-button {
        font-size: 1.4rem;
        color: #555555;

        text-decoration: underline;
      }
    }
  }
`;
