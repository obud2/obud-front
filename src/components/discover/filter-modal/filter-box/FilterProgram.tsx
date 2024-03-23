import { SCustomButtonProps } from '@/components/common/button/CustomButton.props';
import { useFilter } from '@/components/discover/filter-modal/FilterContext';
import React from 'react';
import styled, { css } from 'styled-components';

const Button = ({ title, value }) => {
  const { programs, setPrograms } = useFilter();

  const handleProgramClick = (title: string) => {
      const items = [...programs];

      if (items.includes(title)) {
        setPrograms(items.filter((item) => item !== title));
      } else {
        setPrograms([...items, title]);
      }
  };

  return (
    <SButton
      onClick={() => handleProgramClick(value)}
      backgroundColor={programs?.includes(value) ? '#344235' : '#ffffff'}
    >
      <span>{title}</span>
    </SButton>
);
};
export const FilterProgram = () => {
  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', display: 'flex', alignItems: 'center', gap: 4, scrollbarWidth: 'none' }}>
      <Button title="요가" value="1" />
      <Button title="명상" value="2" />
      <Button title="차" value="3" />
      <Button title="기타" value="4" />
    </div>
  );
};
const SButton = styled.button<SCustomButtonProps>`
  overflow: visible;
  padding: 0 14px;
  height: 24px;
  word-break: keep-all;
  text-align: center;
  font-size: 12px;
  background-color: transparent;
      color: ${(props) => props?.theme?.sub_color_slate_500};
      border: 1px solid ${(props) => props?.theme?.sub_color_slate_400};
  border-radius: 20px;
  ${(props) =>
    props.backgroundColor &&
    css`
      background-color: ${props.backgroundColor};
    `}
`;
