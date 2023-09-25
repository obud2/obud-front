import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SEditComplete = styled.div`
  width: 100%;

  max-width: 448px;

  padding: 77px 0;
  margin: 0 auto;

  ${MOBILE} {
    width: 100%;
    padding: 56px 0;
  }

  .password-check-title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 140%;

    text-align: center;

    color: ${(props) => props.theme.main_color_slate_300};
    margin-bottom: 40px;

    ${MOBILE} {
      font-size: 1.4rem;
      margin-bottom: 40px;
    }
  }
`;
