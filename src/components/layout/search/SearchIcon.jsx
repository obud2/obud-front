import React, { useContext, useState } from 'react';

import { SSearchIcon } from './SearchIcon.styled';

import SearchModal from '@components/serach/SearchModal';
import { useRouter } from 'next/router';
import { LayoutContext } from 'src/context/LayoutContext';

const SearchIcon = ({ reverse }) => {
  const router = useRouter();

  const { matchese } = useContext(LayoutContext);

  const [isOpen, setIsOpen] = useState(false);

  const onClickSearchIcon = async () => {
    if (matchese) {
      router.push('/search');
    } else {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <React.Fragment>
      <SSearchIcon reverse={reverse} onClick={onClickSearchIcon}>
        <i className={`icons search ${reverse ? '' : 'active'}`} />
      </SSearchIcon>

      <SearchModal isOpen={isOpen} isClose={onClickSearchIcon} />
    </React.Fragment>
  );
};

export default SearchIcon;
