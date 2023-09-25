import React from 'react';

import { SSearchDate } from './SearchDate.styled';
import DatePicker from '@components/common/input/DatePicker';

const SearchDate = ({ onClick }) => {
  return (
    <SSearchDate>
      <DatePicker onChange={onClick} allSelect />
    </SSearchDate>
  );
};

export default SearchDate;
