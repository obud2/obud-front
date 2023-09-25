import styled from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

export const SBookingBase = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};

  padding: 60px 15px 24px;
  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  ${MOBILE} {
    max-width: 100%;
  }

  .booking-base-header {
    width: 100%;

    margin-top: 24px;
    padding-bottom: 16px;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

    display: flex;
    justify-content: space-between;
    align-items: center;

    ${MOBILE} {
      margin-top: 0;
    }

    .booking-sub-title {
      font-size: 1.8rem;
      font-weight: 700;
      line-height: 140%;

      color: ${(props) => props.theme.main_color_slate_300};

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .booking-sub-date {
      color: #565656;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;
    }
  }

  .booking-item-header-container {
    width: 100%;
    padding: 17px 0;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

    ${MOBILE} {
      display: none;
    }

    .booking-header-item {
      flex: 1;

      font-size: 1.4rem;
      font-weight: 700;
      line-height: 140%;

      text-align: center;

      color: ${(props) => props.theme.main_color_slate_400};

      &:first-child {
        flex: 3;
      }
    }
  }

  .booking-item-list-container {
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 24px 0;
    gap: 24px;

    border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

    ${MOBILE} {
      padding: 18px 0;
    }
  }
`;
