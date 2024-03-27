import { FilterType, useFilter } from '@/components/discover/filter-modal/FilterContext';
import styled from 'styled-components';

export const FilterTabs = () => {
    const { setSelectedFilter, selectedFilter } = useFilter();

    const scrollToElement = (target: string) => {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };

    return (
      <SFilterTabs>
        <div onClick={() => { setSelectedFilter(FilterType.REGION); scrollToElement('filter-region'); }}>
          <span className={selectedFilter === FilterType.REGION ? 'selected' : ''}>
            지역
          </span>
        </div>
        <div onClick={() => { setSelectedFilter(FilterType.PROGRAM); scrollToElement('filter-program'); }}>
          <span className={selectedFilter === FilterType.PROGRAM ? 'selected' : ''}>
            프로그램
          </span>
        </div>
        <div onClick={() => { setSelectedFilter(FilterType.TIME); scrollToElement('filter-time'); }}>
          <span className={selectedFilter === FilterType.TIME ? 'selected' : ''}>
            시간
          </span>
        </div>
      </SFilterTabs>
    );
};

const SFilterTabs = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    border-bottom: 1px solid #D9D9D9;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
        text-align: center;
        font-size: 14px;
        font-weight: 700;
        color: #CCCCCC;
        span {
            height: 34px;
            padding: 0px 8px;
            &.selected {
            color: #000000;
            border-bottom: 2px solid #000000;
        }
        }
       
    }
`;
