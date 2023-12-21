import { Studio } from '@/entities/studio';
import StudioList from '../studio/StudioList';

import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';

type Props = {
  studios: Studio[];
};

const ClassByCategory = ({ studios }: Props) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <StudioList list={studios} />
        </section>
      </article>
    </SClass>
  );
};

export default ClassByCategory;

const SClass = styled.div`
  width: 100%;

  .obud-class-article {
    width: 100%;

    display: flex;
    flex-direction: column;

    padding: 104px 0 60px;

    ${MOBILE} {
      padding: 0 0 40px;
    }

    .class-container {
      width: 100%;
      height: auto;
    }

    .class-category {
      display: flex;
      justify-content: flex-start;
      padding: 12px;
      margin-bottom: 12px;

      div {
        margin-right: 8px;
      }
    }

    .class-section-container {
      margin-bottom: 8px;
      padding: 12px;

      .section-title-container {
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .section-title {
          font-size: 14px;
          font-weight: bold;
        }

        .section-more {
          font-size: 13px;
          color: ${(props) => props.theme.core_color_slate_400};
          cursor: pointer;
        }
      }

      .section-studio-container {
        .section-studio-item {
          margin-right: 12px;
        }
      }
    }
  }
`;
