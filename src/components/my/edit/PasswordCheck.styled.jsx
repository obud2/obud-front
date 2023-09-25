import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SPasswordCheck = styled.div`
  width: 100%;

  padding: 20px 0;

  ${MOBILE} {
    padding: 56px 0;
  }

  .password-check-container {
    width: 450px;

    margin: 0 auto;

    ${MOBILE} {
      width: 100%;
    }

    .password-check-title {
      font-size: 1.4rem;
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
  }
`;
