import { useRef, useState } from 'react';

import { useRouter } from 'next/router';

import styled from 'styled-components';
import { DateSelector } from '@/components/discover/DateSelector';
import { Separator } from '@/components/common/separator/Separator';
import { FilterSelector } from '@/components/discover/filter-modal/FilterSelector';
import Map from '@/components/discover/Map';
import { DisplayType, MapProvider, useMap } from '@/context/MapContext';
import { FilterProvider } from '@/components/discover/filter-modal/FilterContext';
import { List } from '@/components/discover/List';

const Discover = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const onChangeInput = (e) => {
      setValue(e.target.value);
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

    onSearch(e, '');
  };

  const onSearch = async (keyword, date) => {
    if (isLoading) return;
    if (!keyword && !date) return;

    await setIsLoading(true);

    // ketDownEvent로 인해 라우터 2번 호출 되어서 시간 제약.
    setTimeout(() => {
      setIsLoading(false);

      router.push(`/search-result?keyword=${keyword}&date=${date}`);
    }, 500);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MapProvider>
        <SSearch>
          <div className="obud-search-container">
            {isLoading ? (
              <i className="icons svg-loading active" />
          ) : (
            <i className="icons search active" onClick={() => onSearch(value, '')} />
          )}

            <input
              className="search-input"
              placeholder="검색어를 입력해주세요."
              value={value}
              onChange={onChangeInput}
              onKeyDown={onKeyDownInput}
              ref={inputRef}
              disabled={isLoading}
            />
          </div>

          {/* 날짜 선택 */}
          <DateSelector />
          <div style={{
            marginTop: '17px',
            marginBottom: '15px',
          }}
          >
            <Separator />
          </div>

          <FilterProvider>
            <FilterSelector />
          </FilterProvider>
        </SSearch>

        <Display />
      </MapProvider>
    </div>
  );
};

const Display = () => {
  const { type } = useMap();

  return type === DisplayType.MAP ? <Map /> : <List />;
};

export default Discover;

const SSearch = styled.div`
  width: 380px;

  .obud-search-container {
    margin: 20px 16px;
    padding: 8px;
    border-radius: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid rgba(171, 182, 165, 0.2);

    .search-input {
      flex: 1;
      height: 100%;

      border: none;
      outline: none;

      font-size: 1.4rem;
      color: #555555;

      margin: 0 7px;

      &::placeholder {
        color: ${(props) => props.theme.sub_color_slate_400};
      }

      &:disabled {
        opacity: 0.3;
        background-color: transparent;
      }
    }

    .icons {
      width: 18px;
      height: 18px;

      cursor: pointer;
    }
  }

  .search-tab {
    width: 100%;
    height: 45px;

    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    .search-tab-button {
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.3rem;
      font-weight: 400;

      color: ${(props) => props.theme.sub_color_slate_400};
      border-bottom: 1px solid rgba(171, 182, 165, 0.2);

      transition: all 225ms;

      p {
        width: 100%;
        border-right: 1px solid rgba(171, 182, 165, 0.2);
      }

      &.active {
        color: #000;
        border-bottom: 1px solid;
      }

      &:last-child p {
        border: none;
      }
    }
  }

  .keyword-item-container {
    width: 100%;
    height: auto;
    padding: 0 15px;
  }
`;
