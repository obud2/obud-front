import styled from 'styled-components';

export const SCartButton = styled.button`
  min-width: 20px;
  height: 100%;

  position: relative;

  &:hover {
    opacity: 0.5;
  }

  .icons {
    width: 33px;
    height: 33px;
    aspect-ratio: 1 / 1;
  }

  .cart-length-container {
    width: 15px;
    height: 15px;

    border-radius: 50%;

    top: 0;
    right: -2px;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${(props) => props.theme.core_color_slate_50};
    background-color: ${(props) => props.theme.main_color_slate_500};

    p {
      top: 1px;
      position: relative;
    }
  }
`;
