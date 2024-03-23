import CustomButton from '@/components/common/button/CustomButton';
import React from 'react';

const Button = ({ title }) => {
    const handleProgramClick = () => {
        console.log('> program button click');
    };

    return (
      <CustomButton
        variant="outlined"
        borderRadius="20px"
        style={{ overflow: 'visible', padding: '0 14px', height: 24, wordBreak: 'keep-all', textAlign: 'center' }}
        onClick={handleProgramClick}
      >
        <span>{title}</span>
      </CustomButton>
);
};
export const FilterProgram = () => {
  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', display: 'flex', alignItems: 'center', gap: 4, scrollbarWidth: 'none' }}>
      <Button title="요가" />
      <Button title="필라테스" />
      <Button title="차" />
      <Button title="스파" />
      <Button title="명상" />
    </div>
  );
};
