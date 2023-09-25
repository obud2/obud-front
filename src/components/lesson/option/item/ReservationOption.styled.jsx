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
    background: #ec3519;
    border: 1px solid #ec3519;

    padding: 2px 7px 2px 7px;
    margin: 0 10px 0 0;

    display: inline-block;
    text-align: center;

    font-size: 1.2rem;
    text-decoration: none !important;
    font-style: normal !important;
  }

  .item-timeout {
    color: #fff;
    background: #555555;
    border: 1px solid #555555;

    padding: 2px 7px 2px 7px;
    margin: 0 10px 0 0;

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

  .reservation-total {
    text-align: right;

    font-size: 1.3rem;
    color: rgba(0, 0, 0, 0.35);

    .total-price {
      font-size: 1.4rem;
      font-weight: 700;
      margin-left: 30px;
    }
  }
`;
