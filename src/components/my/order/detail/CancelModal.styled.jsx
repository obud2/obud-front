import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SCancelModal = styled.article`
  width: 384px;

  padding: 32px;

  display: flex;
  flex-direction: column;

  ${MOBILE} {
    width: 100%;
  }

  .cancel-header {
    width: 100%;
    text-align: left;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};
    padding: 0 0 16px;

    h5 {
      color: #565656;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 100%;
    }

    h2 {
      color: #0d0d0d;
      font-size: 2rem;
      font-weight: 700;
      line-height: 100%;

      margin: 8px 0 16px;
    }

    p {
      color: #565656;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 100%;
    }
  }

  .cancel-price-container {
    width: 100%;
    text-align: left;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};
    padding: 16px 0;

    gap: 16px;

    display: flex;
    flex-direction: column;

    .cancel-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #565656;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 100%;
    }
  }

  .cancel-total-price {
    width: 100%;
    text-align: left;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};
    padding: 16px 0;

    gap: 16px;

    display: flex;
    flex-direction: column;

    .cancel-price {
      display: flex;
      align-items: center;
      justify-content: space-between;

      color: ${(props) => props.theme.main_color_slate_400};

      font-size: 1.6rem;
      font-weight: 700;
      line-height: 100%;
    }

    .cancel-policy {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #555555;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 100%;

      cursor: pointer;

      .policy-arrow {
        width: 7px;
        height: 7px;

        border-top: 1px solid #888888;
        border-right: 1px solid #888888;

        top: -1px;
        position: relative;
        transform: rotate(315deg);

        &.open {
          transform: rotate(135deg);
        }
      }
    }

    .policy-container {
      width: 100%;

      font-size: 1.4rem;
      white-space: pre-line;

      color: #565656;
    }
  }

  .cancel-footer-container {
    width: 100%;

    padding: 30px 0 0;

    gap: 16px;

    display: flex;
    flex-direction: column;

    p {
      color: #565656;
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;
    }

    .cancel-button-container {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      margin-top: 10px;

      gap: 8px;
    }
  }
`;
