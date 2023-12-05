import React, { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import { SSearchForm } from './SearchForm.styled';

import TabPanel from '@components/tabPanel/TabPanel';
import SearchKeyword from './option/SearchKeyword';
import SearchDate from './option/SearchDate';

const TAB = [
  { id: 'keyword', label: '키워드로 검색' },
  { id: 'date', label: '날짜로 검색' },
];

const SearchForm = () => {
  const inputRef = useRef();
  const router = useRouter();

  const [value, setValue] = useState('');
  const [tabValue, setTabValue] = useState(TAB[0]?.id);

  const [isLoading, setIsLoading] = useState(false);

  const onClickTabValue = (e) => {
    setValue('');
    setTabValue(e);
  };

  const onChangeInput = (e) => {
    if (tabValue === 'keyword') {
      setValue(e.target.value);
    }
  };

  const onKeyDownInput = (e) => {
    const key = e.key;
    const enter = 'Enter';

    if (key === enter) {
      onClickKeywordData(value);
    }
  };

  const onClickKeywordData = (e) => {
    setValue(e);

    if (tabValue === 'keyword') {
      onSearch(e, '');
    } else {
      onSearch('', e);
    }
  };

  const onSearch = async (keyword, date) => {
    if (isLoading) return;
    if (!keyword && !date) return;

    await setIsLoading(true);

    // ketDownEvent로 인해 라우터 2번 호출 되어서 시간 제약.
    setTimeout(() => {
      setIsLoading(false);

      router.push(`/search-result?keyword=${keyword}&date=${date}`);
    }, [500]);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SSearchForm>
        <div className="obud-search-container">
          {isLoading ? (
            <i className="icons svg-loading active" />
          ) : (
            <i className="icons search active" onClick={() => onSearch(value, '')} />
          )}

          <input
            className="search-input"
            placeholder={tabValue === 'keyword' ? '검색어를 입력해주세요.' : '원하는 날짜를 선택해주세요.'}
            value={value}
            onChange={onChangeInput}
            onKeyDown={onKeyDownInput}
            ref={inputRef}
            disabled={isLoading}
          />
        </div>

        <div className="search-tab">
          {TAB?.map((item) => (
            <button
              key={item?.id}
              className={`search-tab-button ${item?.id === tabValue ? 'active' : ''}`}
              onClick={() => onClickTabValue(item?.id)}
            >
              <p>{item?.label || ''}</p>
            </button>
          ))}
        </div>

        <div className="keyword-item-container">
          <TabPanel value={tabValue} index="keyword">
            <SearchKeyword onClick={onClickKeywordData} />
          </TabPanel>

          <TabPanel value={tabValue} index="date">
            <SearchDate onClick={onClickKeywordData} />
          </TabPanel>
        </div>
      </SSearchForm>
    </div>
  );
};

export default SearchForm;
