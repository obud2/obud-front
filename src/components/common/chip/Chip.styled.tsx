import styled from 'styled-components';

export const SChip = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.main_color_slate_200};
  background: ${(props) => props.theme.main_color_slate_200};
  width: fit-content;

  font-size: 1.3rem;
  font-weight: 500;
  color: white;
  line-height: 1.2;
`;
