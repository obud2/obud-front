import styled from 'styled-components';

import { smLayout } from 'src/styled/variablesStyles';

export const SEventCreateBottombar = styled.div`
  width: 100%;

  .event-create-background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    z-index: 99999;
    background-color: #ffffff;

    display: none;

    transition: all 0.7s ease-out;

    ${smLayout} {
      &.active {
        display: block;
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }

  .event-create-bottombar-container {
    position: fixed;
    bottom: 0;
    left: 50%;

    transition: transform 0.3s;
    z-index: 99999;

    ${smLayout} {
      width: 100%;
    }
  }

  .event-create-bottombar-box {
    width: 760px;
    margin: 0 auto;

    ${smLayout} {
      width: 100%;
    }
  }

  .event-create-bottombar-show-header {
    width: 100%;
    height: 64px;

    background: ${(props) => props.theme.mainColor3};
    border-radius: 12px 12px 0px 0px;

    padding: 0 40px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    ${smLayout} {
      height: 60px;
      padding: 0 16px;
    }

    .event-create-bottombar-show-title {
      font-weight: 700;
      font-size: 2rem;
      line-height: 30px;

      color: ${(props) => props.theme.mainColor};
    }

    .event-create-bottombar-show-icon {
      width: 10px;
      height: 10px;

      border-right: 1.5px solid #949494;
      border-bottom: 1.5px solid #949494;
      transform: rotate(45deg);
      transition: all 0.3s;

      &.active {
        transform: rotate(225deg);
      }
    }
  }

  .event-create-bottombar-show-main {
    width: 100%;
    min-height: 310px;

    background-color: #ffffff;

    border-left: 1px solid ${(props) => props.theme.mainColor3};
    border-right: 1px solid ${(props) => props.theme.mainColor3};

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    padding: 20px 40px 26px;

    ${smLayout} {
      min-height: 440px;
      padding: 20px 16px 26px;
    }

    .event-basic-price-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      padding: 0 0 20px;
      gap: 56px;

      ${smLayout} {
        gap: 35px;
      }

      .event-title {
        width: 20%;

        font-weight: 700;
        font-size: 1.6rem;
        line-height: 24px;

        display: flex;
        align-items: center;

        color: ${(props) => props.theme.mainColor};

        ${smLayout} {
          width: 25%;
        }
      }

      .event-basic-price-main {
        width: 80%;

        display: grid;
        grid-template-columns: repeat(2, 2fr);
        gap: 15px;

        ${smLayout} {
          width: 75%;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
      }
    }

    .event-basic-add-option-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      padding: 20px 0;
      border-top: 1px solid #f6f8fa;
      gap: 56px;

      ${smLayout} {
        gap: 35px;
      }

      .event-title {
        width: 20%;

        font-weight: 700;
        font-size: 1.6rem;
        line-height: 24px;

        display: flex;
        align-items: center;

        color: ${(props) => props.theme.mainColor};

        ${smLayout} {
          width: 25%;
        }
      }

      .event-add-option-container {
        width: 80%;

        display: grid;
        grid-template-columns: repeat(2, 2fr);
        gap: 15px;

        ${smLayout} {
          width: 75%;

          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }
      }
    }

    .event-total-price-container {
      width: 100%;
      padding-top: 24px;

      border-top: 2px solid ${(props) => props.theme.mainColor};

      display: flex;
      justify-content: space-between;
      align-items: center;

      ${smLayout} {
        padding-top: 16px;
        align-items: flex-end;
        flex-direction: column;

        gap: 8px;
      }

      .event-total-price-by-optionPrice {
        font-weight: 700;
        font-size: 1.4rem;
        line-height: 21px;
        display: flex;
        align-items: center;

        color: #000000;

        ${smLayout} {
          font-size: 1.5rem;
        }

        i {
          color: ${(props) => props.theme.mainColor};
        }
      }

      .event-total-price {
        display: flex;

        line-height: 21px;
        display: flex;
        align-items: flex-end;

        color: #000000;

        i {
          font-weight: 700;
          font-size: 1.4rem !important;

          ${smLayout} {
            font-size: 1.5rem;
          }
        }

        p {
          font-weight: 700;
          font-size: 2.4rem;

          color: ${(props) => props.theme.mainColor};

          ${smLayout} {
            font-size: 2.6rem;
          }
        }
      }
    }

    .event-oprtion-by-price {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      font-size: 1.4rem;
      line-height: 21px;

      ${smLayout} {
        white-space: nowrap;
        gap: 3px;
      }

      h4 {
        color: #464646;
        font-weight: 400;
      }

      i {
        color: ${(props) => props.theme.mainColor};
        font-weight: 400;
      }

      p {
        color: #000000;
        font-weight: 700;
      }
    }
  }
`;
