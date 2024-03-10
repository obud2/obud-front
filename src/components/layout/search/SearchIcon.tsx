import { useContext, useState } from 'react';

import SearchModal from '@/components/search/SearchModal';
import { useRouter } from 'next/router';
import { LayoutContext } from 'src/context/LayoutContext';
import styled from 'styled-components';

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
    <>
      <SSearchIcon onClick={onClickSearchIcon}>
        <i className={`icons search ${reverse ? '' : 'active'}`} />
      </SSearchIcon>
      <SearchModal isOpen={isOpen} isClose={onClickSearchIcon} />
    </>
  );
};

export default SearchIcon;

const SSearchIcon = styled.button`
  min-width: 20px;
  height: 100%;

  &:hover {
    opacity: 0.5;
  }

  .icons {
    width: 22px;
    height: 22px;
    aspect-ratio: 1 / 1;
  }
`;
