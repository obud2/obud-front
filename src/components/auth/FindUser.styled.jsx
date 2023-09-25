import styled from 'styled-components';

export const SFindUser = styled.div`
  width: 100%;

  .find-user-tab {
    width: 100%;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;

    .find-user-tab-button {
      width: 100%;
      height: 100%;

      font-size: 1.3rem;
      background-color: #eeeeee;

      color: ${(props) => props.theme.core_color_slate_200};

      border: 0.5px solid #eeeeee;
      border-bottom: 0.5px solid ${(props) => props.theme.main_color_slate_400};

      transition: all 225ms;

      &.active {
        color: ${(props) => props.theme.main_color_slate_400};
        background-color: ${(props) => props.theme.sub_color_slate_50};
        border: 0.5px solid ${(props) => props.theme.main_color_slate_400};
        border-bottom: none;
      }
    }
  }

  .find-user-container {
    width: 100%;
    padding: 30px 0 0;
  }
`;
