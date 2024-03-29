import styled from 'styled-components';
import { MOBILE } from '@/styled/variablesStyles';

export const SClassList = styled.div`
  .class-item-list-container {
    margin-bottom: 50px;

    display: flex;
    flex-direction: column;

    .class-item {
      width: 100%;
      height: 64px;
      padding: 10px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_100};

      cursor: pointer;

      padding: 10px 0;

      &.isSoldOut {
        /* font-style: italic; */
        color: #a4a4a4;
        text-decoration: line-through;
      }

      .class-title-container {
        display: flex;
        align-items: center;
        padding: 0 16px;

        font-size: 1.4rem;
        color: #565656;

        ${MOBILE} {
          font-size: 1.4rem;
        }

        .item-impossible {
          color: #fff;
          background: #a4a4a4;
          border: 1px solid #a4a4a4;

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
        padding: 0 16px;

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

        margin-top: 3px;
        margin-left: 5px;
        top: -1px;
        position: relative;

        /* background-color: #565656; */
      }
    }
  }
  .empty-text {
    font-size: 1.4rem;
    margin: 1rem;
  }
`;
