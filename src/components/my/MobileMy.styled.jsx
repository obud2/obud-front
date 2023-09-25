import styled from 'styled-components';

export const SMobileMy = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  padding: 0 15px;

  .mobile-my-header {
    width: 100%;
    padding: 40px 0 32px;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    .hello-message {
      color: #555555;
      font-size: 1.3rem;
      margin-bottom: 10px;
    }
  }

  .mobile-my-main {
    width: 100%;
    padding: 12px 0;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    display: flex;
    flex-direction: column;

    gap: 5px;

    .mobile-my-menu-tab-list {
      width: 100%;
      height: 60px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: #555555;
      font-size: 1.3rem;

      cursor: pointer;

      svg {
        width: 12px;
        height: 12px;

        color: ${(props) => props.theme.main_color_slate_200};
      }
    }
  }
`;
