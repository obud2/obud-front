import styled, { css } from 'styled-components';

export const SHelpText = styled.div`
  width: 100%;
  min-height: 14px;

  font-size: 1.4rem;
  font-weight: 400;
  line-height: 100%;

  display: flex;
  align-items: center;

  color: #ec3519;

  opacity: 0;
  transition: all 0.3s;

  margin-bottom: 1px;

  ${(props) =>
    props.isError &&
    css`
      opacity: 1;
    `}
`;
