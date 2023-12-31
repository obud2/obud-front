import styled from 'styled-components';

export const SSnsIcons = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 16px;

  .sns-icon-item {
    z-index: 20;
    width: 20px;
    height: 20px;

    position: relative;
    display: inline-block;

    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }
`;
