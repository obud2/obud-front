import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SProductImages = styled.div`
  width: 100%;

  position: relative;

  display: flex;
  gap: 24px;

  ${MOBILE} {
    display: flex;
    flex-direction: column;

    gap: 8px;
  }

  .product-image-slice-container {
    width: 100%;
    border: 0.5px solid #eeeeee;

    .panel {
      width: 100%;
      aspect-ratio: 1 / 1;
      position: relative;
    }
  }

  .product-image-select-container {
    min-width: 104px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    ${MOBILE} {
      min-width: 100%;

      display: grid;
      grid-template-columns: repeat(5, 1fr);
    }

    .product-image-select-item {
      min-width: 100%;
      aspect-ratio: 1 / 1;

      position: relative;

      cursor: pointer;

      &::before {
        content: '';

        width: 100%;
        height: 100%;

        z-index: 1;
        background-color: rgba(253, 253, 253, 0.7);
        transition: background-color 0.3s;

        top: 0;
        left: 0;
        position: absolute;
      }

      &.active::before {
        background-color: rgba(253, 253, 253, 0);
      }
    }
  }

  .filcking-animating-block {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;

    opacity: 0;
    pointer-events: auto;

    &.active {
      opacity: 1;
      z-index: 1;
      pointer-events: visible;
      cursor: pointer;
    }
  }
`;
