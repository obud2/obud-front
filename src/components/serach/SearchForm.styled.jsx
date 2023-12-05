import { TopbarMobileHeight } from '@components/layout/Layout.styled';
import styled from 'styled-components';

export const SSearchForm = styled.div`
  width: 380px;

  .obud-search-container {
    width: 100%;
    /* height: ${TopbarMobileHeight}; */

    margin: 20px auto;
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
        border-bottom: 1px solid ;
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
