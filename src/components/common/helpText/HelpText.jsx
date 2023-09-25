import React from 'react';
import { SHelpText } from './HelpText.styled';

const HelpText = ({ text, isError }) => {
  return <SHelpText isError={isError}>{text}</SHelpText>;
};

export default HelpText;
