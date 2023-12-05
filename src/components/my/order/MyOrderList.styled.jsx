import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMyOrderList = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  font-size: 13px;

  .empty-text {
    color: ${(props) => props.theme.main_color_slate_300};
  }

  .order-list-container {
    width: 100%;
    margin-bottom: 40px;

    ${MOBILE} {
      margin-bottom: 24px;
    }

    .order-date-header {
      font-weight: 400;
      line-height: 140%;

      color: #565656;

      padding-bottom: 10px;

      border-bottom: 1px solid ${(props) => props.theme.core_color_slate_50};

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
