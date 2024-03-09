import styled from 'styled-components';

type Props = {
  count: number;
};

const CountCheck = ({ count = 0 }: Props) => {
  return (
    <SCountCheck>
      <span>{count}</span>
    </SCountCheck>
  );
};

export default CountCheck;

const SCountCheck = styled.div`
  width: 20px;
  height: 20px;
  display: inline-block;
  text-align: center;
  background-color: ${(props) => props.theme.main_color_slate_500} !important;
  border-radius: 100%;

  top: -2px;
  position: relative;

  span {
    font-size: 1rem;
    line-height: 20px;
    color: #fff !important;
    font-weight: bold;

    top: -2px;
    position: relative;
  }
`;
