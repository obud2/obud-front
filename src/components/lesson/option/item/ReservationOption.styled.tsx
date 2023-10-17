import styled from 'styled-components';
import { MOBILE } from 'src/styled/variablesStyles';

export const SReservationOption = styled.article`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 0 10px 10px 10px;

  ${MOBILE} {
    gap: 6px;
    padding: 10px 5px;
  }

  .select-container {
    height: 40px;
  }

  .impossible {
    text-decoration: line-through;
  }

  .item-impossible {
    color: #fff;
    background: #555555;
    border: 1px solid #555555;

    padding: 2px 7px 2px 7px;
    margin: 0;

    display: inline-block;
    text-align: center;

    font-size: 1.2rem;
    text-decoration: none !important;
    font-style: normal !important;
  }

  .item-timeout {
    color: #555555;
    /* background: #555555; */
    /* border: 1px solid #555555; */

    padding: 2px 7px 2px 7px;
    margin: 0;

    display: inline-block;
    text-align: center;

    font-size: 1.2rem;
    text-decoration: none !important;
    font-style: normal !important;
  }

  .item-percent {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    margin-left: 1px;

    color: rgba(0, 0, 0, 0.5);

    p {
      color: rgba(0, 0, 0, 0.5);
      text-decoration: line-through;
    }

    b {
      font-weight: 400;
      color: #fe5356;
    }
  }

  .result-bottom {
    display: flex;
    align-items: center;
  }

  .reservation-total {
    text-align: right;
    margin-left: auto;

    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.35);

    .total-price {
      font-size: 1.4rem;
      font-weight: 700;
      margin-left: 30px;
    }
  }

  .option-title {
    font-size: 14px;
    padding: 12px 0;
  }
`;

export const SReservationTimeOption = styled.div`
  .time-option-list {
    display: flex;
    overflow: auto;
    padding: 0 0;
    margin-bottom: 16px;
  }

  .time-option-item {
    position: relative;
    text-align: center;
    font-size: 12px;
    word-break: keep-all;
    font-weight: 500;
    line-height: 1.4;
    color: ${(props) => props.theme.main_color_slate_500};

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 8px 12px;
    margin-right: 12px;
    border: 1px solid ${(props) => props.theme.main_color_slate_300};
    border-radius: 4px;
    width: 100px;
    height: 40px;

    &.selected {
      background-color: ${(props) => props.theme.main_color_slate_300};
      color: #fff;
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 1px;
        height: 100%;
        background: ${(props) => props.theme.main_color_slate_300};
        transform: skewX(70deg); /* 대각선의 각도를 조절 */
      }
    }
  }
`;
