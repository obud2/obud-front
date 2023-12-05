import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SMyEditForm = styled.div`
  width: 100%;

  max-width: 448px;

  margin: 0 auto;
  margin-bottom: 104px;

  ${MOBILE} {
    max-width: 100%;
    margin-bottom: 0;
  }

  .my-user-withdraw-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    padding-top: 40px;

    .my-user-withdraw-button {
      font-size: 1.6rem;
      line-height: 100%;

      color: ${(props) => props.theme.sub_color_slate_500};

      ${MOBILE} {
        font-size: 1.4rem;
      }
    }
  }
`;
