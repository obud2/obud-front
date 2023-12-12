import StudioList from '@/components/studio/StudioList';
import { Studio } from '@/entities/studio';
import Chip from '@/components/common/chip/Chip';
import SpecialList from '../studio/SpecialList';
import { SClass } from './ClassV2.styled.';

type Props = {
  studios: Studio[][];
};

const ClassV2 = ({ studios }: Props) => {
  const specialStudios = studios[0] || [];
  const allStudios = studios[1] || [];

  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={specialStudios} />
        </section>

        <section className="class-category">
          <Chip label="요가" />
          <Chip label="차" />
          <Chip label="명상" />
          <Chip label="기타" />
        </section>

        <section className="class-container">
          <StudioList title="All Place" list={allStudios} isSort />
        </section>
      </article>
    </SClass>
  );
};

export default ClassV2;
