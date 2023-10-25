import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SMyOrder = styled.div`
  width: 100%;
  margin-bottom: 104px;

  ${MOBILE} {
    margin-bottom: 0;
  }

  .order-list-header {
    width: 100%;
    height: 32px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .order-list-title {
      font-size: 1.6rem;
      font-family: 400;

      color: ${(props) => props.theme.main_color_slate_500};

      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }
  }
`;
