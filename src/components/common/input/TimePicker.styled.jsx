import styled, { css } from 'styled-components';

export const STimePicker = styled.div`
  display: none;

  ${(props) =>
    props.open &&
    css`
      display: block;
    `}

  .time-picker-background {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .time-picker-container {
    width: 90%;

    position: absolute;
    right: 0;

    border: 1px solid rgba(5, 5, 5, 0.06);
    z-index: 909090;

    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    transition: margin 0.3s;

    ${(props) =>
      props.position === 'top' &&
      css`
        bottom: 110%;
      `}

    ${(props) =>
      props.position === 'bottom' &&
      css`
        top: 110%;
      `}

  ${(props) =>
      props.position === 'middle' &&
      css`
        bottom: 110%;
      `}
  }

  .time-pricker {
    width: 100%;
    height: 224px;

    display: flex;
    flex: auto;

    .picker-time-panel-column {
      flex: 1 0 auto;

      margin: 4px 0;
      padding: 0;

      text-align: start;
      list-style: none;

      overflow-y: hidden;
      overflow-x: hidden;

      border-right: 1px solid #eeeeee;

      &:hover {
        overflow-y: auto;
      }
    }

    .prcker-time-panel-item {
      width: 100%;
      height: 28px;

      display: flex;
      align-items: center;
      justify-content: center;

      cursor: pointer;

      transition: background-color 0.2s;

      div {
        width: 80%;
        border-radius: 4px;

        color: rgba(0, 0, 0, 0.88);
        font-size: 1.4rem;

        line-height: 28px;

        text-align: center;

        margin: 0 auto;

        &:hover {
          background-color: rgba(5, 5, 5, 0.06);
        }
      }

      &.active div {
        color: ${(props) => props.theme.main_color_slate_500};
        background-color: ${(props) => props.theme.main_color_slate_400};
      }
    }
  }

  .timepicker-today-container {
    width: 100%;
    height: 35px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    font-size: 1.4rem;

    border-top: 1px solid rgba(5, 5, 5, 0.06);

    padding: 0 10px;

    .timepicker-now-button {
      width: 50px;
      height: 100%;
      color: ${(props) => props.theme.main_color_slate_500};
    }

    .timepicker-submit-button {
      width: 50px;
      height: 70%;

      color: #ffffff;
      background-color: ${(props) => props.theme.main_color_slate_500};
      border-radius: 8px;
    }
  }
`;
