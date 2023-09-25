import React from 'react';

import { useRouter } from 'next/router';

import { SSearch } from './Search.styled';
import SearchForm from './SearchForm';

const Search = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <SSearch>
      <SearchForm onClickBack={onClickBack} />
    </SSearch>
  );
};

export default Search;
