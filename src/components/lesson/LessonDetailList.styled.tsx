import styled, { css } from 'styled-components';

import { MAX_WIDTH, MOBILE, TABLET, TABLET_MAX_WIDTH } from 'src/styled/variablesStyles';

export const SLessonDetailList = styled.div<{ isShow: boolean }>`
  width: 100%;
  display: none;

  ${(props) =>
    props.isShow &&
    css`
      display: block;
    `}

  .list-title {
    max-width: ${MAX_WIDTH};
    padding: 0 15px;
    padding-bottom: 16px;

    margin: 0 auto;

    font-size: 1.5rem;
    font-weight: 600;
    text-align: left;

    color: ${(props) => props.theme.main_color_slate_300};

    ${TABLET} {
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      display: none;
    }
  }

  .lesson-detail-list {
    width: 100%;
    border-top: 0.5px solid rgba(218, 219, 214, 0.5);

    .class-list-container {
      max-width: ${MAX_WIDTH};
      padding: 40px 15px;
      padding-bottom: 32px;

      margin: 0 auto;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }

      ${MOBILE} {
        max-width: 100%;
        padding: 0;
      }

      .panel {
        overflow: hidden;
        position: relative;

        margin-right: 24px;

        ${MOBILE} {
          margin-right: 12px;
        }
      }

      .flicking-viewport {
        height: 60vw;
      }

      .flicking-pagination {
        font-size: 1.4rem;
        font-weight: 500;
        color: ${(props) => props.theme.main_color_slate_300};
        bottom: 0px;

        ${MOBILE} {
          width: 47px;
          height: 21px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 1.3rem;

          bottom: 20px;
          right: 15px;
          left: auto;

          color: #ffffff;
        }
      }

      .flicking-pagination-bullet {
        width: 6px;
        height: 6px;
        margin: 0 2px;

        &.flicking-pagination-bullet-active {
          background-color: ${(props) => props.theme.main_color_slate_300};
        }
      }

      .filcking-arrow-container {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        bottom: -2px;
        left: 50%;
        transform: translateX(-50%);
        position: absolute;

        z-index: 5000;

        ${MOBILE} {
          display: none;
        }
      }

      .flicking-arrow-prev,
      .flicking-arrow-next {
        display: inline-block;
        width: 16px;
        height: 16px;

        right: auto;
        top: auto;
        left: auto;
        bottom: auto;
        transform: translate(0, 0);

        position: relative;

        &::before,
        &::after {
          width: 7px;
          height: 1px;
          left: 6px;

          background-color: ${(props) => props.theme.main_color_slate_300};
        }

        &::before {
          top: 25%;
        }
        &::after {
          top: calc(50% - 4px);
        }
      }
    }
  }
`;
