import React from 'react';

import { useRouter } from 'next/router';

import { useQuery } from 'react-query';
import SearchService from 'src/service/SearchService';

import { SSearchResult } from './SearchResult.styled';

import StudioList from '@components/studio/StudioList';
import FallBackLoading from '@components/loading/FallBackLoading';

const SearchResult = () => {
  const router = useRouter();
  const { keyword, date } = router.query;

  const { data, isLoading } = useQuery(['search-result', keyword, date], () => SearchService.getSearch(keyword, date));

  return (
    <React.Fragment>
      <SSearchResult>
        <div className="search-keyword-container">
          <div className="search-icon">
            <i className="icons search active" />
          </div>

          <div>
            <p className="result-title">{keyword || date || '-'}</p>

            <p className="result-length">
              <b>{data?.length || 0}</b>
              개의 통합검색 결과가 있습니다.
            </p>
          </div>
        </div>

        <StudioList title="All Place" list={data || []} />
      </SSearchResult>

      <FallBackLoading isLoading={isLoading} />
    </React.Fragment>
  );
};

export default SearchResult;
