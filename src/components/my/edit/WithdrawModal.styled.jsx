import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SWithdrawModal = styled.div`
  width: 441px;
  padding: 18px 20px;

  ${MOBILE} {
    width: 100%;
  }

  .withdraw-header {
    font-size: 2.1rem;
    font-weight: 700;

    line-height: 140%;
    margin-bottom: 26px;

    color: ${(props) => props.theme.main_color_slate_500};

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;

    ${MOBILE} {
      font-size: 1.6rem;
    }
  }

  .withdraw-main {
    font-size: 1.3rem;
    font-weight: 400;

    text-align: left;

    line-height: 140%;
    margin-bottom: 24px;

    color: #212121;
  }

  .withdraw-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 8px;

    button {
      height: 40px;
      font-size: 1.4rem;
    }
  }
`;
