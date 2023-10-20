import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SCartItem = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  ${MOBILE} {
    flex-direction: column;
  }

  .cart-select-container {
    min-width: 24px;
    height: 100%;

    margin: 0 16px;

    display: flex;
    align-content: center;
    justify-content: center;

    ${MOBILE} {
      width: 100%;
      min-width: 100%;

      display: flex;
      align-content: center;
      justify-content: flex-start;

      margin-bottom: 6px;
    }
  }

  .cart-note-container {
    min-width: 100px;
    text-align: center;

    ${MOBILE} {
      top: 22px;
      left: 0;
      position: absolute;

      width: auto;
      min-width: auto;
    }
  }

  .item-impossible {
    color: #fff;
    background: #a4a4a4;
    border: 1px solid #a4a4a4;

    padding: 2px 7px;
    margin: 0 10px 0 0;

    display: inline-block;
    text-align: center;

    font-size: 1.2rem;
    text-decoration: none !important;
    font-style: normal !important;

    ${MOBILE} {
      padding: 3px 8px;
      font-size: 1.3rem;
    }
  }
`;
