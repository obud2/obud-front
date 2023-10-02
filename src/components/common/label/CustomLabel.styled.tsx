import styled from 'styled-components';

export const SCustomLabel = styled.label`
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.main_color_slate_300};
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 3px;

  .custom-input-label-point {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #f25656;
    border-radius: 50%;
    margin-left: 5px;
    vertical-align: 2px;

    top: -2px;
    position: relative;
  }
`;
