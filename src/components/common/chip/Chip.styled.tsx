import styled from 'styled-components';

export const SChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid #eeeff1;
  width: 100%;

  font-size: 1.3rem;
  color: ${(props) => props.theme.core_color_slate_600};
  font-weight: 500;
  line-height: 1.2;
  margin-right: 2px;
`;
