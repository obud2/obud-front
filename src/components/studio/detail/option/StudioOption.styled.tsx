import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SStudioOption = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .obud-studio-category-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 6px;
    flex-wrap: wrap;
    color: ${(props) => props.theme.core_color_slate_500};
    font-size: 1.3rem;
    ${MOBILE} {
      font-size: 1.1rem;
    }
  }

  .obud-studio-header {
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;

    ${MOBILE} {
      border: none;
    }

    .obud-studio-title {
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 140%;
      margin-right: 12px;

      ${MOBILE} {
        font-size: 1.8rem;
      }
    }

    .obud-studio-icons {
      display: flex;
      gap: 8px;
      margin-left: auto;

      ${MOBILE} {
        margin: 15px 0 10px;
        margin-left: auto;
      }
    }
  }

  .obud-studio-option {
    width: 100%;
    flex: 1;
    padding: 0;

    display: flex;
    flex-direction: column;
    gap: 13px;

    ${MOBILE} {
      padding: 0 15px;
      font-size: 13px;
    }

    .obud-option-item {
      width: 100%;

      display: none;
      gap: 11px;

      font-size: 14px;
      font-weight: 400;
      line-height: 140%;

      a {
        color: #000;
      }

      &.active {
        display: flex;
      }

      .icons-container {
        width: 15px;
        height: 15px;
        padding-top: 5px;

        display: flex;
        align-items: center;
        justify-content: center;

        .location {
          width: 13px;
          height: 15px;
        }
        .url {
          width: 15px;
          height: 15px;
        }
        .parking {
          width: 11px;
          height: 15px;
        }
        .info {
          width: 15px;
          height: 15px;
        }
        .home {
          width: 20px;
          height: 17px;
        }
        .contact {
          width: 20px;
          height: 17px;
        }
      }

      .option-deps {
        width: 100%;

        display: flex;
        flex-direction: column;
        gap: 8px;

        white-space: pre-line;
        word-break: break-word;

        top: 2px;
        position: relative;

        .convenience-item {
          margin-right: 16px;
        }
      }
    }
  }
`;
