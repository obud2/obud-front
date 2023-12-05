import styled from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

export const SMyOrderDetail = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;
  padding-bottom: 32px;

  margin: 0 auto;

  display: flex;
  justify-content: center;

  gap: 32px;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
    flex-direction: column;
    gap: 45px;
  }

  .booking-info-container {
    width: 100%;
    height: 100%;
    font-size: 1.4rem;

    border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

    &:last-child {
      border: none;
    }

    ${MOBILE} {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      border-bottom: none;
    }

    .booking-header {
      width: 100%;

      padding-bottom: 8px;
      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      font-size: 1.8rem;
      font-weight: 600;

      display: flex;
      align-items: center;
      justify-content: space-between;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .booking-content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 20px;
      gap: 10px;

      color: #565656;

      .booking-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.cancel {
          color: #f25656;
        }
      }
    }

    .booking-pay-footer {
      width: 100%;
      display: flex;
      flex-direction: column;

      ${MOBILE} {
        margin-top: 20px;
      }
    }
  }
`;
