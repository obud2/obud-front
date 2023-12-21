import { SectionWithItems } from '@/entities/studio';
import { MAX_WIDTH, TABLET, TABLET_MAX_WIDTH, MOBILE } from '@/styled/variablesStyles';
import styled from 'styled-components';
import SectionStudioItem from '../class/SectionStudioItem';

type Props = {
  sectionWithItems: SectionWithItems;
};

const SectionStudioList = ({ sectionWithItems }: Props) => {
  const { items } = sectionWithItems;

  return (
    <SStudioList>
      <div className="regular-list">
        <div className="class-list-container">
          {items && items?.length > 0 ? (
            items?.map((item) => <SectionStudioItem key={item.id} studio={item} />)
          ) : (
            <p className="empty-text">등록 된 상품이 없습니다.</p>
          )}
        </div>
      </div>
    </SStudioList>
  );
};

export default SectionStudioList;

const SStudioList = styled.div`
  width: 100%;
  margin-top: 10px;

  .list-title {
    max-width: ${MAX_WIDTH};
    padding: 0 15px;
    padding-bottom: 16px;

    margin: 0 auto;

    font-size: 1.5rem;
    font-weight: 600;
    text-align: left;

    ${TABLET} {
      max-width: ${TABLET_MAX_WIDTH};
    }

    ${MOBILE} {
      max-width: 100%;
      font-size: 1.4rem;
    }
  }

  .regular-list {
    width: 100%;

    border-top: 0.5px solid rgba(218, 219, 214, 0.5);
    margin-bottom: 64px;

    ${MOBILE} {
      margin-bottom: 22px;
    }

    .list-sort-filter-container {
      max-width: ${MAX_WIDTH};
      padding: 16px 15px 0;

      margin: 0 auto;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      ${TABLET} {
        max-width: ${TABLET_MAX_WIDTH};
      }

      ${MOBILE} {
        max-width: 100%;
      }

      .list-sort-filter {
        width: 70px;
        border: none;
        outline: none;

        font-size: 1.3rem !important;
        color: rgba(0, 0, 0, 0.5) !important;
      }
    }

    .class-list-container {
      max-width: ${MAX_WIDTH};
      padding: 40px 15px;
      padding-bottom: 32px;

      margin: 0 auto;

      display: grid;
      grid-template-columns: repeat(4, 1fr);

      gap: 32px;

      ${TABLET} {
        gap: 24px;

        max-width: ${TABLET_MAX_WIDTH};
        grid-template-columns: repeat(4, 1fr);
      }

      ${MOBILE} {
        gap: 13px;

        max-width: 100%;
        grid-template-columns: repeat(2, 1fr);

        padding: 20px 15px;
        padding-bottom: 16px;
      }

      .empty-text {
        font-size: 1.4rem;

        color: ${(props) => props.theme.main_color_slate_200};
      }
    }
  }
`;
