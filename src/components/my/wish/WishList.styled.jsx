import styled from 'styled-components';

import { MOBILE, TABLET } from 'src/styled/variablesStyles';

export const SWishList = styled.div`
  width: 100%;
  margin-bottom: 104px;

  .wish-list-header {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 10px;

    .wish-list-title {
      font-size: 1.6rem;
      font-family: 400;


      display: flex;
      align-items: center;
      justify-content: center;

      gap: 5px;
    }

    button {
      width: 64px;
      height: 32px;
      font-size: 1.4rem;
    }
  }

  .wish-list-container {
    width: 100%;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(4, 1fr);

    gap: 32px;

    ${TABLET} {
      gap: 24px;
      grid-template-columns: repeat(4, 1fr);
    }

    ${MOBILE} {
      gap: 12px;
      grid-template-columns: repeat(2, 1fr);
    }

    .empty-text {
      font-size: 1.4rem;

      color: ${(props) => props.theme.main_color_slate_200};
    }
  }
`;
