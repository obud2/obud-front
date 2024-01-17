import styled, { css } from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SStudioItem = styled.div<{ isActive?: boolean }>`
  width: 100%;
  height: 100%;

  position: relative;

  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  ${MOBILE} {
    cursor: pointer;

    margin-bottom: 12px;
  }

  .studio-item-images-container {
    width: 100%;
    min-width: 130px;
    height: auto;

    aspect-ratio: 1 / 1;

    position: relative;
    object-fit: cover;

    overflow: hidden;
    cursor: pointer;

    .studio-item-image {
      top: 0;
      left: 0;
      position: absolute;
    }

    .studio-image-1 {
      z-index: 1;
      transition: opacity 0.3s ease-in-out;
    }

    .studio-image-2 {
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    ${(props) =>
      props.isActive &&
      css`
        &:hover {
          .studio-image-1 {
            opacity: 0;
          }

          .studio-image-2 {
            opacity: 1;
          }

          ${MOBILE} {
            .studio-image-1 {
              opacity: 1;
            }

            .studio-image-2 {
              opacity: 0;
            }
          }
        }
      `}
  }

  .studio-item-contents-container {
    width: 100%;
    padding: 0 5px;

    display: flex;
    flex-direction: column;

    gap: 16px;

    .studio-item-title {
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 100%;

      display: flex;
      align-items: center;
      cursor: pointer;

      ${MOBILE} {
        font-size: 1.4rem;
        font-weight: 500;
      }
    }

    .studio-item-addr {
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

  .studio-category-container {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    cursor: pointer;
    gap: 8px;

    margin: 8px 6px;

    color: rgba(0, 0, 0, 0.5);

    .studio-category {
      width: auto;
      height: auto;

      padding: 1px 0px;
      margin: 0 1px;

      font-size: 1.3rem;

      color: rgba(0, 0, 0, 0.5);
      p {
        position: relative;
        top: 1px;
      }

      ${MOBILE} {
        font-size: 1.1rem;
      }
    }
  }

  .studio-item-minprice-container {
    margin-top: 10px;
    padding: 0 5px;

    .studio-item-title {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 100%;
      color: ${(props) => props.theme.core_color_slate_600};

      display: flex;
      align-items: center;
      cursor: pointer;

      ${MOBILE} {
        font-size: 1.2rem;
        font-weight: 400;
      }
    }
  }
`;
