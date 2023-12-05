import styled from 'styled-components';

export const SHeaderAuth = styled.ul`
  min-width: 227px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;

  .header-auth-item {
    font-size: 1.3rem;
    font-weight: 400;

    color: ${(props) => props.theme.sub_color_slate_400};
    transition: all 0.3s;

    margin-right: 5px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }

    &.active {
      color: ${(props) => props.theme.sub_color_slate_50};
    }
  }
`;
