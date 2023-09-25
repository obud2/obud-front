import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMyOrderItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;

  gap: 16px;

  ${MOBILE} {
    gap: 0;
    flex-direction: column;
    align-items: flex-start;

    border: 1px solid ${(props) => props.theme.main_color_slate_200};

    box-shadow: 1px 1px 5px -1px ${(props) => props.theme.main_color_slate_200};
  }

  .order-item-mobile-header {
    width: 100%;
    display: none;

    ${MOBILE} {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 7px 16px;
      color: #fdfdfd;

      font-size: 1.3rem;
      font-weight: 400;
      line-height: 140%;

      background-color: ${(props) => props.theme.main_color_slate_200};

      button {
        color: #fdfdfd;

        font-size: 1.3rem;
        font-weight: 400;
        line-height: 140%;
      }
    }
  }

  .order-item-image-container {
    min-width: 89px;
    aspect-ratio: 1 / 1;

    border: 0.5px solid #eeeeee;
    position: relative;

    ${MOBILE} {
      display: none;
    }
  }

  .order-item-contents-container {
    flex: 1;

    display: flex;
    flex-direction: column;
    gap: 3px;

    color: #565656;

    font-size: 1.4rem;
    font-weight: 400;
    line-height: 140%;

    ${MOBILE} {
      gap: 8px;
      padding: 16px 16px 0 16px;
    }

    .order-item-option {
      display: flex;
      gap: 16px;
    }
  }

  .order-item-status-container {
    min-width: 200px;

    font-size: 1.4rem;

    font-weight: 400;
    line-height: 140%;
    text-align: center;

    ${MOBILE} {
      text-align: left;
      padding: 8px 0 16px 16px;
    }

    .CANCEL {
      color: #b5b5b5;
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
`;
