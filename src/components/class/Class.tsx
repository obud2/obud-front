import SpecialList from '@/components/studio/SpecialList';
import StudioList from '@/components/studio/StudioList';
import { Studio } from '@/entities/studio';
import { SClass } from './Class.styled';

type Props = {
  studios: Studio[];
};

const Class = ({ studios }: Props) => {
  return (
    <SClass>
      <article className="obud-class-article">
        <section className="class-container">
          <SpecialList list={studios[0] || []} />
        </section>

        <section className="class-container">
          <StudioList isSort={false} title="New Class" list={studios[1] || []} />
        </section>

        <section className="class-container">
          <StudioList title="All Class" list={studios[2] || []} isSort />
        </section>
      </article>
    </SClass>
  );
};

export default Class;
