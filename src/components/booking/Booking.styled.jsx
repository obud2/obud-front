import styled from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

export const SBooking = styled.div`
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

    gap: 24px;
  }

  .booking-header {
    width: 100%;

    padding-bottom: 16px;
    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

    display: flex;
    align-items: center;
    justify-content: space-between;

    .booking-title {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 140%;

      color: ${(props) => props.theme.main_color_slate_300};

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }
  }

  .booking-user-info-container {
    width: 924px;
    height: 100%;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

    ${MOBILE} {
      width: 100%;
    }

    .booking-user-info {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 32px;

      margin: 24px 0;

      ${MOBILE} {
        gap: 16px;
        flex-direction: column;
      }
    }
  }

  .booking-pay-info-container {
    width: 448px;
    height: 100%;

    ${MOBILE} {
      width: 100%;
    }

    .booking-total-price {
      width: 100%;

      padding: 16px 24px;
      margin-bottom: 24px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      background-color: ${(props) => props.theme.main_color_slate_100};
      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

      font-size: 1.6rem;
      font-weight: 400;
      line-height: 140%;
      color: #555555;

      ${MOBILE} {
        padding: 16px;
        font-size: 1.4rem;
      }
    }

    .booking-paymethod-container {
      width: 100%;

      padding: 24px;
      margin-bottom: 24px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      flex-wrap: wrap;

      gap: 5px;

      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

      ${MOBILE} {
        padding: 16px;
      }
    }

    .booking-user-footer {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 1px;

      margin-bottom: 21px;
    }
  }
`;
