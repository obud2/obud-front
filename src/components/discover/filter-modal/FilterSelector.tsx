import CustomButton from '@/components/common/button/CustomButton';
import { FilterModal } from '@/components/discover/filter-modal/FilterModal';
import { useMap } from '@/context/MapContext';
import React from 'react';
import { RiArrowDownSLine, RiSendPlaneLine } from 'react-icons/ri';
import styled from 'styled-components';
import 'swiper/css';

export const FilterSelector = () => {
  const { aroundSearch } = useMap();

    const onClickMyLocation = () => {
      aroundSearch();
    };

    return (
      <SFilterSelector style={{
        padding: '0 18px 10px 18px',
      }}
      >
        <CustomButton variant="outlined" onClick={onClickMyLocation}>
          <span>내주변</span>
          <RiSendPlaneLine style={{ width: 16, height: 16 }} />
        </CustomButton>

        <SFilterSelector>
          <FilterModal>
            <CustomButton
              variant="outlined" // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => {}}
            >
              <span>지역</span>
              <RiArrowDownSLine style={{ width: 16, height: 16 }} />
            </CustomButton>
          </FilterModal>

          <FilterModal>
            <CustomButton
              variant="outlined" // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => {}}
            >
              <span>프로그램</span>
              <RiArrowDownSLine style={{ width: 16, height: 16 }} />
            </CustomButton>
          </FilterModal>

          <FilterModal>
            <CustomButton
              variant="outlined" // eslint-disable-next-line @typescript-eslint/no-empty-function
              onClick={() => {}}
            >
              <span>시간</span>
              <RiArrowDownSLine style={{ width: 16, height: 16 }} />
            </CustomButton>
          </FilterModal>
        </SFilterSelector>
      </SFilterSelector>
    );
};

const SFilterSelector = styled.div<{$padding?: string}>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${(props) => props.$padding};
  button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    word-break: keep-all;
    padding: 8px 16px;
    height: 32px;
    font-size: 12px;
    border: solid 1px;
    border-color: rgba(52, 66, 53, 1);
    border-radius: 20px;

    svg {
      margin-left: 2px;
    }
  }
`;
