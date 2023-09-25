import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SAboutPolicyCard = styled.div`
  width: 349px;
  height: auto;

  margin-bottom: 40px;

  ${MOBILE} {
    width: 100%;

    margin-bottom: 20px;
  }

  .about-policy-label {
    display: flex;
    align-items: center;

    color: ${(props) => props.theme.main_color_slate_300};
    font-size: 1.4rem;
    font-weight: 700;

    margin-bottom: 5px;
  }

  .about-policy-contents {
    width: 100%;
    height: auto;

    padding: 14px 0;

    font-size: 1.3rem;
    font-weight: 400;
    line-height: 140%;

    color: #565656;

    white-space: pre-line;

    ${MOBILE} {
      padding: 12px;

      font-size: 1.4rem;
    }
  }
`;
