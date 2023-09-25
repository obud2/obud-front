import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SBookingItem = styled.ul`
  width: 100%;

  display: flex;
  position: relative;

  ${MOBILE} {
    display: flex;
    justify-content: center;

    gap: 12px;
  }

  ${(props) =>
    props.disabled &&
    css`
      * {
        color: #b5b5b5 !important;
      }
    `}

  .image-disabled-background {
    width: 88px;
    height: 88px;

    top: 0;
    left: 0;
    position: absolute;

    background-color: rgba(253, 253, 253, 0.5);

    ${MOBILE} {
      width: 100%;
      height: 100%;
    }
  }

  .booking-item {
    flex: 1;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    gap: 16px;

    font-size: 1.4rem;
    font-weight: 400;

    text-align: center;
    color: #555555;

    &.cursor {
      cursor: pointer;
    }

    &.bold {
      font-weight: 500;
    }

    .booking-title {
      display: flex;
      flex-direction: column;
      text-align: left;

      .booking-studios-title {
        font-size: 1.2rem;
      }
    }

    &:first-child {
      flex: 3;
      justify-content: flex-start;
    }
  }

  /* Mobile */
  .booking-mobile-image-container {
    flex: 1;
    position: relative;
    aspect-ratio: 1 / 1;
  }

  .booking-mobile-data-container {
    flex: 2;

    display: flex;
    flex-direction: column;
    gap: 4px;

    position: relative;

    ${(props) =>
      props.disabled &&
      css`
        * {
          color: #b5b5b5 !important;
        }
      `}

    .booking-title {
      font-size: 1.3rem;
      color: #0d0d0d;
    }

    .booking-studios-title {
      font-size: 1.2rem;
      color: #565656;
    }

    .booking-mobile-title {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-size: 1.2rem;
        font-weight: 400;
        line-height: 140%;

        word-break: break-word;

        &:first-child {
          color: #b5b5b5;
          white-space: nowrap;
        }

        &:last-child {
          color: #565656;
        }
      }
    }
  }
`;
