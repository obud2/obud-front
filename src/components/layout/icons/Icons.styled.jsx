import styled from 'styled-components';

export const SIcons = styled.div`
  width: auto;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 8px;

  .icon-item {
    width: 30px;
    height: 30px;

    padding: 5px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    transition: all 0.3s;

    &:hover {
      opacity: 0.5;
    }

    .icons {
      width: 100%;
      height: 100%;
      transition: all 0.3s;
    }

    .cart {
      width: 30px;
      height: 30px;
    }
  }
`;
