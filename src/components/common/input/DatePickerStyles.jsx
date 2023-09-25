import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

export const SDatePicker = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);

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
      border-bottom: 1px solid rgba(5, 5, 5, 0.06);

      ${MOBILE} {
        height: 30px;
      }

      .prev-date,
      .next-date {
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        color: #868686;
        cursor: pointer;

        svg {
          width: 16px;
          height: 16px;
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

      padding: 8px 18px;

      .datepicker-week {
        width: 100%;
        height: 35px;
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
            height: 35px;
            position: relative;

            div {
              width: 80%;
              height: 80%;

              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);

              font-size: 1.3rem !important;

              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 8px;

              cursor: pointer;

              color: ${(props) => props.theme.main_color_slate_500};
              background-color: #ffffff;

              transition: background-color 0.2s, border 0.2s;
            }
          }

          /* 오늘 날짜 스타일 */
          .date-picker-days._now div {
            color: ${(props) => props.theme.main_color_slate_500};
            border: rgba(255, 220, 40, 0.15);
            background-color: rgba(255, 220, 40, 0.15);
          }

          /* 선택된 날짜 스타일 */
          .date-picker-days._active div {
            color: #ffffff;
            border: ${(props) => props.theme.main_color_slate_500};
            background-color: ${(props) => props.theme.main_color_slate_500};
          }

          /* 선택 불가 스타일 */
          .date-picker-days._disabled div {
            color: rgb(174, 174, 174) !important;
            text-decoration: line-through !important;
            background-color: #ffffff;

            &:hover {
              color: rgb(174, 174, 174) !important;
              background-color: #ffffff !important;
            }
          }

          /* 마우스 오버 스타일 */
          .date-picker-days div:hover {
            color: #ffffff;
            background-color: ${(props) => props.theme.main_color_slate_500};
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
