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
    border-bottom: 1px solid;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .booking-title {
      font-size: 1.8rem;
      font-weight: 600;
      line-height: 140%;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }
  }

  .booking-user-info-container {
    flex: 1;
    height: 100%;

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

  .booking-number-container {
    flex: 1;
    height: 100%;

    ${MOBILE} {
      width: 100%;
    }

    .booking-number {
      width: 100%;

      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      gap: 32px;

      margin: 24px 0;

      ${MOBILE} {
        gap: 16px;
        /* flex-direction: column; */
      }
    }

    .booking-total-price {
      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;
      color: #555555;
    }
  }

  .booking-pay-info-container {
    flex: 1;
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

      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      font-size: 1.6rem;
      font-weight: 700;
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
      margin-bottom: 40px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      flex-wrap: wrap;

      gap: 5px;

      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      ${MOBILE} {
        padding: 16px;
      }
    }

    .booking-user-footer {
      width: 100%;

      display: flex;
      flex-direction: column;
      gap: 1px;

      margin: 24px 0;
      padding: 12x 0;
    }

    .booking-coupon-container {
      width: 100%;

      padding: 24px 0;
      margin-bottom: 40px;

      display: flex;
      align-items: center;
      justify-content: flex-start;

      flex-wrap: wrap;

      gap: 5px;

      ${MOBILE} {
        padding: 0;
      }
    }

    .booking-coupon-input-wrapper {
      margin-top: 12px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      gap: 16px;

      ${MOBILE} {
        gap: 8px;
      }

      button {
        margin-top: 18px;
      }
    }

    .refund-policy-wrapper {
      margin-top: 8px;
      padding: 16px 0;
      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

      .refund-policy-header {
        font-size: 1.6rem;
        line-height: 1.2;
        border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};
      }

      .refund-policy-content {
        padding: 16px;
        p {
          font-size: 1.4rem;
          line-height: 1.5;
          color: ${(props) => props.theme.main_color_slate_400};
        }
      }
    }

    .booking-final-price-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;

      margin: 15px 0 24px 0;

      font-size: 1.6rem;
      font-weight: 700;
      line-height: 140%;

      ${MOBILE} {
        font-size: 1.4rem;
      }

      .booking-original-price {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        font-weight: normal;
        padding: 4px 0;
      }

      .booking-discount-price {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        font-weight: normal;
        color: #ea4335;
        padding: 4px 0;
      }

      .booking-final-price {
        display: flex;
        justify-content: space-between;
        font-size: 1.6rem;
        padding: 4px 0;
        font-weight: bold;
        margin-top: 12px;
        margin-bottom: 24px;
      }
    }
  }
`;
