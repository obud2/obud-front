import styled from 'styled-components';

export const SMobileDrawer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .drawer-header {
    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 20px 0 10px;

    border-bottom: 1px solid #eeeeee;

    .drawer-auth-container {
      width: 100%;
      flex: 1;

      padding: 5px 20px;
    }
  }

  .drawer-main {
    width: 100%;

    flex: 1;
    padding-top: 15px;

    .drawer-menu-container {
      width: 100%;

      padding: 0 20px;
    }
  }
`;
