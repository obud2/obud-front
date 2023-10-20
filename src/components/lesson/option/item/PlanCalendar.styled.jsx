import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SPlanCalendar = styled.div`
  width: 100%;
  padding: 0 10px;

  .date-picker-container {
    width: 100%;

    position: relative;
    background-color: #ffffff;

    .datepicker {
      width: 100%;
    }

    .date-change {
      width: 100%;
      height: 40px;
      padding: 0 10px;

      top: 0;
      position: absolute;

      display: flex;
      justify-content: space-between;
      align-items: center;
      /* border-bottom: 1px solid rgba(5, 5, 5, 0.06); */

      ${MOBILE} {
        height: 30px;
        padding: 0;
      }

      .prev-date,
      .next-date {
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #555555;
        cursor: pointer;

        svg {
          width: 16px;
          height: 16px;
        }

        &.hide {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }
      }
    }

    .datepicker-year {
      width: 100%;
      height: 40px;

      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 1.4rem;
      font-weight: bold;

      color: #232323;

      ${MOBILE} {
        height: 30px;
      }
    }

    .datepicker-week-to-days {
      width: 100%;
      height: auto;

      padding: 10px 0;

      .datepicker-week {
        width: 100%;
        height: 40px;
        text-align: center;

        color: #555555;
        font-size: 1.4rem;

        display: flex;
        align-items: center;

        li {
          width: 100%;
          position: relative;
        }

        li:first-child {
          color: #f33;
        }

        li:last-child {
          color: #2a31fb;
        }
      }

      .datepicker-table {
        width: 100%;
        height: auto;

        tbody {
          width: 100%;
          text-align: center;

          color: #555555;

          .date-picker-days {
            height: 40px;
            position: relative;

            div {
              width: 90%;
              height: 90%;

              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              font-size: 1.4rem !important;

              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 8px;

              color: ${(props) => props.theme.main_color_slate_500};
              background-color: #f9f9f9;

              transition: background-color 0.2s, border 0.2s;

              cursor: pointer;

              &:hover {
                color: #ffffff;
                background-color: ${(props) => props.theme.main_color_slate_500};
              }
            }
          }

          /* 오늘 날짜 스타일 */
          .date-picker-days._today div::after {
            content: '';

            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;

            border-radius: 8px;
            background-color: rgba(255, 220, 40, 0.15);
          }

          /* 선택된 날짜 스타일 */
          .date-picker-days._active div {
            color: #ffffff;
            border: ${(props) => props.theme.main_color_slate_400};
            background-color: ${(props) => props.theme.main_color_slate_400};
          }

          /* 선택 불가 스타일 */
          .date-picker-days._disabled div {
            color: rgb(174, 174, 174) !important;
            background-color: #ffffff;

            &:hover {
              color: rgb(174, 174, 174) !important;
              background-color: #ffffff !important;
            }
          }

          /* 빈셀 스타일 */
          .date-picker-days._empty {
            background-color: #ffffff !important;

            div {
              background-color: #ffffff !important;
              cursor: default;
            }
          }
        }
      }
    }

    .datepicker-today-container {
      width: 100%;
      height: 35px;

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 1.4rem;

      border-top: 1px solid rgba(5, 5, 5, 0.06);

      button {
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.main_color_slate_500};
      }
    }
  }
`;
