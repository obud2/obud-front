import styled from 'styled-components';

export const SPolicy = styled.div`
  width: 100%;

  .policy-input-box {
    width: 100%;
    height: 125px;

    overflow: auto;

    /* #FDFDFD */
    padding: 12px 14px;
    border: 1px solid ${(props) => props.theme.core_color_slate_200};
    background-color: ${(props) => props.theme.sub_color_slate_50};
    text-align: initial;

    * {
      font-size: 1.3rem;
      font-weight: 400;
      color: ${(props) => props.theme.main_color_slate_500};
    }
  }

  .obut-footer-container {
    width: 100%;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;
