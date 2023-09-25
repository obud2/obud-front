import styled from 'styled-components';

export const SWishItem = styled.div`
  width: 100%;
  height: auto;

  position: relative;

  .wish-edit-active {
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;
    position: absolute;

    z-index: 10;

    .wish-check-item-container {
      width: 20px;
      height: 20px;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      background-color: #fdfdfd;

      top: 0%;
      right: 0%;
      position: absolute;
    }
  }

  .wish-disabled {
    width: 100%;
    height: 100%;

    top: 0%;
    left: 0%;
    position: absolute;

    z-index: 10;
    cursor: not-allowed;

    background-color: rgba(0, 0, 0, 0.05);
  }
`;
