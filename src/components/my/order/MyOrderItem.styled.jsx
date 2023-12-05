import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMyOrderItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  ${MOBILE} {
    gap: 15px;
    flex-direction: column;
    align-items: flex-start;

    border: 1px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: 1px 1px 5px -1px #e5e5e5;

    padding: 20px;
  }

  .order-item-mobile-header {
    width: 100%;
    display: none;

    ${MOBILE} {
      display: flex;
      align-items: center;
      justify-content: space-between;

      font-weight: 400;
      line-height: 140%;

      button {
        font-weight: 400;
        line-height: 140%;
        display: flex;
        align-items: center;

        gap: 5px;

        color: #000;
      }
    }
  }

  .order-item-container {
    width: 100%;

    display: flex;
    align-items: center;

    gap: 16px;

    .order-item-image-container {
      min-width: 89px;
      aspect-ratio: 1 / 1;

      border: 0.5px solid #eeeeee;
      position: relative;

      ${MOBILE} {
        min-width: 50px;
      }
    }

    .order-item-contents-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 3px;

      color: #000;

      font-weight: 400;
      line-height: 140%;

      ${MOBILE} {
        padding: 0;
        gap: 0;
      }

      .order-item-option {
        display: flex;
        font-size: 12px;
      }

      .order-item-studio-title {
        font-size: 14px;
        font-weight: bold;
      }
      .order-item-lesson-title {
        font-size: 12px;
      }
    }

    .order-item-status-container {
      min-width: 200px;

      font-size: 13px;

      font-weight: 400;
      line-height: 140%;
      text-align: center;

      ${MOBILE} {
        text-align: left;
        padding: 8px 0 16px 16px;
        display: none;
      }
    }

    .order-item-detail-container {
      min-width: 88px;

      text-align: center;

      button {
        width: 88px;
        height: 36px;
      }

      ${MOBILE} {
        display: none;
      }
    }
  }

  .CANCEL {
    color: #ec3519;
  }
  .COMPLETE {
    color: ${(props) => props.theme.main_color_slate_400};
  }
  .FAIL {
    color: ${(props) => props.theme.core_color_slate_600};
  }
  .WAIT {
    color: ${(props) => props.theme.main_color_slate_400};
  }
  .REFUSAL {
    color: #ec3519;
  }
  .CANCELING {
    color: #ec3519;
  }
`;
