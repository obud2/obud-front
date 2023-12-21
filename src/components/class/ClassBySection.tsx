import { SectionWithItems } from '@/entities/studio';

import styled from 'styled-components';

import { MOBILE } from 'src/styled/variablesStyles';
import SectionStudioList from '../studio/SectionStudioList';

type Props = {
  sectionWithItems: SectionWithItems;
};

const ClassBySection = ({ sectionWithItems }: Props) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SectionStudioList sectionWithItems={sectionWithItems} />
        </section>
      </article>
    </SClass>
  );
};

export default ClassBySection;

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
  }
`;
