import styled from 'styled-components';

export const SBackTic = styled.button`
  width: 19px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
