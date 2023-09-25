import styled from 'styled-components';

export const SJoinComplete = styled.div`
  width: 100%;

  .join-complete-text {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 100%;

    margin: 0 0 48px;

    color: ${(props) => props.theme.main_color_slate_500};
  }
`;
