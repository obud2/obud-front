import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SLessonOption = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  .obud-lesson-header {
    width: 100%;

    position: relative;

    display: flex;
    align-items: center;
    justify-content: space-between;

    ${MOBILE} {
      border: none;
      flex-direction: column;
    }

    .obud-lesson-title-container {
      width: calc(100% - 20px);

      display: flex;
      flex-direction: column;
      gap: 8px;

      ${MOBILE} {
        width: 100%;
        gap: 4px;
      }

      .obud-lesson-subTitle {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 100%;

        color: #565656;

        ${MOBILE} {
          font-size: 1.3rem;
        }
      }

      .obud-lesson-title {
        width: 100%;

        font-size: 2.4rem;
        font-weight: 700;
        line-height: 140%;

        color: #0d0d0d;

        ${MOBILE} {
          font-size: 1.8rem;
        }
      }
    }

    .obud-lesson-option {
      display: inline-block;

      ${MOBILE} {
        width: 100%;
        margin: 15px 0 10px;
      }
    }
  }
`;
