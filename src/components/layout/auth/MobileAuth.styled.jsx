import styled from 'styled-components';

export const SMobileAuth = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 20px;

  .auth-title-container {
    width: 100%;

    .have-auto-title-containers {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .have-auth-title {
        width: 100%;
        color: #555555;

        .auth-name {
          font-size: 1.6rem;
          font-weight: 400;
          line-height: 140%;
        }

        .auth-email {
          font-size: 1.3rem;
          font-weight: 400;
          line-height: 140%;
        }
      }

      .auth-logout-container {
        width: 100%;
        text-align: right;
        margin: 10px 0;

        .auth-logout {
          font-size: 1.2rem;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }

    .have-no-auto-title-container {
      display: flex;
      flex-direction: column;
      gap: 7px;

      .have-no-auth-button-container {
        display: flex;
        align-items: center;

        gap: 7px;

        .auth-line {
          width: 1px;
          height: 10px;

          display: inline-block;
          background-color: rgba(0, 0, 0, 0.5);

          position: relative;
          top: -1px;
        }

        button {
          font-size: 1.5rem;
          color: #555555;
        }
      }

      .have-no-auth-title {
        width: 100%;

        display: flex;
        align-items: center;
        justify-content: space-between;

        color: rgba(0, 0, 0, 0.5);

        font-size: 1.3rem;
        font-weight: 400;
      }
    }
  }

  .auth-button-container {
    width: 100%;

    display: flex;
    gap: 12px;

    .auth-button {
      width: 100%;
      height: 35px;

      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;

      &:first-child {
        border: 1px solid ${(props) => props.theme.sub_color_slate_50};
        color: ${(props) => props.theme.sub_color_slate_50};
      }

      &:last-child {
        background-color: ${(props) => props.theme.sub_color_slate_50};
        color: ${(props) => props.theme.main_color_slate_400};
      }
    }
  }
`;
