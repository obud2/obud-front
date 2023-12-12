import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SLessonOption = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .obud-lesson-category-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 6px;
    flex-wrap: wrap;
    color: ${(props) => props.theme.main_color_slate_300};
    font-size: 1.3rem;
    ${MOBILE} {
      font-size: 1.1rem;
    }
  }

  .obud-lesson-header {
    width: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;

    ${MOBILE} {
      border: none;
    }

    .obud-lesson-title {
      font-size: 2rem;
      font-weight: 700;
      line-height: 140%;
      margin-right: 12px;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .obud-studio-title {
      margin: 5px 0;
      font-size: 12px;
      color: #555555;
    }

    .obud-lesson-icons {
      display: flex;
      gap: 8px;
      margin-left: auto;

      ${MOBILE} {
        margin: 15px 0 10px;
        margin-left: auto;
      }
    }
  }

  .obud-lesson-option {
    width: 100%;
    flex: 1;
    padding: 21px 0 0;

    display: flex;
    flex-direction: column;
    gap: 13px;

    ${MOBILE} {
      padding: 0 15px;
    }

    .obud-option-item {
      width: 100%;

      display: none;
      gap: 11px;

      font-size: 1.5rem;
      font-weight: 400;
      line-height: 140%;

      color: #565656;

      a {
        color: #565656;
      }

      &.active {
        display: flex;
      }

      .icons-container {
        width: 20px;
        height: 20px;

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
          width: 13px;
          height: 15px;
        }
        .info {
          width: 15px;
          height: 15px;
        }
        .home {
          width: 13px;
          height: 15px;
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

        ${MOBILE} {
          font-size: 1.4rem;
        }

        .convenience-item {
          margin-right: 16px;
        }
      }
    }
  }
`;
