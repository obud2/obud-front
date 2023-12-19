import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SPrivate = styled.section`
  width: 100%;

  display: flex;
  gap: 15px;

  ${MOBILE} {
    flex-direction: column;
    gap: 0;
  }

  .contact-policy-container {
    width: 100%;
  }

  .contact-form-container {
    width: 100%;
  }
`;
