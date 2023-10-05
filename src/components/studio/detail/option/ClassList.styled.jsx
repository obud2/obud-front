import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = '688px';

export const SClassList = styled.div`
  width: 100%;

  .empty-text {
    width: 100%;
    height: 150px;

    padding: 11px 24px;

    font-size: 1.4rem;

    color: ${(props) => props.theme.main_color_slate_200};
  }

  .class-item-list-container {
    width: 100%;
    min-height: 300px;
    padding: 11px 24px 15px;

    display: flex;
    flex-direction: column;
    gap: 16px;

    ${MOBILE} {
      padding: 11px 15px;
    }

    .class-item {
      width: 100%;
      height: 45px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_100};
      padding: 0 0 12px;

      cursor: pointer;

      &.isSoldOut {
        font-style: italic;
        color: #a4a4a4;
        text-decoration: line-through;
      }

      .class-title-container {
        display: flex;
        align-items: center;

        font-size: 1.4rem;
        color: #565656;

        ${MOBILE} {
          font-size: 1.4rem;
        }

        .item-impossible {
          color: #fff;
          background: #ec3519;
          border: 1px solid #ec3519;

          padding: 2px 7px 2px 7px;
          margin: 0 0 0 10px;

          display: inline-block;
          text-align: center;

          font-size: 1.2rem;
          text-decoration: none !important;
          font-style: normal !important;
        }
      }

      .class-price-container {
        display: flex;
        align-items: center;

        font-size: 1.4rem;
        color: #565656;

        ${MOBILE} {
          font-size: 1.4rem;
        }
      }

      .class-arrow-icon {
        width: 6px;
        height: 6px;

        transform: rotate(45deg);
        border-top: 1px solid #565656;
        border-right: 1px solid #565656;

        margin-left: 5px;
        top: -1px;
        position: relative;

        /* background-color: #565656; */
      }
    }
  }
`;
