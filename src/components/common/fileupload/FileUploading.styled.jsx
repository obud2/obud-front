import styled, { keyframes } from 'styled-components';

export const SFileUploading = styled.div`
  top: 0;
  left: 0;
  position: fixed;

  width: 100vw;
  height: 100vh;

  z-index: 10101010;

  display: flex;
  justify-content: center;
  align-items: center;

  .uploading-item-background {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);

    position: fixed;
    top: 0;
    left: 0;
  }

  .uploading-item-option-container {
    z-index: 10;

    border-radius: 12px;
    background-color: rgb(38, 38, 38);

    display: flex;
    flex-direction: column;
    transition: all 0.3s;

    overflow: hidden;

    @media screen and (max-width: 1000px) {
      width: 95vw;
    }

    .uploading-item-option-header {
      width: 100%;
      height: 50px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      border-bottom: 1px solid rgba(54, 54, 54);

      padding: 0 10px;

      .uploading-item-upload {
        display: block;

        font-size: 14px;
        color: rgb(0, 149, 246);
      }

      .uploading-item-option-title {
        color: #ffffff;
        font-size: 16px;
        margin: 0;

        left: 50%;
        position: absolute;
        transform: translateX(-50%);
      }

      .uploading-item-option-prev-btn {
        width: 24px;
        height: 24px;

        position: relative;

        svg {
          width: 20px;
          height: 20px;
          color: #ffffff;
        }
      }

      .uploading-item-option-close-btn {
        width: 24px;
        height: 24px;

        position: relative;

        &::after,
        &::before {
          content: ' ';

          position: absolute;

          top: 3px;
          left: 12px;

          width: 1px;
          height: 20px;

          background-color: #ffffff;
        }

        &::after {
          transform: rotate(-45deg);
        }

        &::before {
          transform: rotate(45deg);
        }
      }
    }

    .uploading-item-option-body {
      min-width: ${(props) => props.basicSize && ` ${props.basicSize}px`};
      min-height: ${(props) => props.basicSize && ` ${props.basicSize}px`};

      position: relative;

      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;

      overflow: hidden;

      @media screen and (max-width: 1000px) {
        min-width: 80vw;
        min-height: 50vh;
        max-height: 50vh;
      }

      .uploading-item-presentation {
        display: flex;
        align-items: center;
        justify-content: center;

        overflow: hidden;
        flex-direction: column;

        transition: width 0.3s, height 0.3s;

        .uploading-item-img {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
          transform: none;
          transition: width 0.3s, height 0.3s;
        }

        .uploading-grab {
          width: 100%;
          height: 100%;
          cursor: grab;

          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;

          touch-action: none;
          -webkit-user-select: none;
          z-index: 2;

          &.active {
            width: 100vw;
            height: 100vh;

            cursor: grabbing;
            position: fixed;
          }
        }

        .uploading-grab-grid {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);

          .uploading-grab-grid-item {
            border: 0.1px solid rgba(54, 54, 54);
          }
        }
      }

      .uploading-option-size-select-box {
        display: none;
        position: absolute;
        left: 10px;
        bottom: 55px;
        background-color: rgba(26, 26, 26, 0.6);

        border-radius: 8px;
        z-index: 3;

        &.open {
          display: block;
          min-width: 110px;

          .uploading-option-select-item {
            display: flex;
            justify-content: center;
            align-items: center;

            padding: 10px 0;

            font-size: 13px;

            color: rgba(168, 168, 168);
            border-bottom: 1px solid rgba(38, 38, 38, 0.3);

            cursor: pointer;

            &.active {
              color: #ffffff;
            }

            &:hover {
              opacity: 0.8;
            }
          }

          .uploading-option-select-item:last-child {
            border-bottom: none;
          }
        }
      }

      .uploading-option-zoom-select-box {
        display: none;
        position: absolute;
        right: 10px;
        bottom: 55px;
        background-color: rgba(26, 26, 26, 0.6);

        border-radius: 8px;
        z-index: 3;

        justify-content: center;
        align-items: center;

        &.open {
          display: flex;
          min-width: 100px;
          height: 30px;
          padding: 8px 12px;

          .zoom-input {
            width: 100%;
            height: 1px;

            outline: none;

            -webkit-appearance: none;
            accent-color: rgba(245, 245, 245);
          }
        }
      }

      .uploading-option-box {
        width: 35px;
        height: 35px;
        position: absolute;

        cursor: pointer;
        background-color: rgba(26, 26, 26, 0.8);
        border-radius: 50%;

        display: flex;
        justify-content: center;
        align-items: center;

        z-index: 3;

        @media screen and (max-width: 1000px) {
          visibility: hidden;
        }

        svg {
          color: #ffffff;
        }

        &:hover {
          background-color: rgba(26, 26, 26, 0.6);
        }

        &.active {
          background-color: rgba(26, 26, 26, 0.2);
        }

        &.size {
          bottom: 15px;
          left: 10px;

          &.active {
            background-color: #ffffff;
            box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.2);
          }
          svg {
            width: 15px;
            height: 15px;
          }
        }

        &.zoomin {
          bottom: 15px;
          right: 10px;

          &.active {
            background-color: #ffffff;
            box-shadow: 1px 1px 3px 2px rgba(0, 0, 0, 0.2);
          }
          svg {
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }
`;

const helpMessageAnimation = keyframes`
  0% {
    transform: translateX(400px);
  }
  100% {
    transform: translateX(0);
  }
`;

export const UploadingHelpMessage = styled.div`
  position: fixed;
  bottom: 20px;
  right: 30px;

  z-index: 1010101010;

  .uploading-help-message {
    width: 384px;
    max-width: calc(100vw - 48px);
    margin-bottom: 16px;
    margin-inline-start: auto;
    padding: 20px 24px;
    overflow: hidden;
    line-height: 1.5714285714285714;
    word-wrap: break-word;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 6px 16px 0 rgb(0 0 0 / 8%), 0 3px 6px -4px rgb(0 0 0 / 12%), 0 9px 28px 8px rgb(0 0 0 / 5%);

    font-size: 14px;
    color: #555555;

    animation: ${helpMessageAnimation} 0.3s;

    b {
      color: #f33;
    }
  }
`;
