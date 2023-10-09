import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SLessonDetailItem = styled.div<{ isActive: boolean }>`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;

  ${MOBILE} {
    cursor: pointer;
  }

  .lesson-item-images-container {
    width: 100%;
    height: auto;

    /* This is necessary for styling. do not remove */
    aspect-ratio: 1 / 1;

    position: relative;
    object-fit: cover;

    overflow: hidden;
    cursor: pointer;

    .lesson-item-image {
      top: 0;
      left: 0;
      position: absolute;
    }

    .lesson-image-1 {
      z-index: 1;
      transition: opacity 0.3s ease-in-out;
    }

    .lesson-image-2 {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    ${(props) =>
      props.isActive &&
      css`
        &:hover {
          .lesson-image-1 {
            opacity: 0;
          }

          .lesson-image-2 {
            opacity: 1;
          }

          ${MOBILE} {
            .lesson-image-1 {
              opacity: 1;
            }

            .lesson-image-2 {
              opacity: 0;
            }
          }
        }
      `}
  }

  .lesson-item-contents-container {
    width: 100%;
    padding: 0 5px;

    display: flex;
    flex-direction: column;

    gap: 16px;

    .lesson-item-title {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 100%;

      display: flex;
      align-items: center;
      cursor: pointer;

      color: ${(props) => props.theme.main_color_slate_400};

      ${MOBILE} {
        font-size: 1.4rem;
        font-weight: 400;
      }
    }

    .lesson-item-addr {
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 100%;

      display: flex;
      align-items: center;
      cursor: pointer;

      color: rgba(0, 0, 0, 0.5);

      ${MOBILE} {
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
  }

  .lesson-category-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    cursor: pointer;
    gap: 8px;

    margin: 8px 1px;

    .lesson-category {
      width: auto;
      height: auto;

      padding: 1px 8px;
      margin: 0 1px;

      font-size: 1.3rem;

      color: ${(props) => props.theme.main_color_slate_300};
      border: 1px solid ${(props) => props.theme.main_color_slate_300};

      p {
        position: relative;
        top: 1px;
      }

      ${MOBILE} {
        font-size: 1.1rem;
        padding: 1px 8px;

        border: 1px solid ${(props) => props.theme.main_color_slate_100};
      }
    }
  }
`;
