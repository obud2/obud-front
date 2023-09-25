import styled from 'styled-components';

export const SSearchKeyword = styled.div`
  width: 100%;
  padding: 30px 0;

  .keyword-title {
    font-size: 1.4rem;
    font-weight: 500;

    color: ${(props) => props.theme.main_color_slate_300};
  }

  .keyword-container {
    padding: 20px 0;

    .keyword-item {
      display: inline-flex;
      align-items: center;
      justify-content: center;

      border: 1px solid rgb(238, 238, 238) !important;
      border-radius: 20px;
      margin-right: 10px;
      margin-bottom: 10px;

      font-size: 1.2rem;
      color: rgb(126, 126, 126) !important;
      background-color: transparent !important;

      cursor: pointer;

      min-width: auto;
      height: 25px;

      padding: 0 13px;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
