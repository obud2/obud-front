import { TopbarMobileHeight } from '@components/layout/Layout.styled';
import styled from 'styled-components';

export const SSearchForm = styled.div`
  width: 380px;

  .obut-search-container {
    width: 100%;
    height: ${TopbarMobileHeight};

    padding: 15px 13px;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 1px solid rgba(171, 182, 165, 0.2);

    .search-input {
      flex: 1;
      height: 100%;

      border: none;
      outline: none;

      font-size: 1.4rem;
      color: #555555;

      margin: 0 7px;

      &::placeholder {
        color: ${(props) => props.theme.main_color_slate_200};
      }

      &:disabled {
        opacity: 0.3;
        background-color: transparent;
      }
    }

    .backTicIcon {
      width: 12px;
      height: 12px;

      border-top: 1px solid #758271;
      border-left: 1px solid #758271;

      cursor: pointer;
      transform: rotate(315deg);
    }

    .icons {
      width: 20px;
      height: 20px;

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

      color: ${(props) => props.theme.main_color_slate_200};
      border-bottom: 1px solid rgba(171, 182, 165, 0.2);

      transition: all 225ms;

      p {
        width: 100%;
        border-right: 1px solid rgba(171, 182, 165, 0.2);
      }

      &.active {
        color: ${(props) => props.theme.main_color_slate_400};
        border-bottom: 1px solid ${(props) => props.theme.main_color_slate_400};
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
