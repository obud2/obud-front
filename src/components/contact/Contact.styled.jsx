import styled, { keyframes } from 'styled-components';

import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from 'src/styled/variablesStyles';

const CONTACK_ITEMS_WIDTH = `${1280 + 30}px`;

const CONTACT_ANI = keyframes`
   0% {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 0.8);
   } 

   100% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
   }
`;

export const SContact = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  padding: 0 15px;

  margin: 0 auto;

  ${TABLET} {
    max-width: ${TABLET_MAX_WIDTH};
  }

  .obud-contack-article {
    max-width: ${CONTACK_ITEMS_WIDTH};

    padding: 0 15px;
    margin: 40px auto;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    gap: 40px;

    ${MOBILE} {
      padding: 0 15px 30px;
      margin: 0 auto;

      display: grid;
      grid-template-columns: repeat(1, 1fr);

      gap: 24px;
    }
  }

  .contact-item-container {
    width: 100%;
    height: 375px;

    padding: 87px 40px 95px;

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;

    animation: ${CONTACT_ANI} 2s;

    ${MOBILE} {
      width: 100%;
      height: 298px;

      padding: 55px 24px;

      border-bottom: 1px solid #eeeeee;
    }

    .contact-title {
      font-size: 1.8rem;
      font-weight: 400;
      line-height: 100%;

      color: #565656;

      ${MOBILE} {
        font-size: 1.6rem;
      }
    }

    .contact-contents {
      font-size: 1.3rem;
      font-weight: 400;
      line-height: 19px;

      color: #565656;

      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      white-space: pre-line;
      word-break: keep-all;

      ${MOBILE} {
        font-size: 1.3rem;
        line-height: 22px;
      }
    }

    .contact-button {
      width: 80%;
      height: 40px;

      font-size: 1.2rem;
    }
  }
`;
