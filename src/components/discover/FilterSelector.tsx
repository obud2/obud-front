import React from 'react';
import { RiArrowDownSLine, RiSendPlaneLine } from 'react-icons/ri';
import styled from 'styled-components';
import 'swiper/css';

export const FilterSelector = () => {
    return (
      <SFilterSelector>
        <button>
          <span>내주변</span>
          <RiSendPlaneLine style={{ width: 16, height: 16 }} />
        </button>
        <button>
          <span>지역</span>
          <RiArrowDownSLine style={{ width: 16, height: 16 }} />
        </button>
        <button>
          <span>프로그램</span>
          <RiArrowDownSLine style={{ width: 16, height: 16 }} />
        </button>
        <button>
          <span>시간</span>
          <RiArrowDownSLine style={{ width: 16, height: 16 }} />
        </button>
      </SFilterSelector>
    );
};

const SFilterSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 18px;

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
