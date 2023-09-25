import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

const PRODUCT_MAX_WIDTH = '688px';

export const SClassListBox = styled.div`
  width: 100%;

  .class-list-bottombar-container {
    position: fixed;
    bottom: 0;
    left: 50%;

    transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    z-index: 100000;

    ${MOBILE} {
      width: 100%;
    }
  }

  .class-list-bottombar-box {
    width: ${PRODUCT_MAX_WIDTH};

    margin: 0 auto;

    ${MOBILE} {
      width: 100%;
    }
  }

  .class-list-bottombar-show-header {
    width: 100%;
    height: 52px;

    border-radius: 12px 12px 0px 0px;
    background-color: ${(props) => props.theme.main_color_slate_400};

    padding: 0 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    ${MOBILE} {
      width: 100%;
      height: 68px;

      padding: 20px 20px;

      align-items: flex-start;
    }

    .class-list-bottombar-show-title {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 100%;

      color: ${(props) => props.theme.sub_color_slate_50};
    }

    .class-list-bottombar-show-icon {
      width: 8px;
      height: 8px;

      border-right: 1.5px solid ${(props) => props.theme.sub_color_slate_50};
      border-bottom: 1.5px solid ${(props) => props.theme.sub_color_slate_50};

      transform: rotate(45deg);
      transition: all 0.3s;

      &.active {
        transform: rotate(225deg);
      }
    }
  }

  .class-list-show-container {
    width: 100%;
    max-height: 364px;
    overflow-y: auto;

    background-color: ${(props) => props.theme.sub_color_slate_50};

    box-shadow: inset 0px 5px 5px -2px rgba(0, 0, 0, 0.25);

    .empty-text {
      width: 100%;
      height: 150px;

      padding: 11px 24px;

      font-size: 1.4rem;

      color: ${(props) => props.theme.main_color_slate_200};
    }

    .class-item-list-container {
      width: 100%;

      padding: 11px 24px 15px;

      border-left: 1px solid ${(props) => props.theme.main_color_slate_200};
      border-right: 1px solid ${(props) => props.theme.main_color_slate_200};

      display: flex;
      flex-direction: column;
      gap: 16px;

      ${MOBILE} {
        padding: 11px 15px 20px;
      }

      .class-item {
        width: 100%;
        height: 45px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 1px solid ${(props) => props.theme.main_color_slate_100};

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
  }
`;
