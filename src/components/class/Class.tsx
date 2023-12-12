import StudioList from '@/components/studio/StudioList';
import { Studio } from '@/entities/studio';
import SpecialList from '../studio/SpecialList';
import { SClass } from './Class.styled';

type Props = {
  studios: Studio[][];
};

const Class = ({ studios }: Props) => {
  const specialStudios = studios[0] || [];
  const allStudios = studios[1] || [];

  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={specialStudios} />
        </section>

        <section className="class-container">
          <StudioList title="All Place" list={allStudios} isSort />
        </section>
      </article>
    </SClass>
  );
};

export default Class;
