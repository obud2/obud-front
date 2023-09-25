import React from 'react';

import { useQuery } from 'react-query';
import SearchService from 'src/service/SearchService';
import { SSearchKeyword } from './SearchKeyword.styled';

const SearchKeyword = ({ onClick }) => {
  const { data } = useQuery(['keyword'], () => SearchService.getKeyword());

  return (
    <SSearchKeyword>
      <p className="keyword-title">인기검색어</p>

      <div className="keyword-container">
        {data &&
          data?.map((item) => (
            <div key={item?.id} className="keyword-item" onClick={() => onClick(item?.id)}>
              {item?.id || ''}
            </div>
          ))}
      </div>
    </SSearchKeyword>
  );
};

export default SearchKeyword;
