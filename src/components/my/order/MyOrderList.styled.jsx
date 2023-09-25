import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMyOrderList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  .empty-text {
    font-size: 1.4rem;

    color: ${(props) => props.theme.main_color_slate_200};
  }

  .order-list-container {
    width: 100%;
    margin-bottom: 40px;

    ${MOBILE} {
      margin-bottom: 24px;
    }

    .order-date-header {
      font-size: 1.4rem;
      font-weight: 400;
      line-height: 140%;

      color: #565656;

      padding-bottom: 16px;

      border-bottom: 1px solid ${(props) => props.theme.main_color_slate_200};

      ${MOBILE} {
        display: none;
      }
    }

    .order-date-main {
      width: 100%;
      display: flex;
      flex-direction: column;

      padding: 24px 0;

      gap: 24px;

      ${MOBILE} {
        padding: 0;
      }
    }
  }
`;
