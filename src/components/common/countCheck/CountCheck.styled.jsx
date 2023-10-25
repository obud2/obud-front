import styled from 'styled-components';

export const SCountCheck = styled.div`
  width: 17px;
  height: 17px;

  display: inline-block;
  text-align: center;

  background-color: ${(props) => props.theme.main_color_slate_400} !important;
  border-radius: 100%;

  top: -2px;
  position: relative;

  span {
    font-size: 1rem;
    line-height: 20px;
    color: #fff !important;

    top: -1px;
    position: relative;
  }
`;
